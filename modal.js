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

			    $scope.update = function(user) {
			        	$scope.MasterDetails.Values = angular.copy(user);
			        	$scope.CarCount.vals.splice(5,1);
			     		$scope.MasterDetails.Values.cars = angular.copy($scope.CarCount.vals);
			    };

			    $scope.submitForm = function(){
			      	$scope.submitted = true;
			      	$scope.MasterDetails.Values =  angular.copy($scope.user);
			    	$scope.CarCount.vals.splice(5,1); // remove empty object from end of arryay.
			     	$scope.MasterDetails.Values.cars = angular.copy($scope.CarCount.vals);
			      	if ($scope.mainform.$valid === true) $scope.showmodal = "modal";  //false on data toggle
			    };
	      }],
	      controllerAs: "modalForm"  
	  	};
  	});
})();