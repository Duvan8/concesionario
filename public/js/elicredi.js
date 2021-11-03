$(document).ready(function(){

    $('.elimcredi').on('click',function(){

        let btn=$('.elimcredi').index(this);
        let doc=$('.datid').eq(btn);

        let d=doc.val();
        alert("datos eliminados");
        
        $.ajax({
            type:"POST",
            url:'/elicredi',
            data:{
                dd:d
            }
        });
    })
})