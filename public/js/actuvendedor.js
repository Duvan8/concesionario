$(document).ready(function () {
    $('.Actualizar').on('click',function(){
        let btn=$('.Actualizar').index(this);
        let datid=$('.datid').eq(btn);
        let datnombre=$('.datnombre').eq(btn);
        let datapellido=$('.datapellido').eq(btn);
        let datelefono=$('.datelefono').eq(btn);
        let datcorreo=$('.datcorreo').eq(btn);

        let d=datid.val();
        let n=datnombre.val();
        let a=datapellido.val();
        let t=datelefono.val();
        let c=datcorreo.val();
        

        $.ajax({
            type:"POST",
            url:'/actuvendedor',
            data:{
                dd:d,nn:n,aa:a,tt:t,cc:c
            }
        });
    });
});