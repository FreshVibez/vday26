const heartsLayer = document.getElementById('heartsLayer');

function createFloatingHearts() {
  heartsLayer.innerHTML = '';
  const heartCount = 24;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'bg-heart';
    heart.textContent = '❤';

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 12}px`);
    heart.style.setProperty('--heart-duration', `${6 + Math.random() * 6}s`);
    heart.style.setProperty('--heart-delay', `${-Math.random() * 12}s`);
    heart.style.setProperty('--heart-drift-x', `${Math.random() * 70 - 35}px`);

    heartsLayer.appendChild(heart);
  }
}

window.addEventListener('load', createFloatingHearts);
