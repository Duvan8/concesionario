$(document).ready(function () {
    alert("Bienvenido")
    $('.btnact').on('click',function(){
        let btn=$('.btnact').index(this);
        alert(btn)
        let nom=$('.usuid').eq(btn);
        let login=$('.usulogin').eq(btn);
        let ape=$('.usupassword').eq(btn);

        let d=nom.val();
        let u=login.val();
        let c=ape.val();
        
        alert("datos"+d+u+c);

        $.ajax({
            type:"POST",
            url:'/actualizar',
            data:{
                dd:d,uu:u,cc:c
            }
        });
    });
});