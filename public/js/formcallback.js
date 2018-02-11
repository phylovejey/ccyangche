$(document).ready(function() {
	$("#itemform").ajaxForm(function(data){
		if(data.status == 0){
			alert("增加商品失败:" + data.error);
		}else{
			alert("增加商品成功");
		}
	});  
});

function mxsearchitem()
{
	var obj = {
		target:"item",
		key:$("#search").val()
	}
	$.ajax({
		url : "/search",
		type : "POST",
		data : obj,
		success : function(result){
			if(result.status == 0){
				alert(result.error);
			}else{
				alert(result.info[0].itemname);
			}
		},
		error:function(result){
			alert(result);
		}
	});
}