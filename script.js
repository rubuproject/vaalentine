// ===== PARTIKEL ANIMASI =====
const flowers = ["🌸", "🌹", "🌺", "🌷", "💮", "🏵️"];
const hearts = ["💖", "💕", "💗", "💓", "💝"];
const sparkles = ["✨", "⭐", "🌟", "💫"];

// Deteksi ukuran layar untuk optimasi mobile
const isMobile = window.innerWidth <= 768;
const isSmallMobile = window.innerWidth <= 480;
const maxFlowers = isSmallMobile ? 4 : (isMobile ? 6 : 10);
let flowerCount = 0;

// Fungsi membuat bunga jatuh
function createFlower() {
  if (flowerCount >= maxFlowers) return;
  
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

  const startX = Math.random() * window.innerWidth;
  let y = -50;
  const speed = 0.5 + Math.random() * (isMobile ? 1 : 1.5);
  const swing = Math.random() * (isMobile ? 40 : 80);
  let angle = Math.random() * 360;

  flower.style.left = startX + "px";
  flower.style.fontSize = (isMobile ? 16 : 20) + Math.random() * (isMobile ? 16 : 30) + "px";
  flower.style.opacity = 0.6 + Math.random() * 0.3;

  document.body.appendChild(flower);
  flowerCount++;

  function animate() {
    y += speed;
    angle += 1;
    const x = startX + Math.sin(y * 0.015) * swing;

    flower.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    if (y < window.innerHeight + 100) {
      requestAnimationFrame(animate);
    } else {
      flower.remove();
      flowerCount--;
    }
  }

  animate();
}

// Fungsi membuat hati melayang
function createFloatingHeart() {
  if (isMobile && document.querySelectorAll('.heart-bg').length >= 3) return;
  
  const heart = document.createElement("div");
  heart.className = "heart-bg";
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (15 + Math.random() * 10) + "s";
  heart.style.animationDelay = Math.random() * 5 + "s";
  
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 25000);
}

// Fungsi membuat sparkle di sekitar card
function createSparkle() {
  if (isMobile && document.querySelectorAll('.sparkle').length >= 3) return;
  
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];
  
  const card = document.querySelector(".card");
  if (!card) return;
  
  const rect = card.getBoundingClientRect();
  
  const x = rect.left + Math.random() * rect.width;
  const y = rect.top + Math.random() * rect.height;
  
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.animationDelay = Math.random() * 2 + "s";
  
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 3000);
}

// Fungsi membuat efek ripple saat klik
function createRipple(e) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "10px";
  ripple.style.height = "10px";
  
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Jalankan interval dengan timing yang responsif
setInterval(createFlower, isMobile ? 500 : 250);
setInterval(createFloatingHeart, isMobile ? 6000 : 3000);
setInterval(createSparkle, isMobile ? 2000 : 800);

// ===== MUSIK AUTOPLAY =====
const music = document.getElementById("bg-music");
const startOverlay = document.getElementById("startOverlay");
const musicIndicator = document.getElementById("musicIndicator");
let musicStarted = false;

// Fungsi fade in volume musik
function fadeInMusic() {
  let volume = 0;
  music.volume = 0;
  
  const fade = setInterval(() => {
    volume += 0.02;
    if (volume >= 0.6) {
      volume = 0.6;
      clearInterval(fade);
    }
    music.volume = volume;
  }, 100);
}

// Fungsi memulai musik
function startMusic(e) {
  e.preventDefault();
  if (e) createRipple(e);
  
  if (!musicStarted) {
    music.play().then(() => {
      musicStarted = true;
      fadeInMusic();
      
      // Sembunyikan overlay
      startOverlay.classList.add("hidden");
      
      // Tampilkan indikator musik
      musicIndicator.classList.add("show");
      setTimeout(() => {
        musicIndicator.classList.remove("show");
      }, 4000);
      
    }).catch(err => {
      console.log("Error playing music:", err);
      // Tetap sembunyikan overlay meskipun musik gagal
      startOverlay.classList.add("hidden");
    });
  }
}

// Event listeners untuk klik dan touch
startOverlay.addEventListener("click", startMusic);
startOverlay.addEventListener("touchstart", startMusic);

// ===== HANDLE ORIENTATION CHANGE =====
let orientationTimeout;
window.addEventListener("orientationchange", () => {
  clearTimeout(orientationTimeout);
  orientationTimeout = setTimeout(() => {
    window.location.reload();
  }, 300);
});

// ===== HANDLE RESIZE =====
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reload jika ukuran layar berubah drastis (misal dari portrait ke landscape)
    if (window.innerWidth <= 768 !== isMobile) {
      window.location.reload();
    }
  }, 250);
});

// Log bahwa website siap
window.addEventListener("load", () => {
  console.log("Website siap! Klik overlay untuk memulai musik 🎵");
});