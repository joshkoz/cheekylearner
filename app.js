(function(){
	var app = angular.module('gen', ["ui.bootstrap", 'leftpage', 'tabs','rightpage', 'modal', 'generate']);


	app.controller('TableController', ['$scope', '$uibModal', function($scope, $uibModal){
		
		$scope.showall = false;	
		$scope.generate = {};
		$scope.MasterDetails = {};
		
		$scope.launched = function(){
			$scope.showall = true;
		};

	}]);

})();
