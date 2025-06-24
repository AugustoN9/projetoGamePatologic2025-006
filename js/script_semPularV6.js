let currentPosition = 1;
let startTime = null;
let timerInterval = null;
let currentMapIndex = 0;
let maxPosition = 10;
let pontuacao = 0;

document.addEventListener("DOMContentLoaded", () => {
  const infoPanel = document.querySelector(".info-panel");
  const scoreDisplay = document.createElement("p");
  scoreDisplay.id = "scoreDisplay";
  scoreDisplay.innerText = "Pontuação: 0";
  infoPanel.appendChild(scoreDisplay);
});

const mapas = [
  {
    nome: "Fase 1 - Registro",
    estrutura: [
      [1, null, null],
      [2, null, null],
      [3, null, null],
      [4, null, null],
      [5, 6, 7],
      [null, null, 8],
      [null, null, 9],
      [null, null, 10],
    ],
    max: 10,
    bombas: { 7: 4 },
    quiz: {
      3: {
        pergunta:
          "Qual é o objetivo principal da conferência dos dados da solicitação com os dados do paciente no momento do registro da amostra?",
        alternativas: [
          "Verificar se o nome do médico está correto.",
          "Garantir a identificação correta da amostra e a rastreabilidade.",
          "Agilizar o processo de triagem.",
        ],
        correta: 1,
        explicacao:
          "O objetivo principal da conferência é garantir que a amostra esteja corretamente identificada com o paciente certo, evitando erros que comprometam o diagnóstico e o tratamento.",
      },
      5: {
        pergunta:
          "O que caracteriza um frasco adequado para o envio de amostras em Anatomia Patológica?",
        alternativas: [
          "Qualquer frasco plástico com tampa rosqueável.",
          "Frasco estéril sem identificação.",
          "Frasco limpo, devidamente identificado, contendo formalina tamponada a 10%.",
        ],
        correta: 2,
        explicacao:
          "Frasco limpo, devidamente identificado, contendo formalina tamponada a 10%.",
      },
      9: {
        pergunta:
          "Como deve ser tratada uma solicitação com dados incompletos do paciente?",
        alternativas: [
          " Deve ser ignorada se a amostra estiver correta.",
          " Deve ser recusada ou corrigida antes de ser registrada.",
          " Pode ser registrada normalmente.",
        ],
        correta: 2,
        explicacao: " Deve ser recusada ou corrigida antes de ser registrada.",
      },
    },
    background: "url('image/background/fase01.jpeg')",
  },
  {
    nome: "Fase 2 - Macroscopia",
    estrutura: [
      [1, null, 17],
      [2, null, 16],
      [3, null, 15],
      [4, null, 14],
      [5, null, 13],
      [6, null, 12],
      [7, null, 11],
      [8, 9, 10],
    ],
    max: 17,
    bombas: { 6: 3, 14: 3 },
    quiz: {
      3: {
        pergunta: "Qual é a principal função da macroscopia?",
        alternativas: [
          "Realizar coloração de tecidos.",
          "Descrever visualmente as características da peça ou fragmento recebido.",
          "Observar lâminas no microscópio.",
        ],
        correta: 1,
        explicacao:
          "Descrever visualmente as características da peça ou fragmento recebido. ",
      },
      5: {
        pergunta:
          "Qual das opções a seguir representa uma descrição macroscópica adequada?",
        alternativas: [
          "Tecido vermelho.",
          "Fragmento de tecido esbranquiçado, medindo 2,0 x 1,5 cm, consistência firme.",
          "Fragmento pequeno.",
        ],
        correta: 1,
        explicacao:
          ". Fragmento de tecido esbranquiçado, medindo 2,0 x 1,5 cm, consistência firme.",
      },
      9: {
        pergunta: "Em relação às peças cirúrgicas, qual conduta é essencial?",
        alternativas: [
          " Medir, pesar, identificar margens e possíveis lesões antes da amostragem.",
          " Cortá-las em pedaços pequenos.",
          "Apenas remover o excesso de gordura.",
        ],
        correta: 0,
        explicacao: "Tamanho, forma, cor, consistência e aspecto das lesões.",
      },
    },
    background: "url('image/background/fase02.jpeg')",
  },
  {
    nome: "Fase 3 - Histoprocessamento",
    estrutura: [
      [1, 2, 3],
      [null, null, 4],
      [null, null, 5],
      [null, null, 6],
      [9, 8, 7],
      [10, null, null],
      [11, null, null],
      [12, 13, 14],
    ],
    max: 14,
    bombas: { 9: 3 },
    quiz: {
      3: {
        pergunta: "O histoprocessamento tem como objetivo principal:",
        alternativas: [
          "Preparar a amostra para visualização direta no microscópio",
          "Preservar o tecido e permitir a inclusão em parafina.",
          "Colorir o material para facilitar o diagnóstico.",
        ],
        correta: 1,
        explicacao: " Preservar o tecido e permitir a inclusão em parafina.",
      },
      6: {
        pergunta:
          " Qual a ordem correta dos reagentes no processo de histoprocessamento?",
        alternativas: [
          "Fixação → Desidratação → Diafanização → Impregnação em parafina.",
          "Lavagem → Inclusão → Fixação",
          "Diafanização → Coragem → Desidratação.",
        ],
        correta: 1,
        explicacao:
          "Fixação → Desidratação → Diafanização → Impregnação em parafina.",
      },
      12: {
        pergunta:
          "CQual equipamento é utilizado para automatizar o histoprocessamento?",
        alternativas: ["Centrifuga", "Micrótomo", "Histotécnico"],
        correta: 2,
        explicacao:
          "O histotécnico ou processador de tecido é responsável pelo processamento do tecido biológico.",
      },
    },
    background: "url('image/background/fase03.jpeg')",
  },
  {
    nome: "Fase 4 - Emblocamento",
    estrutura: [
      [1, null, null],
      [2, null, null],
      [3, 4, 5],
      [null, null, 6],
      [9, 8, 7],
      [10, null, null],
      [11, null, null],
      [12, 13, 14],
    ],
    max: 14,
    bombas: { 9: 3 },
    quiz: {
      3: {
        pergunta:
          "O que pode ocorrer se o fragmento for orientado de forma inadequada durante o emblocamento?",
        alternativas: [
          "Apenas a estética da lâmina será afetada.",
          "Não será possível realizar o corte adequado e análise histológica.",
          " A coloração será alterada.",
        ],
        correta: 1,
        explicacao:
          "Não será possível realizar o corte adequado e análise histológica.",
      },
      5: {
        pergunta: "Qual é o símbolo de comentário em JavaScript?",
        alternativas: ["<!-- -->", "//", "#"],
        correta: 1,
        explicacao: "O comentário de linha em JavaScript usa duas barras: //.",
      },
      11: {
        pergunta: "O uso da pinça no emblocamento é importante para:",
        alternativas: [
          " Misturar a parafina.",
          "Aquecer o bloco mais rápido.",
          "Manipular com precisão os pequenos fragmentos sem contaminá-los",
        ],
        correta: 2,
        explicacao:
          "Manipular com precisão os pequenos fragmentos sem contaminá-los.",
      },
    },
    background: "url('image/background/fase04.jpeg')",
  },
  {
    nome: "Fase 5 - Microtomia",
    estrutura: [
      [1, 2, null],
      [null, 3, null],
      [null, 4, 5],
      [null, null, 6],
      [9, 8, 7],
      [10, null, null],
      [11, 12, 13],
      [null, null, 14],
    ],
    max: 14,
    bombas: { 9: 3 },
    quiz: {
      3: {
        pergunta:
          "Qual equipamento é utilizado para realizar os cortes histológicos?",
        alternativas: ["Criostato", "Micrótomo", "Histotécnico"],
        correta: 1,
        explicacao:
          "O microtómo é o equipamento utilizado para realizar cortes hisstológicos.",
      },
      5: {
        pergunta:
          "Qual a espessura média de um corte histológico obtido na microtomia?",
        alternativas: [
          "3 a 5 micrômetros",
          "1 a 2 milímetros.",
          "0,1 centímetro.",
        ],
        correta: 1,
        explicacao:
          "3 a 5 micrômetros, depende da consistêcia do materia a ser cortado.",
      },
      8: {
        pergunta: "O que NÃO causa rugas ou dobras nos cortes histológicos?",
        alternativas: [
          "Temperatura inadequada do banho-maria",
          "Uso de lâmina ou lâmina de corte sem fio ou danificada",
          "Espessura adequada do corte (geralmente entre 3 a 5 µm);",
        ],
        correta: 2,
        explicacao:
          "Rugas ou dobras nos cortes histológicos não são causadas quando se utiliza um micrótomo bem calibrado com lâmina afiada, realiza-se o corte com espessura adequada, utiliza-se um banho-maria na temperatura correta e garante-se o estiramento e a secagem apropriada da lâmina.",
      },
    },
    background: "url('image/background/fase05.jpeg')",
  },
  {
    nome: "Fase 6 - Histoquimica",
    estrutura: [
      [1, 2, 3],
      [null, null, 4],
      [7, 6, 5],
      [8, null, null],
      [9, 10, 11],
      [null, null, 12],
      [15, 14, 13],
      [16, null, null],
    ],
    max: 16,
    bombas: { 9: 3 },
    quiz: {
      5: {
        pergunta:
          "Qual é a coloração histológica padrão mais utilizada para avaliação geral de tecidos?",
        alternativas: [
          "Ziehl-Neelsen.",
          "Hematoxilina e Eosina (HE).",
          "Grocott",
        ],
        correta: 1,
        explicacao:
          "A coloração de Hematoxilina e Eosina é a mais utilizada na histologia por proporcionar excelente contraste entre núcleos e citoplasma, permitindo uma avaliação geral clara e eficiente dos tecidos.",
      },
      10: {
        pergunta:
          "Qual coloração é indicada para identificação do Helicobacter pylori?",
        alternativas: ["Giemsa", "Grocott", "Ziehl-Neelsen"],
        correta: 0,
        explicacao:
          "A coloração de Giemsa é indicada para identificar o Helicobacter pylori, pois cora os bacilos em tons de azul-escuro sobre um fundo mais claro, permitindo visualização nítida da morfologia espiralada das bactérias de forma simples e econômica..",
      },
      15: {
        pergunta: ". A coloração de Grocott é especialmente útil para:",
        alternativas: [
          "Detectar bactérias gram-negativas.",
          "Avaliar necrose",
          "Evidenciar fungos.",
        ],
        correta: 2,
        explicacao:
          "A coloração de Grocott (Grocott-Gomori) é especialmente útil para identificar fungos porque a técnica de prata impregna seletivamente os polissacarídeos da parede fúngica, tingindo-os de preto intenso sobre um fundo esverdeado ou claro, o que realça de forma nítida a morfologia de hifas e leveduras mesmo em quantidade reduzida.",
      },
    },
    background: "url('image/background/fase06.jpeg')",
  },
  {
    nome: "Fase 7 - Microscopia",
    estrutura: [
      [1, 2, 3],
      [null, null, 4],
      [7, 6, 5],
      [8, null, null],
      [9, 10, 11],
      [null, null, 12],
      [15, 14, 13],
      [16, null, null],
    ],
    max: 16,
    bombas: { 9: 3 },
    quiz: {
      5: {
        pergunta:
          "O que é necessário para obter uma imagem nítida ao usar o microscópio?",
        alternativas: [
          "Ajustar o foco, iluminação e distância interpupilar corretamente.",
          "Apenas ligar o equipamento.",
          "Aproximar o olho da lente o máximo possível.",
        ],
        correta: 0,
        explicacao:
          "Ajustar o foco, iluminação e distância interpupilar corretamente.",
      },
      10: {
        pergunta: "A lente objetiva de 40x é utilizada para:",
        alternativas: [
          "Ver tecido como um todo.",
          "Observar detalhes celulares com boa definição.",
          "Observar fungos em cultura.",
        ],
        correta: 1,
        explicacao: "Observar detalhes celulares com boa definição.",
      },
      13: {
        pergunta:
          "Qual parte do microscópio óptico controla a quantidade de luz que chega à amostra?",
        alternativas: ["Ocular", "Diafragma", "Revólver"],
        correta: 1,
        explicacao:
          "O diafragma do microscópio é um dispositivo ajustável, geralmente em forma de íris, que regula a quantidade e o ângulo do feixe de luz que atravessa a amostra, otimizando contraste e resolução.",
      },
      15: {
        pergunta:
          "Qual componente sustenta a lâmina e permite seu posicionamento preciso sob as objetivas?",
        alternativas: ["Platina mecânica", "Condensador", "Base"],
        correta: 0,
        explicacao:
          "A platina mecânica é a plataforma ajustável do microscópio que sustenta a lâmina e permite seu deslocamento preciso nos eixos X e Y por meio de controles graduados.",
      },
    },
    background: "url('image/background/fase07.jpeg')",
  },
];

