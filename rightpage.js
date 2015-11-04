(function(){
	var app = angular.module('rightpage', []);


	app.filter('true_false', function() {
	    return function(text, length, end) {
	        if (text) {
	            return "T";
	        }
	        return '';
	    }
	});


	app.directive('rightLogpage', function(){
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'right-page.html',
			controller: ['$scope', function($scope){
				
				$scope.RightPageEntries = [];
				this.rego = 'ohg254';


				$scope.EntryRight.add = function() {

					// for (i =0; i < 14; i++)
					// {
						if(	$scope.RightPageEntries.length < 14){
						
							var entry = getNewRightPageEntry();

							$scope.RightPageEntries.push(entry);
						}


				//	} 
					
				};

				$scope.EntryRight.clear = function() {
					$scope.RightPageEntries = [];
				};
			}],
			controllerAs: 'rightlogpage'
		};
	});

})();