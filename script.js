document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const stars = document.querySelectorAll('.star');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        showSummary();
    });

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

    function showSummary() {
        const formData = new FormData(form);
        const summaryData = {};
        formData.forEach((value, key) => {
            summaryData[key] = value;
        });

        localStorage.setItem('summaryData', JSON.stringify(summaryData));
        window.location.href = 'summary.html';
    }
});