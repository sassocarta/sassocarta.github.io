'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const livello = document.getElementById('livello');
  const livelloOut = document.getElementById('livello-out');
  const btn = document.getElementById('btn-invia');
  const esito = document.getElementById('esito');

  livello.addEventListener('input', () => { livelloOut.textContent = livello.value; });

  function emailValida(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function setEsito(testo, ok) {
    esito.textContent = testo;
    esito.classList.remove('ok', 'ko');
    esito.classList.add(ok ? 'ok' : 'ko');
  }

  btn.addEventListener('click', () => {
    const dati = {
      cognome: document.getElementById('cognome').value.trim(),
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      dataNascita: document.getElementById('data-nascita').value,
      sesso: document.querySelector('input[name="sesso"]:checked').value,
      provincia: document.getElementById('provincia').value,
      livello: livello.value,
      accetta: document.getElementById('termini').checked
    };

    if (!dati.nome || !dati.cognome) { setEsito('Nome e cognome sono obbligatori.', false); return; }
    if (!emailValida(dati.email))    { setEsito('Email non valida.', false); return; }
    if (!dati.dataNascita)            { setEsito('Inserisci la data di nascita.', false); return; }
    if (!dati.accetta)                { setEsito('Devi accettare i termini per continuare.', false); return; }

    const riepilogo = [
      'Registrazione confermata',
      `Utente: ${dati.nome} ${dati.cognome}`,
      `Email: ${dati.email}`,
      `Nato il: ${dati.dataNascita}`,
      `Sesso: ${dati.sesso}`,
      `Provincia: ${dati.provincia}`,
      `Livello: ${dati.livello}/10`
    ].join('\n');
    setEsito(riepilogo, true);
  });
});
