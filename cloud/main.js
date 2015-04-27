require("cloud/app.js");
function test (arg){
	console.log("in test " + arg);
	return "test";
};

/* return val ex:
{ _resolved: true,
  _rejected: false,
  _resolvedCallbacks: [],
  _rejectedCallbacks: [],
  _result: { '0': 'Hello Sixinwen!' } }
*/
AV.Cloud.define("test2", function(request, response) {
	console.log("in test2 " + request.params);
  response.success("Hello Sixinwen!");
  //	return "tx";	//will not be executed.
});

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
	console.log(request.params);
	console.log(test(request.params));
	console.log(AV.Cloud.run("test2", {p1:"qychen"},  {
		success: function(data){
      			console.log("调用成功，得到成功的应答data");
  		},
  		error: function(err){
      			console.log("//处理调用失败");
  		}
  	}));
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
	content = request.params.content;
	AV.Push.send({
		channels:["protected"],
		push_time:request.params.timestamp,
		data:{
			alert: content
		}
	});
	console.log("end of distributeMsg");
	response.success("");
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
	          	AV.Cloud.run("distributeMsg", {
		          		timestamp:request.params.timestamp,
		          		content:request.params.content
		        }, {
		          	success: function(result) {
	   					console.log("distributeMsg success");
					},
					error: function(error) {
						console.log("distributeMsg fail");
					}
				});
	          	response.success({"drop":"truthy"}); 
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
});

