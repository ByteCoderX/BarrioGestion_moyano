// Obtener el elemento del menú de navegación
const navbar = document.getElementById('navbar');
// Guardar la posición original del menú
const sticky = navbar.offsetTop;
// Obtener la altura del menú para ajustar el contenido
const navbarHeight = navbar.offsetHeight;

// Función para hacer el menú fijo cuando se desplaza la página
function makeNavbarSticky() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
        // Ajustar el padding-top del primer elemento después del navbar
        // para evitar "saltos" bruscos cuando el menú se vuelve fijo
        document.body.style.paddingTop = navbarHeight + 'px';
    } else {
        navbar.classList.remove('sticky');
        document.body.style.paddingTop = 0;
    }
}

// Ejecutar la función cuando se hace scroll
window.onscroll = function() {
    makeNavbarSticky();
};

// Ejecutar la función también al cargar la página para inicializar correctamente
window.onload = function() {
    // Recalcular la altura después de que todo se haya cargado
    const navbarHeight = navbar.offsetHeight;
    makeNavbarSticky();
    
    // Scroll suave al hacer clic en los enlaces del menú
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular la posición considerando el navbar fijo
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbar.offsetHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};