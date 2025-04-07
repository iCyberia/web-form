document.getElementById('modern-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const subscribe = document.getElementById('subscribe').checked ? 'Yes' : 'No';
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';

    // Format the data without leading spaces
    const formData = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
Subscribe: ${subscribe}
Gender: ${gender}
    `.trim(); // Remove any leading or trailing whitespace

    // Copy to clipboard
    navigator.clipboard.writeText(formData).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy to clipboard: ', err);
    });
});