$(document).ready(function() {
	$("#itemform").ajaxForm(function(data){
		if(data.status == 0){
			alert("增加商品失败:" + data.error);
		}else{
			alert("增加商品成功");
		}
	});  
});

function search(){
	var obj = {
		target:$("#selecttarget").val(),
		key:$("#search").val()
	}
	$.ajax({
		url : "/search",
		type : "POST",
		data : obj,
		success : function(result){
			if(result.result.status == 0){
				alert(result.result.error);
			}else{
				showsearchresult(result.target, result.result.info);
			}
		},
		error:function(result){
			alert(result);
		}
	});
}

function showsearchresult(target, data){
	if(target == 1){
		showitemreuslt(data);
	}else if(target == 2){

	}else if(target == 3){

	}
}

function showitemreuslt(data){
	var thead = document.getElementById('tablehead');
	thead.appendChild(getitemhead());

	var tbody = document.getElementById('tablebody');
    for(var i = 0;i < data.length; i++){
    	var trow = getitemrow(data[i]);
    	tbody.appendChild(trow);  
    }
}

function getitemhead(){  
	var row = document.createElement('tr'); //创建行  
       
	var itemname = document.createElement('td'); //创建第一列商品名称  
	itemname.innerHTML = "商品名称"; //填充数据  
	row.appendChild(itemname); //加入行  ，下面类似  
       
	var itemoriginalprice = document.createElement('td');//创建第二列商品原价  
	itemoriginalprice.innerHTML = "商品原价";  
	row.appendChild(itemoriginalprice);  
       
	var itemcurrentprice = document.createElement('td');//创建第三列商品现价  
	itemcurrentprice.innerHTML = "商品现价";  
	row.appendChild(itemcurrentprice);

	var sales = document.createElement('td');//创建第四列商品销量  
	sales.innerHTML = "商品销量";  
	row.appendChild(sales); 

	var realinventory = document.createElement('td');//创建第五列商品实际库存  
	realinventory.innerHTML = "商品实际库存";  
	row.appendChild(realinventory); 

	var showinventory = document.createElement('td');//创建第六列商品显示库存  
	showinventory.innerHTML = "商品显示库存";  
	row.appendChild(showinventory);

	var classify = document.createElement('td');//创建第七列商品分类
	classify.innerHTML = "商品分类";  
	row.appendChild(classify);

    return row; //返回tr数据      
} 

function getitemrow(h){  
	var row = document.createElement('tr'); //创建行  
       
	var itemname = document.createElement('td'); //创建第一列商品名称  
	itemname.innerHTML = h.itemname; //填充数据  
	row.appendChild(itemname); //加入行  ，下面类似  
       
	var itemoriginalprice = document.createElement('td');//创建第二列商品原价  
	itemoriginalprice.innerHTML = h.itemoriginalprice;  
	row.appendChild(itemoriginalprice);  
       
	var itemcurrentprice = document.createElement('td');//创建第三列商品现价  
	itemcurrentprice.innerHTML = h.itemcurrentprice;  
	row.appendChild(itemcurrentprice);

	var sales = document.createElement('td');//创建第四列商品销量  
	sales.innerHTML = h.sales;  
	row.appendChild(sales); 

	var realinventory = document.createElement('td');//创建第五列商品实际库存  
	realinventory.innerHTML = h.realinventory;  
	row.appendChild(realinventory); 

	var showinventory = document.createElement('td');//创建第六列商品显示库存  
	showinventory.innerHTML = h.showinventory;  
	row.appendChild(showinventory);

	var classify = document.createElement('td');//创建第七列商品分类
	classify.innerHTML = h.classify;  
	row.appendChild(classify);

	 var delCell = document.createElement('td');//创建第四列，操作列  
     row.appendChild(delCell);  
     var btnDel = document.createElement('input'); //创建一个input控件  
     btnDel.setAttribute('type','button'); //type="button"  
     btnDel.setAttribute('value','删除');   
       
     //删除操作  
     btnDel.onclick=function(){  
         if(confirm("确定删除这一行嘛？")){  
             //找到按钮所在行的节点，然后删掉这一行  
             this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);  
             //btnDel - td - tr - tbody - 删除(tr)  
             //刷新网页还原。实际操作中，还要删除数据库中数据，实现真正删除  
             }  
         }  
     delCell.appendChild(btnDel);  //把删除按钮加入td，别忘了  
     
    return row; //返回tr数据      
}      



