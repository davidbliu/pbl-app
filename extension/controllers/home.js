myApp.controller("HomeController", function ($scope, $http) {
	function getLinks(){
        $http.get(tokenizedURL(ROOT_URL + '/api/recent_golinks')).
          success(function(data, status, headers, config){
            $scope.golinks = data;
          })
    }
    function getMyLinks(){
        $http.get(tokenizedURL(ROOT_URL + '/api/contributions?email='+encodeURIComponent(email))).
          success(function(data, status, headers, config){
            $scope.myLinks = data;
          })
    }
    function lookupURL(url){
        $http.get(tokenizedURL(ROOT_URL + '/api/url_lookup?url='+encodeURIComponent(url))).
          success(function(data, status, headers, config){
            $scope.urlMatches = data;
          })
    }

    //get url
    chrome.tabs.getSelected(null,function(tab) {
        $scope.goURL = tab.url;
        $scope.goKey = tab.title;
        lookupURL(tab.url);
    });

    $scope.addGolink = function(keyEvent){
        if (keyEvent.which === 13)
        {
            $scope.adding = true;
            key = $scope.goKey;
            url = $scope.goURL;
            $scope.message = 'Setting pbl.link/'+key+' to redirect to '+url;
            //ajax request to save the golink
            $.ajax({
                url: tokenizedURL(ROOT_URL+'/api/add_golink'),
                type: 'POST',
                data: {'key': key, 'url':url, 'email': email},
                success:function(data){
                    console.log(data);
                    $scope.message = data.golink.key + ' has been added!';
                    $scope.undoID = data.id;
                    $scope.$digest();
                }
              });
        }
      }
    $scope.undoAdd = function(id){
        $http.post(tokenizedURL(ROOT_URL+'/api/delete_golink?id='+id)).
            success(function(data, status, headers, config){
                $scope.goKey = '';
                $scope.message = 'Your link has been undone';
                $scope.undoID = null;
            });
    }
    getMyLinks()
    getLinks();
});