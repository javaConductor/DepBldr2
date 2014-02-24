

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

    $scope.error = {
        message:""
    }

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

    $scope.toggleDetails = function(artifact){
        if(artifact.artifactId== $scope.details.artifactId && artifact.groupId== $scope.details.groupId  ){
            // empty the details views
            $scope.details.artifactId = ""
            $scope.details.groupId=""
            $scope.details.versions = []
            $scope.details.dependencies = []
            return
        }

        $scope.populateDetails(artifact, $scope.details)
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
                     details.versions = versions
                }).
                error(function(data, status, headers, config) {
                    console.dir(["error getting versions for "+url, data])
                });
    }

}


DependencyBuilderCtrl.$inject = ["$scope", "$http", "$q"]

