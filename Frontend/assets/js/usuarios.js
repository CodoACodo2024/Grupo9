document.addEventListener('DOMContentLoaded', function () {
    const usuariosForm = document.getElementById('listarUsuariosForm');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnCancelarAgregarUsuario = document.getElementById('btnCancelarAgregarUsuario');

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
            usuarioElement.innerHTML =
                `<td>${usuario.id}</td>
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

    function resetMensajes() {
        const mensajes = document.querySelectorAll('.mensaje');
        mensajes.forEach(mensaje => {
            mensaje.innerText = '';
            mensaje.classList.remove('alerta', 'alerta-exito', 'alerta-centrada');
            mensaje.style.display = 'none';
        });
    }

    function mostrarFormulario(seccionId, userId = null) {
        resetMensajes()

        const secciones = document.querySelectorAll('section');
        secciones.forEach(seccion => seccion.classList.add('hidden'));
        const formSeccion = document.getElementById(seccionId);
        formSeccion.classList.remove('hidden');

        if (userId && seccionId === 'actualizarusuario') {
            document.getElementById('idUsuarioAEditar').value = userId;

            //Cargar datos del usuario en el formulario
            fetch(`http://localhost:3000/usuarios/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al obtener usuario: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(usuario => {
                    document.getElementById('nombre1').value = usuario.nombre;
                    document.getElementById('apellido1').value = usuario.apellido;
                    document.getElementById('nombreDeUsuario1').value = usuario.nombreDeUsuario;
                    document.getElementById('email1').value = usuario.email;
                    document.getElementById('telefono1').value = usuario.telefono;
                    document.getElementById('direccion1').value = usuario.direccion;
                })
                .catch(error => {
                    document.getElementById('mensajeactualizacion').innerText = `Error: ${error.message}`;
                });
        } else if (userId && seccionId === 'eliminarusuario') {
            document.getElementById('id1').value = userId;
        }
    }

    //Eliminar usuario
    if (eliminarUsuarioForm) {
        eliminarUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            resetMensajes()

            const formData = new FormData(event.target);
            const id = formData.get('id');

            try {
                //Verificar si el usuario existe
                const verificarResponse = await fetch(`http://localhost:3000/usuarios/${id}`);

                if (verificarResponse.ok) {
                    const usuario = await verificarResponse.json();

                    //Si el usuario existe, elimino
                    const eliminarResponse = await fetch(`http://localhost:3000/usuarios/${id}`, {
                        method: 'DELETE'
                    });

                    if (eliminarResponse.ok) {
                        const mensajeEliminacion = document.getElementById('mensajeeliminacion');
                        mensajeEliminacion.innerText = `Usuario con código ${id} eliminado con éxito`;
                        mensajeEliminacion.classList.remove('alerta');
                        mensajeEliminacion.classList.add('alerta-exito');

                        listarUsuarios();
                        eliminarUsuarioForm.reset();

                        setTimeout(() => {
                            mostrarFormulario("usuarios", null)
                        }, 2000);
                    } else {
                        const error = await response.json();
                        const mensajeEliminacion = document.getElementById('mensajeeliminacion');
                        mensajeEliminacion.innerText = `Error: ${error.error}`;
                        mensajeEliminacion.classList.remove('alerta-exito');
                        mensajeEliminacion.classList.add('alerta');
                    }
                } else {
                    const mensajeEliminacion = document.getElementById('mensajeeliminacion');
                    mensajeEliminacion.innerText = `¡Atención!: El usuario con código ${id} no existe`;
                    mensajeEliminacion.classList.remove('alerta-exito');
                    mensajeEliminacion.classList.add('alerta');
                }
            } catch (error) {
                const mensajeEliminacion = document.getElementById('mensajeeliminacion');
                mensajeEliminacion.innerText = `Error: ${error.message}`;
                mensajeEliminacion.classList.remove('alerta-exito');
                mensajeEliminacion.classList.add('alerta');
            }
        });
    } else {
        console.error('El formulario de eliminación no se encontró en el DOM.');
    }

    //Actualizar usuario
    if (actualizarUsuarioForm) {
        actualizarUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            resetMensajes();

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

            //Verificar si el usuario existe
            const verificarResponse = await fetch(`http://localhost:3000/usuarios/${id}`);

            if (!verificarResponse.ok) {
                const mensajeactualizacion = document.getElementById('mensajeactualizacion');
                mensajeactualizacion.innerText = `¡Atención!: El usuario con código ${id} no existe`;
                mensajeactualizacion.classList.remove('alerta-exito');
                mensajeactualizacion.classList.add('alerta');
            }
            else {
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
                        const mensajeactualizacion = document.getElementById('mensajeactualizacion');
                        mensajeactualizacion.innerText = `¡Usuario actualizado con éxito!`;
                        mensajeactualizacion.classList.add('alerta-exito');
                        mensajeactualizacion.classList.remove('alerta');

                        listarUsuarios();
                        actualizarUsuarioForm.reset();

                        setTimeout(() => {
                            mostrarFormulario("usuarios", null)
                        }, 2000);
                    } else {
                        const error = await response.json();
                        const mensajeactualizacion = document.getElementById('mensajeactualizacion');
                        mensajeactualizacion.innerText = `Error: ${error.error}`;
                        mensajeactualizacion.classList.remove('alerta-exito');
                        mensajeactualizacion.classList.add('alerta');
                    }
                } catch (error) {

                    const mensajeactualizacion = document.getElementById('mensajeactualizacion');
                    mensajeactualizacion.innerText = `Error: ${error.error}`;
                    mensajeactualizacion.classList.remove('alerta-exito');
                    mensajeactualizacion.classList.add('alerta');
                }
            }
        });
    } else {
        console.error('El formulario de actualización no se encontró en el DOM.');
    }

    //Crear usuario
    if (crearUsuarioForm) {
        crearUsuarioForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            resetMensajes();

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

                    const mensajecreacion = document.getElementById('mensajecreacion');
                    mensajecreacion.innerText = `¡Usuario creado con éxito!`;
                    mensajecreacion.classList.add('alerta-exito');
                    mensajecreacion.classList.remove('alerta');

                    listarUsuarios();
                    crearUsuarioForm.reset();

                    setTimeout(() => {
                        mostrarFormulario("usuarios", null)
                    }, 2000);
                } else {
                    const error = await response.json();
                    mensajecreacion.innerText = `Error: ${error.error}`;
                    mensajecreacion.classList.remove('alerta-exito');
                    mensajecreacion.classList.add('alerta');
                }
            } catch (error) {
                mensajecreacion.innerText = `Error: ${error.error}`;
                mensajecreacion.classList.remove('alerta-exito');
                mensajecreacion.classList.add('alerta');
            }
        });
    } else {
        console.error('El formulario de creación no se encontró en el DOM.');
    }
});