function renderizarMapa(mapa) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  let max = 0;

  // ✅ Novo trecho: define o background da fase
  const gameArea = document.querySelector("#game-area");
  gameArea.style.backgroundImage = mapa.background;
  gameArea.style.backgroundSize = "cover";
  gameArea.style.backgroundPosition = "center";

  for (let linha of mapa.estrutura) {
    for (let valor of linha) {
      if (valor) {
        const isBomba = mapa.bombas && mapa.bombas[valor];
        const isQuiz = mapa.quiz && mapa.quiz[valor];
        let cellContent = valor;
        if (isBomba) {
          cellContent =
            '<img src="image/perigoV6.png" alt="Bomba" class="casa-bomba">';
        } else if (isQuiz) {
          cellContent =
            '<img src="image/quizV6.png" alt="Quiz" class="casa-quiz">';
        }
        container.innerHTML += `<div class=\"cell\" id=\"cell-${valor}\">${cellContent}</div>`;
        if (valor > max) max = valor;
      } else {
        container.innerHTML += `<div class="cell nocell"></div>`;
      }
    }
  }

  maxPosition = mapa.max || max;
  document.getElementById("faseAtual").innerText = mapa.nome;
  currentPosition = 1;
  document.getElementById("currentPositionDisplay").innerText =
    "Posição Atual: 1";

  const startCell = document.getElementById(`cell-${currentPosition}`);
  const player = document.getElementById("player");
  const rect = startCell.getBoundingClientRect();
  const parentRect = document
    .querySelector(".container")
    .getBoundingClientRect();
  player.style.left = rect.left - parentRect.left + "px";
  player.style.top = rect.top - parentRect.top + "px";
}

