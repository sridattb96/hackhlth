ACCESS_TOKEN = "tp7k6scwyyqsve4tecjs24hr";
PROVIDER_ID = 86;
PATIENT_INFO_OBJ = {};
PATIENT_INFO_ARR = [];

var app = angular.module('myApp', []);

app.controller('loginCtrl', function($scope) {

});

function createPatient(){
	var obj = {
		"departmentid": 1,
		"dob": "04/11/1996",
		"email": "hello@gmail.com",
		"firstname": "firstname",
		"lastname": "lastname"
	}

	$.ajax({
	  url: "https://api.athenahealth.com/preview1/1128700/patients",
	  beforeSend: function(request) {
	    request.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
	    request.setRequestHeader("X-Originating-Ip", "69.162.16.9");
	    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  },
	  type: "POST",
	  data: Utils.serialize(obj),
	  dataType: "html",
	  success: function(res){
	  	console.log(JSON.parse(res));
	  }
	});
}

function getPatient(pid){
	$.ajax({
	  url: "https://api.athenahealth.com/preview1/195900/patients/" + pid,
	  beforeSend: function(request) {
	    request.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
	    request.setRequestHeader("X-Originating-Ip", "69.162.16.9");
	  },
	  type: "GET",
	  dataType: "html",
	  success: function(res){
	  	console.log(JSON.parse(res));
	  }
	});
}

function addCondition(pid, snomedCode){
	var obj = {
		"departmentid": 1,
		"snomedcode": snomedCode
	}

	$.ajax({
	  url: "https://api.athenahealth.com/preview1/195900/chart/" + pid + "/problems",
	  beforeSend: function(request) {
	    request.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
	    request.setRequestHeader("X-Originating-Ip", "69.162.16.9");
	  },
	  type: "GET",
	  data: Utils.serialize(obj),
	  dataType: "html",
	  success: function(res){
	  	console.log(JSON.parse(res));
	  }
	});
}

function getPatientInfo(){
	var obj = {
		"departmentid": 1,
		"enddate": "05/05/2018",
		"ignorerestrictions": false,
		"showcancelled": false,
		"showclaimdetail": false,
		"showcopay": true,
		"showinsurance": false,
		"showpatientdetail": true,
		"showremindercalldetail": false,
		"startdate": "05/01/2018"
	}

	$.ajax({
	  url: "https://api.athenahealth.com/preview1/195900/appointments/booked?" + Utils.serialize(obj),
	  beforeSend: function(request) {
	    request.setRequestHeader("Authorization", "Bearer " + ACCESS_TOKEN);
	    request.setRequestHeader("X-Originating-Ip", "69.162.16.9");
	  },
	  type: "GET",
	  dataType: "html",
	  success: function(res){
	  	var data = JSON.parse(res);
	  	var patients = [];
	  	for (var i = 0; i < data["appointments"].length; i++){
	  		if (data["appointments"][i]["providerid"] == PROVIDER_ID){
	  			var patient = data["appointments"][i]["patient"];

	  			PATIENT_INFO_OBJ[patient["patientid"]] = patient;
	  			PATIENT_INFO_ARR.push(patient);
	  		}
	  	}
	  	console.log(PATIENT_INFO_OBJ);
	  }
	});
}

// put this in the page following appointment audio
function fillOutForm(){

	var dataobj = {
		"data": {
		  "age": 10,
		  "contact": "(945)434-343",
		  "date": "05/1/2018",
		  "diagnosis": "cancer",
		  "dob": "4/11/1996",
		  "name": "sridatt"
		},
		"test": false
	}

	$.ajax({
	  url: "https://app.formapi.io/api/v1/templates/tpl_YeEne4k2qmxKDsta/submissions",
	  type: "POST",
	  data: dataobj,
	  dataType: "html",
	  success: function(res){
	  	var pdfid = JSON.parse(res)["submission"]["id"];
	  	console.log("https://app.formapi.io/api/v1/submissions/" + pdfid + "/download/" + pdfid.split("_")[1] + ".pdf");
	  }
	});


}

$(document).ready(function(){
	getPatientInfo();
	// fillOutForm();

	$(".item").hover(function(){
		$(this).children('p').css('font-weight', "bold");
	}, function(){
		$(this).children('p').css('font-weight', "unset");
	})


});