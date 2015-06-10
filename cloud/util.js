module.exports.saveComment = function(response, params){
	var content = params.parsedContent;
	var Comments = AV.Object.extend("Comments");
    var comment = new Comments();
    comment.set("Content",content._lctext);
    comment.set("Attitude",content._lcattrs.attitude);
    comment.set("user", params.fromPeer);
    console.log("++++++");
    console.log(params.convId);
    comment.set("TargetConv", params.convId);
    comment.save(null, {
        success: function(comment) {
            params.parsedContent._lcattrs["commentId"] = comment.id;
            console.log('saveComment afterSaveCommet 2:' + JSON.stringify(params.parsedContent));
            console.log(params.parsedContent);
            response.success({'toPeers':params.toPeers, 'content':JSON.stringify(params.parsedContent)});            
            // Execute any logic that should take place after the object is saved.
            //   alert('New object created with objectId: ' + comment.id);
        },
        error: function(object, error) {
            return null;
            // Execute any logic that should take place if the save fails.
            // error is a AV.Error with an error code and description.
            //alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}
module.exports.updateStats = function(params){
	var query = new AV.Query("_Conversation");
	query.get(params.convId, {
		success: function(conversation){
			var news = conversation.get("RelateNews");
			news.fetch({	
				success: function(news) {
    				if (params.parsedContent._lcattrs.attitude){
    					news.increment("SupportNum");
    				}else{
    					news.increment("RefuteNum");
    				}
    				news.save();
				},
				error: function(object, error){
				}
			});
		},
		error: function(object, error){
		}
	});
}
module.exports.getToPeers = function(params){
    toPeers = params.toPeers;
    return toPeers;
}
