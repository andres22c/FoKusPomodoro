const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new  Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausa = document.querySelector('#start-pause');
const textoIniciarPausa = document.querySelector('#start-pause span')
const IconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const TiempoEnPantalla = document.querySelector('#timer')


const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');



let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null


musica.loop = true

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})


botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')


})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')


});

function cambiarContexto(contexto){

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })


    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)
    
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `  Optimiza tu productividad,<br>
                <strong class="app__title-strong" >sumérgete en lo que importa.</strong>`    

            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Que tal tomar un respiro?
            <strong class="app__title-strong">  ¡Haz una pausa corta!</strong>`
            break;
            case "descanso-largo":
                titulo.innerHTML = `
                Hora de volver a la superficie
                 <strong class="app__title-strong"> Haz una pausa larga.</strong>`
        default:
            break;
    }
}
const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado.play();
        alert('tiempo final');
        reiniciar()
        return
    }
    textoIniciarPausa.textContent = "Pausar"
    IconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`)
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
  
    console.log("temporizador:" + tiempoTranscurridoEnSegundos)
}

botonIniciarPausa.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    audioPausa.play();
    if(idIntervalo){
        reiniciar()
        return
    };
 
    idIntervalo = setInterval(cuentaRegresiva,1000)
    audioPlay.play();
}

function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausa.textContent = "Comenzar"
    IconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`)
}
  
function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos *1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR',{minute:'2-digit',second:'2-digit'})
    TiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()