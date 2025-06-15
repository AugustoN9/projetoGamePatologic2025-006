const falaPato = document.getElementById('pato-fala');

// Mensagens por seção
const mensagens = {
  sec1: "Olá, bem vindo. Sou o Pato Roberto. Quer saber como tudo começa no nosso laboratório de patologia? Então utilize a seta para continuar.",
  sec2: "Bem-vindo ao setor de Registro!",
  sec3: "Hora da Macroscopia! Vamos observar a olho nu.",
  sec4: "O histoprocessamento transforma o material para análise.",
  sec5: "No emblocamento, o tecido entra na parafina.",
  sec6: "Agora, cortes superfinos com a microtomia.",
  sec7: "Aqui usamos corantes para ver detalhes incríveis!",
  sec8: "Vamos olhar tudo no microscópio!",
  sec9: "Vamos jogar e testar seu conhecimento?",
  sec10: "Conheça mais sobre o projeto!",
  sec11: "Aqui está a equipe responsável."
};

// Função que exibe a fala do Pato ao entrar na seção
function mostrarFala(secao) {
  if (mensagens[secao]) {
    falaPato.textContent = mensagens[secao];
    falaPato.style.opacity = 1;
    clearTimeout(window.falaTimeout);
    window.falaTimeout = setTimeout(() => {
      falaPato.style.opacity = 0;
    }, 9000);
  }
}

// Detectar mudança de seção com IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      mostrarFala(entry.target.id);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll("section[id]").forEach(sec => observer.observe(sec));


    document.querySelectorAll('.arrow-triangle').forEach(btn => {
  btn.addEventListener('click', () => {
    const containerId = btn.dataset.target;
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.item');
    const itemWidth = items[0].offsetWidth;
    const direction = btn.classList.contains('right') ? 1 : -1;

    container.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth'
    });
  });
});