document.addEventListener('DOMContentLoaded', registerEventListeners);

function registerEventListeners() {
    console.log("JS loaded");

    const selects = document.querySelectorAll('.dance-choice');

    function updateOptions() {
        // Get all selected values
        const selectedValues = Array.from(selects)
            .map(select => select.value)
            .filter(value => value !== "");

        // Enable/disable options
        selects.forEach(select => {
            Array.from(select.options).forEach(option => {
                option.disabled =
                    selectedValues.includes(option.value) &&
                    option.value !== select.value;
            });
        });
    }

    // Run whenever a dropdown changes
    selects.forEach(select => {
        select.addEventListener('change', updateOptions);
    });

    updateOptions();
}