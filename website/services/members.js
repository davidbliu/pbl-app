app.service("MemberService",  function($http) {
	var serviceInstance = {};
	serviceInstance.getMemberHash = function(callback){
		$http.get(tokenizedURL(ROOT_URL+'/api/member_hash'))
			.success(function(data){
				callback(data);
			});
	};
	return serviceInstance;
});
