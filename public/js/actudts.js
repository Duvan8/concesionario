$(document).ready(function () {
    alert("Bienvenido")
    $('.roles').on('click',function(){
        let btn=$('.roles').index(this);
        alert(btn)
        let usu=$('.usuario').eq(btn);
        let rol=$('.rol').eq(btn);

        let u=usu.val();
        let r=rol.val();
        
        alert("datos"+u+r);

        $.ajax({
            type:"POST",
            url:'/actucuentas',
            data:{
                uu:u,rr:r
            }
        });
    });
});