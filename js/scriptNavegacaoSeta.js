// Navegação com setas laterais ❮ ❯ em todas as seções com .paginacao-wrapper

// Aplica o comportamento de navegação e visibilidade automática das setas
function setupNavigationForAll() {
  document.querySelectorAll('.paginacao-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.paginacao');
    const items = container.querySelectorAll('.item');
    const leftBtn = wrapper.querySelector('.arrow-triangle.left');
    const rightBtn = wrapper.querySelector('.arrow-triangle.right');

    if (!container || !items.length || !leftBtn || !rightBtn) return;

    const scrollAmount = items[0].offsetWidth;

    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(() => updateArrowVisibility(wrapper), 400);
    });

    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => updateArrowVisibility(wrapper), 400);
    });

    container.addEventListener('scroll', () => updateArrowVisibility(wrapper));

    updateArrowVisibility(wrapper);
  });
}

// Corrige visibilidade das setas conforme posição do scroll
function updateArrowVisibility(wrapper) {
  const container = wrapper.querySelector('.paginacao');
  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;

  const leftBtn = wrapper.querySelector('.arrow-triangle.left');
  const rightBtn = wrapper.querySelector('.arrow-triangle.right');

  if (!leftBtn || !rightBtn) return;

  // Esconde a seta esquerda no início
  leftBtn.style.display = scrollLeft <= 1 ? 'none' : 'block';

  // Esconde a seta direita no fim (com margem de 2px)
  const atEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) <= 2;
  rightBtn.style.display = atEnd ? 'none' : 'block';
}

// Inicializa tudo após carregamento da página
window.addEventListener('DOMContentLoaded', setupNavigationForAll);
