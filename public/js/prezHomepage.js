document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {

    document.getElementById("openAddDanceDialog").addEventListener("click", function() {
        document.getElementById("addDanceDialog").showModal();
    });

    document.getElementById("closeDialog").addEventListener("click", function(){
        document.getElementById("addDanceDialog").close();
    });

    document.querySelectorAll("[id^='dance_']").forEach(function(danceElement) {
        danceElement.addEventListener("click", function(event){
            document.getElementById("removeDanceDialog").showModal();
        });
    });

    document.getElementById("closeRemoveDanceDialog").addEventListener("click", function(){
        document.getElementById("removeDanceDialog").close();
    })

}


