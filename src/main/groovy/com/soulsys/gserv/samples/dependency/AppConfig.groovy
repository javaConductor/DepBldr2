package com.soulsys.gserv.samples.dependency

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Jsr330ScopeMetadataResolver
import org.springframework.core.env.Environment

import javax.inject.Inject

/**
 * Created by lcollins on 1/18/14.
 */
@Configuration
@ComponentScan(basePackages = ["com.soulsys.gserv.samples.dependency"],
        scopeResolver = Jsr330ScopeMetadataResolver.class)
class AppConfig {

    private @Inject
    Environment env

}