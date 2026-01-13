document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {

    document.getElementById("openAddDanceDialog").addEventListener("click", function() {
        document.getElementById("addDanceDialog").showModal();
    });

    document.getElementById("closeDialog").addEventListener("click", function(){
        document.getElementById("addDanceDialog").close();
    });

}


