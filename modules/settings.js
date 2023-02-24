class Settings {

    /*
    * Load the settings saved in the local storage
    * Get the setting switches and set them to the saved settings
    */
    load() {

        let settings = [
            {settingName: 'calendarDisplay', switchId: 'displayDate'},
            {settingName: 'dayDisplay', switchId: 'displayDay'},
            {settingName: 'monthDisplay', switchId: 'displayMonth'},
            {settingName: 'yearDisplay', switchId: 'displayYear'},

            {settingName: 'clockDisplay', switchId: 'displayTime'},
            {settingName: 'hourDisplay', switchId: 'displayHour'},
            {settingName: 'minuteDisplay', switchId: 'displayMin'},
            {settingName: 'secondDisplay', switchId: 'displaySec'},

            {settingName: 'batteryDisplay', switchId: 'displayBattery'},
            {settingName: 'isPasswordSet', switchId: 'setPassword'},
        ];

        for (let i = 0; i < settings.length - 1; i++) {
            if (localStorage.getItem(settings[i].settingName) === null) {
                localStorage.setItem(settings[i].settingName, 'true');
            }
        }

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