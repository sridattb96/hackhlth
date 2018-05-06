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

var FBHelper_ = {
	addToBucket: function(bucket, key, obj, callback){
		database.ref(bucket + "/" + key).set(obj, function(error){
        if (error == null)
          callback("success");
        else
          console.log(error);
	    });
	},

  getBucketContents: function(bucket, callback){
      var arr = []
      database.ref(bucket).once("value",function(snapshot){
          snapshot.forEach(function(child) {
            arr.push(child.val())
          });

          callback(arr);
      });
      return arr;
  }
}
