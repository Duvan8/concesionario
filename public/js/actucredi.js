$(document).ready(function () {
    alert("bienvenido")
    $('.Actualizar').on('click',function(){
        let btn=$('.Actualizar').index(this);
        alert(btn)
        let id=$('.datid').eq(btn);
        let nom=$('.datnombre').eq(btn);
        let ape=$('.datapellido').eq(btn);
        let tel=$('.datelefono').eq(btn);
        let cor=$('.datcorreo').eq(btn);

        let id=id.val();
        let nom=nom.val();
        let ape=ape.val();
        let tel=tel.val();
        let cor=cor.val();
       

        alert("datos"+id+nom+ape+tel+cor);

        $.ajax({
            type:"POST",
            url:'/actucliente',
            data:{
               ii:id,dd:nom,uu:ape,cc:tel,rr:cor
            }
        });
    });
});