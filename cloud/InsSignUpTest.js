AV.initialize("epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh", "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq");

//AV.Cloud.define('InsSignUpTest', function(request, response) {
AV.Cloud.run('InsSignUp', {'InsID': 'DerekLH'}, {
  success: function(data){
      alert("success");
  },
  error: function(err){
      alert("fail");
  }
});
//});



