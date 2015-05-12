require("cloud/app.js");

function saveComment(params){
	var content = JSON.parse(params.content);
	var Comments = AV.Object.extend("Comments");
    var comment = new Comments();
    comment.set("Content",content._lctext);
    comment.set("Atitude",content._lcattrs.atitudeVal);
    comment.save(null, {
        success: function(comment) {
            // Execute any logic that should take place after the object is saved.
            //   alert('New object created with objectId: ' + comment.id);
        },
        error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a AV.Error with an error code and description.
            //alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}
function test (arg){
	console.log("in test " + arg);
	return "test";
};
// UpdateSupport
// News: NewsID
// Atitude: boolean
function UpdateSupport(NewsID, Atitude)
{
	
	var News = AV.Object.extend("News");
	var query = new AV.Query(News);
	
	query.get("552d0880e4b0f543686dbdff",{
		success: function(news) 
		{
			
			// The object was retrieved successfully.
			if(Atitude)
			{
				news.increment("SupportNum");
				news.save();
			}
			else 
			{
				news.increment("RefuteNum");
				news.save();
			}
			
		},
		error: function(object, error) 
		{
			
			alert(error.description);
			// The object was not retrieved successfully.
			// error is a AV.Error with an error code and description.
		}
	});
}
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
	saveComment(request.params);
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

				//toPeers
				allPeers = conversation.get("m");
				toPeers = [conversation.get("m")[0]];
				console.log(toPeers);
	          	//response.success({"toPeers":toPeers}); 
	          	response.success();
	          }
	      },
	      error: function(object, error) {
	          response.error("_messageReceived query conversation error!");
	      }
	    });
});

AV.Cloud.define("_receiversOffline", function(request, response){
	console.log(request.params);
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