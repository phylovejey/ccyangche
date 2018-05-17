var commonfunc = {
    // 时间戳产生函数
    createTimeStamp: function() {
        return parseInt(new Date().getTime() / 1000);
    },

    timestampToDateStr: function(timestamp) {
        var date = new Date(timestamp);  
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },

    getTodayZero: function() {
        var date = new Date();
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d; 
        return y + "-" + m + "-" + d + " 00:00:00";
    }
}

module.exports = commonfunc;