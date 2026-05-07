'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('menu-opzioni');
  const output = document.getElementById('campo-output');
  const btnStampa = document.getElementById('btn-stampa');
  const btnPopola = document.getElementById('btn-popola-anni');

  const ANNO_INIZIO = 1900;

  function mostraSelezionato() {
    const valore = select.value;
    const etichetta = select.options[select.selectedIndex].text;
    output.value = `valore=${valore} | testo=${etichetta}`;
  }

  function popolaConAnni() {
    const annoCorrente = new Date().getFullYear();
    const opzioni = [];
    for (let anno = ANNO_INIZIO; anno <= annoCorrente; anno++) {
      opzioni.push(`<option value="${anno}">${anno}</option>`);
    }
    select.innerHTML = opzioni.join('');
    output.value = `Popolato con ${select.options.length} anni (${ANNO_INIZIO}–${annoCorrente})`;
  }

  btnStampa.addEventListener('click', mostraSelezionato);
  btnPopola.addEventListener('click', popolaConAnni);
});
