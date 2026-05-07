'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const ETA_MINIMA = 18;
  const select = document.getElementById('anno');
  const btn = document.getElementById('btn-registra');
  const esito = document.getElementById('esito');

  // Popola gli anni di nascita per maggiorenni
  const annoMax = new Date().getFullYear() - ETA_MINIMA;
  const opzioni = [];
  for (let a = annoMax; a >= 1920; a--) {
    opzioni.push(`<option value="${a}">${a}</option>`);
  }
  select.innerHTML = opzioni.join('');

  function mostraEsito(testo, ok) {
    esito.textContent = testo;
    esito.classList.remove('ok', 'ko');
    esito.classList.add(ok ? 'ok' : 'ko');
  }

  btn.addEventListener('click', () => {
    const cognome = document.getElementById('cognome').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const cf = document.getElementById('cf').value.trim();
    const sesso = document.querySelector('input[name="sesso"]:checked').value;
    const accettato = document.getElementById('termini').checked;

    if (!nome || !cognome) {
      mostraEsito('Inserisci nome e cognome.', false);
      return;
    }
    if (cf.length !== 16) {
      mostraEsito('Il codice fiscale deve essere di 16 caratteri.', false);
      return;
    }
    if (!accettato) {
      mostraEsito('Devi accettare i termini per registrarti.', false);
      return;
    }

    const titolo = sesso === 'M' ? 'Sig.' : 'Sig.ra';
    mostraEsito(`Gentile ${titolo} ${cognome} ${nome}, registrazione confermata.`, true);
  });
});
