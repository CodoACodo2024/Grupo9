document.addEventListener('DOMContentLoaded', function () {
    const usuariosForm = document.getElementById('listarUsuariosForm');
    const btnAgregar = document.getElementById('btnAgregar');

    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const actualizarUsuarioForm = document.getElementById('actualizarUsuarioForm');
    const eliminarUsuarioForm = document.getElementById('eliminarUsuarioForm');

    if (usuariosForm) {
        btnAgregar.addEventListener('click', function (event) {
            event.preventDefault();
            mostrarFormulario('crearusuario');
        });
    }
    //Obtener todos los usuarios / GET
    listarUsuarios();

    function listarUsuarios() {
        fetch('http://localhost:3000/usuarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener usuarios');
                }
                return response.json();
            })
            .then(usuarios => {
                mostrarUsuarios(usuarios);
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
    }

    function mostrarUsuarios(usuarios) {
        const usuariosContainer = document.getElementById('usuariosContainer');
        usuariosContainer.innerHTML = '';

        usuarios.forEach(usuario => {
            const usuarioElement = document.createElement('tr');
            usuarioElement.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.nombreDeUsuario}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.direccion}</td>
                <td>
                    <button class="btnEditar" data-id="${usuario.id}">Editar</button>
                    <button class="btnEliminar" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
            usuariosContainer.appendChild(usuarioElement);
        });

        const btnEditar = document.querySelectorAll('.btnEditar');
        const btnEliminar = document.querySelectorAll('.btnEliminar');

        btnEditar.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const userId = this.getAttribute('data-id');
                mostrarFormulario('actualizarusuario', userId);
            });
        });

        btnEliminar.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const userId = this.getAttribute('data-id');
                mostrarFormulario('eliminarusuario', userId);
            });
        });
    }

    function mostrarFormulario(seccionId, userId = null) {
        const secciones = document.querySelectorAll('section');
        secciones.forEach(seccion => seccion.classList.add('hidden'));
        const formSeccion = document.getElementById(seccionId);
        formSeccion.classList.remove('hidden');

        if (userId && seccionId === 'actualizarusuario') {
            document.getElementById('idUsuarioAEditar').value = userId;
        } else if (userId && seccionId === 'eliminarusuario') {
            document.getElementById('id1').value = userId;
        }
    }

    //Eliminar usuario
    if (eliminarUsuarioForm) {
        eliminarUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const id = formData.get('id');

            try {
                const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    document.getElementById('mensaje').innerText = `Usuario con ID ${id} eliminado correctamente`;
                    listarUsuarios();
                    eliminarUsuarioForm.reset();
                } else {
                    const error = await response.json();
                    document.getElementById('mensaje').innerText = `Error: ${error.error}`;
                }
            } catch (error) {
                document.getElementById('mensaje').innerText = `Error: ${error.message}`;
            }
        });
    } else {
        console.error('El formulario de eliminación no se encontró en el DOM.');
    }

    //Actualizar usuario
    if (actualizarUsuarioForm) {
        actualizarUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const id = formData.get('idUsuarioAEditar');
            const data = {
                nombre: formData.get('nombre1'),
                email: formData.get('email1'),
                telefono: formData.get('telefono1'),
                direccion: formData.get('direccion1'),
                apellido: formData.get('apellido1'),
                nombreDeUsuario: formData.get('nombreDeUsuario1')
            };

            try {
                const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const usuarioActualizado = await response.json();
                    document.getElementById('mensajeactualizacion').innerText = `Usuario actualizado: ${usuarioActualizado.nombre}`;
                    listarUsuarios();
                    actualizarUsuarioForm.reset();
                } else {
                    const error = await response.json();
                    document.getElementById('mensajeactualizacion').innerText = `Error: ${error.error}`;
                }
            } catch (error) {
                document.getElementById('mensajeactualizacion').innerText = `Error: ${error.message}`;
            }
        });
    } else {
        console.error('El formulario de actualización no se encontró en el DOM.');
    }

    //Crear usuario
    if (crearUsuarioForm) {
        crearUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = {
                nombre: formData.get('nombre2'),
                apellido: formData.get('apellido2'),
                nombreDeUsuario: formData.get('nombreDeUsuario'),
                email: formData.get('email2'),
                password: formData.get('password2'),
                telefono: formData.get('telefono2'),
                direccion: formData.get('direccion2')
            };

            try {
                const response = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const nuevoUsuario = await response.json();
                    document.getElementById('mensajecreacion').innerText = `Usuario creado con ID: ${nuevoUsuario.id}`;
                    listarUsuarios();
                    crearUsuarioForm.reset();
                    
                } else {
                    const error = await response.json();
                    document.getElementById('mensajecreacion').innerText = `Error: ${error.error}`;
                }
            } catch (error) {
                document.getElementById('mensajecreacion').innerText = `Error: ${error.message}`;
            }
        });
    } else {
        console.error('El formulario de creación no se encontró en el DOM.');
    }
});

