let currentPosition = 1;
let startTime = null;
let timerInterval = null;
let respUser = false;

let gameStarted = false; // Variável para verificar se o jogo já começou
let gameNext = false;
let player = document.getElementById("player");
let replay = document.getElementById("replay");
let play = document.getElementById("play");

let cellToxic1 = document.getElementById("cell-7");
let cellToxic2 = document.getElementById("cell-14");
let cellToxic3 = document.getElementById("cell-28");

function exibirDialogoPato(mensagem) {
  let dialogo = document.getElementById("dialogoPato");
  dialogo.innerText = mensagem;
  dialogo.style.display = "block";
  setTimeout(() => {
    dialogo.style.display = "none";
  }, 9000);
}

function startGame() {
  exibirDialogoPato("Vamos lá! Role o dado!");

  if (!gameStarted) {
    gameStarted = true; // Marca o jogo como iniciado
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Impede múltiplas chamadas do botão antes de processar o movimento
  document.querySelector("button").disabled = true;

  rollDice();

  // Reativa o botão após o movimento ser processado
  setTimeout(() => {
    document.querySelector("button").disabled = false;
  }, 1000); // 1 segundo para evitar cliques excessivos
}

function reStartGame() {
  location.reload();
}

function rollDice() {
  face = document.getElementById("dado");
  let steps = Math.floor(Math.random() * 6) + 1; 
  face.style.backgroundImage = `url("./image/dado${steps}.PNG")`;
  
  movePlayer(steps);
}

function movePlayer(steps) {
  let newPosition = currentPosition + steps;

  console.log( newPosition)

  
  if (newPosition > 29) {
    
    exibirDialogoPato("Parabéns, fizemos um ótimo trabalho!");
    
    newPosition = 29;
  }
  

   if (newPosition == 7) {    

    const sirene = new Audio("./audio/sirene.mp3");
    sirene.play();
    cellToxic1.classList.add("piscando");
    setTimeout(() => {
      cellToxic1.classList.remove("piscando");
      newPosition = 1;   
    }, 10000);
    exibirDialogoPato("Que pena, caímos numa área contaminada na casa 8, vamos voltar para casa 1.");
    
  }

  else if (newPosition == 14) {
    const sirene = new Audio("../audio/sirene.mp3");
    sirene.play();
    cellToxic2.classList.add("piscando");
    setTimeout(() => {
      cellToxic2.classList.remove("piscando");
    }, 10000);
    exibirDialogoPato("Que pena, caímos numa área contaminada na casa 13, vamos voltar para casa 6.");
    newPosition = 6;
  }

  else if (newPosition == 28) {
    const sirene = new Audio("../audio/sirene.mp3");
    sirene.play();
    cellToxic3.classList.add("piscando");
    setTimeout(() => {
      cellToxic3.classList.remove("piscando");
    }, 10000);
    exibirDialogoPato("Que pena, caímos numa área contaminada na casa 13, vamos voltar para casa 10.");
    newPosition = 10;
  }
/*
  if (newPosition >= 15 && newPosition < 29) {
    exibirDialogoPato("Não desanime, estamos quase lá!");
  }
*/

  if (document.getElementById(`cell-${newPosition}`).classList.contains("quiz-cell")) {
        exibirDialogoPato("Agora vou testar seus conhecimentos!");
        showQuiz();
  }

  let targetCell = document.getElementById(`cell-${newPosition}`);

  if (!targetCell || targetCell.classList.contains("nocell")) {
    console.warn(`Célula ${newPosition} inválida. Mantendo posição.`);
    return;
  }

  let rect = targetCell.getBoundingClientRect();
  let parentRect = document.querySelector(".container").getBoundingClientRect();

  player.style.left = rect.left - parentRect.left + "px";
  player.style.top = rect.top - parentRect.top + "px";

  setTimeout(() => {
    currentPosition = newPosition;
    document.getElementById("currentPositionDisplay").innerText =
      currentPosition;

    // Exibe o quiz se for uma célula de quiz
    if (targetCell.classList.contains("quiz-cell")) {
      showQuiz();
    }

    // Alerta final do jogo

    if (currentPosition == 29) {
      clearInterval(timerInterval);
      let pontuacaoFinal = calcularPontuacaoFinal();
      let tempoFinal = document.getElementById("timer").innerText;
      play.style.display = "none";
      replay.style.display = "block";
    
      Swal.fire({
        title: `Parabéns! Você completou o jogo em ${tempoFinal} segundos.\nSua pontuação final é: ${pontuacaoFinal.toFixed(
          2
        )}`,
        icon: "success",
        draggable: true,
      });
    }
  }, 500);
}

function updateTimer() {
  if (startTime) {
    let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").innerText =
      "Tempo: " + elapsedSeconds + "s";
  }
}

// Lista de perguntas e respostas
const quizQuestions = [
  {
    question:
      "Qual é a principal molécula responsável pelo armazenamento de energia nas células?",
    options: ["Glicose", "ATP", "Proteína", "DNA"],
    correctAnswer: "ATP",
  },
  {
    question: "Qual desses é um exemplo de ácido nucleico?",
    options: ["Hemoglobina", "Insulina", "DNA", "Triglicerídeos"],
    correctAnswer: "DNA",
  },
  {
    question: "O que significa a sigla DNA?",
    options: [
      "Derivado Nuclear Ácido",
      "Ácido Desoxirribonucleico",
      "Ácido Dinuclear Atômico",
      "Nenhuma das anteriores",
    ],
    correctAnswer: "Ácido Desoxirribonucleico",
  },
  {
    question: "Qual é o resultado de 7²?",
    options: ["14", "49", "21", "64"],
    correctAnswer: "49",
  },
  {
    question:
      "Se um triângulo tem ângulos de 45° e 45°, qual é o terceiro ângulo?",
    options: ["60°", "45°", "90°", "75°"],
    correctAnswer: "90°",
  },
  {
    question: "Qual é o logaritmo de 100 na base 10?",
    options: ["1", "10", "2", "100"],
    correctAnswer: "2",
  },
  {
    question: "Qual é o número atômico do Oxigênio?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    question: "Qual é o nome do composto H₂SO₄?",
    options: [
      "Ácido clorídrico",
      "Ácido sulfúrico",
      "Ácido nítrico",
      "Ácido carbônico",
    ],
    correctAnswer: "Ácido sulfúrico",
  },
  {
    question: "O que significa pH 7 em uma solução?",
    options: [
      "Solução ácida",
      "Solução neutra",
      "Solução básica",
      "Solução oxidante",
    ],
    correctAnswer: "Solução neutra",
  },
  {
    question:
      "Qual é o nome do tecido que reveste a superfície externa do corpo?",
    options: [
      "Tecido Conjuntivo",
      "Tecido Epitelial",
      "Tecido Ósseo",
      "Tecido Muscular",
    ],
    correctAnswer: "Tecido Epitelial",
  },
  {
    question: "Qual é a principal célula do tecido ósseo?",
    options: ["Fibroblasto", "Osteócito", "Condrócito", "Neurônio"],
    correctAnswer: "Osteócito",
  },
  {
    question: "Qual é a proteína responsável pela contração muscular?",
    options: ["Hemoglobina", "Queratina", "Actina", "Colágeno"],
    correctAnswer: "Actina",
  },
];

function showQuiz() {
  let randomIndex = Math.floor(Math.random() * quizQuestions.length);
  let questionData = quizQuestions[randomIndex];

  let questionContainer = document.getElementById("questionContainer");
  let questionText = document.getElementById("questionText");
  let questionForm = document.getElementById("questionForm");
  let feedback = document.getElementById("feedback");

  questionForm.innerHTML = "";
  feedback.innerText = "";
  questionText.innerText = questionData.question;

  questionData.options.forEach((option) => {
    let label = document.createElement("label");
    let radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "quizAnswer";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + option));
    questionForm.appendChild(label);
    questionForm.appendChild(document.createElement("br"));
  });

  let answerButton = document.createElement("button");
  answerButton.innerText = "RESPONDER";
  answerButton.onclick = function (event) {
    event.preventDefault();
    checkAnswer(questionData.correctAnswer);
  };

  questionForm.appendChild(answerButton);

  questionContainer.style.display = "block";

  document.querySelector("btnJogar").disabled = true;
}

