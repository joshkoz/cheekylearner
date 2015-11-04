(function(){
	var app = angular.module('leftpage', []);

	

	app.directive('leftLogpage', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'left-page.html',
			controller: ['$scope', function($scope){
				this.testoutput = 1;
				this.hours = 120;
				this.mins = 56;
				//$scope.allEntries = entries;
				$scope.LeftPageEntries = [];
				
				$scope.EntryLeft.add = function() {

					// for (i =0; i < 14; i++)
					// {
						if(	$scope.LeftPageEntries.length < 14){
						
							var entry = getNewLeftPageEntry();
			
							$scope.LeftPageEntries.push(entry);
						}
						// } 
					
				};
				$scope.EntryLeft.clear = function(){
					$scope.LeftPageEntries = [];
				};

				this.generate = function(){
					this.testoutput = this.testoutput + 1;
				};


			}],
			controllerAs: 'entry'
		}
	});


	var entries = [
	{
		date: Date.now(),
		time: 4
	},
	{
		date: Date.now(),
		time: 5

	},
	{
		date: Date.now(),
		time: 6

	},
	{
		date: Date.now(),
		time: 7

	}
	];
})();
