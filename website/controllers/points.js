app.controller('PointsController', function($scope, $http) {
    function comparePoints(a,b,p){
        if(p[a.email] < p[b.email]){
            return 1;
        }
        return -1;
    }
    function getPoints(){
        $http.get(tokenizedURL(ROOT_URL + '/api/points')).
            success(function(data){
                $scope.points = data;
                // run the super duper points methods
                pointCommitteeHash = {};
                seenCommittees = [];
                pointHash = {};
                chairs = [];
                cms = [];
                for(var i=0;i<data.length;i++){
                    p = data[i];
                    m = $scope.memberHash[p.email]; // may not be in hash
                    pointHash[p.email] = p.points;
                    if(m.position == 'chair'){
                        chairs.push(m);
                    }
                    else{
                        cms.push(m);
                    }
                	
                	if(seenCommittees.indexOf(m.committee) == -1){
                		pointCommitteeHash[m.committee] = [];
                        seenCommittees.push(m.committee);
                	}
                	pointCommitteeHash[m.committee].push(p.points);
                }
                // convert the committee hash to average points
                var committeePoints = {}
                for(var i=0;i<seenCommittees.length;i++){
                    c = seenCommittees[i];
                    committeePoints[c] = pointCommitteeHash[c].reduce(function(a,b){return a+b}) / pointCommitteeHash[c].length;
                }
                $scope.pointCommitteeHash = committeePoints;
                $scope.committees = Object.keys(pointCommitteeHash).sort(function(a,b){
                	if(committeePoints[a]>committeePoints[b]){
                		return -1;
                	}
                	else if(committeePoints[a]<committeePoints[b]){
                		return 1;
                	}
                	return 0;
                });


                // set scope
                $scope.pointHash = pointHash;
                $scope.chairs = chairs.sort(function(a,b){ return comparePoints(a,b,pointHash)});
                $scope.cms = cms.sort(function(a,b){ return comparePoints(a,b, pointHash)});
            });
    }
    function getMemberPoints(){
        $http.get(tokenizedURL(ROOT_URL + '/api/member_hash')).
            success(function(data){
                $scope.memberHash = data;
                getPoints();
            });
    }

    function init(){
        getMemberPoints();
    }
    init();
    $scope.message = 'hi';
});