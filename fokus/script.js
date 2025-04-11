// Referenciando os elementos HTML atraves de suas classes
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

const displayTempo = document.querySelector("#timer");



let tempoDecorridoEmSegundos = 5;
let intervaloId = null; // variavel para controlar o temporizador


const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLong = 900;



// deixa o audio em loop
musica.loop = true;

// evento para ler o estado do elemento (true/false)
musicaFocoInput.addEventListener("change", () => {

    // propriedades da biblioteca "Audio"
    if(musica.paused)
        musica.play();
    else
        musica.pause();
});

// ouvindo os eventos do arquivo HTML quando clicado em um dos botões declarados
focoBt.addEventListener("click", () => {
    alterarContexto("foco");
    // ativando o CSS com foco no modo selecionado (classe estilizada no CSS - active)
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
});

// setando as variaveis de forma dinamica (parametrizada)
function alterarContexto(contexto) {

    // forEach = for > usado para percorrer todos os botões com a classe declarada na inicialização da variavel
    // o "active" é removido de todos os botões e em seguida, só um é setado novamente
    botoes.forEach(function (contexo) {
        contexo.classList.remove("active");
    })

    // seta o atributo "data-contexto" de acordo com o CSS passado em "contexto"
    html.setAttribute("data-contexo", contexto);
    // exibindo a imagem de acordo com o contexto passado (nome da imagem)
    imagem.setAttribute("src", `/imagens/${contexto}.png`);


    // switch para setar qual texto irá aparecer no front, de acordo com cada contexto
    switch(contexto) {
        case "foco":
            titulo.innerHTML = ` 
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = ` 
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = ` 
            Hora de voltar à superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
        default:
            break;
    }

    const contagemRegressiva = () => {

        if(tempoDecorridoEmSegundos <= 0) {
            audioTempoFinalizado.play();   // áudio executado quando cronômetro finalizar
            alert("Tempo finalizado!");
            zerar(); // interrompe a contagem
            return;
        }
        // decrementar o tempo
        tempoDecorridoEmSegundos -= 1;
        console.log("Temporizador: " + tempoDecorridoEmSegundos);
    }

    // lendo se há algum evento de clique click no botão "start-pause", se sim chama a função XXX;
    startPauseBt.addEventListener("click", iniciarOuPausar);

    function iniciarOuPausar() {
        // debugger;
        // verificação que pausa a contagem
        if(intervaloId) {
            audioPausa.play();
            zerar();
            return;
        }
        audioPlay.play();
        // parametro 1 = a função que vai ser chamada; parametro 2 = quanto tempo deve executar (ms)
        intervaloId = setInterval(contagemRegressiva, 1000);
    }

    function zerar() {
        clearInterval(intervaloId); // para o intervalo
        intervaloId = null;
    }
}