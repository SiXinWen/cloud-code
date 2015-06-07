require("cloud/app.js");
var util = require("cloud/util.js");

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
	console.log(request.params);
  	response.success("Hello Sixinwen!");
});

/* each def is ok.
1. function distributeMsg(arg){};
2. bellow
*/

/* params:
{
	fromPeer: 'SiXinWenUser',
 	content: '{"_lctype":-1,"_lctext":"sas","_lcattrs":{"attitudeVal":false}}',
	convId: '5535e6dde4b078a907134b9f',
	timestamp: 1430029280028
}
*/
AV.Cloud.define("distributeMsg", function(request, response){
	content = request.params.content;
	AV.Push.send({
	//	channels:["protected"],
	//	push_time:request.params.timestamp,
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
	content: '{"_lctype":-1,"_lctext":"sas","_lcattrs":{"attitude":false}}',
	convId: '5535e6dde4b078a907134b9f',
	toPeers: [ 'walker', 'cqyx', 'SiXinWenUser', 'gyz', 'LeanCloudxxx' ],
	bin: false,
	transient: false,
	sourceIP: '162.105.236.74',
	timestamp: 1430136990616 
}

*/
AV.Cloud.define("_messageReceived", function(request, response){
	var params = request.params;
	params.parsedContent = JSON.parse(params.content);
	var convId = params.convId;
    params.toPeers = util.getToPeers(params);
	util.saveComment(response, params);

	util.updateStats(params);
});

AV.Cloud.define("_receiversOffline", function(request, response){
	console.log('_receiversOffline' + JSON.stringify(request.params));
	response.success({"offlinePeers":["test"]});
});
//parameter : InsID String
//ReturnValue: {result : true}
AV.Cloud.define('InsSignUp', function(request, response) {
	//AV.initialize("epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh", "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq");
	var UserName = request.params.InsID;
	//console.log("Tag0");
	var NewUser = new AV.User();
	var IfSuc = false;
	//console.log("Tag1");
	//sign up 
	//username = InsID password = password
	NewUser.set("username", UserName);
	NewUser.set("password", "password");
	//console.log("Tag2");
    NewUser.signUp(null, 
	{
		success: function(NewUser) 
		{
			ifSuc = true;
			//console.log("Tag3");
		},
		error: function(NewUser, error) 
		{
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
			//console.log("Tag4");
		}
	});
	var ReturnValue = {
		result : IfSuc
	};
	//console.log("Tag5");
	response.success(ReturnValue);
});


//updateHotComments
AV.Cloud.define("updateHotComments", function(request, response){
    console.log("1");
	var Comments = AV.Object.extend("Comments");
	var HotComments = AV.Object.extend("HotComments");
	var query = new AV.Query(Comments);
	var duquery = new AV.Query(HotComments);//duplicate query	
	duquery.find({
		success: function(hotResults){			
            query.greaterThan("heat",10);
            query.find({
                success: function(results){
                    var hotCommentId = [];
                    for(var i = 0; i < hotResults.length; i++){
                        hotCommentId.push(hotResults[i].attributes.Comments);
                    }
                    for(var i = 0; i < results.length; i++){   
                        if(results[i].attributes.Comments in hotCommentId)
                            continue;
                        console.log(results[i]);
                        var hotComments = new HotComments();
                        hotComments.set("Comments", results[i].attributes.Comments);//Comments pointer
                        hotComments.set("TargetConv",results[i].attributes.TargetConv);//TargetConv: string
                        hotComments.save(null,{
                            success: function(hotComments){
                                console.log("updateHotComments success");
                            },
                            error: function(hotComments,error){
                                console.log(error);
                            }
                        });
                    }
                },
                error: function(error){
                    console.log('error updateHotComments');
                }
	       });	
		},
		error: function(error){
			console.log(error);
		}
	});
	
});