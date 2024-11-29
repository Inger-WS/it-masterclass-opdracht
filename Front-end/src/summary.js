document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const summaryData = JSON.parse(localStorage.getItem('summaryData'));
    const summary = document.getElementById('summary');

    let summaryHtml = '<ul>';
    for (const key in summaryData) {
        summaryHtml += `<li><strong>${key}:</strong> ${summaryData[key]}</li>`;
    }
    summaryHtml += '</ul>';
    summary.innerHTML = summaryHtml;

    document.getElementById('editButton').addEventListener('click', function() {
        window.history.back();
    });

    document.getElementById('confirmButton').addEventListener('click', function() {
        fetch('https://jouw-backend-endpoint', {
            method: 'POST',
            body: summaryData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                window.location.href = 'verzendbevestiging.html';
            } else {
                alert('Er is een fout opgetreden bij het verzenden.');
            }
        }).catch(error => {
            alert('Er is een fout opgetreden: ' + error.message);
        });
    });
});