
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("contact-form"));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch("http://localhost:3000/send", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(result => {
            Toastify({
                text: 'Your response is submitted',
                duration: 3000,
                close: true,
                gravity: 'top',
                position:'right',
                style: {
                    background: 'linear-gradient(to right, #00b09b, #96c93d)',
                },
            }).showToast();

            console.log('Success:', result);
            document.getElementById("contact-form").reset();
        })
        .catch(error => {
            Toastify({
                text: 'An error occurred, please try again.',
                duration: 3000,
                close: true,
                gravity: 'top',
                position:'right',
                style: {
                    background: 'linear-gradient(to right, #ff5e62, #ff9966)',
                },
            }).showToast();

            console.error('Error:', error);
        });
});
