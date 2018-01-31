$('#modify').on('click', function(){
    document.getElementById('queryblock').style.display="block";
    document.getElementById('addinfo').style.display="none";
    document.getElementById('add').style.backgroundColor="#fff";
    document.getElementById('modify').style.backgroundColor="#ccc";
});

$('#add').on('click', function(){
    document.getElementById('queryblock').style.display="none";
    document.getElementById('addinfo').style.display="block";
    document.getElementById('add').style.backgroundColor="#ccc";
    document.getElementById('modify').style.backgroundColor="#fff";
});

$('#addbtn').click(function(){
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