class Settings {

    /*
    * Load the settings saved in the local storage
    * Get the setting switches and set them to the saved settings
    */
    load() {
        // Get the settings saved in the local storage
        let calendarDisplay = localStorage.getItem('calendarDisplay');
        let dayDisplay = localStorage.getItem('dayDisplay');
        let monthDisplay = localStorage.getItem('monthDisplay');
        let yearDisplay = localStorage.getItem('yearDisplay');

        // Get the switches
        let switchDate = document.getElementById('displayDate');
        let switchDay = document.getElementById('displayDay');
        let switchMonth = document.getElementById('displayMonth');
        let switchYear = document.getElementById('displayYear');

        // Set the switches to the saved settings
        if (calendarDisplay === 'true') {
            switchDate.checked = true;
        }
        if (dayDisplay === 'true') {
            switchDay.checked = true;
        }
        if (monthDisplay === 'true') {
            switchMonth.checked = true;
        }
        if (yearDisplay === 'true') {
            switchYear.checked = true;
        }
    }

    /*
    * Switch between dark and light mode
    * 'dt' stands for dark theme
    * 'lt' stands for light theme
    */
    switchTheme() {
        let body = document.body;
        let icon = document.getElementById('theme-icon');
        if (body.classList.contains('dt')) {
            body.classList.remove('dt');
            body.classList.add('lt');
            icon.className = "fa-solid fa-sun";
        } else {
            body.classList.remove('lt');
            body.classList.add('dt');
            icon.className = "fa-solid fa-moon";
        }
    }


    /*
    * Hide an element / a feature depending on the settings saved in the local storage
    * @param storage - setting key's name
    * @param container - container #id of the element to hide
    */
    hide(storage, container) {
        if (localStorage.getItem(storage) === "false") {
            container.style.display = "flex";
            localStorage.setItem(storage, "true");
        } else {
            container.style.display = "none";
            localStorage.setItem(storage, "false");
        }
    }

}

export default Settings;