AV.initialize("epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh", "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq");
// 初始化 param1：应用 id、param2：应用 key
function UpdateSupport(NewsID, Atitude)
{
	
	var News = AV.Object.extend("News");
	var query = new AV.Query(News);
	//alert(NewsID);
	query.get("552d0880e4b0f543686dbdff", 
	{
		success: function(news) 
		{
			// The object was retrieved successfully.
			if(Atitude)
			{
				news.increment("SupportNum");
			}
			else 
				news.increment("RefuteNum");
			
		},
		error: function(object, error) 
		{
			
			alert(error.description);
			// The object was not retrieved successfully.
			// error is a AV.Error with an error code and description.
		}
	});
}