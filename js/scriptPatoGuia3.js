const falasPatoPorPaginacao = {
  paginacao0: [
    "Olá! Seja muito bem-vindo, eu sou o Ducktor, seu guia nesta jornada de descobertas. Vamos explorar juntos e entender como tudo funciona por aqui. Está pronto para começar? Então clique na seta e venha comigo!",
    "O laboratório possui subdivisões, cada uma com uma responsabilidade. Não deixe de ver as fases do processo diagnóstico.",
    "Já imaginaram o que acontece com aquele exame que seu médico pedi, aquela biopsia, aquela coleta do preventivo ginecológico?",
    "Aqui aprendemos sobre a história da patologia.",
    "Se não se importa vou chamar você de Patolovers, leia esta informação é muito explicativa, quack! ",
    "Vamos explorar o mapa do laboratório! Cada etapa é importante vamos entender como tudo funciona. Clique o circulo disponível azul."
  ],
  paginacao1: [
    "Tudo começa com o recebimento da amostra. Este é o setor de Registro.",
    "Etapas da verificação no recebimento.",
    "Cadastro no sistema.",
    "Protocolo de não conformidades.",
    "Boas práticas no registro!"
  ],
  paginacao2: [
    "Chegamos à Macroscopia! Hora de observar a olho nu.",
    "Veja as etapas do processo.",
    "Você sabia? O tempo de fixação é essencial!"
  ],
  paginacao3: [
    "Hora do Histoprocessamento!",
    "Entenda como o tecido é preparado.",
    "Veja as etapas químicas do processo.",
    "Última etapa antes do corte.",
    "Você sabia? A desidratação é essencial!"
  ],
  paginacao4: [
    "Emblocamento em ação!",
    "Veja como o bloco é montado.",
    "Orientação correta é fundamental!"
  ],
  paginacao5: [
    "Vamos cortar! Estamos na Microtomia.",
    "Veja como a lâmina é feita.",
    "Você sabia? Cortes de 3 a 5 µm!"
  ],
  paginacao6: [
    "Vamos colorir! Chegamos na Coloração.",
    "Observe o esquema que ilustra o protocolo de coloração do HE.",
    "Você sabia? Hematoxilina cora o núcleo!"
  ],
  paginacao7: [
    "É hora da Microscopia!",
    "Explore os detalhes no microscópio.",
    "Você sabia? Até 1000x de aumento!"
  ],
  paginacao8: [
    "Precisamos arquivar tudo que é referente ao paciente!",
    "O material do paciente deve ser guardado, tanto laminas como blocos.",
    "Você sabia? Que uma lamina deve ser guardada por 10 anos!"
  ]
};

const falaRetornoIntro = "Bem-vindo de volta! Pronto para continuar a jornada de conhecimento no nosso laboratório?";
let patoIntroJaExibido = false;

function mostrarFalaPato(texto, forcar = false) {
  const fala = document.getElementById("pato-fala");
  const avatar = document.getElementById("pato-img");

  if (!fala || !avatar) return;

  const isIntro = texto === falasPatoPorPaginacao.paginacao0[0];

  if (!forcar && isIntro) {
    if (patoIntroJaExibido) {
      texto = falaRetornoIntro;
    } else {
      patoIntroJaExibido = true;
    }
  }

  fala.textContent = texto;
  fala.style.opacity = 1;
  avatar.style.opacity = 1;

  clearTimeout(window._patoFalaTimeout);
  window._patoFalaTimeout = setTimeout(() => {
    fala.style.opacity = 0;
    avatar.style.opacity = 0;
  }, 9000);
}

function detectarItemVisivel(container) {
  const items = container.querySelectorAll('.item');
  if (!items.length) return 0;
  const scrollLeft = container.scrollLeft;
  const itemWidth = items[0].offsetWidth;
  return Math.round(scrollLeft / itemWidth);
}

function updateArrowVisibility(wrapper) {
  const container = wrapper.querySelector('.paginacao');
  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;

  const leftBtn = wrapper.querySelector('.arrow-triangle.left');
  const rightBtn = wrapper.querySelector('.arrow-triangle.right');

  if (!leftBtn || !rightBtn) return;

  leftBtn.style.display = scrollLeft <= 1 ? 'none' : 'block';
  const atEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) <= 2;
  rightBtn.style.display = atEnd ? 'none' : 'block';
}

function atualizarFalaDoPato(container) {
  const index = detectarItemVisivel(container);
  const fala = falasPatoPorPaginacao[container.id]?.[index];
  if (fala) mostrarFalaPato(fala);
}

function setupNavegacaoComPatoGuia() {
  document.querySelectorAll('.paginacao-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.paginacao');
    const items = container.querySelectorAll('.item');
    const leftBtn = wrapper.querySelector('.arrow-triangle.left');
    const rightBtn = wrapper.querySelector('.arrow-triangle.right');

    if (!container || !items.length || !leftBtn || !rightBtn) return;

    const scrollAmount = items[0].offsetWidth;

    function handleScroll(direction) {
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        updateArrowVisibility(wrapper);
        atualizarFalaDoPato(container);
      }, 400);
    }

    leftBtn.addEventListener('click', () => handleScroll(-1));
    rightBtn.addEventListener('click', () => handleScroll(1));

    container.addEventListener('scroll', () => {
      updateArrowVisibility(wrapper);
      atualizarFalaDoPato(container);
    });

    updateArrowVisibility(wrapper);
  });
}

function observarMudancaDeSecao() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const paginacao = section.querySelector('.paginacao');
        if (paginacao) {
          const id = paginacao.id;
          const fala = falasPatoPorPaginacao[id]?.[0];
          if (fala) mostrarFalaPato(fala);
        }
      }
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll("section[id^='sec']").forEach(sec => {
    observer.observe(sec);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupNavegacaoComPatoGuia();
  observarMudancaDeSecao();

  // Mostra fala inicial explicitamente para garantir
  const falaInicial = falasPatoPorPaginacao.paginacao0[0];
  mostrarFalaPato(falaInicial, true);
});
