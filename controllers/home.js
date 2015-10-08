myApp.controller("HomeController", function ($scope, $http) {
	function getLinks(){
        $http.get(tokenizedURL(ROOT_URL + '/api/recent_golinks')).
          success(function(data, status, headers, config){
            $scope.golinks = data;
          })
    }
    function addLink(key, url){
    	$scope.message = 'Setting pbl.link/'+key+' to redirect to '+url;
    }
    getLinks();
    $scope.message = "Welcome to PBL App";
    $scope.addGolink = function(){
    	addLink($scope.goKey, $scope.goURL);
    }
});