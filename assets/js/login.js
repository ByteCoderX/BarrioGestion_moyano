document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginSuccess = document.getElementById('loginSuccess');
    const passwordToggle = document.getElementById('passwordToggle');
    
    // Mostrar/ocultar contraseña
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.classList.remove('fa-eye');
            passwordToggle.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordToggle.classList.remove('fa-eye-slash');
            passwordToggle.classList.add('fa-eye');
        }
    });
    
    // Validación de email en tiempo real
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    // Validación de contraseña en tiempo real
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });
    
    // Envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            // Mostrar mensaje de éxito
            loginSuccess.style.display = 'block';
            
            // Simular un inicio de sesión (en una aplicación real, aquí harías una llamada API)
            setTimeout(function() {
                window.location.href = 'dashboard.html'; // Redirigir al dashboard
            }, 2000);
        }
    });
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        
        if (!isValid) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#2ecc71';
        }
        
        return isValid;
    }
    
    function validatePassword() {
        const isValid = passwordInput.value.length >= 6;
        
        if (!isValid) {
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#e74c3c';
        } else {
            passwordError.style.display = 'none';
            passwordInput.style.borderColor = '#2ecc71';
        }
        
        return isValid;
    }
    
    // Efecto de enfoque para los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('i:not(.password-toggle)').style.color = '#f39c12';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('i:not(.password-toggle)').style.color = '#7f8c8d';
        });
    });
});