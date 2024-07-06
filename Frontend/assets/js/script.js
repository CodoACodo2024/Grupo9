document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#inputPassword5');
    const togglePasswordIcon = document.querySelector('#togglePasswordIcon');

    togglePassword.addEventListener('click', function (e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        togglePasswordIcon.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });

    const mostrarPassword = document.querySelector('#mostrarPassword');
    const passwordIngresada = document.querySelector('#inputrepetirpassword');
    const mostrarPasswordIcon = document.querySelector('#mostrarPasswordIcon');

    mostrarPassword.addEventListener('click', function (e) {
        const type = passwordIngresada.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordIngresada.setAttribute('type', type);

        mostrarPasswordIcon.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
        });

    document.getElementById('home').classList.remove('hidden');
});
