document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {
    document.getElementById("addDanceDialog").addEventListener("submit", function(event) {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        addDance(email, name);
    });

    document.getElementById("openAddDanceDialog").addEventListener("click", function() {
        document.getElementById("addDanceDialog").showModal();
    });
}