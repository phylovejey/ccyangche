$('#modify').on('click', function(){
    document.getElementById('add').innerHTML = "789";
});

$('#add').on('click', function(){
    document.getElementById('modify').innerHTML = "123";
});

$('#addbtn').click(function(){
  document.getElementById('modify').innerHTML = "123";

	var realname = $('#realname').val();
  	var phonenumber = $('#phonenumber').val();
  	var name = $('#name').val();
  	var password = $('#password').val();
  	var intro_phonenumber = $('#intro_phonenumber').val();
  	var location = $('#location').val();

  	var obj = {
  		name:name,
  		password:password,
  		realname:realname,
  		phonenumber:phonenumber,
  		intro_phonenumber:intro_phonenumber,
  		location:location
  	}
    $.ajax({
    type: 'POST',
    url: '/admin/intro',
    data: obj,
    success: function(data){
      if(data.status)
      {
        window.location.reload();
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
});