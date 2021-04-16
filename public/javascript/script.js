abrirMenu();
fecharMenu();
var mensagens = [];

var nick = prompt("Digite seu nickname");
guardarNickname();

function guardarNickname(){
    var nickname = {
        name: nick
    }

    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', nickname);
    requisicao.then(visualizarChat).catch(insiraUmNickValido);
}

function insiraUmNickValido(){
    prompt("Por favor, insira outro nick,este já esta em uso");
guardarNickname();
}

function abrirMenu(){
    var menu = document.querySelector("nav");
    menu.style.right="0";

    var desfocado = document.querySelector(".deixandoescuro");
    desfocado.style.display="block";
    desfocado.style.opacity="0.7";
}
function fecharMenu(){
    document.querySelector("nav").style.right="-70%";
    var desfocado = document.querySelector(".deixandoescuro");
    desfocado.style.opacity="0";
    desfocado.style.display="none";
}

function visualizarChat(){
    receberMensagens();
    //atualizarAsMensagens();
    renderizarMensagens();
}

function receberMensagens(){ 
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    requisicao.then(guardarMensagens);
}

function guardarMensagens(resposta){
    console.log(resposta);
    mensagens = resposta.data;
    renderizarMensagens();
}

function atualizarAsMensagens(){
    setInterval(receberMensagens, 3000)
}

function renderizarMensagens(){
    var main;
    var elementoMensagem;
//criar o maain no html se sobrar tempo, parar de receber as mesmas mensagens a cada 3s// arrumar esse bug
    for(var i = 0; i < mensagens.length; i++){
        var mensagem = mensagens[i]
        elementoMensagem = document.createElement("div");
        elementoMensagem.setAttribute("class", "mensagens-bonitinhas");
        elementoMensagem.innerHTML = "<div>"+"<span style='color:#AAAAAA'>"+mensagem.time+"</span>"+"<strong>"+mensagem.from+"</strong>"+"<span>"+"para"+"</span>"+"<strong>"+ mensagem.to +":"+"</strong>"+"<span class='texto-da-mensagem'>"+ mensagem.text+"</span>" +"</div>";


        if(mensagem.type === "status"){
            elementoMensagem.classList.add('entrar-e-sair')
        } else if(mensagem.type === "private_message"){
            elementoMensagem.classList.add('mensagem-privada')
        } else {
            elementoMensagem.classList.add('mensagem-publica')
        }

        main = document.querySelector("main");
        main.appendChild(elementoMensagem);
    }
}