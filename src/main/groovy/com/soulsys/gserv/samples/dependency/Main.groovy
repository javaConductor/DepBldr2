package com.soulsys.gserv.samples.dependency

import groovyx.gpars.dataflow.DataflowVariable
import org.eclipse.aether.*
import com.soulsys.g_serv.GServ
import static groovyx.gpars.dataflow.Dataflow.task

import org.springframework.context.annotation.AnnotationConfigApplicationContext

class Main {

    static public void main(String[] args) {
        println "Main started!!"

        def asMap = { thing ->
            thing.class.declaredFields { !it.synthetic }.collectEntries {
                [(it.name): thing."$it.name"]
            }
        }

        def artifactToMap = { a ->
            [artifactId: a.artifactId,
                    groupId: a.groupId,
                    version: a.version,
                    classifier: a.classifier,
                    extension: a.extension
            ]
        }

        AnnotationConfigApplicationContext ctx =
                new AnnotationConfigApplicationContext(DependencyService.class)
        ctx.register(AppConfig.class);
//        ctx.refresh();
        def service = ctx.getBean(DependencyService.class);

        def gserv = new GServ()
        def res = GServ.Resource('/artifact') {
            get(":id") { artifactId ->
                def parts = artifactId.split(':')
                if (parts.size() < 3) {
                    error(404, "Bad artifact name [$artifactId]")
                } else {
                    def artifact = new DataflowVariable()
                    task {
                        //TODO When Exception thrown, it does nothing - returns NO response!!!
                        try {
                            artifact << service.getArtifact(parts[0], parts[1], parts[2])
                        } catch (Throwable e) {
                            error(500, e.message)
                        }
                    }
                    artifact.then({
                        writeJson(artifactToMap(it))
                    })
                }
            }
            get(":id/dependencies") { ->
                def parts = artifactId.split(':')
                if (parts.size() < 3) {
                    error(404, "BartifactIdad artifact name [$artifactId]")
                } else {
                    def artifactDeps = new DataflowVariable()
                    task {
                        try {
                            artifactDeps << service.getArtifactDependencies(parts[0], parts[1], parts[2])
                        } catch (Throwable e) {

                            ///TODO check for Artifact NOT found error.
                            System.err.println "Error getting deps for $artifactId: ${e.message}"
                            e.printStackTrace(System.err)
                            error(500, e.message)
                        }
                    }
                    artifactDeps.then({
                        writeJson(
                                it.collect { result ->
                                    artifactToMap(result.artifact)
                                })
                    })
                }
            }
        }

        gserv.http {
            useResourceDocs(true)
            get("/", file("text/html", "views/index.html"))
            resource(res)
        }.start(9090)
    }
}
