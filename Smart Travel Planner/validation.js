document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('travel-form');
    const destination = document.getElementById('destination');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    
    // Live character count for comments (optional)
    const comments = document.getElementById('comments');
    const charCount = document.getElementById('char-count');
    
    if (comments && charCount) {
        comments.addEventListener('input', function() {
            charCount.textContent = `${comments.value.length} characters`;
        });
    }
    
    form.addEventListener('input', validateForm);
    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let valid = true;
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        if (destination.value.trim() === '') {
            valid = false;
            errorMessage.style.display = 'block';
            errorMessage.textContent += 'Destination cannot be empty. ';
        }

        if (startDate.value === '' || endDate.value === '') {
            valid = false;
            errorMessage.style.display = 'block';
            errorMessage.textContent += 'Travel dates cannot be empty. ';
        }

        if (new Date(startDate.value) >= new Date(endDate.value)) {
            valid = false;
            errorMessage.style.display = 'block';
            errorMessage.textContent += 'Start date must be earlier than end date. ';
        }

        submitButton.disabled = !valid;
        return valid;
    }
});
