document.addEventListener("DOMContentLoaded", () => {
    // Captura elementos do DOM
    const canvas = document.getElementById("forcaCanvas");
    const ctx = canvas.getContext("2d");
    const palavraDisplay = document.getElementById("palavra");
    const letrasContainer = document.getElementById("letras");
    const dicaDisplay = document.createElement("p"); 
    const btnReiniciar = document.getElementById("reiniciar");

    // Insere o parágrafo da dica antes do display da palavra
    document.getElementById("jogo").insertBefore(dicaDisplay, palavraDisplay);

    // Lista de palavras com dicas
    const palavrasComDicas = [
        { palavra: "javascript", dica: "Linguagem de programação usada na web" },
        { palavra: "html", dica: "Linguagem de marcação para estruturar páginas" },
        { palavra: "css", dica: "Linguagem usada para estilizar páginas web" },
        { palavra: "canvas", dica: "Elemento do HTML5 para desenhar gráficos" },
        { palavra: "forca", dica: "Jogo de adivinhação com palavras" },
        { palavra: "python", dica: "Linguagem de programação famosa pela simplicidade" },
        { palavra: "react", dica: "Biblioteca JavaScript para construção de interfaces" },
        { palavra: "node", dica: "Ambiente JavaScript para execução no servidor" },
        { palavra: "github", dica: "Plataforma para hospedagem de código-fonte" },
    ];

    let palavraSecreta = "";
    let dica = "";
    let letrasCorretas = [];
    let tentativasRestantes = 6;

    // Escolhe uma palavra aleatória e inicializa o jogo
    function escolherPalavra() {
        const escolha = palavrasComDicas[Math.floor(Math.random() * palavrasComDicas.length)];
        palavraSecreta = escolha.palavra;
        dica = escolha.dica;
        letrasCorretas = Array(palavraSecreta.length).fill("_");
        palavraDisplay.textContent = letrasCorretas.join(" ");
        dicaDisplay.textContent = "Dica: " + dica;
    }

    // Desenha a forca e o boneco com base nas tentativas restantes
    function desenharForca() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000";

        // Base da forca
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(150, 250);
        ctx.stroke();

        // Estrutura da forca
        ctx.beginPath();
        ctx.moveTo(100, 250);
        ctx.lineTo(100, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 80);
        ctx.stroke();

        // Partes do boneco
        if (tentativasRestantes <= 5) { 
            ctx.beginPath();
            ctx.arc(200, 100, 20, 0, Math.PI * 2); // Cabeça
            ctx.stroke();
        }
        if (tentativasRestantes <= 4) { 
            ctx.beginPath();
            ctx.moveTo(200, 120);
            ctx.lineTo(200, 180); // Tronco
            ctx.stroke();
        }
        if (tentativasRestantes <= 3) { 
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(170, 160); // Braço esquerdo
            ctx.stroke();
        }
        if (tentativasRestantes <= 2) { 
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(230, 160); // Braço direito
            ctx.stroke();
        }
        if (tentativasRestantes <= 1) { 
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(170, 210); // Perna esquerda
            ctx.stroke();
        }
        if (tentativasRestantes === 0) { 
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(230, 210); // Perna direita
            ctx.stroke();
            setTimeout(() => alert("Fim de jogo! A palavra era: " + palavraSecreta), 500);
        }
    }

    // Cria um teclado virtual para o usuário escolher letras
    function criarTeclado() {
        letrasContainer.innerHTML = "";
        for (let i = 65; i <= 90; i++) {
            const letra = String.fromCharCode(i).toLowerCase();
            const btn = document.createElement("button");
            btn.textContent = letra;
            btn.addEventListener("click", () => verificarLetra(letra));
            letrasContainer.appendChild(btn);
        }
    }

    // Verifica se a letra escolhida está na palavra
    function verificarLetra(letra) {
        if (palavraSecreta.includes(letra)) {
            palavraSecreta.split("").forEach((char, index) => {
                if (char === letra) letrasCorretas[index] = letra;
            });
            palavraDisplay.textContent = letrasCorretas.join(" ");
            if (!letrasCorretas.includes("_")) {
                setTimeout(() => alert("Parabéns! Você acertou!"), 500);
            }
        } else {
            tentativasRestantes--;
            desenharForca();
        }
    }

    // Captura teclas pressionadas no teclado físico
    function handleKeyPress(event) {
        const letra = event.key.toLowerCase();
        if (/^[a-z]$/.test(letra)) {
            verificarLetra(letra);
            const botoes = document.querySelectorAll("#letras button");
            botoes.forEach(botao => {
                if (botao.textContent === letra) botao.disabled = true;
            });
        }
    }

    // Inicializa o jogo
    function iniciarJogo() {
        escolherPalavra();
        tentativasRestantes = 6;
        desenharForca();
        criarTeclado();
        document.addEventListener("keydown", handleKeyPress);
    }

    // Reinicia o jogo ao clicar no botão
    btnReiniciar.addEventListener("click", () => {
        document.removeEventListener("keydown", handleKeyPress);
        iniciarJogo();
    });

    iniciarJogo();
});
