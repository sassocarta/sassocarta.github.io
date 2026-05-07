'use strict';

const INDIZI = [
  { testo: 'La quercia secolare nel parco custodisce qualcosa.', soluzione: 'QUERCIA',  punti: 50 },
  { testo: 'Una vecchia fontana zampilla ancora oggi.',         soluzione: 'FONTANA',  punti: 100 },
  { testo: 'Dove un muro ha cambiato colore, lì cerca.',        soluzione: 'MURO',     punti: 150 }
];
const VITE_INIZIALI = 3;

const stato = {
  nome: '',
  punti: 0,
  vite: VITE_INIZIALI,
  indice: 0,
  finita: false
};

const $ = (sel) => document.querySelector(sel);

function logEvento(testo) {
  const li = document.createElement('li');
  const ora = new Date().toLocaleTimeString();
  li.textContent = `[${ora}] ${testo}`;
  $('#lista-log').prepend(li);
}

function aggiornaStatusBar() {
  $('#lbl-nome').textContent = stato.nome;
  $('#lbl-punti').textContent = stato.punti;
  $('#lbl-vite').textContent = stato.vite;
}

function mostraIndizio() {
  const ind = INDIZI[stato.indice];
  $('#testo-indizio').textContent = ind.testo;
  $('#input-risposta').value = '';
  setMessaggio('', null);
  logEvento(`Nuovo indizio (${stato.indice + 1}/${INDIZI.length}).`);
}

function setMessaggio(testo, esito) {
  const m = $('#messaggio');
  m.textContent = testo;
  m.classList.remove('ok', 'ko');
  if (esito === 'ok') m.classList.add('ok');
  if (esito === 'ko') m.classList.add('ko');
}

function avviaPartita() {
  const inputNome = $('#input-nome').value.trim();
  stato.nome = inputNome || 'Esploratore';
  stato.punti = 0;
  stato.vite = VITE_INIZIALI;
  stato.indice = 0;
  stato.finita = false;

  $('#schermata-avvio').classList.add('nascosto');
  $('#schermata-fine').classList.add('nascosto');
  $('#schermata-gioco').classList.remove('nascosto');
  $('#lista-log').innerHTML = '';

  aggiornaStatusBar();
  mostraIndizio();
  logEvento(`Partita avviata da ${stato.nome}.`);
}

function valutaRisposta() {
  if (stato.finita) return;
  const risposta = $('#input-risposta').value.trim().toUpperCase();
  if (!risposta) { setMessaggio('Scrivi una parola chiave.', 'ko'); return; }

  const ind = INDIZI[stato.indice];
  if (risposta === ind.soluzione) {
    stato.punti += ind.punti;
    logEvento(`Risposta corretta (+${ind.punti} punti).`);
    setMessaggio(`Esatto! Hai guadagnato ${ind.punti} punti.`, 'ok');
    stato.indice++;
    aggiornaStatusBar();
    if (stato.indice >= INDIZI.length) {
      terminaPartita('Hai trovato tutti i tesori!', true);
    } else {
      setTimeout(mostraIndizio, 800);
    }
  } else {
    stato.vite--;
    logEvento(`Risposta sbagliata, vite rimaste: ${stato.vite}.`);
    aggiornaStatusBar();
    if (stato.vite <= 0) {
      terminaPartita('Vite esaurite! Tesoro perduto.', false);
    } else {
      setMessaggio(`Sbagliato. Ti restano ${stato.vite} vite.`, 'ko');
    }
  }
}

function terminaPartita(messaggio, vinto) {
  stato.finita = true;
  $('#schermata-gioco').classList.add('nascosto');
  $('#schermata-fine').classList.remove('nascosto');
  $('#titolo-fine').textContent = vinto ? 'Vittoria!' : 'Game Over';
  $('#messaggio-fine').textContent = messaggio;
  $('#punti-finali').textContent = stato.punti;
}

document.addEventListener('DOMContentLoaded', () => {
  $('#btn-inizia').addEventListener('click', avviaPartita);
  $('#btn-rispondi').addEventListener('click', valutaRisposta);
  $('#btn-ricomincia').addEventListener('click', avviaPartita);
  $('#input-risposta').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') valutaRisposta();
  });
});
