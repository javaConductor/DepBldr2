package io.github.javaconductor.gserv.samples.dependency.util

import org.apache.maven.repository.internal.MavenRepositorySystemUtils
import org.eclipse.aether.*
import org.eclipse.aether.internal.impl.DefaultRepositorySystem
import org.eclipse.aether.repository.LocalRepository
import org.eclipse.aether.repository.RemoteRepository
import org.eclipse.aether.transfer.AbstractTransferListener

/*******************************************************************************
 * Copyright (c) 2010, 2014 Sonatype, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Sonatype, Inc. - initial API and implementation
 *******************************************************************************/
/**
 * A helper to boot the repository system and a repository system session.
 */
public class Booter {

  public static RepositorySystem newRepositorySystem() {
    new DefaultRepositorySystem()
  }

  public static DefaultRepositorySystemSession newRepositorySystemSession(RepositorySystem system) {
    DefaultRepositorySystemSession session = MavenRepositorySystemUtils.newSession();
    ///  find .m2 dir for localRepo
    LocalRepository localRepo = new LocalRepository("C:\\Users\\lcollins\\.m2\\repository");
    session.setLocalRepositoryManager(system.newLocalRepositoryManager(session, localRepo));
    session.setTransferListener(new AbstractTransferListener() {
    });
    session.setRepositoryListener(new AbstractRepositoryListener() {
      @Override
      void artifactDeployed(RepositoryEvent event) {
        super.artifactDeployed(event)
      }
    });

    // uncomment to generate dirty trees
    // session.setDependencyGraphTransformer( null );

    return session;
  }

  public static List<RemoteRepository> newRepositories(RepositorySystem system, RepositorySystemSession session) {
//        system.newResolutionRepositories()
    def ret = new ArrayList<RemoteRepository>(Arrays.asList(newCentralRepository()));
    ret.addAll(newMiscRepositories())
    ret
  }

  private static List<RemoteRepository> newMiscRepositories() {
    return Arrays.asList(
      new RemoteRepository.Builder("jcenter", "default", "http://jcenter.bintray.com/").build(),
      new RemoteRepository.Builder("ow2", "default", "http://repository.ow2.org/").build(),
      new RemoteRepository.Builder("SpringRepo", "default", "http://maven.springframework.org/milestone").build(),
      new RemoteRepository.Builder("jboss", "default", "https://repository.jboss.org/nexus/content/groups/public/").build()
    );
  }

  private static RemoteRepository newCentralRepository() {
    return new RemoteRepository.Builder("central", "default", "http://central.maven.org/maven2/").build();
  }

}
