onload = function() {
	var select = document.getElementById('select');
	if(select != null) {
		select.options[select.getAttribute("status")].selected = true;
	}
	var select1 = document.getElementById('select1');
	if(select1 != null) {
		select1.options[select1.getAttribute("status")].selected = true;
	}
	var orderstatusselect = document.getElementById('orderstatusselect');
	if(orderstatusselect != null) {
		orderstatusselect.options[orderstatusselect.getAttribute("status")].selected = true;
	}
	var ordertakeselect = document.getElementById('ordertakeselect');
	if(ordertakeselect != null) {
		ordertakeselect.options[ordertakeselect.getAttribute("status")].selected = true;
	}
	var ordertimestamp = document.getElementById('ordertimestamp');
	if(ordertimestamp != null) {
		var ordertime = ordertimestamp.getAttribute("timestamp");
		var orderdate = new Date(ordertime * 1000);

		var year = orderdate.getFullYear();
		var month = orderdate.getMonth()+1<10?"0"+(orderdate.getMonth()+1):orderdate.getMonth();
		var day = orderdate.getDate()<10?"0"+orderdate.getDate():orderdate.getDate();

		ordertimestamp.value = year + "-" + month + "-" + day;
	}
}

function search(){
	var obj = {
		target:$("#selecttarget").val(),
		value:$("#search").val(),
	}
	$.ajax({
		url : "/search",
		type : "POST",
		data : obj,
		success : function(result){
			if(result.status == 0) {
				alert(result.error);
			}
			else {
				showsearchresult(result.target, result.results);
			}
		},
		error:function(result){
			alert(result);
		}
	});
}

function mydelete(_url, _id){
	var obj = {
		_id:_id,
	}
	$.ajax({
		url : _url,
		type : "DELETE",
		data : obj,
		success : function(result){
			if(result.status == 0) {
				alert("操作失败");
			}
			else {
				alert("操作成功");
			}
		},
		error:function(result){
			alert(result);
		}
	});
}

function requestedit(target, id){
	var url = "/item"
	if(target == 2) {
		url = "/order"
	}
	else if(target == 3) {
		url = "/agent"
	}
	else if(target == 4) {
		url = "/banner"
	}

	window.location.href = url + "/" + id;
}

function showsearchresult(target, data){
	if(target == 1) {
		showitemreuslt(data);
	}
	else if(target == 2) {
		showorderresult(data);
	}
	else if(target == 3) {
		showagentreuslt(data);
	}
	else if(target == 4) {
		showbannerreuslt(data);
	}
}

function showbannerreuslt(data){
	var thead = document.getElementById('tablehead');
	thead.appendChild(getbannerhead());

	var tbody = document.getElementById('tablebody');

    for(var i = 0;i < data.length; i++){
    	var trow = getbannerrow(data[i]);
    	tbody.appendChild(trow);  
    }
}

function showagentreuslt(data){
	var thead = document.getElementById('tablehead');
	thead.appendChild(getagenthead());

	var tbody = document.getElementById('tablebody');

    for(var i = 0;i < data.length; i++){
    	var trow = getagentrow(data[i], tbody.getAttribute("flag"));
    	tbody.appendChild(trow);  
    }
}

