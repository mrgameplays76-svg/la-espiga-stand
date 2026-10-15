(() => {
  'use strict';
  const root = document.documentElement;
  const smaller = document.getElementById('smaller-text');
  const bigger = document.getElementById('bigger-text');
  const contrast = document.getElementById('contrast-toggle');
  const listen = document.getElementById('listen-toggle');
  const status = document.getElementById('reader-status');
  const easyToggle = document.getElementById('easy-toggle');
  const easyOverview = document.getElementById('lectura-facil');
  let scale = 1;
  let speechActive = false;
  const summary = 'Bienvenidas y bienvenidos a la experiencia de práctica en la Escuela Especial Diferencial La Espiga. Esta página fue realizada por Constanza Torres Soto y Tais Morales Bobadilla, estudiantes de Trabajo Social. En la escuela, se busca promover la autonomía, la convivencia y la participación. La práctica considera el aprendizaje con apoyos visuales, actividades sobre emociones, convivencia y trabajo con las familias. Puedes recorrer las secciones para conocer las actividades y los enfoques de Trabajo Social.';

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

  const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  function resetSpeechUI() {
    speechActive = false;
    listen.textContent = '▶ Escuchar resumen';
    listen.setAttribute('aria-pressed', 'false');
  }
  if (!speechSupported) {
    listen.hidden = true;
    sayStatus('La lectura en voz alta no está disponible en este navegador.');
  } else {
    listen.setAttribute('aria-pressed', 'false');
    listen.addEventListener('click', () => {
      if (speechActive) {
        window.speechSynthesis.cancel();
        resetSpeechUI();
        sayStatus('Lectura detenida.');
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = 'es-CL';
      utterance.rate = 0.87;
      utterance.pitch = 1;
      utterance.onend = () => { resetSpeechUI(); sayStatus('Terminó la lectura del resumen.'); };
      utterance.onerror = (event) => {
        resetSpeechUI();
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
          sayStatus('No se pudo reproducir el audio en este dispositivo.');
        }
      };
      speechActive = true;
      listen.textContent = '■ Detener lectura';
      listen.setAttribute('aria-pressed', 'true');
      sayStatus('Leyendo el resumen en voz alta.');
      window.speechSynthesis.speak(utterance);
    });
    window.addEventListener('pagehide', () => window.speechSynthesis.cancel());
  }
})();
