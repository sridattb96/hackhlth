
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAuJbeLVATxl9ZmziLsfoo6KoDiQmas1H8",
    authDomain: "hackhlth-d682c.firebaseapp.com",
    databaseURL: "https://hackhlth-d682c.firebaseio.com",
    projectId: "hackhlth-d682c",
    storageBucket: "hackhlth-d682c.appspot.com",
    messagingSenderId: "154996286604"
};

firebase.initializeApp(config);

var database = firebase.database();


var app = angular.module('myApp', []);

app.controller('geneCtrl', function($scope) {
    });
