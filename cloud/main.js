require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello Sixinwen!");
});

/* each def is ok.
1. function distributeMsg(arg){};
2. bellow
*/

/* params:
{
	fromPeer: 'SiXinWenUser',
 	content: '{"_lctype":-1,"_lctext":"sas","_lcattrs":{"atitudeVal":false}}',
	convId: '5535e6dde4b078a907134b9f',
	timestamp: 1430029280028
}
*/
AV.Cloud.define("distributeMsg", function(request, response){
	switch(response)
});
/* param example:
{ 
	fromPeer: 'qwerty',
	receipt: false,
	groupId: null,
	content: '{"_lctype":-1,"_lctext":"sas","_lcattrs":{"atitudeVal":false}}',
	convId: '5535e6dde4b078a907134b9f',
	toPeers: [ 'walker', 'cqyx', 'SiXinWenUser', 'gyz', 'LeanCloudxxx' ],
	bin: false,
	transient: false,
	sourceIP: '162.105.236.74',
	timestamp: 1430136990616 
}

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
	          	allPeers = conversation.get("m");
	          	if (allPeers.length > 0)
	          		toPeers = [allPeers[0]];
	          	else
	          		toPeers = [];
	          	console.log("_messageReceived select");
	          	console.log(toPeers);
	          	response.success({"toPeers": toPeers});
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
});

