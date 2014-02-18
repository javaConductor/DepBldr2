

function DependencyBuilderCtrl($scope){

    $scope.buildFile = {
        dependencies : [],
         transitiveDependencies : []
    }

    $scope.details = {
        groupId:"org.springframework",
        artifactId:"spring",
        versions:[{version:'2.5.6'},{version:'2.0.6'}],
        //version:{version:'2.5.6'},
        dependencies:[
            {"artifactId":"spring-webmvc","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"jackson-databind","groupId":"com.fasterxml.jackson.core","version":"2.2.2","classifier":"","extension":"jar"},
            {"artifactId":"jackson-annotations","groupId":"com.fasterxml.jackson.core","version":"2.2.2","classifier":"","extension":"jar"},
            {"artifactId":"jackson-core","groupId":"com.fasterxml.jackson.core","version":"2.2.2","classifier":"","extension":"jar"},
            {"artifactId":"itext","groupId":"com.lowagie","version":"2.1.7","classifier":"","extension":"jar"},
            {"artifactId":"bcmail-jdk14","groupId":"bouncycastle","version":"138","classifier":"","extension":"jar"},
            {"artifactId":"bcprov-jdk14","groupId":"bouncycastle","version":"138","classifier":"","extension":"jar"},
            {"artifactId":"bctsp-jdk14","groupId":"org.bouncycastle","version":"1.38","classifier":"","extension":"jar"},
            {"artifactId":"bcprov-jdk14","groupId":"org.bouncycastle","version":"1.38","classifier":"","extension":"jar"},
            {"artifactId":"bcmail-jdk14","groupId":"org.bouncycastle","version":"1.38","classifier":"","extension":"jar"},
            {"artifactId":"jasperreports","groupId":"net.sf.jasperreports","version":"5.1.0","classifier":"","extension":"jar"},
            {"artifactId":"commons-beanutils","groupId":"commons-beanutils","version":"1.8.0","classifier":"","extension":"jar"}
            ,{"artifactId":"commons-collections","groupId":"commons-collections","version":"2.1","classifier":"","extension":"jar"},
            {"artifactId":"commons-digester","groupId":"commons-digester","version":"2.1","classifier":"","extension":"jar"},
            {"artifactId":"commons-logging","groupId":"commons-logging","version":"1.1.1","classifier":"","extension":"jar"},
            {"artifactId":"jcommon","groupId":"jfree","version":"1.0.15","classifier":"","extension":"jar"},
            {"artifactId":"jfreechart","groupId":"jfree","version":"1.0.12","classifier":"","extension":"jar"},
            {"artifactId":"jdtcore","groupId":"eclipse","version":"3.1.0","classifier":"","extension":"jar"},
            {"artifactId":"castor","groupId":"org.codehaus.castor","version":"1.2","classifier":"","extension":"jar"},
            {"artifactId":"jxl","groupId":"net.sourceforge.jexcelapi","version":"2.6.3","classifier":"","extension":"jar"},
            {"artifactId":"log4j","groupId":"log4j","version":"1.2.14","classifier":"","extension":"jar"},
            {"artifactId":"poi","groupId":"org.apache.poi","version":"3.9","classifier":"","extension":"jar"},
            {"artifactId":"commons-codec","groupId":"commons-codec","version":"1.5","classifier":"","extension":"jar"},
            {"artifactId":"tiles-api","groupId":"org.apache.tiles","version":"2.1.2","classifier":"","extension":"jar"},
            {"artifactId":"commons-logging-api","groupId":"commons-logging","version":"1.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-core","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-el","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-extras","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-servlet-wildcard","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-mustache","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"core","groupId":"com.github.spullara.mustache.java","version":"0.6.2","classifier":"","extension":"jar"},
            {"artifactId":"guava","groupId":"com.google.guava","version":"r09","classifier":"","extension":"jar"},
            {"artifactId":"builder","groupId":"com.github.spullara.mustache.java","version":"0.6.2","classifier":"","extension":"jar"},
            {"artifactId":"tiles-freemarker","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-template","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-autotag-core-runtime","groupId":"org.apache.tiles","version":"1.1.0","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-freemarker","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-velocity","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"velocity-tools","groupId":"org.apache.velocity","version":"2.0","classifier":"","extension":"jar"},
            {"artifactId":"oro","groupId":"oro","version":"2.0.8","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-velocity","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-mvel","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"mvel2","groupId":"org.mvel","version":"2.0.11","classifier":"","extension":"jar"},
            {"artifactId":"tiles-ognl","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"ognl","groupId":"ognl","version":"2.7.3","classifier":"","extension":"jar"},
            {"artifactId":"javassist","groupId":"jboss","version":"3.7.ga","classifier":"","extension":"jar"},
            {"artifactId":"tiles-compat","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-jsp","groupId":"org.apache.tiles","version":"2.1.2","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-api","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-servlet","groupId":"org.apache.tiles","version":"3.0.1","classifier":"","extension":"jar"},
            {"artifactId":"tiles-request-servlet","groupId":"org.apache.tiles","version":"1.0.1","classifier":"","extension":"jar"},
            {"artifactId":"velocity","groupId":"org.apache.velocity","version":"1.7","classifier":"","extension":"jar"},
            {"artifactId":"commons-lang","groupId":"commons-lang","version":"2.4","classifier":"","extension":"jar"},
            {"artifactId":"jackson-mapper-asl","groupId":"org.codehaus.jackson","version":"1.9.12","classifier":"","extension":"jar"},
            {"artifactId":"jackson-core-asl","groupId":"org.codehaus.jackson","version":"1.9.12","classifier":"","extension":"jar"},
            {"artifactId":"freemarker","groupId":"org.freemarker","version":"2.3.19","classifier":"","extension":"jar"},
            {"artifactId":"spring-beans","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-context","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-aop","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-context-support","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-core","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-expression","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-oxm","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"spring-web","groupId":"org.springframework","version":"4.0.0.RELEASE","classifier":"","extension":"jar"},
            {"artifactId":"aopalliance","groupId":"aopalliance","version":"1.0","classifier":"","extension":"jar"},
            {"artifactId":"rome","groupId":"rome","version":"1.0","classifier":"","extension":"jar"},
            {"artifactId":"jdom","groupId":"jdom","version":"1.0","classifier":"","extension":"jar"},
            {"artifactId":"velocity-tools-view","groupId":"velocity-tools","version":"1.4","classifier":"","extension":"jar"}]
}

    $scope.categories = [{
        name:"DB Driver",
        artifacts:[
            {groupId:"com.gmongo",artifactId:"gmongo"},
            {groupId:'mysql',artifactId:'mysql-connector-java'},
            {groupId:"org.mongodb",artifactId:"mongo-java-driver"},
            {groupId:"com.oracle",artifactId:"ojdbc14"}
            ]},{
        name: "Spring Framework",
        artifacts:[
            {groupId:"org.springframework", artifactId:"spring-core"},
            {groupId:"org.springframework", artifactId:"spring-context"},
            {groupId:"org.springframework", artifactId:"spring-beans"},
            {groupId:"org.springframework", artifactId:"spring-web"},
            {groupId:"org.springframework", artifactId:"spring-webmvc"},
            {groupId:"org.springframework", artifactId:"spring"}
            ]}
    ]

    $scope.transitives = function(){
        var t = [];
        $scope.buildFile.dependencies.forEach (function( dep){ t = t.concat(dep.dependencies)});
        return t;
    }

    $scope.addDependency = function(){
        if (!$scope.details.version)
            return;
        $scope.buildFile.dependencies.push({ artifactId: $scope.details.artifactId,
                                    groupId:$scope.details.groupId,
                                    version: $scope.details.version.version,
                                    dependencies: $scope.details.dependencies})
        console.dir( ["details deps",$scope.details.dependencies])
        $scope.buildFile.transitiveDependencies = $scope.transitives()
    }



}

DependencyBuilderCtrl.$inject = ["$scope", "$resource", "$location"]

