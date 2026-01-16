document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {

    document.getElementById("openAddDanceDialog").addEventListener("click", function() {
        document.getElementById("addDanceDialog").showModal();
    });

    document.getElementById("closeAddDanceDialog").addEventListener("click", function(){
        document.getElementById("addDanceDialog").close();
    });


    document.getElementById("closeRemoveDanceDialog").addEventListener("click", function(){
        document.getElementById("removeDanceDialog").close();
    });


    const danceList = document.getElementById("danceList");

    danceList.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li) return; // clicked outside an li

        const danceID = li.dataset.danceId; //must be lowercase Id DO NOT CHANGE
        document.getElementById("deleteDanceId").value = danceID;
        document.getElementById("removeDanceDialog").showModal();
});
}


