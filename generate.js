(function(){
	var app = angular.module('generate', []);


	app.controller('GenerationController', ['$scope', function($scope){
		
		$scope.dayOffset = 5;
		$scope.generate.entries = []
		// $scope.minutes = 1000 * 60;
		// $scope.hours = $scope.minutes * 60;
		// $scope.days = $scope.hours * 24;
		// $scope.years = $scope.days * 365;
	

		$scope.generate.NightTime = {
			
		};
		$scope.generate.randomValue = 0;
		$scope.generate.nightDriving = false;
		$scope.generate.PageTotalMinsUnadjusted = 0;
		$scope.generate.PageTotalHrsUnadjusted = 0;
		$scope.generate.PageTotalMins= 0;
		$scope.generate.PageTotalHrs = 0;
		

		$scope.generate.NightPageTotalMinsUnadjusted = 0;
		$scope.generate.NightPageTotalHrsUnadjusted = 0;
		$scope.generate.NightPageTotalMins= 0;
		$scope.generate.NightPageTotalHrs = 0;

		$scope.generate.LastOdometer = 0;
		$scope.generate.isFirstEntry = true;

		$scope.generate.left = function(){
			console.log($scope.MasterDetails.Values);
			$scope.dayOffset++;

			millisecondOffset = $scope.dayOffset * 24 * 60 * 60 * 1000;
			//	var triptimel = 35 * minutes;
			var newent = {};
			var date = new Date($scope.MasterDetails.Values.startdate);// + millisecondOffset;
			newent.date = $scope.generate.millisToUTCDate(date.getTime() + millisecondOffset); 
			//console.log("inside entry genration");
			//	console.log(date.getTime() + millisecondOffset);

			//console.log(newent.date);
			var MAXDATE = new Date("01/01/2050");
			
			$scope.generate.randomValue = $scope.generate.randomOneandTen(); 
			$scope.generate.nightdriving();
			if($scope.generate.nightDriving === true){
				newent.starttime = $scope.generate.randomDate(newent.date, MAXDATE.getDate() + millisecondOffset, 18, 23);
			//	console.log(true);
			}
			else{
				newent.starttime = $scope.generate.randomDate(newent.date, MAXDATE.getDate() + millisecondOffset, 6, 18);
					//console.log(false);
					
			}



			var TRIPTIME = $scope.generate.randomOneandTen() * 10;
		//	console.log(TRIPTIME);
			var carSwitch = $scope.generate.randomOneandTen() * 10;
		//	console.log($scope.MasterDetails.Values.car["0"]);
			// if(carSwitch > 7){
			// 	newent.odStart = $scope.MasterDetails.Values.car["0"].odometer;//$scope.MasterDetails.Values.car[0].odometer;

			// 	newent.rego = "124fhh"//$scope.MasterDetails.Values.car[0].rego;

			// }
			// else {
			// 	// newent.odStart = $scope.MasterDetails.Values.car[0].odometer;
			// 	// newent.rego = $scope.MasterDetails.Values.car[0].rego;
			// }


			if($scope.generate.isFirstEntry === true){
				newent.odStart = $scope.MasterDetails.Values.cars[0].odometer;
				newent.odEnd = $scope.MasterDetails.Values.cars[0].odometer + ((TRIPTIME / 10 ) * 6);
				$scope.generate.isFirstEntry = false;
			}else
			{
				newent.odStart = $scope.generate.LastOdometer;
				newent.odEnd = $scope.generate.LastOdometer + ((TRIPTIME / 10 ) * 6);
			}



			$scope.generate.LastOdometer = newent.odEnd;

			
			newent.endtime = new Date(newent.starttime.getTime() + TRIPTIME * 60000);
			
			// console.log(newent.endtime);
			newent.triptime = new Date(Math.abs(newent.endtime.getTime()) - Math.abs(newent.starttime.getTime() ));
			// console.log(newent.triptime);



			if($scope.generate.nightDriving === true) {
				newent.nightDriving = new Date(newent.triptime.getTime());
				$scope.generate.NightPageTotalMinsUnadjusted += parseInt(newent.triptime.getUTCMinutes(),10) || 0;
				$scope.generate.NightPageTotalHrsUnadjusted += parseInt(newent.triptime.getUTCHours(), 10) || 0; 

			}
			else
			{
				newent.nightDriving = '-';
			}



			$scope.generate.PageTotalMinsUnadjusted += parseInt(newent.triptime.getUTCMinutes(),10) || 0;
			$scope.generate.PageTotalHrsUnadjusted += parseInt(newent.triptime.getUTCHours(), 10) || 0;


			  // modMins = Math.floor(PageTotalMins / 60);
			  // remainder = PageTotalMins % 60;

			  // console.log("hours in minutes count " + modMins);
			  // console.log("PageTotalMins " + PageTotalMins);
			  //  console.log("remaining mins " + remainder);



			  $scope.generate.calculateTotals();
			  newent.LineTotalmins = $scope.MasterDetails.Values.alldrivemins + $scope.generate.PageTotalMins;
			  newent.LineTotalhrs = $scope.MasterDetails.Values.alldrivehrs + $scope.generate.PageTotalHrs;

			  newent.NightLineTotalmins = $scope.MasterDetails.Values.alldrivemins + $scope.generate.NightPageTotalMins;
			  newent.NightLineTotalhrs = $scope.MasterDetails.Values.alldrivehrs + $scope.generate.NightPageTotalHrs;

			  $scope.generate.entries.push(newent);


			  // console.log(NightPageTotalhrs);
			  // console.log(NightLineTotalmins);



			  return newent;
		};


		$scope.generate.right = function(){
			var newent = {};
			newent.rego = $scope.MasterDetails.Values.cars[0].rego;
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

			if ($scope.generate.nightDriving === true){
				newent.light = {
					"day": false,
					"dawn": false,
					"night": true
				};
			}
			return newent;
		};

		$scope.generate.calculateTotals = function(){

			var modMins = Math.floor($scope.generate.PageTotalMinsUnadjusted / 60);
			var remainder = $scope.generate.PageTotalMinsUnadjusted % 60;
			$scope.generate.PageTotalHrs = $scope.generate.PageTotalHrsUnadjusted + modMins;
			$scope.generate.PageTotalMins = remainder;



			var NightModMins = Math.floor($scope.generate.NightPageTotalMinsUnadjusted / 60);
			var NightRemainder = $scope.generate.NightPageTotalMinsUnadjusted % 60;
			$scope.generate.NightPageTotalHrs = $scope.generate.NightPageTotalHrsUnadjusted + NightModMins;
			$scope.generate.NightPageTotalMins = NightRemainder;

		};


		$scope.generate.TimeTotals = function(){

			var PageTimeTotals = {
				'hours': "",
				'mins': "",
				'n_hours': "",
				'n_mins': ""
			};

			var InitalHours = $scope.MasterDetails.Values.alldrivehrs;
			var InitalMins = $scope.MasterDetails.Values.alldrivemins;
			var InitialNightMins = $scope.MasterDetails.Values.nightdrivemins;
			var InitalNightHours = $scope.MasterDetails.Values.nightdrivehrs;
				

			if($scope.isFirstEntry === true)
			{
				PageTimeTotals.hours = InitalHours;
				PageTimeTotals.mins = InitalMins;
				PageTimeTotals.n_mins = InitialNightMins;
				PageTimeTotals.n_hours = InitalNightHours;
				
			}
			else
			{
				PageTimeTotals.hours = InitalHours + $scope.generate.PageTotalHrs;
				PageTimeTotals.mins = InitalMins + $scope.generate.NightPageTotalMins
				PageTimeTotals.n_mins = InitialNightMins + $scope.generate.PageTotalMins;
				PageTimeTotals.n_hours = InitalNightHours + $scope.generate.NightPageTotalHrs;
			}	
			return PageTimeTotals;

		};

		$scope.generate.determineCar = function(){
			var carslength = Object.keys($scope.MasterDetails.Values.car).length;

			return Math.floor((Math.random() * 10) + 1);

		};


		$scope.generate.toUTCDate = function(date){
			var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			return _utc;
		};

		$scope.generate.millisToUTCDate = function(millis){
			return $scope.generate.toUTCDate(new Date(millis));
		};

		$scope.generate.randomDate = function(start, end, startHour, endHour) {
			var date = new Date(+start + Math.random() * (end - start));
			var hour = startHour + Math.random() * (endHour - startHour) | 0;
			date.setHours(hour);
			return $scope.generate.toUTCDate(date);
		};

		$scope.generate.nightdriving = function(){

			if($scope.generate.randomValue < 8 ){
				$scope.generate.nightDriving = false;
			}
			else{
				$scope.generate.nightDriving = true;
			}

		};

		$scope.generate.randomOneandTen = function(){
			return Math.floor((Math.random() * 10) + 1);
		};


	}]);

})();
