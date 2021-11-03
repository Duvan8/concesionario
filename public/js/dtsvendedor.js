$(document).ready(function(){

    $('.dts').on('click',function(){

        let btn=$('.dts').index(this);
        let catid=$('.catid').eq(btn);

        let d=catid.val();
        alert("datos vende"+d);
        
        $.ajax({
            type:"POST",
            url:'/dtsvendedor',
            data:{
                id:d
            }
        });
    })
})