document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stops the page from refreshing when they click submit

    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;

    const templateParams = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send('service_tvp7fho', 'template_7lyjszg', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
       
            if(typeof showMessage === 'function') {
                 showMessage('Message sent! We will get back to you soon. 🍵', 'success');
            } else {
                 alert('Message sent! We will get back to you soon. 🍵');
            }
            
            document.getElementById('contactForm').reset();
            
        }, function(error) {
            console.log('FAILED...', error);

            if(typeof showMessage === 'function') {
                 showMessage('Oops! Something went wrong.', 'error');
            } else {
                 alert('Oops! Something went wrong.');
            }
        });
});
