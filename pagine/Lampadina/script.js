'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const messaggio = document.getElementById('messaggio');
  const lampadina = document.getElementById('lampadina');
  const btnCambia = document.getElementById('btn-cambia-testo');
  const btnAccendi = document.getElementById('btn-accendi');
  const btnSpegni = document.getElementById('btn-spegni');

  // Cambia il testo del paragrafo
  btnCambia.addEventListener('click', () => {
    messaggio.textContent = 'Testo aggiornato! JavaScript ha modificato il DOM.';
  });

  // Accende la lampadina (cambia src e alt)
  btnAccendi.addEventListener('click', () => {
    lampadina.src = 'images/lampadina-on.jpg';
    lampadina.alt = 'Lampadina accesa';
  });

  // Spegne la lampadina
  btnSpegni.addEventListener('click', () => {
    lampadina.src = 'images/lampadina-off.jpg';
    lampadina.alt = 'Lampadina spenta';
  });
});
