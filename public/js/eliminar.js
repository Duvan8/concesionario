$(document).ready(function(){

    $('.dts').on('click',function(){

        let btn=$('.dts').index(this);
        let catid=$('.catid').eq(btn);

        let d=catid.val();
        alert("datos eli"+d);
        
        $.ajax({
            type:"POST",
            url:'/eliminar',
            data:{
                dd:d
            }
        });
    })
})