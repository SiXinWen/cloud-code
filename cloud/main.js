require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello Sixinwen!");
});

/* param example:
{ fromPeer: 'SiXinWenUser',
  receipt: false,
  groupId: null,
  content: { text: 'ok', atitudeVal: false },
  convId: '5535e6dde4b078a907134b9f',
  toPeers: [ 'walker', 'gyz' ],
  bin: false,
  transient: false,
  sourceIP: '162.105.80.162',
  timestamp: 1430029280028 }

*/
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
	             console.log("_messageReceived send");
	             response.success();
	          } else if(x == 1) {
	          	
	             console.log("_messageReceived drop");
	             response.success({"drop":"truthy"}); 
	          }else if(x == 2){
	          	console.log("_messageReceived select");
	          	response.success({"toPeers": conversation.get("m")});
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
})
