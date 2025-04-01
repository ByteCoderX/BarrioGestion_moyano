document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const registerForm = document.getElementById('registerForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const barrio = document.getElementById('barrio');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    
    // Referencias a mensajes de error
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const barrioError = document.getElementById('barrioError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    const registerSuccess = document.getElementById('registerSuccess');
    
    // Referencia a los botones de mostrar/ocultar contraseña
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    
    // Crear elementos para la barra de fuerza de contraseña
    const passwordField = document.getElementById('password').parentElement;
    const passwordStrength = document.createElement('div');
    passwordStrength.className = 'password-strength';
    
    const passwordStrengthBar = document.createElement('div');
    passwordStrengthBar.className = 'password-strength-bar';
    
    const passwordStrengthText = document.createElement('div');
    passwordStrengthText.className = 'password-strength-text';
    
    passwordStrength.appendChild(passwordStrengthBar);
    passwordStrength.appendChild(passwordStrengthText);
    passwordField.appendChild(passwordStrength);
    
    // Mostrar/ocultar contraseña
    passwordToggle.addEventListener('click', function() {
        togglePasswordVisibility(password, passwordToggle);
    });
    
    confirmPasswordToggle.addEventListener('click', function() {
        togglePasswordVisibility(confirmPassword, confirmPasswordToggle);
    });
    
    function togglePasswordVisibility(inputField, toggleIcon) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            inputField.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }
    
    // Validación en tiempo real
    firstName.addEventListener('input', validateFirstName);
    lastName.addEventListener('input', validateLastName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    barrio.addEventListener('input', validateBarrio);
    password.addEventListener('input', function() {
        validatePassword();
        if (confirmPassword.value) validateConfirmPassword();
        updatePasswordStrength();
    });
    confirmPassword.addEventListener('input', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);
    
    // Funciones de validación
    function validateFirstName() {
        if (!firstName.value.trim()) {
            showError(firstName, firstNameError, 'Por favor, ingresa tu nombre.');
            return false;
        }
        hideError(firstName, firstNameError);
        return true;
    }
    
    function validateLastName() {
        if (!lastName.value.trim()) {
            showError(lastName, lastNameError, 'Por favor, ingresa tu apellido.');
            return false;
        }
        hideError(lastName, lastNameError);
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, emailError, 'Por favor, ingresa un correo electrónico válido.');
            return false;
        }
        hideError(email, emailError);
        return true;
    }
    
    function validatePhone() {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
            showError(phone, phoneError, 'Por favor, ingresa un número de teléfono válido (10-15 dígitos).');
            return false;
        }
        hideError(phone, phoneError);
        return true;
    }
    
    function validateBarrio() {
        if (!barrio.value.trim()) {
            showError(barrio, barrioError, 'Por favor, ingresa el nombre de tu barrio.');
            return false;
        }
        hideError(barrio, barrioError);
        return true;
    }
    
    function validatePassword() {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        
        if (!passwordRegex.test(password.value)) {
            let errorMsg = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.';
            showError(password, passwordError, errorMsg);
            return false;
        }
        
        hideError(password, passwordError);
        return true;
    }
    
    function validateConfirmPassword() {
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, confirmPasswordError, 'Las contraseñas no coinciden.');
            return false;
        }
        hideError(confirmPassword, confirmPasswordError);
        return true;
    }
    
    function validateTerms() {
        if (!terms.checked) {
            termsError.style.display = 'block';
            return false;
        }
        termsError.style.display = 'none';
        return true;
    }
    
    // Mostrar error
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }
    
    // Ocultar error
    function hideError(input, errorElement) {
        errorElement.style.display = 'none';
        input.style.borderColor = '#2ecc71';
    }
    
    // Evaluar la fuerza de la contraseña
    function updatePasswordStrength() {
        const password = document.getElementById('password').value;
        let strength = 0;
        let text = '';
        
        if (password.length >= 8) strength += 20;
        if (password.match(/[A-Z]+/)) strength += 20;
        if (password.match(/[a-z]+/)) strength += 20;
        if (password.match(/[0-9]+/)) strength += 20;
        if (password.match(/[!@#$%^&*]+/)) strength += 20;
        
        // Actualizar la barra de progreso
        passwordStrengthBar.style.width = strength + '%';
        
        // Definir color y texto basado en la fuerza
        if (strength <= 20) {
            passwordStrengthBar.style.backgroundColor = '#e74c3c';
            text = 'Muy débil';
        } else if (strength <= 40) {
            passwordStrengthBar.style.backgroundColor = '#e67e22';
            text = 'Débil';
        } else if (strength <= 60) {
            passwordStrengthBar.style.backgroundColor = '#f1c40f';
            text = 'Media';
        } else if (strength <= 80) {
            passwordStrengthBar.style.backgroundColor = '#3498db';
            text = 'Fuerte';
        } else {
            passwordStrengthBar.style.backgroundColor = '#2ecc71';
            text = 'Muy fuerte';
        }
        
        passwordStrengthText.textContent = text;
        passwordStrengthText.style.color = passwordStrengthBar.style.backgroundColor;
    }
    
    // Envío del formulario
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isBarrioValid = validateBarrio();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsChecked = validateTerms();
        
        if (
            isFirstNameValid && 
            isLastNameValid && 
            isEmailValid && 
            isPhoneValid && 
            isBarrioValid && 
            isPasswordValid && 
            isConfirmPasswordValid && 
            isTermsChecked
        ) {
            // Mostrar mensaje de éxito
            registerSuccess.style.display = 'block';
            
            // Simular registro exitoso (en una aplicación real, aquí enviarías los datos al servidor)
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Hacer scroll al primer error
            const firstError = document.querySelector('.error-message[style*="block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Efectos de enfoque para los inputs
    const inputs = document.querySelectorAll('input:not([type="checkbox"])');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const icon = this.parentElement.querySelector('i:not(.password-toggle)');
            if (icon) icon.style.color = '#f39c12';
        });
        
        input.addEventListener('blur', function() {
            const icon = this.parentElement.querySelector('i:not(.password-toggle)');
            if (icon) icon.style.color = '#7f8c8d';
        });
    });
    
    // Formato de teléfono mientras se escribe
    phone.addEventListener('input', function(e) {
        // Eliminar todos los caracteres que no sean números
        const numericValue = this.value.replace(/\D/g, '');
        
        // Formatear con guiones o como prefieras
        if (numericValue.length > 0) {
            // Este es un formateo simple, puedes ajustarlo a las necesidades específicas de Argentina
            if (numericValue.length <= 3) {
                this.value = numericValue;
            } else if (numericValue.length <= 6) {
                this.value = numericValue.slice(0, 3) + '-' + numericValue.slice(3);
            } else if (numericValue.length <= 10) {
                this.value = numericValue.slice(0, 3) + '-' + numericValue.slice(3, 6) + '-' + numericValue.slice(6);
            } else {
                this.value = numericValue.slice(0, 3) + '-' + numericValue.slice(3, 6) + '-' + numericValue.slice(6, 10) + '-' + numericValue.slice(10);
            }
        }
    });
});