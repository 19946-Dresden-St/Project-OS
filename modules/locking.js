class Locking {

    initLocking(containerUnlockInput, containerPasswordInputs) {

        const isPasswordSet = localStorage.getItem('isPasswordSet');

        if(isPasswordSet === null) {
            localStorage.setItem('isPasswordSet', 'false');
            localStorage.setItem('password', '');
            containerPasswordInputs.style.display = 'none';
        }

        if(isPasswordSet === 'false') {
            console.log(isPasswordSet);
            containerUnlockInput.style.display = 'none';
            containerPasswordInputs.style.display = 'none';
        } else {
            if (localStorage.getItem('password') !== '') {
                containerUnlockInput.style.display = 'flex';
            }
        }

    }


    setLocking(containerUnlockInput, containerPasswordInputs) {

        const isPasswordSet = localStorage.getItem('isPasswordSet');
        const password = localStorage.getItem('password');

        if(isPasswordSet === 'false') {
            /*containerUnlockInput.style.display = 'flex';*/
            containerPasswordInputs.style.display = 'flex';
            localStorage.setItem('isPasswordSet', 'true');
        } else {
            /*containerUnlockInput.style.display = 'none';*/
            containerPasswordInputs.style.display = 'none';
            localStorage.setItem('isPasswordSet', 'false');
        }

        if (password !== '') {
            containerUnlockInput.style.display = 'flex';
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
    }

}

export default Locking;