(function(){
	var app = angular.module('generate', []);

	app.controller('GenerationController', ['$scope', function($scope){
		
		$scope.dayOffset = 5;
		$scope.nightTime = false;
		$scope.isFirstEntry = true;
		$scope.RawTotals = {};
		$scope.Totals = {};
		$scope.currentCar = {};
		$scope.CarValues = [];

		$scope.generate.right = function(){
			var newent = {};
			newent.rego = $scope.currentCar.rego;
			newent.parking = true;

			newent.traffic = {
				"light": true,
				"moderate": true,
				"heavy": false
			};

			newent.weather = {
				"dry": true,
				"wet": false
			};

			newent.road = {
				"local": true,
				"main": true,
				"heavy": false,
				"inner": false,
				"freeway": true,
				"rurulhwy": false,
				"rurulother": false,
				"gravel": false
			};

			newent.light = {
				"day": true,
				"dawn": true,
				"night": false
			};

			if ($scope.nightTime === true){
				newent.light = {
					"day": false,
					"dawn": false,
					"night": true
				};
			}
			return newent;
		};

		$scope.generate.init = function(){
			$scope.CarValues = angular.copy($scope.MasterDetails.Values.cars);
		};

		$scope.generate.left = function(){

			/*
				Set a random trip duration and day or night value from the getRandom closure.
			*/
			$scope.TripDuration = $scope.getRandom.tripDuration();
			$scope.nightTime = $scope.getRandom.isNight();

			/*
				Create a new entry.
			*/
			var NewEntry = {};

			
			/*
				Uses the getRandom closure to get a random start date and start time. These are then used to
				calulate the other entry values.
			*/
			NewEntry.date = $scope.getRandom.date();
			NewEntry.starttime = $scope.getRandom.startTime($scope.nightTime, NewEntry.date);
			NewEntry.endtime = new Date(NewEntry.starttime.getTime() + $scope.TripDuration * 60000),
			NewEntry.triptime = new Date(Math.abs(NewEntry.endtime.getTime()) - Math.abs(NewEntry.starttime.getTime() )) 
			NewEntry.nightDriving = $scope.nightTime ? new Date(NewEntry.triptime.getTime()) : '-';
			
			/*
				Sets up, calulates then sets the Totals for all and night driving then sets it gives these
				values to the entry.
			*/
			$scope.TotalTimes.init(NewEntry);
			$scope.TotalTimes.setPageTotals(NewEntry);		
			$scope.TotalTimes.calculate($scope.nightTime, NewEntry.triptime);
			$scope.TotalTimes.setLineTotals(NewEntry);
			
			/*
				Get a random car from the list and use it for this entry.
			*/
			$scope.currentCar = $scope.getRandom.car();
			NewEntry.odStart = $scope.currentCar.odometer;
			$scope.currentCar.odometer += (($scope.TripDuration / 10 ) * 6);
			NewEntry.odEnd = $scope.currentCar.odometer;
			//NewEntry.odend = 

			/*
				After the entry has been generated make sure subsequent entries know they are not the first
				by setting isFistEntry to false. Then return the entry.
			*/
			$scope.isFirstEntry = false;
			return NewEntry;
		};

		/*
			This closure contains the functions and logic to calulate and set the entry and page totals.
		*/
		$scope.TotalTimes = (function(){
			return{
				init: function(entry){
					entry.TimeTotals = {};
					if($scope.isFirstEntry){
						$scope.RawTotals = {
							'n_mins': $scope.MasterDetails.Values.nightdrivemins,
							'n_hrs':  $scope.MasterDetails.Values.nightdrivehrs,
							'hrs': $scope.MasterDetails.Values.alldrivehrs,
							'mins': $scope.MasterDetails.Values.alldrivemins
						};
						$scope.Totals = {
							'n_mins': $scope.MasterDetails.Values.nightdrivemins,
							'n_hrs':  $scope.MasterDetails.Values.nightdrivehrs,
							'hrs': $scope.MasterDetails.Values.alldrivehrs,
							'mins': $scope.MasterDetails.Values.alldrivemins
						};
					}
				},
				calculate: function(nightTime, trip){
					$scope.Totals.hrs = $scope.RawTotals.hrs + Math.floor(($scope.RawTotals.mins + (parseInt(trip.getUTCMinutes(),10) || 0) )  / 60) + (parseInt(trip.getUTCHours(), 10) || 0);
					$scope.Totals.mins = ($scope.RawTotals.mins + (parseInt(trip.getUTCMinutes(),10) || 0)) % 60;
					
					if(nightTime){
						$scope.Totals.n_hrs = $scope.RawTotals.n_hrs + Math.floor(($scope.RawTotals.n_mins + (parseInt(trip.getUTCMinutes(),10) || 0) ) / 60) + (parseInt(trip.getUTCHours(), 10) || 0);
						$scope.Totals.n_mins = ($scope.RawTotals.n_mins + (parseInt(trip.getUTCMinutes(),10) || 0)) % 60;
					}
					$scope.RawTotals.n_mins = $scope.Totals.n_mins;
					$scope.RawTotals.n_hrs = $scope.Totals.n_hrs;
					$scope.RawTotals.mins = $scope.Totals.mins;
					$scope.RawTotals.hrs = $scope.Totals.hrs;
				},
				setLineTotals: function(line){
					line.LineTotalmins = $scope.Totals.mins;
					line.LineTotalhrs =  $scope.Totals.hrs;
					line.NightLineTotalmins = $scope.Totals.n_mins;
					line.NightLineTotalhrs = $scope.Totals.n_hrs;
				},
				setPageTotals: function(page){
					page.TimeTotals.hrs = $scope.RawTotals.hrs;
					page.TimeTotals.mins = $scope.RawTotals.mins;
					page.TimeTotals.n_hrs = $scope.RawTotals.n_hrs;
					page.TimeTotals.n_mins = $scope.RawTotals.n_mins;
				}

			};
		})();

		$scope.getRandom = (function(){

			var MAXDATE = new Date("01/01/2050");
			//requires $scope.dayoffset
			return {
				date: function(){
					$scope.dayOffset += $scope.randomOneandN(4);

					var startDate = new Date($scope.MasterDetails.Values.startdate);
					var millisecondOffset = $scope.dayOffset * 24 * 60 * 60 * 1000;

					return $scope.toUTCDate(new Date(startDate.getTime() + millisecondOffset));

				},
				startTime: function(isNight, startDate){

					function randomDate(start, end, startHour, endHour) {
						var date = new Date(+start + Math.random() * (end - start));
						var hour = startHour + Math.random() * (endHour - startHour) | 0;
						date.setHours(hour);
						return $scope.toUTCDate(date);
					};

					var endDate = MAXDATE.getDate() + $scope.dayOffset * 24 * 60 * 60 * 1000;;
					if(isNight)
						return randomDate(startDate, endDate, 16, 19);
					else
						return randomDate(startDate, endDate, 4, 16);
				},
				isNight: function(){
					if($scope.randomOneandN(10) < 8 ){
						return false;
					}
					return true;	
				},
				car: function(){
					var numberOfCars = $scope.CarValues.length;
					var carNo = $scope.randomOneandN(numberOfCars);
					return $scope.CarValues[carNo];
				},
				tripDuration: function(){
					return Math.floor((Math.random() * 10) + 1) * 10; // TODO: create a better trip duration calcualtion.
				}
			};
		})();

	
		/*
			Auxillary functions.
		*/
		$scope.toUTCDate = function(date){
			var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			return _utc;
		};

		$scope.randomOneandN = function(N){
			return Math.floor(Math.random() * N);
		};


	}]);

})();
