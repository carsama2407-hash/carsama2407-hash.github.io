// 1. Generador de Corazones
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 300);

// 2. Lógica del Carrusel
const inner = document.querySelector('.carousel-inner');
const cards = document.querySelectorAll('.card');
let index = 0;

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
});

function updateCarousel() {
    inner.style.transform = `translateX(${-index * 320}px)`;
}

// Función para pasar a la siguiente imagen automáticamente
function autoPlayCarousel() {
    index = (index + 1) % cards.length; // Incrementa el índice
    updateCarousel(); // Mueve el carrusel
}

// Configura el intervalo (1000 milisegundos = 1 segundo)
let carouselInterval = setInterval(autoPlayCarousel, 1500);

// OPCIONAL: Detener el carrusel cuando el usuario pasa el mouse por encima
const carouselContainer = document.querySelector('.carousel');

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval); // Se detiene
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(autoPlayCarousel, 1500); // Se reanuda
});

// 3. Reproductor de Música
const mainAudio = document.getElementById('main-audio');
const playIcon = document.getElementById('play-icon');
const progressCurrent = document.getElementById('progress-current');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// Función Play/Pause
function togglePlay() {
    if (mainAudio.paused) {
        mainAudio.play();
        playIcon.innerText = '⏸'; // Cambia a icono de pausa
    } else {
        mainAudio.pause();
        playIcon.innerText = '▶'; // Cambia a icono de play
    }
}

// Actualizar barra de progreso y tiempos
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    
    // Mover la barra
    let progressWidth = (currentTime / duration) * 100;
    progressCurrent.style.width = `${progressWidth}%`;

    // Calcular minutos y segundos transcurridos
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeDisplay.innerText = `${currentMin}:${currentSec}`;
});

// Cargar la duración total cuando el archivo esté listo
mainAudio.addEventListener('loadeddata', () => {
    let mainDuration = mainAudio.duration;
    let totalMin = Math.floor(mainDuration / 60);
    let totalSec = Math.floor(mainDuration % 60);
    if(totalSec < 10) totalSec = `0${totalSec}`;
    durationDisplay.innerText = `${totalMin}:${totalSec}`;
});

// Permitir hacer clic en la barra para adelantar/atrasar
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    let progressWidthVal = document.querySelector('.progress-bar').clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;
    
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
});