
// FALAS do Pato-Guia para cada item em cada paginacao
const falasPatoPorPaginacao = {
  paginacao0: [
    "Olá, bem vindo. Sou o Pato Roberto. Quer saber como tudo começa no nosso laboratório de patologia? Então utilize a seta para continuar.",
    "Aqui aprendemos sobre a história da patologia.",
    "Vamos explorar o mapa do laboratório! Cada etapa é importante vamos entender como tudo funciona."
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
    "Veja outras técnicas além do HE.",
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

function mostrarFalaPato(texto) {
  const fala = document.getElementById("pato-fala");
  const avatar = document.getElementById("pato-img"); // avatar do pato

  if (!fala || !avatar) return;
  fala.textContent = texto;
  fala.style.opacity = 1;
  avatar.style.opacity = 1; // mostrar avatar também

  clearTimeout(window._patoFalaTimeout);
  window._patoFalaTimeout = setTimeout(() => {
    fala.style.opacity = 0;
    avatar.style.opacity = 0; // esconder avatar junto com fala
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

function setupNavegacaoComPatoGuia() {
  document.querySelectorAll('.paginacao-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.paginacao');
    const items = container.querySelectorAll('.item');
    const leftBtn = wrapper.querySelector('.arrow-triangle.left');
    const rightBtn = wrapper.querySelector('.arrow-triangle.right');

    if (!container || !items.length || !leftBtn || !rightBtn) return;

    const scrollAmount = items[0].offsetWidth;

    function handleScroll(btn, direction) {
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        updateArrowVisibility(wrapper);
        const index = detectarItemVisivel(container);
        const fala = falasPatoPorPaginacao[container.id]?.[index];
        if (fala) mostrarFalaPato(fala);
      }, 400);
    }

    leftBtn.addEventListener('click', () => handleScroll(leftBtn, -1));
    rightBtn.addEventListener('click', () => handleScroll(rightBtn, 1));

    container.addEventListener('scroll', () => {
      updateArrowVisibility(wrapper);
      const index = detectarItemVisivel(container);
      const fala = falasPatoPorPaginacao[container.id]?.[index];
      if (fala) mostrarFalaPato(fala);
    });

    // Inicializa visibilidade e fala ao carregar
    updateArrowVisibility(wrapper);
    const index = detectarItemVisivel(container);
    const fala = falasPatoPorPaginacao[container.id]?.[index];
    if (fala) mostrarFalaPato(fala);
  });
}

// NOVO: Detecta mudança de seção ao rolar ou clicar no mapa
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
});
