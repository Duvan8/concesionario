$(document).ready(function () {
    alert("bienvenido");
    $('.categoria').on('click',function(){
        let btn=$('.categoria').index(this);
        alert(btn)
        let cat=$('.catipo').eq(btn);

        let d=cat.val();
        
        alert("datos"+d);

        $.ajax({
            type:"POST",
            url:'/categoria',
            data:{
                dd:d
            }
        });
    });
});
/*alert("Bienvenido");
$(document).ready(function () {
    alert("Bienvenido")
    $('.categoria').on('click',function(){
        let btn=$('.categoria').index(this);
        alert(btn)
        let cat=$('.cat').eq(btn);

        let cat=cat.val();
        
        alert(cat);

        $.ajax({
            type:"POST",
            url:'/categoria',
            data:{
                cc:cat
            }
        });
    });
});*/