abrirMenu();
fecharMenu();
visualizarChat();
var mensagens = [];

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
    renderizarMensagens();
}

function receberMensagens(){ 
    //ussar a array mensagens, para guardar essas informaçoes ! mais semantico do que deixar solto? ou deixar tudo direto no renderizarMensagens sem salvar na array?
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    requisicao.then(guardarMensagens);
}

function guardarMensagens(resposta){
    console.log(resposta);
    mensagens = resposta.data;
    renderizarMensagens();
}

function renderizarMensagens(){
    var main;
    var elementoMensagem
    for(var i = 0; i < mensagens.length; i++){
        var mensagem = mensagens[i]
        elementoMensagem = document.createElement("div");
        elementoMensagem.setAttribute("class", "mensagens-bonitinhas");
        elementoMensagem.innerHTML = "<div>"+"<span style='color:#AAAAAA'>"+mensagem.time+"</span>"+"<strong>"+mensagem.from+"</strong>"+"<span>"+"para"+"</span>"+"<strong>"+ mensagem.to +":"+"</strong>"+"<span class='texto-da-mensagem'>"+ mensagem.text+"</span>" +"</div>";
        main = document.querySelector("main");
        main.appendChild(elementoMensagem);
    }
}