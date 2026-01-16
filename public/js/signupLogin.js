document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {

    const toSignupButton = document.getElementById('toSignup');

    toSignupButton.addEventListener('click', () => {
        console.log('button was clicked');
        window.location.href = '/signup';
    });

}