function showorderresult(data){
	var thead = document.getElementById('tablehead');
	thead.appendChild(getorderhead());

	var tbody = document.getElementById('tablebody');

    for(var i = 0;i < data.length; i++){
    	var trow = getorderrow(data[i], tbody.getAttribute("flag"));
    	tbody.appendChild(trow);  
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

function getbannerhead(){  
	var row = document.createElement('tr'); //创建行  
    
    var bannerid = document.createElement('td'); //创建第一列bannerID  
	bannerid.innerHTML = "BannerID"; //填充数据  
	row.appendChild(bannerid); 

	var bannername = document.createElement('td'); //创建第二列banner名称  
	bannername.innerHTML = "Banner名称"; //填充数据  
	row.appendChild(bannername);  
      
    var itemname = document.createElement('td'); //创建第二列banner名称  
	itemname.innerHTML = "商品名称"; //填充数据  
	row.appendChild(itemname);

    return row; //返回tr数据      
}

function getagenthead(){  
	var row = document.createElement('tr'); //创建行
       
	var name = document.createElement('td'); //创建第一列代理姓名  
	name.innerHTML = "代理姓名"; //填充数据  
	row.appendChild(name); //加入行  ，下面类似  
       
	var phonenumber = document.createElement('td');//创建第二列联系电话 
	phonenumber.innerHTML = "联系电话";  
	row.appendChild(phonenumber);  
       
	var community = document.createElement('td');//创建第三列社区  
	community.innerHTML = "社区";  
	row.appendChild(community);

	var level = document.createElement('td');//创建第四列代理等级  
	level.innerHTML = "代理等级";  
	row.appendChild(level); 

    return row; //返回tr数据      
}

function getorderhead(){  
	var row = document.createElement('tr'); //创建行  
       
	var consumername = document.createElement('td'); //创建第一列商品名称  
	consumername.innerHTML = "购买人"; //填充数据  
	row.appendChild(consumername); //加入行  ，下面类似  
       
	var purchaseitem = document.createElement('td');//创建第二列商品原价  
	purchaseitem.innerHTML = "购买商品";  
	row.appendChild(purchaseitem);  
       
	var total_fee = document.createElement('td');//创建第三列订单价格  
	total_fee.innerHTML = "购买价格";  
	row.appendChild(total_fee);

	var quanlity = document.createElement('td');//创建第四列购买数量  
	quanlity.innerHTML = "购买数量";  
	row.appendChild(quanlity); 

	var order_time = document.createElement('td');//创建第五列下单时间
	order_time.innerHTML = "下单时间";  
	row.appendChild(order_time);

	var status = document.createElement('td');//创建第六列订单状态  
	status.innerHTML = "订单状态";  
	row.appendChild(status);  

	var purchasemode = document.createElement('td');//创建第七列购买方式  
	purchasemode.innerHTML = "购买方式";  
	row.appendChild(purchasemode); 

	var takemode = document.createElement('td');//创建第八列收货方式
	takemode.innerHTML = "收货方式";  
	row.appendChild(takemode);

    return row; //返回tr数据      
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

	var classify = document.createElement('td');//创建第七列商品分类
	classify.innerHTML = "商品分类";  
	row.appendChild(classify);

    return row; //返回tr数据      
} 

function getbannerrow(h){  
	var row = document.createElement('tr'); //创建行  
       
	var bannerid = document.createElement('td'); //创建第一列BannerID  
	bannerid.innerHTML = h._id; //填充数据  
	row.appendChild(bannerid); //加入行  ，下面类似  
       
	var bannername = document.createElement('td');//创建第二列Banner名称  
	bannername.innerHTML = h.bannername;  
	row.appendChild(bannername);  

	var itemname = document.createElement('td');//创建第二列Banner名称  
	itemname.innerHTML = h.itemname;  
	row.appendChild(itemname);

	var edit = document.createElement('td');  
    row.appendChild(edit);  
    var btnedit = document.createElement('input'); 
    btnedit.setAttribute('type','button'); //type="button"  
	btnedit.setAttribute('value','编辑');   
    btnedit.setAttribute('id',h._id);         
    //编辑操作
    btnedit.onclick = function(){  
		requestedit(4, this.id);
	} 
    edit.appendChild(btnedit);  

   	var del = document.createElement('td');//创建第六列，操作列  
     row.appendChild(del);  
     var btndel = document.createElement('input'); 
     btndel.setAttribute('type','button'); //type="button"     
     btndel.setAttribute('id',h._id);      
    //删除操作
	btndel.setAttribute('value','删除');
 	btndel.onclick = function(){  
		mydelete('/banner', this.id);
	}  
    del.appendChild(btndel); 

    return row; //返回tr数据      
}


function getagentrow(h, flag){
	var row = document.createElement('tr'); //创建行  
	var name = document.createElement('td'); //创建第一列代理姓名  
	name.innerHTML = h.name; //填充数据  
	row.appendChild(name); //加入行  ，下面类似  
       
	var phonenumber = document.createElement('td');//创建第二列联系电话  
	phonenumber.innerHTML = h.phonenumber;  
	row.appendChild(phonenumber);  
       
	var community = document.createElement('td');//创建第三列社区  
	community.innerHTML = h.community;  
	row.appendChild(community);

	var level = document.createElement('td');//创建第四列代理等级  
	level.innerHTML = h.level;  
	row.appendChild(level); 

	 var edit = document.createElement('td');//创建第五列，操作列  
     row.appendChild(edit);  
     var btnedit = document.createElement('input'); 
     btnedit.setAttribute('type','button'); //type="button"     
     btnedit.setAttribute('id',h._id);   
     btnedit.setAttribute('itemname',h.name);   
     //编辑操作
	btnedit.setAttribute('value','编辑');
 	btnedit.onclick = function(){ 
		requestedit(3, this.id);
	}
	edit.appendChild(btnedit);

	 var del = document.createElement('td');//创建第六列，操作列  
     row.appendChild(del);  
     var btndel = document.createElement('input'); 
     btndel.setAttribute('type','button'); //type="button"     
     btndel.setAttribute('id',h._id);      
    //删除操作
	btndel.setAttribute('value','删除');
 	btndel.onclick = function(){  
		mydelete('/agent', this.id);
	}  
    del.appendChild(btndel);  

    return row; //返回tr数据      
}   

function getorderrow(h, flag){  
	var row = document.createElement('tr'); //创建行  
    
    var consumername = document.createElement('td'); //创建第一列购买人  
	consumername.innerHTML = h.consumer.nickName; //填充数据  
	row.appendChild(consumername); //加入行  ，下面类似

	var itemname = document.createElement('td'); //创建第二列商品名称  
	itemname.innerHTML = h.purchaseitem.name; //填充数据  
	row.appendChild(itemname); //加入行  ，下面类似  
    
    var total_fee = document.createElement('td');//创建第三列订单价格  
	total_fee.innerHTML = h.total_fee/100;  
	row.appendChild(total_fee);

	var itemquanity = document.createElement('td');//创建第四列购买数量  
	itemquanity.innerHTML = h.itemquanity;  
	row.appendChild(itemquanity);

	var order_timestamp = document.createElement('td');//创建第五列下单时间  
	order_timestamp.innerHTML = new Date(h.order_timestamp * 1000).toLocaleString(); //获取一个时间对象 
	row.appendChild(order_timestamp);

	var st = new Array("待付款","待成团","待收货","已完成");
	var status = document.createElement('td');//创建第六列订单状态  
	status.innerHTML = st[h.status];  
	row.appendChild(status);  

	var purchasemode = document.createElement('td');//创建第七列购买方式  
	purchasemode.innerHTML = h.purchasemode == 0?"拼团购买":"单独购买";  
	row.appendChild(purchasemode); 

	var takemode = document.createElement('td');//创建第八列收货方式
	takemode.innerHTML = h.takemode == 0?"快递":"自提";  
	row.appendChild(takemode);

	 var edit = document.createElement('td');//创建第九列，操作列  
     row.appendChild(edit);  
     var btnedit = document.createElement('input'); 
     btnedit.setAttribute('type','button'); //type="button"     
     btnedit.setAttribute('id',h._id);          
	btnedit.setAttribute('value','编辑');
 	btnedit.onclick = function(){  
		requestedit(2, this.id);
	} 

    edit.appendChild(btnedit);

    return row; //返回tr数据      
}

function getitemrow(h, flag){  
	var row = document.createElement('tr'); //创建行  
       
	var itemname = document.createElement('td'); //创建第一列商品名称  
	itemname.innerHTML = h.name; //填充数据  
	row.appendChild(itemname); //加入行  ，下面类似  
       
	var normalprice = document.createElement('td');//创建第二列商品原价  
	normalprice.innerHTML = h.normalprice;  
	row.appendChild(normalprice);  
       
	var agentprice = document.createElement('td');//创建第三列商品现价  
	agentprice.innerHTML = h.agentprice;  
	row.appendChild(agentprice);

	var sales = document.createElement('td');//创建第四列商品销量  
	sales.innerHTML = h.sales;  
	row.appendChild(sales); 

	var category = document.createElement('td');//创建第5列商品分类
	category.innerHTML = h.category;  
	row.appendChild(category);

	 var edit = document.createElement('td');//创建第6列，操作列  
     row.appendChild(edit);  
     var btnedit = document.createElement('input'); 
     btnedit.setAttribute('type','button'); //type="button"     
     btnedit.setAttribute('id',h._id);   
     btnedit.setAttribute('itemname',h.name);   
       
     //编辑操作
     if(flag == "0") {
		btnedit.setAttribute('value','编辑');
     	btnedit.onclick = function(){  
			requestedit(1, this.id);
		} 

		var del = document.createElement('td');//创建第7列 
	     row.appendChild(del);  
	     var btndel = document.createElement('input'); 
	     btndel.setAttribute('type','button'); //type="button"  
	     btndel.setAttribute('id',h._id);
	    //删除操作
		btndel.setAttribute('value','删除');
	 	btndel.onclick = function(){  
			mydelete("/item", this.id);
		}  
	    del.appendChild(btndel); 
     }
     else if(flag == "1") {
     	btnedit.setAttribute('value','添加');
     	btnedit.onclick = function() {  
			var itemid = document.getElementById('itemid');
			if(itemid.value === this.id) {
				alert("该商品已添加");
				return;
			}
			else {
				itemid.value = this.id;
			}

			var itemname = document.getElementById('itemname');
			itemname.value = this.getAttribute("itemname");

			addItemToBanner(this.getAttribute("itemname"), this.id);
		} 	
     }
 
     edit.appendChild(btnedit);

    return row; //返回tr数据      
}      

function removeitem(item) {
    var itemname = item.getAttribute('itemname');
	var itemid = item.getAttribute('itemid');
	var result = confirm("是否移除该商品?");

	if(result) {
		removeItemFromBanner(itemname, itemid);
	}
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

    item.onclick = function() {
    	var itemname = this.getAttribute('itemname');
    	var itemid = this.getAttribute('itemid');
    	var result = confirm("是否移除该商品?");

    	if(result) {
    		removeItemFromBanner(itemname, itemid);
    	}
    }

    item_list.appendChild(item);  
}

function removeItemFromBanner(itemname, itemid) {
	var item_list = document.getElementById('item_list');
	var item = document.getElementById(itemid);
	item_list.removeChild(item);
}


