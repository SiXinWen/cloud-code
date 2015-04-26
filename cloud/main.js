require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello Sixinwen!");
});

AV.Cloud.define("_messageReceived", function(request, response){
	var convId = request.params.convId;
	var fromPeer = request.params.fromPeer;
	var content = request.params.content;
	console.log(request.params);
	var query = new AV.Query("_Conversation");
	query.get(convId, {
	      success: function(conversation) {
	          var x = 0;
	          if(x == 0){
	             console.log("send");
	             response.success();
	          } else {
	          	
	             console.log("drop");
	             response.success({"drop":"truthy"}); 
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
})
