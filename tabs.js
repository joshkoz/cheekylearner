(function(){
	var app = angular.module('tabs', []);

	app.directive('tabpages', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'tabs.html',
			controller: ['$scope', function($scope){
				
				$scope.EntryLeft = {};
				$scope.EntryRight = {};

				$scope.pageCount = 1;
				$scope.showbutton = false;
				$scope.showinstance = false;
				$scope.instanceArr = [];

				$scope.globalformdata = {};
				$scope.entrydata = [];
				$scope.tab = 1;
				
				$scope.AllTime = {
					'hours': [],
					'mins': []
				};

				$scope.NightTime = {
					'hours': [],
					'mins': []
				};

				this.selectTab = function(setTab){
					$scope.tab = setTab;
					
					if ($scope.instanceArr[$scope.tab] === true){
						$scope.showinstance = true;
						console.log($scope.instanceArr);			
					}
					else
					{
						$scope.showinstance = false;
						
					}
				};
				

				$scope.clearPage = function(){
					$scope.EntryLeft.clear();
					$scope.EntryRight.clear();
				};

				$scope.addPage = function(){
					$scope.pageCount++;
					$scope.showbutton = false;

				};
			
				$scope.generatePage = function(){

					var InitalHours = $scope.MasterDetails.Values.alldrivehrs;
					var InitalMins = $scope.MasterDetails.Values.alldrivemins;
					var InitialNightMins = $scope.MasterDetails.Values.nightdrivemins;
					var InitalNightHours = $scope.MasterDetails.Values.nightdrivehrs;
				

					if($scope.tab === 0)
					{
						$scope.AllTime.hours.push(InitalHours);
						$scope.AllTime.mins.push(InitalMins);
						$scope.NightTime.hours.push(InitalNightHours);
						$scope.NightTime.mins.push(InitialNightMins);
					}
					else
					{
						$scope.NightTime.hours.push(InitalNightHours + $scope.generate.NightPageTotalHrs);
						$scope.NightTime.mins.push(InitialNightMins + $scope.generate.PageTotalMins);
						$scope.AllTime.hours.push(InitalHours + $scope.generate.PageTotalHrs);
						$scope.AllTime.mins.push(InitalMins + $scope.generate.NightPageTotalMins);
					}

					for(i = 0; i < 14; i++)
					{
						$scope.addSingleEntry();
					}
					$scope.showinstance = true;
					$scope.showbutton = true;
					

					
					$scope.instanceArr.push(true);

				};

				$scope.addSingleEntry = function(){
					$scope.EntryLeft.add();
					$scope.EntryRight.add();
				};
				$scope.getPageCount= function() {
				    return new Array($scope.pageCount);   
				}

				this.isSelected = function(checkTab) {
					return checkTab === $scope.tab;
				};	
			}],
			controllerAs: 'tabs'
		};
	});

})();
