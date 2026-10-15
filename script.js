(() => {
  'use strict';
  const root = document.documentElement;
  const smaller = document.getElementById('smaller-text');
  const bigger = document.getElementById('bigger-text');
  const contrast = document.getElementById('contrast-toggle');
  const status = document.getElementById('reader-status');
  const easyToggle = document.getElementById('easy-toggle');
  const easyOverview = document.getElementById('lectura-facil');
  let scale = 1;

  const sayStatus = (value) => { status.textContent = value; };
  const changeScale = (difference) => {
    scale = Math.max(0.9, Math.min(1.4, Math.round((scale + difference) * 10) / 10));
    root.style.setProperty('--scale', String(scale));
    sayStatus(`Tamaño de letra: ${Math.round(scale * 100)} %.`);
  };
  smaller.addEventListener('click', () => changeScale(-0.1));
  bigger.addEventListener('click', () => changeScale(0.1));

  contrast.addEventListener('click', () => {
    const isOn = root.classList.toggle('high-contrast');
    contrast.setAttribute('aria-pressed', String(isOn));
    sayStatus(isOn ? 'Alto contraste activado.' : 'Contraste habitual activado.');
  });

  easyToggle.addEventListener('click', () => {
    const willShow = easyOverview.hidden;
    easyOverview.hidden = !willShow;
    easyToggle.setAttribute('aria-expanded', String(willShow));
    sayStatus(willShow ? 'Resumen en lectura fácil abierto.' : 'Resumen en lectura fácil cerrado.');
  });

  const emotionMessages = {
    alegria: ['Alegría', 'Puedes disfrutar lo que te gusta y, si quieres, compartirlo con alguien.'],
    tristeza: ['Tristeza', 'A veces ayuda pedir compañía, conversar o tomar un momento de tranquilidad.'],
    nervios: ['Nervios', 'Puedes hacer una pausa, respirar con calma o pedir apoyo a una persona de confianza.'],
    enojo: ['Enojo', 'Está bien sentir enojo. Una pausa y palabras sencillas pueden ayudarte a expresar lo que necesitas.']
  };
  const emotionResult = document.getElementById('emotion-result');
  const emotionButtons = [...document.querySelectorAll('[data-emotion]')];
  emotionButtons.forEach(button => button.addEventListener('click', () => {
    emotionButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const [name, message] = emotionMessages[button.dataset.emotion];
    emotionResult.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = name;
    emotionResult.append(heading, document.createTextNode(message));
  }));

  const inclusionButtons = [...document.querySelectorAll('[data-choice]')];
  const inclusionResult = document.getElementById('inclusion-result');
  const restart = document.getElementById('restart-inclusion');
  inclusionButtons.forEach(button => button.addEventListener('click', () => {
    inclusionButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    inclusionResult.textContent = button.dataset.choice === 'escuchar'
      ? '¡Buena idea! Ofrecer distintas formas de comunicarse y participar ayuda a que cada persona encuentre su manera.'
      : 'Podemos buscar una alternativa más inclusiva. Escuchar al grupo y ofrecer distintas maneras de participar es una buena opción.';
    restart.hidden = false;
  }));
  restart.addEventListener('click', () => {
    inclusionButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
    inclusionResult.textContent = 'Elige la opción que te parezca más respetuosa.';
    restart.hidden = true;
    inclusionButtons[0].focus();
  });

  const journeySteps = [
    ['Primero: conocer a la comunidad', 'Observar, conversar y comprender las realidades del aula y de las familias ayuda a reconocer necesidades y fortalezas.'],
    ['Después: adaptar las actividades', 'Los juegos, apoyos visuales y actividades breves pueden cambiar según el ritmo y la forma de aprender de cada estudiante.'],
    ['Finalmente: acompañar y conectar', 'Las familias, el equipo de la escuela y las redes comunitarias pueden colaborar para fortalecer la participación y la autonomía.']
  ];
  const journeyButtons = [...document.querySelectorAll('[data-step]')];
  const journeyDetail = document.getElementById('journey-detail');
  journeyButtons.forEach(button => button.addEventListener('click', () => {
    journeyButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const [headingText, paragraphText] = journeySteps[Number(button.dataset.step)];
    journeyDetail.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = headingText;
    const paragraph = document.createElement('p');
    paragraph.textContent = paragraphText;
    journeyDetail.append(heading, paragraph);
  }));

  // Galería: categorías, visualización ampliada y controles de teclado.
  const galleryCards = [...document.querySelectorAll('.photo-card')];
  const filterButtons = [...document.querySelectorAll('.gallery-filter')];
  const galleryGrid = document.querySelector('.gallery-grid');
  const dialog = document.getElementById('photo-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCounter = document.getElementById('dialog-counter');
  const closeDialog = document.getElementById('dialog-close');
  const previousPhoto = document.getElementById('dialog-prev');
  const nextPhoto = document.getElementById('dialog-next');
  let activePhoto = 0;
  let lastOpenedCard = null;

  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    galleryCards.forEach(card => { card.hidden = filter !== 'todas' && card.dataset.category !== filter; });
    galleryGrid.classList.toggle('is-filtered', filter !== 'todas');
  }));

  function showPhoto(index) {
    const visible = galleryCards.filter(card => !card.hidden);
    if (!visible.length) return;
    const choice = ((index % visible.length) + visible.length) % visible.length;
    const card = visible[choice];
    activePhoto = choice;
    const source = card.querySelector('img');
    dialogImage.src = source.getAttribute('src');
    dialogImage.alt = source.alt;
    dialogTitle.textContent = card.querySelector('.photo-info strong').textContent;
    dialogCounter.textContent = `Fotografía ${choice + 1} de ${visible.length}`;
  }
  galleryCards.forEach(card => card.addEventListener('click', () => {
    const visible = galleryCards.filter(item => !item.hidden);
    lastOpenedCard = card;
    showPhoto(visible.indexOf(card));
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }));
  previousPhoto.addEventListener('click', () => showPhoto(activePhoto - 1));
  nextPhoto.addEventListener('click', () => showPhoto(activePhoto + 1));
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (lastOpenedCard) lastOpenedCard.focus(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(activePhoto - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(activePhoto + 1); }
  });
  let touchStartX = null;
  dialogImage.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  dialogImage.addEventListener('touchend', event => {
    if (touchStartX === null) return;
    const change = event.changedTouches[0].screenX - touchStartX;
    touchStartX = null;
    if (Math.abs(change) >= 60) showPhoto(activePhoto + (change < 0 ? 1 : -1));
  }, { passive: true });
})();
