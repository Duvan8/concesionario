$(document).ready(function () {
    $('.acturol').on('click',function(){
        let btn=$('.acturol').index(this);
        let usu=$('.usuid').eq(btn);
        let rol=$('.rolid').eq(btn);

        let u=usu.val();
        let r=rol.val();
        
        alert("Usted ya cambio de rol");

        $.ajax({
            type:"POST",
            url:'/acturol',
            data:{
                rr:r,uu:u
            }
        });
    });
});