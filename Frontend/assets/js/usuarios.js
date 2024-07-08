document.addEventListener('DOMContentLoaded', function() {
  const btnAgregar = document.getElementById('btnAgregar');
  console.log('btnAgregar:', btnAgregar); // Verificar si btnAgregar existe

  const btnAgregarUsuario =  document.getElementById('btnAgregarUsuario');
  console.log('btnAgregarUsuario:', btnAgregarUsuario); // Verificar si btnAgregarUsuario existe

  const crearUsuarioFormContainer = document.getElementById('crearusuario');
  const eliminarUsuarioFormContainer = document.getElementById('eliminarusuario');
  const actualizarUsuarioFormContainer = document.getElementById('actualizarusuario');

  function mostrarFormulario(formulario) {
    // Oculta todos los formularios
    document.querySelectorAll('section').forEach(container => {
      container.classList.add('hidden');
    });
  
    // Muestra el formulario especificado
    formulario.classList.remove('hidden');
  }

  if (btnAgregarUsuario) {
    btnAgregarUsuario.addEventListener('click', agregarUsuario());
  } else {
    console.error('El botón de crear usuario no se encontró en el DOM.');
  }

  if (btnAgregar) {
    btnAgregar.addEventListener('click', mostrarFormulario(crearUsuarioFormContainer));
  } else {
    console.error('El botón de agregar no se encontró en el DOM.');
  }
 
  
  function agregarUsuario() {
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    console.log('crearUsuarioForm:', crearUsuarioForm); // Verificar si crearUsuarioForm existe

    if (crearUsuarioForm) {
      crearUsuarioForm.addEventListener('submit', async function(event) {
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
  }

  // Función para listar usuarios (ya definida)
  async function listarUsuarios() {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      if (response.ok) {
        const usuarios = await response.json();
        mostrarUsuarios(usuarios);
      } else {
        console.error('Error al obtener usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  // Función para mostrar usuarios
  function mostrarUsuarios(usuarios) {
    const usuariosContainer = document.getElementById('usuariosContainer');
    usuariosContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar usuarios
  
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
  
    // Agregar un solo event listener al contenedor para manejar clics en botones
    usuariosContainer.addEventListener('click', async function(event) {
    if (event.target.classList.contains('btnEditar')) {
      const usuarioId = event.target.getAttribute('data-id');
      mostrarFormulario(actualizarUsuarioFormContainer); // Mostrar formulario de actualizar
      // Llamar función para editar usuario aquí si es necesario
    } else if (event.target.classList.contains('btnEliminar')) {
      const usuarioId = event.target.getAttribute('data-id');
      mostrarFormulario(eliminarUsuarioFormContainer); // Mostrar formulario de eliminar
      // Llamar función para eliminar usuario aquí si es necesario
    }
  });
  }

  function editarUsuario() {
    const actualizarUsuarioForm = document.getElementById('actualizarUsuarioForm');
    console.log('actualizarUsuarioForm:', actualizarUsuarioForm); // Verificar si actualizarUsuarioForm existe

    if (actualizarUsuarioForm) {
      actualizarUsuarioForm.addEventListener('submit', async function(event) {
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
  }

  function eliminarUsuario() {
    const eliminarUsuarioForm = document.getElementById('eliminarUsuarioForm');
    console.log('eliminarUsuarioForm:', eliminarUsuarioForm); // Verificar si eliminarUsuarioForm existe

    if (eliminarUsuarioForm) {
      eliminarUsuarioForm.addEventListener('submit', async function(event) {
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
  }

  //Eliminar usuario
  const eliminarUsuarioForm = document.getElementById('eliminarUsuarioForm');
  console.log('eliminarUsuarioForm:', eliminarUsuarioForm); // Verificar si eliminarUsuarioForm existe

  if (eliminarUsuarioForm) {
    eliminarUsuarioForm.addEventListener('submit', async function(event) {
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
  const actualizarUsuarioForm = document.getElementById('actualizarUsuarioForm');
  console.log('actualizarUsuarioForm:', actualizarUsuarioForm); // Verificar si actualizarUsuarioForm existe

  if (actualizarUsuarioForm) {
    actualizarUsuarioForm.addEventListener('submit', async function(event) {
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
 
  listarUsuarios(); // Llamar a listarUsuarios() al cargar la página para mostrar los usuarios inicialmente
});
