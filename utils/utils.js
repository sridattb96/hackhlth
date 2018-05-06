
var Utils = {
	serialize: function(obj) {
	  var str = [];
	  for (var p in obj)
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
	}
}

    
var FBHelper_ = {
        // addToBucket: function(bucket, key, obj){
        //         database.ref(bucket + "/" + key).set(obj, function(error){
        //         console.log(error);
        //     });
        // },

    	addToBucket: function(bucket, key, obj, callback){
    		database.ref(bucket + "/" + key).set(obj, function(error){
            if (error == null)
              callback("success");
            else
              console.log(error);
    	    });
    	},

        newVariant: function(obj){
            
            console.log(obj)
            database.ref("Variants"+ "/" + obj.name).set(obj, function(error){
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
        },
        
        // getVariants: function(){
        //     var variants = []
        //     database.ref("Variants").once("value",function(snapshot)
        //     {
        //         snapshot.forEach(function(child) {
        //         variants.push(child.val())
        //         });
        //     });
        //     return variants;
        // }
}

function testfb(){

        var song = {
                song: "song",
                key: "key",
            };

        FBHelper_.addToBucket("bucket1", "songdb", song);
}
