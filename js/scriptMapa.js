document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 8; i++) {
        const currentCircle = document.getElementById(`circle${i}`);
        const nextCircle = document.getElementById(`circle${i + 1}`);

        if (currentCircle) {
            currentCircle.addEventListener("click", function() {
                // Marcar como visitado
                currentCircle.classList.add("visited");
                
                // Liberar o próximo
                if (nextCircle) {
                    nextCircle.classList.remove("disabled");
                }
            });
        }
    }
});


document.querySelectorAll(".circle-link").forEach(link => {
    link.addEventListener("click", function (e) {
        const alreadyClicked = this.classList.contains("clicked");
        if (!alreadyClicked) {
            setTimeout(() => {
                const stepTitle = this.getAttribute("data-step");
                this.textContent = stepTitle;
                this.classList.add("clicked", "visited");
               
            }, 500);
        }
    });
});
