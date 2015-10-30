app.controller('TablingController', function($scope, $http, TablingService, MemberService) {
    function init(){
    	MemberService.getMemberHash(function(data){
    		$scope.memberHash = data;
    		TablingService.getTablingSchedule(function(ts){
    			tablingSchedule = {};
    			days = [];
    			for (var i=0;i<ts.length;i++){
    				slot = ts[i];
    				day = TablingService.getDay(slot.time);
    				if(days.indexOf(day) == -1){
    					tablingSchedule[day] = [];
    					days.push(day);
    				}
    				tablingSchedule[day].push(slot);
    			}
    			$scope.tablingSchedule = tablingSchedule;
    			//allows separating tabling days
    			$scope.tablingDays = TablingService.tablingDays; //[0,1,2,3,4];
    			$scope.dayNames = TablingService.dayNames;
    		})
    	});
    	$scope.timeString = function(time){
    		return TablingService.timeString(time);
    	}
    	$scope.getDay = function(time){
    		return TablingService.getDay(time);
    	}
    	$scope.dayMatches = function(day){
    		return function(item){
    			if(day == TablingService.getDay(item.time)){
    				return true;
    			}
    			return false;
    		};
    	}
    	
    }
	init();
});