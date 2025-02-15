document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before submitting the form.");
    } else {
        alert("Form submitted successfully!");
        document.getElementById('contactForm').reset(); 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.buy-now').addEventListener('click', function() {
        var confirmation = confirm('Are you sure you want to buy this product?');
        if (confirmation) {
            alert("Proceeding with the purchase!");
        } else {
            alert("Purchase cancelled.");
        }
    });

    var coll = document.querySelector('.collapsible');
    var content = document.querySelector('.content');

    coll.addEventListener('click', function() {
        this.classList.toggle('active');

        if (content.style.display === 'block') {
            content.style.display = 'none';  
        } else {
            content.style.display = 'block'; 
        }
    });
});

