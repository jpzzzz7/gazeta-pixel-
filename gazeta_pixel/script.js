// ===== GAZETA PIXEL: JAVASCRIPT =====
// Variáveis criadas só com let e const.


// ---------- 1) VALIDAÇÃO DO FORMULÁRIO (João Pedro) ----------

const formulario = document.getElementById("joaop_form");

// FUNÇÃO ANÔNIMA: roda quando o formulário é enviado
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar
  validarFormulario();
});

// FUNÇÃO NOMEADA: confere os 12 campos, um de cada vez
function validarFormulario() {
  const nome = document.getElementById("joaop_nome").value.trim();
  const email = document.getElementById("joaop_email").value.trim();
  const telefone = document.getElementById("joaop_telefone").value.trim();
  const idade = Number(document.getElementById("joaop_idade").value);
  const cidade = document.getElementById("joaop_cidade").value.trim();
  const nickname = document.getElementById("joaop_nickname").value.trim();
  const senha = document.getElementById("joaop_senha").value;
  const confirmacao = document.getElementById("joaop_confirmacao").value;
  const plataforma = document.getElementById("joaop_plataforma").value;
  const modalidade = document.querySelector("input[name='joaop_modalidade']:checked");
  const mensagem = document.getElementById("joaop_mensagem").value.trim();
  const regulamento = document.getElementById("joaop_regulamento").checked;

  if (nome.length < 3 || nome.includes(" ") === false) {
    alert("Digite seu nome completo (nome e sobrenome).");
  } else if (email.includes("@") === false || email.includes(".") === false) {
    alert("Digite um e-mail válido, com @ e ponto.");
  } else if (telefone.length < 10 || telefone.length > 11 || isNaN(Number(telefone))) {
    alert("Digite o telefone com DDD, só números (10 ou 11 dígitos).");
  } else if (idade < 10 || idade > 99) {
    alert("A idade precisa ser um número entre 10 e 99.");
  } else if (cidade.length < 2) {
    alert("Digite o nome da sua cidade.");
  } else if (nickname.length < 3 || nickname.length > 15) {
    alert("O nickname precisa ter de 3 a 15 caracteres.");
  } else if (senha.length < 6) {
    alert("A senha precisa ter pelo menos 6 caracteres.");
  } else if (confirmacao !== senha) {
    alert("A confirmação está diferente da senha.");
  } else if (plataforma === "") {
    alert("Selecione uma plataforma.");
  } else if (modalidade === null) {
    alert("Escolha uma modalidade.");
  } else if (mensagem.length < 20) {
    alert("Escreva pelo menos 20 caracteres sobre por que quer participar.");
  } else if (regulamento === false) {
    alert("Você precisa aceitar o regulamento.");
  } else {
    alert("Inscrição enviada com sucesso! Boa sorte no campeonato, " + nickname + "!");
    formulario.reset();
  }
}


// ---------- 2) JANELA MODAL COM DADOS E IMAGEM DO USUÁRIO (João Pedro) ----------

const modal = document.getElementById("joaop_modal");

// FUNÇÃO NOMEADA: confere os campos e mostra tudo dentro do modal
function visualizarPersonagem() {
  const nome = document.getElementById("joaop_personagem_nome").value.trim();
  const descricao = document.getElementById("joaop_personagem_descricao").value.trim();
  const arquivo = document.getElementById("joaop_personagem_imagem").files[0];

  if (nome === "") {
    alert("Digite o nome do personagem.");
  } else if (descricao === "") {
    alert("Escreva uma descrição para o personagem.");
  } else if (arquivo === undefined) {
    alert("Escolha uma imagem do seu computador.");
  } else {
    document.getElementById("joaop_modal_nome").textContent = nome;
    document.getElementById("joaop_modal_descricao").textContent = descricao;
    document.getElementById("joaop_modal_imagem").src = URL.createObjectURL(arquivo);
    modal.classList.add("joaop_modal_aberto");
  }
}

// ARROW FUNCTION: fecha o modal
const fecharModal = () => {
  modal.classList.remove("joaop_modal_aberto");
};

document.getElementById("joaop_visualizar").addEventListener("click", visualizarPersonagem);
document.getElementById("joaop_fechar").addEventListener("click", fecharModal);

// FUNÇÃO ANÔNIMA: fecha o modal quando o clique é no fundo escuro
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});


// ---------- 3) CARROSSEL COM INCLUSÃO DE IMAGEM (João Victor) ----------

