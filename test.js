var applicationId = "epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh";
var applicationKey = "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq";
AV.initialize(applicationId, applicationKey);

AV.Cloud.run("updateHotComments", {}, function(data){});