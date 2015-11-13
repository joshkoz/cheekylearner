(function(){
	var app = angular.module('generate', []);

	/*
		NOTE:  
		If you want to change offsets or hours of the day or the multiude of other variables it 
		should only need to occur in the getRandom closure and the init function.
	*/
	app.controller('GenerationController', ['$scope', function($scope){
		
		$scope.dayOffset = 0;
		$scope.nightTime = false;
		$scope.isFirstEntry = true;
		$scope.RawTotals = {};
		$scope.Totals = {};
		$scope.currentCar = {};
		$scope.CarValues = [];

		$scope.TimeofDay;
		

		/*
			Funtion used to initalise anything the generator needs set before it starts generating.
		*/
		$scope.generate.init = function(){
			$scope.CarValues = angular.copy($scope.MasterDetails.Values.cars);
			$scope.dayOffset = 5;
		};

		/*
			Creates a new entry and generates psuedorandom values for it.
			Returns the entry
		*/
		$scope.generate.left = function(){

			/* 	Set a random trip duration and day or night value from the getRandom closure. */
			$scope.TripDuration = $scope.getRandom.tripDuration();
			$scope.nightTime = $scope.getRandom.isNight();

			/*	Create a new entry.	*/
			var NewEntry = {};

			/*	Uses the getRandom closure to get a random start date and start time. These are then used to
				calulate the other entry values.	*/
			NewEntry.date = $scope.getRandom.date();
			NewEntry.starttime = $scope.getRandom.startTime($scope.nightTime, NewEntry.date);
			$scope.TimeofDay = NewEntry.starttime;

			NewEntry.endtime = new Date(NewEntry.starttime.getTime() + $scope.TripDuration * 60000),
			NewEntry.triptime = new Date(Math.abs(NewEntry.endtime.getTime()) - Math.abs(NewEntry.starttime.getTime() )) 
			NewEntry.nightDriving = $scope.nightTime ? new Date(NewEntry.triptime.getTime()) : '--';
			
			/*	Sets up, calulates then sets the Totals for all and night driving then sets it gives these
				values to the entry. */
			$scope.TotalTimes.init(NewEntry);
			$scope.TotalTimes.setPageTotals(NewEntry);		
			$scope.TotalTimes.calculate($scope.nightTime, NewEntry.triptime);
			$scope.TotalTimes.setLineTotals(NewEntry);
			
			/*	Get a random car from the list and use it for this entry. */
			$scope.currentCar = $scope.getRandom.car();
			NewEntry.odStart = $scope.currentCar.odometer;
			$scope.currentCar.odometer += (($scope.TripDuration / 10 ) * 6);
			NewEntry.odEnd = $scope.currentCar.odometer;
		
			/*	After the entry has been generated make sure subsequent entries know they are not the first
				by setting isFistEntry to false. Then return the entry.	*/
			$scope.isFirstEntry = false;
			return NewEntry;
		};


		/*
			Creates a new entry and generates psuedorandom values for it.
			Returns the entry.
		*/
		$scope.generate.right = function(){
			var NewEntry = {};
			NewEntry.rego = $scope.currentCar.rego;
			NewEntry.parking = $scope.getRandom.parking();

			NewEntry.traffic = $scope.getRandom.traffic();

			NewEntry.weather = $scope.getRandom.weather();

			NewEntry.road = $scope.getRandom.road();
			console.log(NewEntry.road);


			var dawnOrDusk = $scope.TimeofDay.getUTCHours();
			if(dawnOrDusk > 6 && dawnOrDusk < 8){
				NewEntry.light = {"day": true,"dawn": true,"night": false};
			}
			else if(dawnOrDusk > 17 && dawnOrDusk < 19){				
				NewEntry.light = {"day": false,"dawn": true,"night": true};
			}
			else if ($scope.nightTime){
				NewEntry.light = {"day": false,"dawn": false,"night": true};
			}
			else{
				NewEntry.light = {"day": true,"dawn": false,"night": false};	
			}

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

		/*
			The getRandom closure. This contains functions that return random values of the types requested.
			All direct random generation should come through this closure.
			Any values that need to be modified
		*/
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

					var endDate = MAXDATE.getDate() + $scope.dayOffset * 24 * 60 * 60 * 1000;
					return (isNight) ? randomDate(startDate, endDate, 16, 19) : randomDate(startDate, endDate, 4, 16);
				},
				isNight: function(){
					return ($scope.randomOneandN(10) < 8 ) ? false : true;	
				},
				car: function(){
					var numberOfCars = $scope.CarValues.length;
					var carNo = $scope.randomOneandN(numberOfCars);
					return $scope.CarValues[carNo];
				},
				tripDuration: function(){
					return Math.floor((Math.random() * 10) + 1) * 10; // TODO: create a better trip duration calcualtion.
				},
				traffic: function(){
					var trafficProbability = Math.floor((Math.random() * 3) + 1);
					switch(trafficProbability){
						case 1:
							return {"light": true, "moderate": false,"heavy": false};
							break;
						case 2:
							return {"light": false, "moderate": true,"heavy": false};
							break;
						case 3:
							return {"light": false, "moderate": false,"heavy": true};
							break;
						default:
							alert("An error has occured when calculating the traffic probability!");
					}
				},
				parking: function(){
					var parkingProbability = Math.floor((Math.random() * 5) + 1);
					return (parkingProbability > 3) ? false: true;
				},
				weather: function(){
					var weatherProability = Math.floor((Math.random() * 10) + 1);
					return (weatherProability <= 8) ? {"dry": true, "wet": false} : {"dry": false, "wet": true};
				},
				road: function(){
					var roadProbability1 = Math.floor((Math.random() * 3) + 1);
					var roadProbability2 = Math.floor((Math.random() * 10) + 1);

					var road = {"local": true, "main": true};
					road.inner = (roadProbability1  < 3) ? false : true;
					road.freeway = (roadProbability1  < 3) ? false : true;
					road.rurulhwy = (roadProbability2  < 8) ? false : true;
					road.rurulother = (roadProbability2  < 9) ? false : true;
					road.gravel = (roadProbability2  < 10) ? false : true;
					return road;
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
