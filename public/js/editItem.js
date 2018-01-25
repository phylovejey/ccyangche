(function(global){
    $('.addinfo_btn').on('click', function(){
        var title = $('#title').val();
        var url = $('#url').val();
        var img = $('#img').val();
        var obj = {
              title: title,
              url: url,
              img: img
        };
        $.ajax({
            type: 'POST',
            url: '/item',
            data: obj,
            success: function(data){
                if(data.status){
                    alert('添加数据成功');
                    window.location.reload();
                }else{
                    alert('添加失败');
                }
            },
            error: function(){
                alert('添加失败');
            },
            dataType: 'json'
        });

    });

})(window);