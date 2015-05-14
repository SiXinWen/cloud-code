module.exports.saveComment = function(params){
	var content = params.parsedContent;
	var Comments = AV.Object.extend("Comments");
    var comment = new Comments();
    comment.set("Content",content._lctext);
    comment.set("Attitude",content._lcattrs.attitude);
    comment.save(null, {
        success: function(comment) {
            // Execute any logic that should take place after the object is saved.
            //   alert('New object created with objectId: ' + comment.id);
        },
        error: function(object, error) {
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