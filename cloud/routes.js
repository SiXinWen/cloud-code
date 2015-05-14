module.exports.share = function(req, res) {
	var news_id = req.params.nid;
	console.log("news_id is " + news_id);
	console.log("news_id is " + req.query["nid"]);
	console.log("news_id is " + req.body);
	var News = AV.Object.extend("News");
	var query = new AV.Query(News);
	query.get(news_id, {
		success: function(news) {
			var convId = news.get("convId");
			res.setHeader("Set-Cookie", ["convId=" + convId]);
			return res.render("share", {
				newsHead: news.get("Title"),
				newsContent:news.get("Content"),
				newsPic_src:news.get("Picture")
			});
	    },
		error: function(object, error) {
		    console.log("error");
		    return res.render("hello", {
		    	message:"error occured in sixinwen"
		    });
		}
	});

};