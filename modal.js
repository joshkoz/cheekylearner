(function(){
	var app = angular.module('modal',["ui.bootstrap"]);

	app.directive('modal', function () {
	    return {
	      templateUrl: 'modal.html',
	      restrict: 'E',
	      scope: true,
	      controller: ['$scope', function($scope){
	      		

	      		$scope.master = {};
	      		$scope.odometers = [];
	      		$scope.regos = [];
				$scope.CarCount = [];
				$scope.hasmoved = {};
				$scope.submitted = false;
				$scope.showmodal = "true";

			      $scope.update = function(user) {
			        $scope.master = angular.copy(user);
			       
					

			        var date = new Date(formMasterDetails.startdate); // some mock date
			        var milliseconds = date.getTime(); 
					console.log(date);
			      	console.log(milliseconds);
			        $scope.master.milliseconds = milliseconds;
			 		$scope.master.date = date;
			        formMasterDetails = angular.copy($scope.master);

			        $scope.hasmoved = formMasterDetails;

			      };
			      $scope.reset = function()
			      {
			      	
			      };

			      $scope.submitForm = function(){
			      	$scope.submitted = true;
			      	$scope.master = angular.copy($scope.user);
			      	formMasterDetails =  angular.copy($scope.master);

			      	if($scope.mainform.$valid === true){
			      		$scope.showmodal = "modal"; //false on data toggle.
			      	}
			      	 $scope.hasmoved = formMasterDetails;
			      	

			      };

			      $scope.init = function(){
			   //    	$scope.user = {
						//   "car": { "0": {"rego": "", odometer: 0}, "1": { "rego": "", odometer: 0}, "2": {"rego": "", odometer: 0},"3": {"rego": "", odometer: 0},"4": {"rego": "", odometer: 0} }
						// };
					};


		      	$scope.reset();

		      	

		      	$scope.replacer = function(val){
		      		
		      		var controlForm = $('.modal form:first');
				 	var currentEntry = $(this).parents('.entry:first');
		      		if(val === "red"){

			      		controlForm.find('.entry .btn-add')
				      .removeClass('btn-add').addClass('btn-remove')
				      .removeClass('btn-success').addClass('btn-danger')
				      .html('<span class="glyphicon glyphicon-minus"></span>');
		      		} else if (val === "green"){
		      			controlForm.find('.entry:last .btn-remove')
				      .removeClass('btn-remove').addClass('btn-add')
				      .removeClass('btn-danger').addClass('btn-success')
				      .html('<span class="glyphicon glyphicon-plus"></span>');
		      		}
	      			
		      		
		      	};

		      	$scope.removeField = function(val, isZero){
		      		
		      		 $scope.CarCount.splice(val,1);	
		      		 if(val === 0 && isZero === true) delete $scope.user.car[0];
		      		if(val === 0 && isZero === false) delete $scope.user.car[1];
		      		else
		      			delete $scope.user.car[val + 2];					
		      		 	$scope.replacer("green");
		      	};

		      	$scope.addField = function(){
		      		$scope.CarCount.push(1);      				      			
		      	};

		      	$scope.reorderAdd = function(){
		      		console.log($scope.CarCount);
		      		$scope.user.car[$scope.CarCount.length].rego = $scope.user.car['0'].rego;
		      		$scope.user.car[$scope.CarCount.length].odometer = $scope.user.car['0'].odometer;
		      		$scope.user.car[0].rego = "";
		      		$scope.user.car[0].odometer = "";

		      	};

		      	$scope.reorderRemove = function(val, isZero){
		      		
		    		if(val === 0 && isZero === true)
		    		{
		    			$scope.user.car[0].rego = $scope.user.car[4].rego;
		    			$scope.user.car[4].rego = "";

		    		}
		    		else if (val === 0 && isZero === false)
					{
						for(i = 0; i < 4; i++){		    	
			      			$scope.user.car[val + i].rego = $scope.user.car[val+ i + i].rego;
			      			$scope.user.car[val + i].odometer = $scope.user.car[val+ i + 1].odometer;
		      			}
		      			$scope.user.car[0].rego = $scope.user.car[4].rego;
		    			$scope.user.car[4].rego = "";
					}
		    		else
		    		{	
		    			
		    			for(i = 0; i < 4; i++){		    	
			      			$scope.user.car[val + i].rego = $scope.user.car[val+ i + i].rego;
			      			$scope.user.car[val + i].odometer = $scope.user.car[val+ i + 1].odometer;
		      			}
		    		}
		      	};

		      

		      	$scope.AddOrRemoveField = function(val){

		      		if($scope.CarCount.length === 3){	     	
		      			$scope.replacer("red");

		      		}else{
					     
		      			$scope.replacer("green");
		      		}

		      		if($scope.CarCount.length < 4){
		      			$scope.addField();
		      			$scope.reorderAdd();

		      		}
		      		else{
		      			$scope.removeField(val, true);
		      			$scope.reorderRemove(val, true);
		      		}	      		
		      		
		      	};


	      }],
	      controllerAs: "modalForm"  
	  	};
  	});
})();