(function(){
	var app = angular.module('tabs', []);

	app.directive('tabpages', function(){
		return {
			scope: true,
			restrict: 'E',
			templateUrl: 'tabs.html',
			controller: ['$scope', function($scope){
				$scope.pageCount = 1;
				$scope.entryCount = 0;
				$scope.EntryLeft = {};
				$scope.EntryRight = {};
				$scope.showbutton = false;
				$scope.showinstance = false;
				$scope.instanceArr = [];

				$scope.globalformdata = {};
				$scope.entrydata = [];
				$scope.tab = 1;
				
				$scope.AllTime = {};
				$scope.AllTime.hours = [];
				$scope.AllTime.mins = [];

				$scope.NightTime = {};
				$scope.NightTime.hours = [];
				$scope.NightTime.mins = [];


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
					$scope.entryCount = 0;
					$scope.pageCount++;
					
					$scope.showbutton = false;
				};

				$scope.generatePage = function(){

					var hrs = $scope.MasterDetails.Values.alldrivehrs;
					var mins = $scope.MasterDetails.Values.alldrivemins;
					var nmins = $scope.MasterDetails.Values.nightdrivemins;
					var nhrs = $scope.MasterDetails.Values.nightdrivehrs;
					$scope.globalformdata = $scope.MasterDetails.Values;
					$scope.entrydata = $scope.generate.entries;
					if($scope.tab === 0)
					{
						$scope.AllTime.hours.push(hrs);
						$scope.AllTime.mins.push(mins);
						$scope.NightTime.hours.push(nhrs);
						$scope.NightTime.mins.push(nmins);
					}


				//	console.log($scope.pageCount);
					$scope.showbutton = true;
					for(i = 0; i < 14; i++)
					{
						$scope.addSingleEntry();
					}
					$scope.showinstance = true;
					//		console.log($scope.LeftPageEntries);
					//console.log($scope.entryCount);

					var prvH = $scope.generate.PageTotalHrs; 
					var prvM = $scope.generate.PageTotalMins;
					var NprvH = $scope.generate.NightPageTotalHrs;
					var NprvM = $scope.generate.NightPageTotalMins;

					console.log($scope.generate);
					console.log($scope.generate.randomValue);


					$scope.NightTime.hours.push(nhrs + NprvH);
					$scope.NightTime.mins.push(nmins + NprvM);
					$scope.AllTime.hours.push(hrs + prvH);
					$scope.AllTime.mins.push(mins + prvM);
					$scope.instanceArr.push(true);

				};

				$scope.addSingleEntry = function(){
					$scope.EntryLeft.add();
					$scope.EntryRight.add();
					$scope.entryCount++;
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
