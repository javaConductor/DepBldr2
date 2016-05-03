/**
 * Created by lcollins on 2/13/14.
 */
import io.github.javaconductor.gserv.samples.dependency.DependencyService

//import io.github.javaconductor.gserv.Factory
import org.eclipse.aether.artifact.Artifact
import org.eclipse.aether.version.Version
import org.junit.Before
import org.junit.Test

class ServiceTest {

    DependencyService service
    @Before
    public final void init() {
        service = new DependencyService();
    }

    @Test
    public final void testInstallArtifact() {
        Artifact a = service.installArtifact("org.scala-lang","scala-library","2.11.0-M7")
        assert "org.scala-lang" == a.groupId
        assert "scala-library" == a.artifactId
        assert a.file.exists()
        println "artifact: ${a.toString()} -> ${a.file.absolutePath}"
    }

    @Test
    public final void testGetArtifactDeps() {
        List<Artifact> artifacts = service.getArtifactDependencies("org.apache.commons","commons-io","1.3.2")
        assert artifacts
        println " Found ${artifacts.size()} dependencies."
        artifacts.each {
            println "Dep: $it"
        }
    }

    @Test
    public final void testGetArtifactDeps2() {
        List<Artifact> artifacts = service.getArtifactDependencies("org.codehaus.groovy","groovy-all","2.2.0")
        assert artifacts
        println " Found ${artifacts.size()} dependencies."
        artifacts.each {
            println "Dep: $it"
        }
    }

    @Test
    public final void testGetVersions() {
        List<Version> a = service.getArtifactVersions("org.scala-lang","scala-library")
        assert a[0].version == "SNAPSHOT"
//        println "artifact: ${a.toString()} -> ${a.file.absolutePath}"
    }


}