// lista de capas: cada item tem uma imagem e uma legenda
const capas = [
  { imagem: "img/jogo5.png", legenda: "Fazenda Feliz: simulação no campo" },
  { imagem: "img/jogo6.png", legenda: "Robô Rebelde: plataforma com robôs" },
  { imagem: "img/jogo7.png", legenda: "Oceano Profundo: exploração no mar" },
  { imagem: "img/jogo8.png", legenda: "Ninja das Sombras: ação noturna" },
  { imagem: "img/jogo1.png", legenda: "Galáxia Perdida: aventura no espaço" }
];

let posicao = 0;

const fotoCarrossel = document.getElementById("joaov_foto");
const legendaCarrossel = document.getElementById("joaov_legenda");
const contadorCarrossel = document.getElementById("joaov_contador");

// ARROW FUNCTION: mostra na tela a capa da posição atual
const mostrarCapa = () => {
  fotoCarrossel.src = capas[posicao].imagem;
  legendaCarrossel.textContent = capas[posicao].legenda;
  contadorCarrossel.textContent = (posicao + 1) + " / " + capas.length;
};

function capaAnterior() {
  if (posicao > 0) {
    posicao = posicao - 1;
    mostrarCapa();
  }
}

function proximaCapa() {
  if (posicao < capas.length - 1) {
    posicao = posicao + 1;
    mostrarCapa();
  }
}

function adicionarCapa() {
  const campoImagem = document.getElementById("joaov_nova_imagem");
  const campoLegenda = document.getElementById("joaov_nova_legenda");
  const arquivo = campoImagem.files[0];
  const legenda = campoLegenda.value.trim();

  if (arquivo === undefined) {
    alert("Escolha uma imagem do seu computador.");
  } else if (legenda === "") {
    alert("Escreva uma legenda para a imagem.");
  } else {
    capas.push({ imagem: URL.createObjectURL(arquivo), legenda: legenda });
    posicao = capas.length - 1;
    mostrarCapa();
    campoImagem.value = "";
    campoLegenda.value = "";
  }
}

document.getElementById("joaov_anterior").addEventListener("click", capaAnterior);
document.getElementById("joaov_proxima").addEventListener("click", proximaCapa);
document.getElementById("joaov_adicionar").addEventListener("click", adicionarCapa);

mostrarCapa(); // mostra a primeira capa assim que a página abre


// ---------- 4) PERSONALIZAÇÃO VISUAL (Santiago) ----------

const botaoModo = document.getElementById("santiago_botao_modo");

// FUNÇÃO NOMEADA: liga e desliga o modo escuro e troca o texto do botão
function alternarModo() {
  document.body.classList.toggle("santiago_escuro");

  if (document.body.classList.contains("santiago_escuro")) {
    botaoModo.textContent = "Modo claro";
  } else {
    botaoModo.textContent = "Modo escuro";
  }
}

// FUNÇÃO NOMEADA: troca a cor de uma área (põe ou tira a classe dela)
function alternarArea(idArea, classeNova) {
  document.getElementById(idArea).classList.toggle(classeNova);
}

// FUNÇÃO NOMEADA: volta tudo para as cores iniciais
function restaurarCores() {
  document.body.classList.remove("santiago_escuro");
  botaoModo.textContent = "Modo escuro";
  document.getElementById("santiago_topo").classList.remove("santiago_topo_alt");
  document.getElementById("santiago_menu").classList.remove("santiago_menu_alt");
  document.getElementById("joaov_cards").classList.remove("santiago_cards_alt");
  document.getElementById("joaov_lateral").classList.remove("santiago_lateral_alt");
  document.getElementById("santiago_rodape").classList.remove("santiago_rodape_alt");
}

botaoModo.addEventListener("click", alternarModo);
document.getElementById("santiago_restaurar").addEventListener("click", restaurarCores);

// ARROW FUNCTIONS: cada botão chama alternarArea com a sua área
document.getElementById("santiago_cor_topo").addEventListener("click", () => alternarArea("santiago_topo", "santiago_topo_alt"));
document.getElementById("santiago_cor_menu").addEventListener("click", () => alternarArea("santiago_menu", "santiago_menu_alt"));
document.getElementById("santiago_cor_cards").addEventListener("click", () => alternarArea("joaov_cards", "santiago_cards_alt"));
document.getElementById("santiago_cor_lateral").addEventListener("click", () => alternarArea("joaov_lateral", "santiago_lateral_alt"));
document.getElementById("santiago_cor_rodape").addEventListener("click", () => alternarArea("santiago_rodape", "santiago_rodape_alt"));
