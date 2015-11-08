(function(){
	var app = angular.module('leftpage', ['generate']);

	app.directive('leftLogpage', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'left-page.html',
			controller: ['$scope', function($scope){

				$scope.LeftPageEntries = [];
				
				$scope.EntryLeft.add = function() {

					if(	$scope.LeftPageEntries.length < 14){
						
						var entry = $scope.generate.left();

						$scope.LeftPageEntries.push(entry);
					}							
				};

				$scope.EntryLeft.clear = function(){
					$scope.LeftPageEntries = [];
				};

			}],
			controllerAs: 'entry'
		}
	});

})();
