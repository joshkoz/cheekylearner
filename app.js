



(function(){
	var app = angular.module('gen', ["ui.bootstrap", 'leftpage', 'tabs','rightpage', 'modal']);


	app.controller('TableController', ['$scope', '$uibModal', function($scope, $uibModal){
		
		$scope.showall = false;	

		$scope.launched = function(){
			$scope.showall = true;
			//$(#content).css("background-color", "#EEE");
		};

	}]);

})();
