'use strict';

const CATALOGO = [
  { id: 'mouse',     nome: 'Mouse',     prezzo: 16.00 },
  { id: 'tastiera',  nome: 'Tastiera',  prezzo: 25.00 },
  { id: 'stampante', nome: 'Stampante', prezzo: 350.00 }
];

const QUANTITA_MAX = 20;

function costruisciTabella() {
  const righe = CATALOGO.map((art, i) => `
    <tr>
      <td><input type="number" id="qta-${art.id}" min="0" max="${QUANTITA_MAX}" value="0"></td>
      <td>${art.nome}</td>
      <td>${art.prezzo.toFixed(2)} €</td>
      <td><span id="riga-${art.id}">0.00</span> €</td>
    </tr>
  `).join('');

  return `
    <table>
      <thead>
        <tr><th>Q.tà</th><th>Articolo</th><th>Prezzo unitario</th><th>Subtotale</th></tr>
      </thead>
      <tbody>${righe}</tbody>
      <tfoot>
        <tr>
          <td colspan="3">Totale ordine</td>
          <td><span id="totale-finale">0.00</span> €</td>
        </tr>
      </tfoot>
    </table>
  `;
}

function ricalcolaTotali() {
  let totale = 0;
  for (const art of CATALOGO) {
    const input = document.getElementById(`qta-${art.id}`);
    let qta = parseInt(input.value, 10);
    if (isNaN(qta) || qta < 0) qta = 0;
    if (qta > QUANTITA_MAX) qta = QUANTITA_MAX;
    input.value = qta;
    const sub = qta * art.prezzo;
    document.getElementById(`riga-${art.id}`).textContent = sub.toFixed(2);
    totale += sub;
  }
  document.getElementById('totale-finale').textContent = totale.toFixed(2);
  return totale;
}

function azzeraModulo() {
  for (const art of CATALOGO) {
    document.getElementById(`qta-${art.id}`).value = 0;
  }
  ricalcolaTotali();
  document.getElementById('riepilogo-finale').textContent = '';
}

function emailValida(email) {
  // Validazione minima: lettere/punti, una @, dominio con punto, no spazi
  return /^[A-Za-z][A-Za-z0-9._-]*@[A-Za-z][A-Za-z.-]*\.[A-Za-z]{2,}$/.test(email);
}

function inviaOrdine() {
  const totale = ricalcolaTotali();
  const email = document.getElementById('email').value.trim();
  const metodo = document.getElementById('metodo-pagamento').value;
  const notifiche = document.querySelector('input[name="notifiche"]:checked').value;
  const out = document.getElementById('riepilogo-finale');

  if (totale === 0) {
    out.textContent = 'Aggiungi almeno un articolo prima di confermare.';
    return;
  }
  if (!emailValida(email)) {
    out.textContent = 'Email non valida (deve iniziare con una lettera e contenere un dominio con punto).';
    return;
  }

  const testoNotifiche = notifiche === 'si' ? 'Riceverai notifiche via email.' : 'Notifiche disattivate.';
  out.innerHTML = `
    Grazie per il tuo ordine di <strong>${totale.toFixed(2)} €</strong>.<br>
    Pagamento: ${metodo}. ${testoNotifiche}<br>
    Conferma all'indirizzo: ${email}
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tabella-ordine').innerHTML = costruisciTabella();
  ricalcolaTotali();

  document.getElementById('tabella-ordine').addEventListener('input', ricalcolaTotali);
  document.getElementById('btn-azzera').addEventListener('click', azzeraModulo);
  document.getElementById('btn-invia').addEventListener('click', inviaOrdine);
});
