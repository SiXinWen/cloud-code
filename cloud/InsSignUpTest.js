AV.Cloud.define('InsSignUpTest', function(request, response) {
AV.Cloud.run('InsSignUp', {InsID: 'DerekLH'}, {
  success: function(data){
      console.log("success");
  },
  error: function(err){
      console.log("fail")
  }
});
});