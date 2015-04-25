  
  AV.initialize("epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh", "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq");
  var News = AV.Object.extend("News");

// 初始化 param1：应用 id、param2：应用 key
  var query = new AV.Query(News);
  query.get("552e853be4b036ba52441683", {
  success: function(mynew) {
    var content = mynew.get("Content");
    var title = mynew.get("Title");
    //alert(content);
    document.getElementById("newsHead").innerHTML=title;
    document.getElementById("newsContent").innerHTML=content;
    document.getElementById("newsPic").src="http://www.bioon.com/trends/UploadFiles/201312/2013122620053471.png";
    // The object was retrieved successfully.
  },
  error: function(object, error) {
    console.log("1");
    // The object was not retrieved successfully.
    // error is a AV.Error with an error code and description.
  }
});
