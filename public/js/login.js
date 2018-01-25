$('#btn').on('click', function(){
  var username = $('#username').val();
  var password = $('#password').val();
  var obj = {
    username: username,
    password: password
  };
  $.ajax({
    type: 'POST',
    url: '/login',
    data: obj,
    success: function(data){
      console.log(data)
      if(data.status){
        alert('登录成功');
        window.location.href = '/item';
      }else{
        alert('登录失败');
      }
    },
    error: function(){
      alert('登录失败');
    },
    dataType: 'json'
  });
});