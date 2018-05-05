var ACCESS_TOKEN = "jwjfnhqhm5b6a2u28bv5ygaw";

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



$(document).ready(function(){

	// createPatient();
	// getPatient("7557");
	addCondition("7557", 57406009)

});