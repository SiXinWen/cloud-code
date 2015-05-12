//parameter : InsID String
//ReturnValue: {result : true}
AV.Cloud.define('InsSignUp', function(request, response) {
	var UserName = request.params.InsID;
	var NewUser = new AV.User();
	var IfSuc = false;
	console.log("Tag1");
	//sign up 
	//username = InsID password = password
	NewUser.set("username", UserName);
	NewUser.set("password", "password");
	console.log("Tag2");
    user.signUp(null, 
	{
		success: function(NewUser) 
		{
			ifSuc = true;
			console.log("Tag3");
		},
		error: function(NewUser, error) 
		{
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
			console.log("Tag4");
		}
	});
	var ReturnValue = {
		result : IfSuc
	};
	console.log("Tag5");
	response.success(ReturnValue);
});