function startGame() {
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
  rollDice();
}

let isMoving = false;

function rollDice() {
  if (isMoving) return;

  const steps = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText = "Dado: " + steps;
  isMoving = true;
  movePlayer(steps);
}

function movePlayer(steps) {
  const mapaAtual = mapas[currentMapIndex];
  const player = document.getElementById("player");

  let destino = currentPosition + steps;
  if (destino > maxPosition) destino = maxPosition;

  let posicaoAtual = currentPosition;
  isMoving = true;

  function moverPasso() {
    if (posicaoAtual >= destino) {
      currentPosition = destino;
      document.getElementById("currentPositionDisplay").innerText =
        "Posição Atual: " + currentPosition;

      setTimeout(() => {
        // Verifica bomba
        if (mapaAtual.bombas && mapaAtual.bombas[currentPosition]) {
          const retroceder = mapaAtual.bombas[currentPosition];
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Você caiu numa bomba!",
            footer: "e vai retroceder " + `${retroceder}` + " casas!",
          });

          let novaPos = currentPosition - retroceder;
          if (novaPos < 1) novaPos = 1;
          posicionarNaCasa(novaPos);

          if (mapaAtual.quiz && mapaAtual.quiz[novaPos]) {
            exibirQuiz(novaPos, mapaAtual.quiz[novaPos]);
          }
        } else if (mapaAtual.quiz && mapaAtual.quiz[currentPosition]) {
          exibirQuiz(currentPosition, mapaAtual.quiz[currentPosition]);
        }

        if (currentPosition === maxPosition) {
          clearInterval(timerInterval);
          setTimeout(() => {
            const continuar = Swal.fire({
              title: "Você concluiu a fase! <br />Vamos para a próxima?",
              icon: "success",
              draggable: true,
            });

            if (continuar && currentMapIndex < mapas.length - 1) {
              currentMapIndex++;
              carregarFaseAtual();
            } else {
              finalizarJogo();
            }
          }, 300);
        }

        isMoving = false;
      }, 500);
      return;
    }

    posicaoAtual++;
    posicionarNaCasa(posicaoAtual);
    setTimeout(moverPasso, 400);
  }

  moverPasso();
}

