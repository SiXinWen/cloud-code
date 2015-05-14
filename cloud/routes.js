module.exports.share = function(req, res) {
	var news_id = req.query["nid"];
	if (!news_id){
		return res.render("hello", {
			message:"hello"
		});
	}
	//console.log("1 params is " + req.params.newsid);//undefined
	//console.log("2 news_id is " + news_id);
	//console.log("news_id is " + req.body);//object
	var News = AV.Object.extend("News");
	var query = new AV.Query(News);
	query.get(news_id, {
		success: function(news) {
			var convId = news.get("conv").id;
			res.setHeader("Set-Cookie", ["convId=" + convId]);
			return res.render("share", {
				newsHead: news.get("Title"),
				newsContent:news.get("Content"),
				newsPic_src:news.get("Picture")._url
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