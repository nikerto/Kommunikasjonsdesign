// Avstemning: viser leseren hva hen svarte. Ingen svar lagres.
const skjema = document.querySelector('.avstemning form');
const svarTekst = document.querySelector('#avstemning-svar');

skjema.addEventListener('submit', function (hendelse) {
    hendelse.preventDefault();
    const valgt = skjema.querySelector('input[name="svar"]:checked');

    if (valgt) {
        svarTekst.textContent = 'Takk for at du stemte! Du svarte «' + valgt.value + '».';
    } else {
        svarTekst.textContent = 'Velg et svar før du stemmer.';
    }
});
