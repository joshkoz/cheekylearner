// window.onbeforeunload = function(){
//   return 'Any generated entries and data will be lost if you leave.';
// };

(function(){
	var app = angular.module('gen', ["ui.bootstrap", 'pages', 'modal', 'generate']);


	app.controller('AppController', ['$scope', '$uibModal', function($scope, $uibModal){
		
		$scope.showall = false;	
		$scope.generate = {};
		$scope.MasterDetails = {};

		$scope.launched = function(){
			$scope.showall = true;
		};

	}]);

})();