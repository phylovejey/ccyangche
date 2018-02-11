$(document).ready(function() {
	$("#itemform").ajaxForm(function(data){
		if(data.status == 0){
			alert("增加商品失败:" + data.error);
		}else{
			alert("增加商品成功");
		}
	});            
});