// Array de objetos com informações das músicas
const musicas = [
    {
        titulo: "Neon Dreams",
        artista: "Luna Echo",
        capaUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        titulo: "Digital Horizon",
        artista: "Synth Wave",
        capaUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        titulo: "Midnight City",
        artista: "Urban Sound",
        capaUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        titulo: "Electric Pulse",
        artista: "Circuit Breaker",
        capaUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        titulo: "Stellar Vibes",
        artista: "Cosmic Frequency",
        capaUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        titulo: "Aurora Wave",
        artista: "Ethereal Sound",
        capaUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop",
        urlMusica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
];

// Variável global para controlar a música em reprodução
let musicaAtual = null;
let indexMusicaAtual = null;
let estaTocando = false;

// Função que renderiza as músicas no HTML
function renderizarMusicas() {
    const listaDeMusicas = document.getElementById('lista-de-musicas');
    
    // Limpar conteúdo anterior (se houver)
    listaDeMusicas.innerHTML = '';
    
    // Iterar sobre o array de músicas
    musicas.forEach((musica, index) => {
        // Criar o HTML do card
        const cardHTML = `
            <div class="musica-card">
                <img src="${musica.capaUrl}" alt="Capa de ${musica.titulo}">
                <h3>${musica.titulo}</h3>
                <p>${musica.artista}</p>
                <button class="play-btn" id="btn-${index}" onclick="toggleMusica(${index})">▶ Reproduzir</button>
            </div>
        `;
        
        // Inserir o card no container
        listaDeMusicas.innerHTML += cardHTML;
    });
}

// Função para reproduzir/pausar a música (toggle)
function toggleMusica(index) {
    const musica = musicas[index];
    const botao = document.getElementById(`btn-${index}`);
    
    // Se clicou na mesma música que está tocando, pausar
    if (indexMusicaAtual === index && estaTocando) {
        musicaAtual.pause();
        estaTocando = false;
        botao.textContent = '▶ Reproduzir';
        console.log(`⏸ Pausado: ${musica.titulo}`);
        return;
    }
    
    // Se clicou na mesma música mas estava pausada, retomar
    if (indexMusicaAtual === index && !estaTocando) {
        musicaAtual.play();
        estaTocando = true;
        botao.textContent = '⏸ Pausar';
        botao.style.backgroundColor = '#1ed760';
        console.log(`▶ Retomando: ${musica.titulo}`);
        return;
    }
    
    // Se há outra música tocando, parar
    if (musicaAtual) {
        musicaAtual.pause();
        const botaoAnterior = document.getElementById(`btn-${indexMusicaAtual}`);
        if (botaoAnterior) {
            botaoAnterior.textContent = '▶ Reproduzir';
            botaoAnterior.style.backgroundColor = '#1db954';
        }
    }
    
    // Criar novo elemento de áudio e tocar
    musicaAtual = new Audio(musica.urlMusica);
    musicaAtual.play();
    
    indexMusicaAtual = index;
    estaTocando = true;
    
    // Atualizar botão
    botao.textContent = '⏸ Pausar';
    botao.style.backgroundColor = '#1ed760';
    
    // Feedback visual
    console.log(`🎵 Tocando: ${musica.titulo} - ${musica.artista}`);
    
    // Retornar ao estado normal quando terminar a música
    musicaAtual.addEventListener('ended', () => {
        botao.textContent = '▶ Reproduzir';
        botao.style.backgroundColor = '#1db954';
        estaTocando = false;
        musicaAtual = null;
        indexMusicaAtual = null;
    });
}

// Executar a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);
