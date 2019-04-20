(function(){
	var app = angular.module('modal',["ui.bootstrap"]);

	app.directive('modal', function () {
	    return {
	      templateUrl: 'modal.html',
	      restrict: 'E',
	      scope: true,
	      controller: ['$scope', function($scope){
	      	
				$scope.CarCount = {};
				$scope.submitted = false;
				$scope.showmodal = "true";
				$scope.MasterDetails.Values = {};

			    $scope.submitForm = function(){
			    	$scope.CarCount.vals.splice(5,1); // remove empty object from end of arryay.
			      	$scope.submitted = true;
			      	$scope.MasterDetails.Values =  angular.copy($scope.user);
			     	$scope.MasterDetails.Values.cars = angular.copy($scope.CarCount.vals);
			      	if ($scope.mainform.$valid === true) $scope.showmodal = "modal";  //false on data toggle
			    };
	      }],
	      controllerAs: "modalForm"  
	  	};
  	});

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
				//Do nothing
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