const zone = document.getElementById('buttonZone');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const confettiLayer = document.getElementById('confettiLayer');
const heartsLayer = document.querySelector('.hearts');
const openLetterBtn = document.getElementById('openLetterBtn');

let noX = 110;
let noY = 0;

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

function placeNoButton() {
  noBtn.style.position = 'absolute';
  noBtn.style.left = '50%';
  noBtn.style.top = '50%';
  noBtn.style.transform = `translate(${noX}px, ${noY}px)`;
}

function launchHearts() {
  const rect = yesBtn.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < 26; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-confetti';
    heart.textContent = '♥';

    const angle = (Math.PI * 2 * i) / 26 + (Math.random() * 0.4 - 0.2);
    const radius = 80 + Math.random() * 170;
    const driftX = Math.cos(angle) * radius;
    const driftY = Math.sin(angle) * radius - 80 - Math.random() * 130;
    const spin = `${Math.round(Math.random() * 360 - 180)}deg`;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.setProperty('--start-x', '0px');
    heart.style.setProperty('--start-y', '0px');
    heart.style.setProperty('--end-x', `${driftX}px`);
    heart.style.setProperty('--end-y', `${driftY}px`);
    heart.style.setProperty('--spin', spin);
    heart.style.fontSize = `${0.8 + Math.random() * 1.1}rem`;
    heart.style.animationDelay = `${Math.random() * 140}ms`;

    confettiLayer.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

function moveNoButtonAway(mouseX, mouseY) {
  const zoneRect = zone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const dx = btnCenterX - mouseX;
  const dy = btnCenterY - mouseY;
  const distance = Math.hypot(dx, dy);

  if (distance > 110) return;

  const safeDx = dx === 0 ? (Math.random() > 0.5 ? 1 : -1) : dx;
  const safeDy = dy === 0 ? (Math.random() > 0.5 ? 1 : -1) : dy;
  const push = (120 - distance) / 1.7;

  noX += (safeDx / Math.hypot(safeDx, safeDy)) * push;
  noY += (safeDy / Math.hypot(safeDx, safeDy)) * push;

  const halfW = zoneRect.width / 2 - btnRect.width / 2 - 8;
  const halfH = zoneRect.height / 2 - btnRect.height / 2 - 8;

  noX = Math.max(-halfW, Math.min(halfW, noX));
  noY = Math.max(-halfH, Math.min(halfH, noY));

  placeNoButton();
}

window.addEventListener('load', () => {
  placeNoButton();
  createFloatingHearts();
});
window.addEventListener('resize', placeNoButton);

const isMousePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isMousePointer) {
  noBtn.style.pointerEvents = 'none';

  window.addEventListener('mousemove', (event) => {
    moveNoButtonAway(event.clientX, event.clientY);
  });

  // Extra kick so it never sits still near the cursor.
  zone.addEventListener('mouseenter', () => {
    noX += Math.random() > 0.5 ? 120 : -120;
    noY += Math.random() > 0.5 ? 70 : -70;
    placeNoButton();
  });
}

yesBtn.addEventListener('click', () => {
  message.textContent = 'Yay! Happy Valentine\'s Day!';
  yesBtn.textContent = 'You said yes!';
  noBtn.style.display = 'none';
  if (openLetterBtn) openLetterBtn.hidden = false;
  launchHearts();
});

if (!isMousePointer) {
  noBtn.addEventListener('click', () => {
    message.textContent = 'Nice try.';
  });
}
