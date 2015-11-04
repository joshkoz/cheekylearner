

time = 200000;
mydate = new Date();
mydate.setDate(mydate.getDate());
entries = [];

//offsets
minutes = 1000 * 60;
hours = minutes * 60;
days = hours * 24;
years = days * 365;
formMasterDetails = {};

dayOffset = 20; //LMAO
window.setTimeout(getNewRightPageEntry,1000);
window.setTimeout(getNewLeftPageEntry,1000);

window.setTimeout(randomOneandTen,1000);

num = 0;
nightDriving = false;
PageTotalMinsUnadjusted = 0;
PageTotalhrsUnadjusted = 0;
PageTotalMins= 0;
PageTotalhrs = 0;
LineTotalhrs = 0;
LineTotalmins = 0;

NightPageTotalMinsUnadjusted = 0;
NightPageTotalhrsUnadjusted = 0;
NightPageTotalMins= 0;
NightPageTotalhrs = 0;
NightLineTotalhrs = 0;
NightLineTotalmins = 0;

LastOdometer = 0;
first = true;

function getNewLeftPageEntry(){

	dayOffset++;

	millisecondOffset = dayOffset * 24 * 60 * 60 * 1000;
//	var triptimel = 35 * minutes;
	var newent = {};
	var date = new Date(formMasterDetails.startdate);// + millisecondOffset;
	newent.date = millisToUTCDate(date.getTime() + millisecondOffset); 
	//console.log("inside entry genration");
//	console.log(date.getTime() + millisecondOffset);

	//console.log(newent.date);
	var MAXDATE = new Date("01/01/2050");
	
	num = randomOneandTen(); 
	nightdriving();
	if(nightDriving === true){
		newent.starttime = randomDate(newent.date, MAXDATE.getDate() + millisecondOffset, 18, 23);
	//	console.log(true);
	}
	else{
		newent.starttime = randomDate(newent.date, MAXDATE.getDate() + millisecondOffset, 6, 18);
		//console.log(false);
		
	}



	var TRIPTIME = randomOneandTen() * 10;
	console.log(TRIPTIME);
	var carSwitch = randomOneandTen() * 10;
	console.log(formMasterDetails.car["0"]);
	// if(carSwitch > 7){
	// 	newent.odStart = formMasterDetails.car["0"].odometer;//formMasterDetails.car[0].odometer;

	// 	newent.rego = "124fhh"//formMasterDetails.car[0].rego;

	// }
	// else {
	// 	// newent.odStart = formMasterDetails.car[0].odometer;
	// 	// newent.rego = formMasterDetails.car[0].rego;
	// }

	
	if(first === true){
		newent.odStart = formMasterDetails.car["0"].odometer;
		newent.odEnd = formMasterDetails.car["0"].odometer + ((TRIPTIME / 10 ) * 6);
		first = false;
	}else
	{
		newent.odStart = LastOdometer;
		newent.odEnd = LastOdometer + ((TRIPTIME / 10 ) * 6);
	}

	
	
	LastOdometer = newent.odEnd;

	
	 newent.endtime = new Date(newent.starttime.getTime() + TRIPTIME * 60000);
	
	// console.log(newent.endtime);
	 newent.triptime = new Date(Math.abs(newent.endtime.getTime()) - Math.abs(newent.starttime.getTime() ));
	// console.log(newent.triptime);

	

	 if(nightDriving === true) {
	 	newent.nightDriving = new Date(newent.triptime.getTime());
	 	NightPageTotalMinsUnadjusted += parseInt(newent.triptime.getUTCMinutes(),10) || 0;
	  	NightPageTotalhrsUnadjusted += parseInt(newent.triptime.getUTCHours(), 10) || 0; 

	 }
	 else
	 {
	 	newent.nightDriving = '-';
	 }

	  

	  PageTotalMinsUnadjusted += parseInt(newent.triptime.getUTCMinutes(),10) || 0;
	  PageTotalhrsUnadjusted += parseInt(newent.triptime.getUTCHours(), 10) || 0;

	  
	  // modMins = Math.floor(PageTotalMins / 60);
	  // remainder = PageTotalMins % 60;

	  // console.log("hours in minutes count " + modMins);
	  // console.log("PageTotalMins " + PageTotalMins);
	  //  console.log("remaining mins " + remainder);



	  calculateTotals();
	  newent.LineTotalmins = formMasterDetails.alldrivemins + PageTotalMins;
	  newent.LineTotalhrs = formMasterDetails.alldrivehrs + PageTotalhrs;

	  newent.NightLineTotalmins = formMasterDetails.alldrivemins + NightPageTotalMins;
	  newent.NightLineTotalhrs = formMasterDetails.alldrivehrs + NightPageTotalhrs;

	  entries.push(newent);


	  // console.log(NightPageTotalhrs);
	  // console.log(NightLineTotalmins);
					


	  return newent;
};


function DetermineCar()
{
	var carslength = Object.keys(formMasterDetails.car).length;

	
		return Math.floor((Math.random() * 10) + 1);
	
};


function getNewRightPageEntry(){
	var newent = {};
	newent.rego = formMasterDetails.car["0"].rego;
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

	if (nightDriving === true){
			newent.light = {
			"day": false,
			"dawn": false,
			"night": true
		};
	}


	return newent;
};



function calculateTotals(){

	modMins = Math.floor(PageTotalMinsUnadjusted / 60);
	remainder = PageTotalMinsUnadjusted % 60;
	PageTotalhrs = PageTotalhrsUnadjusted + modMins;
	PageTotalMins = remainder;



	NightModMins = Math.floor(NightPageTotalMinsUnadjusted / 60);
	NightRemainder = NightPageTotalMinsUnadjusted % 60;
	NightPageTotalhrs = NightPageTotalhrsUnadjusted + NightModMins;
	NightPageTotalMins = NightRemainder;


	

	
};


function toUTCDate(date){
    var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    	return _utc;
  };

function millisToUTCDate(millis){
    return toUTCDate(new Date(millis));
  };

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return toUTCDate(date);
}
function nightdriving(){
		
	if(num < 8 ){
		nightDriving = false;
	}
	else{
		nightDriving = true;
	}

}

function randomOneandTen()
{
	return Math.floor((Math.random() * 10) + 1);
}




(function(){
	var app = angular.module('tabs', ['leftpage', 'rightpage','modal']);

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

					var hrs = formMasterDetails.alldrivehrs;
					var mins = formMasterDetails.alldrivemins;
					var nmins = formMasterDetails.nightdrivemins;
					var nhrs = formMasterDetails.nightdrivehrs;
					$scope.globalformdata = formMasterDetails;
					$scope.entrydata = entries;
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

					var prvH = PageTotalhrs; 
					var prvM = PageTotalMins;
					var NprvH = NightPageTotalhrs;
					var NprvM = NightPageTotalMins;


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
