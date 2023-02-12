class Settings {

    /*
    * Load the settings saved in the local storage
    * Get the setting switches and set them to the saved settings
    */
    load() {

        this.displayUnlockMethod();

        let settings = [
            {settingName: 'calendarDisplay', switchId: 'displayDate'},
            {settingName: 'dayDisplay', switchId: 'displayDay'},
            {settingName: 'monthDisplay', switchId: 'displayMonth'},
            {settingName: 'yearDisplay', switchId: 'displayYear'},
            {settingName: 'batteryDisplay', switchId: 'displayBattery'},
        ];

        settings.forEach(setting => {
            let savedSetting = localStorage.getItem(setting.settingName);
            let switchBtn = document.getElementById(setting.switchId);
            if (savedSetting === 'true') {
                switchBtn.checked = true;
            }
        });
    }


    /*
    * Check if the display of an element is saved in the local storage
    * Display / hide the element depending on the saved setting
    * Set the default setting to true if no setting is saved in the local storage
    * @param container - container #id of the element to hide
    * @param key - setting key's name
    */
    checkDisplay(container, key) {
        let display = localStorage.getItem(key);
        if (display !== null && display === "false") {
            container.style.display = "none";
        } else if (display === null) {
            localStorage.setItem(key, "true");
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


    /*
    * Unlock the screen
    * @param screen - locking screen #id
    */
    unlock(screen) {
        screen.style.transition = "opacity 0.5s ease-in-out";
        screen.style.opacity = 0;
        setTimeout(function() {
            screen.style.display = "none";
        }, 500);

/*        screen.style.transition = "all 0.5s";
        screen.style.transform = "translateY(-100%)";*/
    }


    /*
    * Display the password input on locking screen depending on the saved setting
    */
    displayUnlockMethod() {
        let unlockPassword = localStorage.getItem('unlockPassword');
        if (unlockPassword === null || unlockPassword === "false") {
            document.getElementById('unlock-input').style.display = "none";
        }
    }

}

export default Settings;