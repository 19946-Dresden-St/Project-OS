class Settings {

    /*
    * Load the settings saved in the local storage
    * Get the setting switches and set them to the saved settings
    */
    load() {
        // Get the settings saved in the local storage
        let calendarDisplay = localStorage.getItem('calendarDisplay');
        // Get the switches
        let switchDate = document.getElementById('displayDate');
        if (calendarDisplay === 'true') {
            switchDate.checked = true;
        }
    }

    /*
    * Switch between dark and light mode
    * 'dt' stands for dark theme
    * 'lt' stands for light theme
    */
    switchTheme() {
        let body = document.body;
        if (body.classList.contains('dt')) {
            body.classList.remove('dt');
            body.classList.add('lt');
        } else {
            body.classList.remove('lt');
            body.classList.add('dt');
        }
    }


    /*
    * Hide an element / a feature depending on the settings saved in the local storage
    * @param storage - setting key's name
    * @param container - container #id of the element to hide
    */
    hide(storage, container) {
        if (localStorage.getItem(storage) === "false") {
            container.style.display = "block";
            localStorage.setItem(storage, "true");
        } else {
            container.style.display = "none";
            localStorage.setItem(storage, "false");
        }
    }

}

export default Settings;