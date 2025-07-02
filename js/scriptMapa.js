document.addEventListener("DOMContentLoaded", function () {
  const mapas = ["vert", "horiz"];
  const verticalMap = document.querySelector(".map-container-vertical");
  const horizontalMap = document.querySelector(".map-container-horizontal");

  // Ativa o mapa certo conforme largura da tela
  function ativarMapaCorreto() {
    const larguraTela = window.innerWidth;

    if (larguraTela < 768) {
      verticalMap.classList.remove("map-desativo");
      horizontalMap.classList.add("map-desativo");
    } else {
      horizontalMap.classList.remove("map-desativo");
      verticalMap.classList.add("map-desativo");
    }
  }

  // Restaurar progresso salvo
  for (let i = 1; i <= 9; i++) {
    mapas.forEach((mapa) => {
      const circle = document.getElementById(`circle${i}-${mapa}`);
      if (!circle) return;

      if (localStorage.getItem(`circle-${i}-visited`) === "true") {
        circle.classList.add("visited");
      }
      if (localStorage.getItem(`circle-${i}-enabled`) === "true") {
        circle.classList.remove("disabled");
      }

      if (localStorage.getItem(`circle-${i}-enabled`) === "true") {
        circle.classList.remove("disabled");
      }
    });
  }

  // Ativar clique e salvar progresso
  for (let i = 1; i <= 8; i++) {
    mapas.forEach((mapa) => {
      const currentCircle = document.getElementById(`circle${i}-${mapa}`);
      const nextCircle = document.getElementById(`circle${i + 1}-${mapa}`);
      if (!currentCircle) return;

      currentCircle.addEventListener("click", function () {
        currentCircle.classList.add("visited");
        localStorage.setItem(`circle-${i}-visited`, "true");
        localStorage.setItem(`circle-${i + 1}-enabled`, "true");

        if (nextCircle) {
          nextCircle.classList.remove("disabled");
        }
      });
    });
  }

  // Mostrar texto do data-step ao clicar
  mapas.forEach((mapa) => {
    for (let i = 1; i <= 9; i++) {
      const link = document.getElementById(`circle${i}-${mapa}`);
      if (!link) continue;

      link.addEventListener("click", function () {
        const alreadyClicked = this.classList.contains("clicked");
        if (!alreadyClicked) {
          setTimeout(() => {
            const stepTitle = this.getAttribute("data-step");
            this.textContent = stepTitle;
            this.classList.add("clicked", "visited");
          }, 500);
        }
      });
    }
  });

  // Ativar mapa correto ao carregar e redimensionar
  ativarMapaCorreto();
  window.addEventListener("resize", ativarMapaCorreto);
});
