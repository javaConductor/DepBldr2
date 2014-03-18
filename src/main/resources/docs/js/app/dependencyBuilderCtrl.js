
function DependencyBuilderCtrl($scope, $http, $q){

    $scope.buildFile = {
        dependencies : [],
         transitiveDependencies : []
    }

    $scope.details = {
        groupId:"org.springframework",
        artifactId:"spring",
        versions:[{version:'2.5.6'},{version:'2.0.6'}],
        dependencies:[]
    }
    $scope.categories = [{
        name:"Languages",
        artifacts:[
            {groupId:"org.scala-lang", artifactId:"scala-compiler"},
            {groupId:"org.scala-lang", artifactId:"scala-library"},
            {groupId:'org.codehaus.groovy',artifactId:'groovy-all'}
            ]},{
        name:"DB Driver",
        artifacts:[
            {groupId:"com.gmongo",artifactId:"gmongo"},
            {groupId:'mysql',artifactId:'mysql-connector-java'},
            {groupId:"org.mongodb",artifactId:"mongo-java-driver"},
            {groupId:"com.oracle",artifactId:"ojdbc14"}
            ]},{
        name:"ORM",
        artifacts:[
            {groupId:"org.mybatis",artifactId:"mybatis"},
            {groupId:"org.springframework",artifactId:"spring-ibatis"},
            {groupId:'org.javalite',artifactId:'activejdbc'},
            {groupId:"org.apache.openjpa",artifactId:"openjpa"},
            {groupId:"org.springframework",artifactId:"spring-jpa"},
            {groupId:"org.springframework.data",artifactId:"spring-data-neo4j-rest"},
            {groupId:"org.springframework",artifactId:"spring-hibernate2"},
            {groupId:"org.hibernate",artifactId:"hibernate-core"}
            ]},{
        name:"Parsers",
        artifacts:[
            {groupId:"com.esotericsoftware.yamlbeans",artifactId:"yamlbeans"},
            {groupId:"org.yaml",artifactId:"snakeyaml"},
            {groupId:"dom4j",artifactId:"dom4j"},
            {groupId:"xml-apis",artifactId:"xml-apis"},
            {groupId:"org.codehaus.jackson",artifactId:"jackson-mapper-asl"},
            {groupId:'org.json',artifactId:'json'},
            {groupId:"org.codehaus.jettison",artifactId:"jettison"},
            {groupId:"com.fasterxml.jackson.core",artifactId:"jackson-core"}
            ]},{
        name: "Spring Framework",
        artifacts:[
            {groupId:"org.springframework", artifactId:"spring-core"},
            {groupId:"org.springframework", artifactId:"spring-context"},
            {groupId:"org.springframework", artifactId:"spring-context"},
            {groupId:"org.springframework", artifactId:"spring-beans"},
            {groupId:"org.springframework", artifactId:"spring-web"},
            {groupId:"org.springframework", artifactId:"spring-webmvc"},
            {groupId:"org.springframework", artifactId:"spring"}
            ]},{
        name: "Spring Security Framework",
        artifacts:[
            {groupId:"org.springframework.security", artifactId:"spring-security-cas"},
            {groupId:"org.springframework.security", artifactId:"spring-security-cas-client"},
            {groupId:"org.springframework.security", artifactId:"spring-security-config"},
            {groupId:"org.springframework.security", artifactId:"spring-security-core"},
            {groupId:"org.springframework", artifactId:"spring-ldap"},
            {groupId:"org.springframework.security", artifactId:"spring-security-ldap"},
            {groupId:"org.springframework.ldap", artifactId:"spring-ldap"},
            {groupId:"org.springframework.ldap", artifactId:"spring-ldap-core"},
            {groupId:"org.springframework.security", artifactId:"spring-security-core-tiger"},
            {groupId:"org.springframework.security", artifactId:"spring-security-web"}
            ]}
    ]

    $scope.error = {
        message:""
    }

    var compareArtifacts = function(a, b){
       if (a.groupId < b.groupId)
           return -1;
       if (a.groupId > b.groupId)
           return 1;

       if (a.artifactId < b.artifactId)
           return -1;
       if (a.artifactId > b.artifactId)
           return 1;

       if (a.version < b.version)
           return -1;
       if (a.version > b.version)
           return 1;

       return 0;
   };


   var unique = function(arr, cmpFn){
       var nuList = [];
       arr.forEach(function(obj, idx){
        if(!nuList.some(function(nu){
            return (cmpFn(obj, nu) == 0);
        })){
            nuList.push(obj)
        }

       })
       return nuList;
   }

    $scope.transitives = function(){
        var t = [];
        $scope.buildFile.dependencies.forEach (function( dep){ t = t.concat(dep.dependencies)});
        t = unique(t, compareArtifacts);
        t = t.sort(compareArtifacts);
        return t;
    }

    $scope.addDependency = function(){
        if (!$scope.details.version)
            return;

        $scope.buildFile.dependencies.push({ artifactId: $scope.details.artifactId,
                groupId:$scope.details.groupId,
                version: $scope.details.version.version,
                dependencies: $scope.details.dependencies});

        $scope.buildFile.dependencies = unique($scope.buildFile.dependencies, compareArtifacts).sort(compareArtifacts)

        console.dir( ["details deps",$scope.details.dependencies]);
        $scope.buildFile.transitiveDependencies = $scope.transitives();
    }

    $scope.toggleDetails = function(artifact){
            $scope.details.versions = []
            $scope.details.dependencies = []
        if(artifact.artifactId== $scope.details.artifactId && artifact.groupId== $scope.details.groupId  ){
            // empty the details views
            $scope.details.artifactId = ""
            $scope.details.groupId=""
            return
        }

        $scope.populateDetails(artifact, $scope.details)
    }

    $scope.clearDetails = function(){
            // empty the details views
            $scope.details.artifactId = ""
            $scope.details.groupId=""
            $scope.details.versions = []
            $scope.details.dependencies = []
    }

//    $scope.restSvcVersion = $resource('/artifact/:groupId/:artifactId/versions', {isArray: true});
//    $scope.restSvcDeps = $resource('/artifact/:groupId/:artifactId/version/:version/dependencies', {isArray: true});

    $scope.populateDtlDependencies = function(){
        var groupId=$scope.details.groupId
        var artifactId = $scope.details.artifactId
        var version=$scope.details.version.version
        var deps = $http({method: 'GET', url: "/artifact/"+groupId+"/"+artifactId+"/version/"+version+"/dependencies"}).
            success(function(data, status, headers, config) {
                console.dir(["got deps for $scope.details.groupId:$scope.details.artifactId ", data])
                $scope.details.dependencies = data
            }).
            error(function(data, status, headers, config) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
                console.dir(["error getting deps for $scope.details.groupId:$scope.details.artifactId", data])
                        $scope.error.message = "status:$status message:$data"
            });
        }


    $scope.populateDetails = function(artifact, details){
            var groupId = artifact.groupId
            var artifactId = artifact.artifactId
            details.groupId = groupId
            details.artifactId = artifactId
            var url = "/artifact/"+groupId+"/"+artifactId+"/versions";
            $http({method: 'GET', url: url}).
                success(function(versions, status, headers, config) {
                     console.dir(["got versions for "+url, versions])
                     details.versions = versions.reverse()
                     details.version = details.versions[0]
                     $scope.populateDtlDependencies()
                }).
                error(function(data, status, headers, config) {
                    console.dir(["error getting versions for "+url, data])
                });
    }

}

DependencyBuilderCtrl.$inject = ["$scope", "$http", "$q"]

