// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const messageInput = document.getElementById('message');

    // Function to validate the form on submission
    function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission

        // Check if the name field is not empty
        if (nameInput.value.trim() === '') {
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        // Check if the email is valid using a simple regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        // Check if the gender is selected
        let genderSelected = false;
        genderInputs.forEach(input => {
            if (input.checked) {
                genderSelected = true;
            }
        });

        if (!genderSelected) {
            alert('Please select your gender.');
            return;
        }

        // Submit the form
        alert('Form submitted successfully!');
        form.reset();
    }

    // Attach the form submission event listener
    form.addEventListener('submit', validateForm);
});