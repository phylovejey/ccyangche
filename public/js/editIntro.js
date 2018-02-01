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

  	var agent = {
      opera:"add",
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
    data: agent,
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

$('#querybtn').click(function(){
    var query = $('#query').val();

    var obj = {
      opera:"query",
      query:query,
    }

    $.ajax({
    type: 'POST',
    url: '/admin/intro',
    data: obj,
    success: function(data){
      if(data.status)
      {
        showResult(data.info);
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

function showResult(result)
{
  var table = document.getElementById('queryresult');

  for (var i = 0; i < result.length; i++) 
  {
    table.insertRow(i+1);
    table.rows[i+1].insertCell(0); 
    table.rows[i+1].cells[0].appendChild(document.createTextNode(result[i].name)); 
    table.rows[i+1].insertCell(1); 
    table.rows[i+1].cells[1].appendChild(document.createTextNode(result[i].realname)); 
    table.rows[i+1].insertCell(2); 
    table.rows[i+1].cells[2].appendChild(document.createTextNode(result[i].phonenumber));     
    table.rows[i+1].insertCell(3); 
    table.rows[i+1].cells[3].appendChild(document.createTextNode(result[i].phonenumber));     
    table.rows[i+1].insertCell(4); 
    table.rows[i+1].cells[4].appendChild(document.createTextNode(result[i].location)); 
  }
}