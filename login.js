document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Hier kun je de inloggegevens valideren
    if (email === 'admin@example.com' && password === 'admin') {
        alert('Inloggen succesvol!');
        window.location.href = 'index.html'; // Verwijzing naar de index pagina
    } else {
        alert('Ongeldig e-mailadres of wachtwoord.');
    }
});
