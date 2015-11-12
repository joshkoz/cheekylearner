(function(){
	var app = angular.module('pages', ['generate']);

	app.directive('bookPages', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'pages.html',
			controller: ['$scope', function($scope){
			
				$scope.showbutton = false;
				$scope.pages = [];
				$scope.activePage;

				$scope.RightPageEntries = [];
				$scope.LeftPageEntries = [];
			
			
				$scope.generateInitalPage = function(){

					$scope.pages.push(true);
					$scope.activePage = 0;	
					$scope.showbutton = true;	
					$scope.addNEntries(14);
				};

				$scope.addNEntries = function(val){

					$scope.RightPageEntry = [];
					$scope.LeftPageEntry = [];

					$scope.LeftPageEntry.push($scope.generate.TimeTotals());
					for(i = 0; i < val; i++)
					{
						$scope.LeftPageEntry.push($scope.generate.left());
						$scope.RightPageEntry.push($scope.generate.right());
					}			
					$scope.RightPageEntries.push($scope.RightPageEntry);
					$scope.LeftPageEntries.push($scope.LeftPageEntry);	
				};
			

				$scope.selectPage = function(setPage){
					$scope.activePage = setPage;
			
				};

				$scope.addPage = function(){
					$scope.pages.push(true);
					$scope.selectPage($scope.pages.length - 1);
					$scope.addNEntries(14);

				};
				$scope.isSelected = function(checkPage) {
					return checkPage === $scope.activePage;
				};	

			}],
			controllerAs: 'tabs'
		};
	});

	app.directive('leftLogpage', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'left-page.html'
		}
	});

	app.directive('rightLogpage', function(){
			return {
				restrict: 'E',
				scope: true,
				templateUrl: 'right-page.html'
			};
		});

	app.filter('true_false', function() {
		return function(text, length, end) {
			if (text) {
				return "T";
			}
			return '';
		}
	});

})();

