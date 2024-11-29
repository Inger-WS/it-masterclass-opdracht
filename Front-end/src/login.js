document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Hier kun je de login validatie toevoegen
        if (validateLogin(email, password)) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Ongeldig emailadres of wachtwoord.');
        }
    });

    function validateLogin(email, password) {
        // Vervang dit door je eigen login validatie
        return email === 'test@example.com' && password === 'password123';
    }
});