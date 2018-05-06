function renderTemplateList(){

	// read from firebase
	FBHelper_.getBucketContents("Forms", function(res){
		$("#template-ul").empty();
		console.log(res);
		if (res.length > 0){
			for (var i = 0; i < res.length; i++){
				var li = $("<li></li>");
				var a = $("<a target='_blank' href='" + res[i]["formLink"] +"'>" + res[i]["name"] + "</a>");
				li.append(a);
				$("#template-ul").append(li);
			}
		} else {
			$("#template-ul").append($("<li> No templates yet. <li>"));
		}
	});
}

function registerForm(){

	// add new data to firebase
	var arr = $("#form-link").val().split("/");
	var formKey = arr[arr.length - 2];
	FBHelper_.addToBucket("Forms", formKey, {
		"formLink": $("#form-link").val(),
		"postURL": "https://app.formapi.io/api/v1/templates/" + formKey + "/submissions",
		"shortKey": formKey.split("_")[1],
		"name": $("#form-name").val()
	}, function(res){
		if (res == "success")
			renderTemplateList();
	})

	console.log("saved to firebase")

	// call renderTemplateList
	renderTemplateList();

}

$(document).ready(function(){

	// retrieve all forms from firebase

	// call renderTemplateList
	renderTemplateList();

});