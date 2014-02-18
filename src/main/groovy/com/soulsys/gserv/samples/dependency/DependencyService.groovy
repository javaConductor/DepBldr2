package com.soulsys.gserv.samples.dependency

import com.soulsys.gserv.samples.dependency.util.Booter
import com.soulsys.gserv.samples.dependency.util.ManualRepositorySystemFactory
import org.eclipse.aether.RepositorySystem
import org.eclipse.aether.RepositorySystemSession
import org.eclipse.aether.artifact.Artifact
import org.eclipse.aether.artifact.DefaultArtifact
import org.eclipse.aether.collection.CollectRequest
import org.eclipse.aether.graph.Dependency
import org.eclipse.aether.installation.InstallRequest
import org.eclipse.aether.repository.RemoteRepository
import org.eclipse.aether.resolution.ArtifactRequest
import org.eclipse.aether.resolution.ArtifactResolutionException
import org.eclipse.aether.resolution.ArtifactResult
import org.eclipse.aether.resolution.DependencyRequest
import org.eclipse.aether.util.artifact.JavaScopes
import org.eclipse.aether.util.filter.DependencyFilterUtils

import javax.inject.Inject

/**
 * Created by lcollins on 2/12/14.
 */
@javax.inject.Singleton
class DependencyService {
    RepositorySystem repoSys
    RepositorySystemSession repoSysSession
  //  RemoteRepository central = new RemoteRepository.Builder("central", "default", "http://repo1.maven.org" )

    def DependencyService() {

        repoSys = ManualRepositorySystemFactory.newRepositorySystem()
        repoSysSession = Booter.newRepositorySystemSession(repoSys)
     //   new
    }

    Artifact installArtifact(String groupId, String artifactId, String version) {
        getArtifact(groupId, artifactId,  version)
    }

    Artifact getArtifact(String groupId, String artifactId, String version) {
        def artifact = new DefaultArtifact(groupId, artifactId, "jar", version)
        def req = new ArtifactRequest()
        req.artifact = artifact
        req.repositories = Booter.newRepositories(repoSys, repoSysSession)

        ArtifactResult result = repoSys.resolveArtifact(repoSysSession, req)
        result.artifact
    }

    List<ArtifactResult> getArtifactDependencies(String groupId, String artifactId, String version) {
        def artifact = new DefaultArtifact(groupId, artifactId, "jar", version)

        def depFilter = DependencyFilterUtils.classpathFilter(JavaScopes.COMPILE)
        CollectRequest collectReq = new CollectRequest()
        collectReq.setRoot( new Dependency(artifact, JavaScopes.COMPILE))
        collectReq.setRepositories( Booter.newRepositories(repoSys, repoSysSession))

        DependencyRequest depRequest = new DependencyRequest(collectReq, depFilter)
        List<ArtifactResult> depList = repoSys.resolveDependencies(repoSysSession, depRequest).artifactResults
        depList//.collect{ it.artifact}
    }

}
