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

function deleteAgent()
{
  if(select == "")
    return;

  var obj = {
      opera:"delete",
      key:select
    }

    $.ajax({
    type: 'POST',
    url: '/admin/intro',
    data: obj,
    success: function(data){
      if(data.status)
      {
        deleteRow("queryresult", data.info);
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

function checked()
{
  if(this.checked)
  {
    select = this.id;
    if(selectItem != null && selectItem != this)
      selectItem.checked = false;
    selectItem = this;
  }
  else
  {
    select = "";
    selectItem = null;
  }
}

var select = "";
var selectItem = null;

function showResult(result)
{
  var table = document.getElementById('queryresult');

  for (var i = 0; i < result.length; i++) 
  {
    var row = table.insertRow(i+1);
    row.id = result[i]._id;

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

    //创建input 元素
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = result[i]._id;
    input.onclick = checked;
    table.rows[i+1].insertCell(5); 
    table.rows[i+1].cells[5].appendChild(input); 
  }
}

function deleteRow(table, key)
{
  var table = document.getElementById('queryresult');
  var childs = table.childNodes;

  for(var i = childs.length - 1; i >= 0; i--) 
  {
    if(table.rows[i].id == key._id)
    {
      table.deleteRow(i);
      break;
    }
  }
}