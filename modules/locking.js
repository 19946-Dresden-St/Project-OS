class Locking {

    initLocking(containerUnlockInput, containerPasswordInputs) {

        const isPasswordSet = localStorage.getItem('isPasswordSet');

        if(isPasswordSet === null) {
            localStorage.setItem('isPasswordSet', 'false');
            localStorage.setItem('password', '');
            containerPasswordInputs.style.display = 'none';
        }

        if(isPasswordSet === 'false') {
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
            containerPasswordInputs.style.display = 'flex';
            localStorage.setItem('isPasswordSet', 'true');
        } else {
            containerPasswordInputs.style.display = 'none';
            localStorage.setItem('isPasswordSet', 'false');
        }

        if (password !== '') {
            containerUnlockInput.style.display = 'flex';
        }

    }


    /*
    * Unlock the screen if the password is correct
    * @param screen - locking screen #id
    * @param input - input field #id
    */
    unlock(screen, input) {
        if (localStorage.getItem('isPasswordSet') === 'false') {
            this.unlockAnimation(screen);
        }
        if (input.value === localStorage.getItem('password')) {
            this.unlockAnimation(screen);
        } else {
            input.animate(
                [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(0)' }
                ],
                {
                    duration: 500,
                    iterations: 1,
                    easing: 'ease-in-out'
                }
            );
        }
    }

    unlockAnimation(screen) {
        screen.style.transition = "opacity 0.5s ease-in-out";
        screen.style.opacity = 0;
        setTimeout(function() {
            screen.style.display = "none";
        }, 500);
    }

    lock(screen) {

        // to improve later because c'est UN PEU NAZE J'AVOUE (j'ai dû oublier un truc qlq part)
        if (localStorage.getItem('isPasswordSet') === 'false') {
            document.getElementById('unlock-input').style.display = 'none';
        }

        screen.style.display = "flex";
        setTimeout(function() {
            screen.style.opacity = 1;
        }, 100);
    }

    setPassword() {
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('password-confirm');
        let error = document.getElementById('error');

        if (password.value === '' || confirmPassword.value === '') {
            this.displayPwdError(password, confirmPassword, error, 'Please fill in the fields');
        } else if (password.value.trim().length === 0) {
            this.displayPwdError(password, confirmPassword, error, 'Password cannot contain only spaces');
        } else if (password.value !== confirmPassword.value) {
            this.displayPwdError(password, confirmPassword, error, 'Passwords do not match');
        } else {
            localStorage.setItem('password', password.value);
            password.value = '';
            confirmPassword.value = '';
            error.innerText = 'Password set successfully';
        }

    }

    displayPwdError(password, confirmPassword, error, msg) {
        password.value = '';
        confirmPassword.value = '';
        error.innerText = msg;
    }

}

export default Locking;