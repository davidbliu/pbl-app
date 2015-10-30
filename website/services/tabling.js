app.service("TablingService",  function($http) {
	var serviceInstance = {};
	serviceInstance.getTablingSchedule = function(callback){
		$http.get(tokenizedURL(ROOT_URL+'/api/tabling_schedule'))
			.success(function(data){
				callback(data);
			});
	};
	serviceInstance.timeString = function(time){
		return timeToString(time);
	}
	serviceInstance.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	serviceInstance.tablingDays = [0,1,2,3,4];
	serviceInstance.getDay = function(time){
		return Math.floor(time/24);
	}
	return serviceInstance;
});

/**
* Tabling Utils
*/
function timeToString(time){
	return dayString(time) + " at "+hourString(time);
}
function hourString(time){
	t = (time % 24) % 12;
	if(t==0){
		t = 12;
	}
	return t.toString()+':00';
}
function dayString(time){
	days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	return days[Math.floor(time / 24)];
}