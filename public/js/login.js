function login()
{
  var username = $('#username').val();
  var password = $('#password').val();

  var obj = 
  {
    username: username,
    password: password
  };

  $.ajax({
    type: 'POST',
    url: '/login',
    data: obj,
    success: function(data){
      if(data.status)
      {
        window.location.href = data.url;
      }
      else
      {
        alert(data.info);
      }
    },
    error: function(){
      alert(data.info);
    },
    dataType: 'json'
  });
}