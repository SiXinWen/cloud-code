//parameter : InsID String
//ReturnValue: {result : true}
AV.Cloud.define('InsSignUp', function(request, response) {
	var UserName = request.params.movie;
	var NewUser = new AV.User();
	var IfSuc = false;
	
	//sign up 
	//username = InsID password = password
	NewUser.set("username", UserName);
	NewUser.set("password", "password");
	
    user.signUp(null, 
	{
		success: function(NewUser) 
		{
			ifSuc = true;
		},
		error: function(NewUser, error) 
		{
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
	var ReturnValue = {
		result : IfSuc
	};
	response.success(ReturnValue);
});