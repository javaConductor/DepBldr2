package io.github.javaconductor.gserv.samples.dependency

import groovyx.gpars.dataflow.DataflowVariable
import io.github.javaconductor.gserv.GServ
import io.github.javaconductor.gserv.plugins.PluginMgr
import io.github.javaconductor.gserv.plugins.eventLogger.EventLoggerPlugin
import io.github.javaconductor.gserv.utils.Encoder
import org.springframework.context.annotation.AnnotationConfigApplicationContext

class Main {

  static public void main(String[] args) {
    println "Main started!!"
    def pluginMgr = PluginMgr.instance()
    pluginMgr.register("eventLogger", EventLoggerPlugin.class)

    def asMap = { thing ->
      thing.class.declaredFields { !it.synthetic }.collectEntries {
        [(it.name): thing."$it.name"]
      }
    }

    def artifactToMap = { a ->
      [artifactId: a.artifactId,
       groupId   : a.groupId,
       version   : a.version,
       classifier: a.classifier,
       extension : a.extension
      ]
    }

    def versionToMap = { a ->
      [version: a.version]
    }

    AnnotationConfigApplicationContext ctx =
      new AnnotationConfigApplicationContext(DependencyService.class)
    ctx.register(AppConfig.class);
    def service = ctx.getBean(DependencyService.class);
    def gserv = new GServ()

    def artifactResource = GServ.Resource('/artifact/:groupId/:artifactId') {

      get("/version/:version") { groupId, artifactId, version ->
        def artifact = new DataflowVariable()
        try {
          artifact << service.getArtifact(groupId, artifactId, version)
          writeJson(artifactToMap(artifact.val))
        } catch (Throwable e) {
          e.printStackTrace(System.err)
          error(500, e.message)
        }
      }//get

      get("/version/:version/dependencies") { groupId, artifactId, version ->
        def artifactDeps = new DataflowVariable()
        try {
          artifactDeps << service.getArtifactDependencies(groupId, artifactId, version)
          writeJson(
            artifactDeps.val.collect { result ->
              artifactToMap(result.artifact)
            })
        } catch (Throwable e) {
          System.err.println "Error getting deps for $artifactId: ${e.message}"
          e.printStackTrace(System.err)
          error(500, e.message)
        }
      }//get

      get("/versions") { groupId, artifactId ->
        def versions = new DataflowVariable()
        try {
          versions << service.getArtifactVersions(groupId, artifactId)
          writeJson(versions.val.collect(versionToMap))
        } catch (Throwable e) {
          ///TODO check for Artifact NOT found error.
          System.err.println "Error getting versions for $groupId:$artifactId: ${e.message}"
          e.printStackTrace(System.err)
          error(500, e.message)
        }
      }//get

    }// artifact resource

    gserv.plugins {
      // plugin("eventLogger", ["url":"/log"])
      plugin("caching", [:])
      plugin("compression", [:])
    }.http {
      name('Dependency Builder')
      useResourceDocs(true)
      get("/", file("text/html", "views/index.html"))
      resource(artifactResource)
      // This will create a Base64 String for the eTag
      weakETag("/artifact/**") { context, actionArgs ->
        //MD5 it
        byte[] data = actionArgs.join('.').bytes
        Encoder.md5WithBase64(data)
      }

    }.start(9090)
  }//main
}
