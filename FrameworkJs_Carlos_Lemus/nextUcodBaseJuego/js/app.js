var nombreDulce="";
var puntaje=0;
var MINUTOS=2;
var SEGUNDOS=60;
var reiniciarOn=false;
var numeroImagen=0;
var arrPos=[];
var iniciar=false;
var matrizDulcesGenerados=new Array(new Array(0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0));
var movimientos=0;


$(function(){

//temporizador
  function temporizador(){
    min=0;
    seg=0;
    if(iniciar){
      if(min==0)min=MINUTOS;
      if(seg==0)seg=SEGUNDOS;
    var myVar = setInterval(myTimer ,1000);
    function myTimer() {
        if(seg!=0) seg--;
        if(seg==0 && min>0){
          min--;
          seg=SEGUNDOS-1;
        }
        if(min>=0){
          if(seg<10)
            segAux="0"+seg;
          else
            segAux=seg;
          document.getElementById("timer").innerHTML = "0"+min+":"+segAux;
        }
        if(min==0 && seg==0 && iniciar==true)
          {
            console.log("entro");
            $('.panel-tablero').toggle('slow', function(){
              $('.fin-titulo').css('display','block');
              $('.panel-score').width('100%');
              $('.time').hide('slow');
            });
            iniciar=false;
          }

    }
    }
  }


//Funcion para numero aleatorio
function aleatorio(min,max){
  return Math.round(Math.random() * (max - min) + min);
}

  //funcion que detecta donde estan los elementos repetidos en la fila
  function detectarRepetidos(fila,posFila,filaCol){
    var posicionesAEliminar=[];
    var a='0',b='0',c='0';
    for(i=0; i<fila.length; i++){
      if(i!=0 && i<(parseInt(fila.length)-1)) {
          a=fila[i]+"";
          b=fila[i-1]+"";
          c=fila[i+1]+"";
      }
      a=a.substring(a.length-1);
      b=b.substring(b.length-1);
      c=c.substring(c.length-1);
      //console.log("fila antes: "+fila);
      if(((a==b) && (b==c)) && (i>0 && i<(parseInt(fila.length)-1)) && ((parseInt((fila[i]+"").substring(0,1))!=0) && (parseInt((fila[i-1]+"").substring(0,1))!=0) && (parseInt((fila[i+1]+"").substring(0,1))!=0)))
      {
        if(filaCol=='col'){
          posicionesAEliminar.push(posFila+""+(i-1));
          posicionesAEliminar.push(posFila+""+i);
          posicionesAEliminar.push(posFila+""+(i+1));
        }else{
          posicionesAEliminar.push((i-1)+""+posFila);
          posicionesAEliminar.push(i+""+posFila);
          posicionesAEliminar.push((i+1)+""+posFila);
        }
      }
    }
    return posicionesAEliminar.unique();
  }
  //obtener repetidos
  function obtenerRepetidos(){
    var arr=[];
    arrPos=[];
    //verificando filas
    for(c=0; c<matrizDulcesGenerados.length; c++){
      arrResultado=detectarRepetidos(matrizDulcesGenerados[c],c,'fil');
      for(i=0; i<arrResultado.length; i++){
        arrPos.push(arrResultado[i]);
      }
    }
    arrResultado=[];
    //verificando columnas
    for(c=0; c<matrizDulcesGenerados[0].length; c++){
      for(f=0; f<matrizDulcesGenerados.length; f++){
        arr.push(matrizDulcesGenerados[f][c]);
      }
      arrResultado=detectarRepetidos(arr,c,'col');
      for(i=0; i<arrResultado.length; i++){
          arrPos.push(arrResultado[i]);
      }
      arr=[];
    }
    return arrPos;
  }

  //sustituir a cero para marcar los dulces a desaparecer
  function sustituirCero(arrPos){
    if(arrPos.length>0){
        for(i=0; i<arrPos.length; i++){
          fl=parseInt((arrPos[i]).substring(1));
          col=parseInt(arrPos[i].substring(0,1));
          contenido=matrizDulcesGenerados[fl][col];
          contenido=contenido.substring(0,(parseInt(contenido.length)-1));
          dulce=(matrizDulcesGenerados[fl][col]).substring((parseInt((matrizDulcesGenerados[fl][col]).length)-1));
          matrizDulcesGenerados[fl][col]="0"+contenido+dulce;
        }
    }
  }
  //funcion que desaparece los repetidos marcados con cero
  function desaparecerRepetidos(){
    sustituirCero(obtenerRepetidos());
  }


  //ocultar dulces repetidos y marcados con cero
  function ocultarDulces(){
    for(c=0; c<matrizDulcesGenerados.length; c++){
      for(f=0; f<matrizDulcesGenerados[c].length; f++){
        if((matrizDulcesGenerados[c][f]).substring(0,1)=='0'){
          numeroConDulce=(matrizDulcesGenerados[c][f]).substring(1);
          pos=numeroConDulce.substring(0,numeroConDulce.length-1);
          $('#d'+pos).hide();
        }
      }
    }
  }
  //dulce nuevo en fila cero ya que este debe ser aleatorio
  function dulceNuevoFilaCero(i,c){
    arrDulcesEnc=[];
    arrDulcesEnc.push(String(matrizDulcesGenerados[i][c]).substring(matrizDulcesGenerados[i][c].length-1));
    arrDulcesEnc.push(String(matrizDulcesGenerados[i+1][c]).substring(matrizDulcesGenerados[i+1][c].length-1));
    if(c==0){
        arrDulcesEnc.push(String(matrizDulcesGenerados[i][c+1]).substring(matrizDulcesGenerados[i][c+1].length-1));
    }else if(c==matrizDulcesGenerados[i].length-1){
        arrDulcesEnc.push(String(matrizDulcesGenerados[i][c-1]).substring((matrizDulcesGenerados[i][(c-1)]).length-1));
    } else {
        arrDulcesEnc.push(String(matrizDulcesGenerados[i][c+1]).substring(matrizDulcesGenerados[i][c+1].length-1));
        arrDulcesEnc.push(String(matrizDulcesGenerados[i][c-1]).substring(matrizDulcesGenerados[i][c-1].length-1));
    }
    return arrDulcesEnc;
  }
  //generar dulce nuevo
  //verificar como se realiza desplazamiento filas al encontrar repetidos
  function dulceNuevo(){
    arrDulcesEncontrados=[];
 var i=matrizDulcesGenerados.length-1;
    function verificarDulces(i){
      setTimeout(function(){
        for(c=matrizDulcesGenerados[i].length-1; c>=0; c--){
            arrDulcesEncontrados=[];
            var a=i;
            if(i==0){
            if(String(matrizDulcesGenerados[i][c]).substring(0,1)=='0'){
                //asignado puntaje
                puntaje+=10;
                $('#score-text').text(puntaje);
                arrDulcesEncontrados=dulceNuevoFilaCero(i,c);
                generarDulce("nuevo",arrDulcesEncontrados,i,c,parseInt(matrizDulcesGenerados[i][c].substring(1,matrizDulcesGenerados[i][c].length-1)));
                i=a;
              }
            }else if(i>0){
              if(String(matrizDulcesGenerados[i][c]).substring(0,1)=='0'){
                  numeroRep=obtenerNumeroRepetido(i,c);
                  if(numeroRep>=2){
                    puntaje+=(numeroRep+1)*10;
                    $('#score-text').text(puntaje);
                    for (h=0; h<=numeroRep; h++) {
                      b=i;
                      var numDulceCol=parseInt(String(matrizDulcesGenerados[0][c]).substring(0,1));
                      if(numDulceCol==0) numDulceCol=parseInt(String(matrizDulcesGenerados[0][c]).substring(0,String(matrizDulcesGenerados[0][c]).length-1));
                      for(d=b; d>=0; d--){
                        if(d>0){
                          dulceArriba=String(matrizDulcesGenerados[d-1][c]).substring(matrizDulcesGenerados[d-1][c].length-1);
                          numeroDulceTablero=parseInt(String(matrizDulcesGenerados[d][c]).substring(0,String(matrizDulcesGenerados[d][c]).length-1));
                          contenidoDulce=numeroDulceTablero+""+dulceArriba;
                          generarDulce("old",arrDulcesEncontrados,d,c,contenidoDulce);
                        }
                      }
                      //generando nuevos dulces en cero
                      arrDulcesEncontrados=dulceNuevoFilaCero(0,c);
                      generarDulce("nuevo",arrDulcesEncontrados,0,c,numDulceCol);
                    }
                  }else{
                    //asignado puntaje
                    puntaje+=10;
                    $('#score-text').text(puntaje);
                    dulceArriba=String(matrizDulcesGenerados[i-1][c]).substring(matrizDulcesGenerados[i-1][c].length-1);
                    numeroDulceTablero=parseInt(String(matrizDulcesGenerados[i][c]).substring(0,String(matrizDulcesGenerados[i][c]).length-1));
                    contenidoDulce=numeroDulceTablero+""+dulceArriba;
                    generarDulce("old",arrDulcesEncontrados,i,c,contenidoDulce);
                  }
              }
            }
        }
        i--;
        if(i>=0){
          //usando recursividad
            verificarDulces(i);
        }
        seguir=1;
        arrRepetidos=obtenerRepetidos();
        continuar=numRepetido(arrRepetidos).length;
        //seguir has el numero de repetidos
        while (seguir<=continuar) {
              if(arrRepetidos.length>0){
                sustituirCero(arrRepetidos);
                ocultarDulces();
                dulceNuevo();
              }
        seguir++;
        }

      },100);
    }
    verificarDulces(i);
  }
  //obtener numero repetidos
  function obtenerNumeroRepetido(i,c){
    repetido=0;
    numeroInicial=0;
    for(a=i; a>0; a--){
      numeroInicial=parseInt(String(matrizDulcesGenerados[a][c]).substring(String(matrizDulcesGenerados[a][c]).length-1));
      numeroActual=parseInt(String(matrizDulcesGenerados[a-1][c]).substring(String(matrizDulcesGenerados[a-1][c]).length-1));
      if(numeroActual==numeroInicial) repetido++;
      else break;
    }
    return repetido;
  }



  //generarDulce
  function generarDulce(tipo,arrDulcesEncontrados,posFila,posColumna,numeroDulceTablero){
    numeroObtenido=0;
    if(tipo=="nuevo"){
    arrDulcesEncontrados=arrDulcesEncontrados.unique();
    //console.log("arreglo unico:"+arrDulcesEncontrados);
    numeroObtenido=obtenerNumero(arrDulcesEncontrados);
    contenido=numeroDulceTablero+""+numeroObtenido;
  }else {
    contenido=numeroDulceTablero;
    numeroObtenido=contenido.substring(contenido.length-1);
    numeroDulceTablero=contenido.substring(0,contenido.length-1);
  }
    matrizDulcesGenerados[posFila][posColumna]=contenido;
    console.log("fila:"+posFila);
    console.log("columna:"+posColumna);
    //mostrar dulce diferente
    $('#d'+numeroDulceTablero).find('img').attr('src','image/'+(numeroObtenido+"")+'.png');
    $('#d'+numeroDulceTablero).show();
  }

  //funcion para obtener numero
  function obtenerNumero(arrNumeros){
      //arreglo base
      base=new Array(1,2,3,4);
      //arregrlo donde guardo resultado
      baseResultado=[];
      //quito los numeros encotrados en el arreglo base
      //console.log(arrNumeros);
      if(arrNumeros.length<4){
        for(i=0; i<arrNumeros.length; i++){
          removeItemFromArr ( base, parseInt(arrNumeros[i]) );
        }
      }
      //asigno solo los numeros que no se encuentran en el arrNumeros a resultado
      baseResultado=base;
      //busco una posicion aleatoria del arreglo resultado
      if(baseResultado.length>1)
        posArreglo=aleatorio(1,parseInt(baseResultado.length)-1);
      else
        posArreglo=0;
        return baseResultado[posArreglo];
  }


//Funcion para quitar elementos de un Array
function removeItemFromArr ( arr, item ) {
  var i = arr.indexOf( item );
  if ( i !== -1 ) {
      arr.splice( i, 1 );
  }
}


//funcion para eliminar repetidos en un arreglo
Array.prototype.unique=function(a){
return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
})




    //Titulo intermitente
    setInterval(function() {
      if($('.main-titulo').css('color')=="rgb(220, 255, 14)"){
        $('.main-titulo').css('color','white');
      }else{
        $('.main-titulo').css('color','rgb(220, 255, 14)');
      }
    },500);



  //Generar matriz inicial
  function llenarMatrizInicial(){
    //arreglo para ingresar numeros a descartar
    arrNumerosADescartar=new Array(0,0);
    for(c=0; c<matrizDulcesGenerados.length; c++){
      for (var f = 0; f < matrizDulcesGenerados[c].length; f++) {
        //numero imagen
        numeroImagen+=1;
        //numero aleatorio
        numeroAleatorio=aleatorio(1,4);
        //evitar que la posicion sea negativa
        if(f>0){
          nh=parseInt((matrizDulcesGenerados[c][(f-1)]+"").substring((matrizDulcesGenerados[c][(f-1)]+"").length-1));
          if(c>0){
              nv=parseInt((matrizDulcesGenerados[c-1][(f)]+"").substring((matrizDulcesGenerados[c-1][(f)]+"").length-1));
              arrNumerosADescartar[0]=nh;
              arrNumerosADescartar[1]=nv;
          }else{
              arrNumerosADescartar[0]=nh;
              arrNumerosADescartar[1]=0;
          }
          numeroAleatorio=obtenerNumero(arrNumerosADescartar);
        }
        if(f==0 && c>1){
          nv=parseInt((matrizDulcesGenerados[c-1][(f)]+"").substring((matrizDulcesGenerados[c-1][(f)]+"").length-1));
          if(numeroAleatorio==nv){
            arrNumerosADescartar[0]=0;
            arrNumerosADescartar[1]=nv;
            numeroAleatorio=obtenerNumero(arrNumerosADescartar);
          }

        }
        //almacenear dulce generado
        matrizDulcesGenerados[c][f]=numeroImagen+""+numeroAleatorio;
      }
    }

  }

  function dibujarDulces(){
    //dibujando dulces
    for(i=0; i<matrizDulcesGenerados.length; i++){
      for(c=0; c<matrizDulcesGenerados[i].length; c++){
        contenido=matrizDulcesGenerados[i][c];
        nombrePos=contenido.substring(0,(parseInt(contenido.length)-1));
        matrizDulcesGeneradosStr=(matrizDulcesGenerados[i][c]+"");
        nombreDulce=matrizDulcesGeneradosStr.substring(parseInt(matrizDulcesGeneradosStr.length)-1)+".png";
        nuevoDulce=document.createElement( "div" );
        contenedorDraggable=document.createElement("div");
        nombreClase="col-"+nombrePos;
        $(contenedorDraggable).addClass(nombreClase);
        $(contenedorDraggable).addClass('contenedor');
        $(contenedorDraggable).attr('id',"c"+nombrePos);
        $(nuevoDulce).addClass('arrastrable');
        $(nuevoDulce).attr('id',"d"+nombrePos)
        $(nuevoDulce).prepend('<img id='+'"'+(i+(c+''))+'"'+ 'src='+'"image/'+nombreDulce+'" />');
        $(contenedorDraggable).prepend(nuevoDulce);
        $('.panel-tablero').append(contenedorDraggable);
      }
    }
  }


    jQuery.fn.swap = function(b){
    // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
      b = jQuery(b)[0];
      var a = this[0];
      //obteniendo datos a remplazar
      desdeASave=($(a).children().attr('id')).substring(1)+($(a).find('img').attr('src')).substring(6,7);
      destinoASave=($(b).children().attr('id')).substring(1)+($(b).find('img').attr('src')).substring(6,7);
      //obteniendo posiciones fila y columna del elemeneto seleccionado
      desdePosF=($(a).find('img').attr('id')).substring(0,1);
      desdePosC=($(a).find('img').attr('id')).substring(1);
      //capturando posiciones
      posicionA=($(a).find('img').attr('id'));
      posicionB=($(b).find('img').attr('id'));
      //actualizando matriz
      matrizDulcesGenerados[desdePosF][desdePosC]=destinoASave;
      //obtniendo posiciones del elemento destino
      destinoPosF=($(b).find('img').attr('id')).substring(0,1);
      destinoPosC=($(b).find('img').attr('id')).substring(1);
      //actualizando matriz
      matrizDulcesGenerados[destinoPosF][destinoPosC]=desdeASave;
      var t = a.parentNode.insertBefore(document.createTextNode(''), a);
      b.parentNode.insertBefore(a, b);
      t.parentNode.insertBefore(b, t);
      t.parentNode.removeChild(t);
      //actualizando posiciones
      ($(a).find('img').attr('id',posicionB));
      ($(b).find('img').attr('id',posicionA));
      //console.log("matriz luego del cambio: "+matrizDulcesGenerados);
      desaparecerRepetidos();
      ocultarDulces();
      dulceNuevo();
      movimientos++;
      $('#movimientos-text').text(movimientos);
      return this;
    }

  //numero de veces a repetir
  function numRepetido(arrExaminar){
    arrRetorno=[];
    for (var i = 0; i < arrExaminar.length; i++) {
      numeroFinal=(arrExaminar[i]).substring((arrExaminar[i]).length-1);
      arrRetorno.push(numeroFinal);
    }
     return arrRetorno.unique();
  }

  //Funcion Inicio
  function iniciarJuego(){
    reiniciarOn=true;
    llenarMatrizInicial();
    dibujarDulces();
    iniciar=true;
    temporizador();
    $( ".contenedor" ).draggable({  helper: "clone" });
    $( ".contenedor" ).droppable({
      drop: function( event, ui ) {

          var draggable = ui.draggable, droppable = $(this),
              dragPos = draggable.position(), dropPos = droppable.position();

          draggable.css({
              left: dropPos.left+'px',
              top: dropPos.top+'px'
          });

          droppable.css({
              left: dragPos.left+'px',
              top: dragPos.top+'px'
          });
          draggable.swap(droppable);
      }
    });
  }



  //Boton Inicio
    $('#btnInicio').on('click',function(){
      if($(this).text()=='Iniciar'){
          iniciarJuego();
          $(this).text('Reiniciar');
      }else{
        $(this).text('Iniciar');
        window.location.reload(true);
      }
    });
});
