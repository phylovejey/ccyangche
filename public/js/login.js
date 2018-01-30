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
      if(data.status)
      {
        alert('登录成功');
        window.location.href = '/item';
      }
      else
      {
        if(data.errortype == 0)
        {
          document.getElementById('error_username').innerHTML = data.info;
          document.getElementById('error_password').innerHTML = "";
        }
        else if(data.errortype == 1)
        {
          document.getElementById('error_username').innerHTML = "";
          document.getElementById('error_password').innerHTML = data.info;
        }
        else
        {
          alert(data.info);
        }
      }
    },
    error: function(){
      alert(data.info);
    },
    dataType: 'json'
  });
});