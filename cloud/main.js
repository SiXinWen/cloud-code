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
	          var x = 2;
	          if(x == 0){
	             console.log("send");
	             response.success();
	          } else if(x == 1) {
	          	
	             console.log("drop");
	             response.success({"drop":"truthy"}); 
	          }else if(x=2){
	          	console.log("select");
	          	response.success({"toPeers": [ 'walker' ]});
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
})
