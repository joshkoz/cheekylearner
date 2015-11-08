(function(){
	var app = angular.module('carlist', []);


	app.controller('CarlistController', ['$scope', function($scope){
		
		$scope.CarCount.vals = [{
			'rego': "",
			'odometer': ""
		}];


		$scope.isVisible = function(val){
			if (val >= 5) return false; return true;
		};

		$scope.addField = function(index){
			if($scope.CarCount.vals.length == 4){
				
				$scope.CarCount.vals.push({'rego': "",'odometer': ""},{});
			}
			else if($scope.CarCount.vals.length > 4){

			}
			else{
				$scope.CarCount.vals.push({'rego': "",'odometer': ""});
			
			}
		};

		$scope.removeField = function(val){
			console.log(val);
			if($scope.CarCount.vals.length > 4){
				$scope.CarCount.vals.splice(5,1);	
				$scope.CarCount.vals.splice(val,1);
			}
			else{
				$scope.CarCount.vals.splice(val,1);	
				$scope.CarCount.vals.splice(5,1);			
			}
		};
		
	}]);

})();