let pontuacao = 100;

function checkAnswer(correctAnswer) {
  let selectedOption = document.querySelector(
    "input[name='quizAnswer']:checked"
  );
  let feedback = document.getElementById("feedback");

  if (!selectedOption) {
    feedback.innerText = "Por favor, selecione uma resposta!";
    return;
  }

  let userAnswer = selectedOption.value;

  if (userAnswer === correctAnswer) {
    feedback.innerText = "✅ ACERTOU! A resposta correta é: " + correctAnswer;
    feedback.style.color = "green";
    pontuacao += 1; // Soma 1 ponto em caso de acerto
  } else {
    feedback.innerText = "❌ ERROU! A resposta correta era: " + correctAnswer;
    feedback.style.color = "red";
    pontuacao -= 1; // Diminui 1 ponto em caso de erro
  }

  document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao;
}

function calcularPontuacaoFinal() {
  let tempoFinal = Math.floor((Date.now() - startTime) / 1000);
  let pontuacaoFinal = pontuacao * ((1 / (tempoFinal + 1)) * 100);

  document.getElementById(
    "pontuacao"
  ).innerText = `Pontuação Final: ${pontuacaoFinal.toFixed(
    2
  )} (Base: ${pontuacao}, Tempo: ${tempoFinal}s)`;

  return pontuacaoFinal;
}

// Modifica o alerta ao finalizar o jogo
/*
    if (currentPosition === 25) {
      clearInterval(timerInterval);
      let pontuacaoFinal = calcularPontuacaoFinal();
      alert(
        `Parabéns! Você completou o jogo em ${tempoFinal} segundos.\nSua pontuação final foi: ${pontuacaoFinal.toFixed(
          2
        )}`
      );
    }
      */

function closeQuiz() {
  document.getElementById("questionContainer").style.display = "none";
  document.querySelector(".btnJogar").disabled = false;
}

function updateProgress() {
  let progress = (currentPosition / totalPositions) * 314;
  document.getElementById("progressCircle").style.strokeDashoffset =
    314 - progress;
}
