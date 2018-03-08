$(document).ready(function() {
	$("#itemform").ajaxForm(function(data){
		if(data.status == 0){
			alert(data.error);
		}else{
			alert(data.suc);
		}
	});  
});

$(document).ready(function() {
	$("#bannerform").ajaxForm(function(data){
		if(data.status == 0){
			alert(data.error);
		}else{
			alert(data.suc);
		}
	});  
});

function search(){
	var obj = {
		target:$("#selecttarget").val(),
		key:"classify",
		value:$("#search").val(),
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

function requestedit(target, id){
	var url = "/item"
	if(target == 2){

	}else if(target == 3){

	}

	window.location.href = url + "?id=" + id;
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
    	var trow = getitemrow(data[i], tbody.getAttribute("flag"));
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

function getitemrow(h, flag){  
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

	 var edit = document.createElement('td');//创建第八列，操作列  
     row.appendChild(edit);  
     var btnedit = document.createElement('input'); 
     btnedit.setAttribute('type','button'); //type="button"     
     btnedit.setAttribute('id',h._id);   
     btnedit.setAttribute('itemname',h.itemname);   
       
     //编辑操作
     if(flag == "0"){
		btnedit.setAttribute('value','编辑');
     	btnedit.onclick = function(){  
			requestedit(1, this.id);
		} 
     }else if(flag == "1"){
     	btnedit.setAttribute('value','添加');
     	btnedit.onclick = function(){  
			var banneritemids = document.getElementById('banneritemids');
			if(banneritemids.value === ""){
				banneritemids.value = this.id + ",";
			}else{
				if(banneritemids.value.indexOf(this.id) == -1){
					banneritemids.value = banneritemids.value + this.id + ",";
				}else{
					alert("该商品已添加");
					return;
				}
			}
			var banneritemnames = document.getElementById('banneritemnames');
			if(banneritemnames.value === ""){
				banneritemnames.value = this.getAttribute("itemname") + ",";
			}else{
				banneritemnames.value = banneritemnames.value + this.getAttribute("itemname") + ",";
			}
			addItemToBanner(this.getAttribute("itemname"), this.id);
		} 	
     }
 
     edit.appendChild(btnedit);  

    return row; //返回tr数据      
}      

function addItemToBanner(itemname, itemid){
	var item_list = document.getElementById('item_list');

	var item = document.createElement('button');
	item.setAttribute('type','button');
	item.setAttribute('class','btn btn-warning warning_22');
	item.setAttribute('itemname',itemname);
	item.setAttribute('itemid',itemid);
	item.setAttribute('id',itemid);

    item.innerHTML = itemname;

    item.onclick = function(){
    	var itemname = this.getAttribute('itemname');
    	var itemid = this.getAttribute('itemid');
    	var result = confirm("是否移除该商品?")

    	if(result){
    		removeItemFromBanner(itemname, itemid);
    	}
    }

    item_list.appendChild(item);  
}

function removeItemFromBanner(itemname, itemid){
	var banneritemids = document.getElementById('banneritemids');
	var banneritemnames = document.getElementById('banneritemnames');
	
	banneritemids.value = banneritemids.value.replace(itemid+",", "");
	banneritemnames.value = banneritemnames.value.replace(itemname+",", "");

	var item_list = document.getElementById('item_list');
	var item = document.getElementById(itemid);
	item_list.removeChild(item);
}


