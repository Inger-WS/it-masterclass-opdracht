document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const summaryContainer = document.getElementById('summaryContainer');
    const formContainer = document.getElementById('formContainer');
    const summary = document.getElementById('summary');
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');
    const stars = document.querySelectorAll('.star');

    // Verzamelt en toont het overzicht van de ingevulde gegevens
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        showSummary();
    });

    // Maakt de sterren klikbaar en vult ze van links naar rechts
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#ffcc00';
                    s.previousElementSibling.checked = true;
                } else {
                    s.style.color = '#ccc';
                    s.previousElementSibling.checked = false;
                }
            });
        });
    });

    // Toont het overzichtsscherm met de ingevulde gegevens
    function showSummary() {
        const formData = new FormData(form);
        let summaryHtml = '<ul>';
        formData.forEach((value, key) => {
            summaryHtml += `<li><strong>${key}:</strong> ${value}</li>`;
        });
        summaryHtml += '</ul>';
        summary.innerHTML = summaryHtml;

        formContainer.style.display = 'none';
        summaryContainer.style.display = 'block';
    }

    // Gaat terug naar het formulier om aanpassingen te maken
    editButton.addEventListener('click', function() {
        summaryContainer.style.display = 'none';
        formContainer.style.display = 'block';
    });

    // Verzendt de gegevens naar de backend
    confirmButton.addEventListener('click', function() {
        const formData = new FormData(form);

        fetch('https://jouw-backend-endpoint', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                alert('Formulier succesvol verzonden!');
            } else {
                alert('Er is een fout opgetreden bij het verzenden.');
            }
        }).catch(error => {
            alert('Er is een fout opgetreden: ' + error.message);
        });
    });
});