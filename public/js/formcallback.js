$(document).ready(function() {
	$("#itemform").ajaxForm(function(data){
		if(data.status == 0){
			alert("增加商品失败:" + data.error);
		}else{
			alert("增加商品成功");
		}
	});            
});

$("#btnsearchitem").click(function(){


	$("#btnsearchitem").innerHTMl = "phy";
	

	  	/*var obj = {
		target:"item",
		key:$("#search").val();
	}
	$.ajax({
		url : "/search",
		type : "GET",
		data : obj,
		success : function(result){
		},
		error:function(result){
		}
	});*/
});