function posicionarNaCasa(pos) {
  const targetCell = document.getElementById(`cell-${pos}`);
  if (!targetCell) return;
  const rect = targetCell.getBoundingClientRect();
  const parentRect = document
    .querySelector(".container")
    .getBoundingClientRect();
  const player = document.getElementById("player");
  player.style.left = rect.left - parentRect.left + "px";
  player.style.top = rect.top - parentRect.top + "px";
  currentPosition = pos;
  document.getElementById("currentPositionDisplay").innerText =
    "Posição Atual: " + currentPosition;

  const somPato = new Audio("audio/audioPato.mp3"); // Caminho do som
  somPato.play();
}

function exibirQuiz(posicao, quiz) {
  const modal = document.createElement("div");
  modal.id = "quiz-modal";
  modal.innerHTML = `
    <div class="quiz-box">
      <h3>Quiz da Casa ${posicao}</h3>
      <p>${quiz.pergunta}</p>
      <form>
        ${quiz.alternativas
          .map(
            (alt, i) => `
          <label><input type="radio" name="resposta" value="${i}"> ${alt}</label><br>
        `
          )
          .join("")}
        <button type="button" id="responderBtn">RESPONDER</button>
      </form>
      <div id="feedback"></div>
    </div>
  `;
  Object.assign(modal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999",
  });

  document.body.appendChild(modal);

  document.getElementById("responderBtn").onclick = () => {
    const resposta = modal.querySelector('input[name="resposta"]:checked');
    if (!resposta) {
      Swal.fire("Atenção", "Por favor, selecione uma resposta.", "warning");
      return;
    }

    const valor = parseInt(resposta.value);
    const acertou = valor === quiz.correta;

    if (acertou) {
      pontuacao += 10;
    } else {
      pontuacao -= 10;
    }

    document.getElementById("scoreDisplay").innerText =
      "Pontuação: " + pontuacao;

    // Criar box de explicação com botão FECHAR
    const explicacaoModal = document.createElement("div");
    explicacaoModal.classList.add("explicacao-box");
    explicacaoModal.innerHTML = `
    <div class="explicacao-conteudo">
      <p>Explicação: A resposta ${quiz.correta + 1} está ${
      acertou ? "CORRETA" : "INCORRETA"
    } porque ${quiz.explicacao}</p>
      <button class="botao-fechar-explicacao">FECHAR</button>
    </div>
  `;

    document.body.appendChild(explicacaoModal);
    modal.remove(); // remove o modal do quiz

    explicacaoModal.querySelector(".botao-fechar-explicacao").onclick = () => {
      explicacaoModal.remove();
    };
  };
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timer").innerText = "Tempo: " + elapsed + "s";
}

function carregarFaseAtual() {
  startTime = null;
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById("timer").innerText = "Tempo: 0s";
  document.getElementById("diceResult").innerText = "Dado: ?";
  renderizarMapa(mapas[currentMapIndex]);
}

function finalizarJogo() {
  const botao = document.getElementById("actionButton");
  botao.innerText = "Reiniciar Jogo";
  botao.onclick = reiniciarJogo;
}

function reiniciarJogo() {
  currentMapIndex = 0;
  carregarFaseAtual();
  const botao = document.getElementById("actionButton");
  botao.innerText = "Jogar";
  botao.onclick = startGame;
}

window.onload = carregarFaseAtual;
