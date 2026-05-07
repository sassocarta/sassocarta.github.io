'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registrazione');
  const riepilogo = document.getElementById('riepilogo');

  function leggiHobby() {
    return Array.from(form.querySelectorAll('.hobby:checked')).map(c => c.value);
  }

  function leggiSesso() {
    const radio = form.querySelector('input[name="sesso"]:checked');
    return radio ? radio.value : '—';
  }

  function aggiornaRiepilogo() {
    const nome = document.getElementById('nome').value.trim() || '—';
    const cognome = document.getElementById('cognome').value.trim() || '—';
    const sesso = leggiSesso();
    const hobby = leggiHobby();
    const hobbyTesto = hobby.length > 0 ? hobby.join(', ') : 'nessuno';

    riepilogo.innerHTML = `
      <dl>
        <dt>Nome</dt><dd>${nome}</dd>
        <dt>Cognome</dt><dd>${cognome}</dd>
        <dt>Sesso</dt><dd>${sesso}</dd>
        <dt>Hobby</dt><dd>${hobbyTesto}</dd>
      </dl>
    `;
  }

  form.addEventListener('input', aggiornaRiepilogo);
  form.addEventListener('change', aggiornaRiepilogo);
});
