// Función para obtener y listar todos los usuarios
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

//Mostrar los usuarios en el frontend
function mostrarUsuarios(usuarios) {
  const usuariosContainer = document.getElementById('usuariosContainer');
  usuariosContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar usuarios

  usuarios.forEach(usuario => {
    const usuarioElement = document.createElement('div');
    usuarioElement.classList.add('usuario');
    usuarioElement.innerHTML = `
      <h3>${usuario.nombre}</h3>
      <p>Email: ${usuario.email}</p>
      <p>Teléfono: ${usuario.telefono}</p>
      <p>Dirección: ${usuario.direccion}</p>
    `;
    usuariosContainer.appendChild(usuarioElement);
  });
}

//Actualizar lista de usuarios
document.addEventListener('DOMContentLoaded', function() {
  listarUsuarios();

  const btnActualizar = document.getElementById('btnActualizar');
  if (btnActualizar) {
    btnActualizar.addEventListener('click', listarUsuarios);
  }

  //Eliminar usuario
  const eliminarUsuarioForm = document.getElementById('eliminarUsuarioForm');
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
          // Actualizar la lista de usuarios después de eliminar uno si es necesario
          listarUsuarios();
        } else {
          const error = await response.json();
          document.getElementById('mensaje').innerText = `Error: ${error.error}`;
        }
      } catch (error) {
        document.getElementById('mensaje').innerText = `Error: ${error.message}`;
      }
    });
  }

 
  //Actualizar usuario
  const actualizarUsuarioForm = document.getElementById('actualizarUsuarioForm');
  if (actualizarUsuarioForm) {
    actualizarUsuarioForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const id = formData.get('idUsuarioAEditar');
      const data = {
        nombre: formData.get('nombre1'),
        email: formData.get('email1'),
        telefono: formData.get('telefono1'),
        direccion: formData.get('direccion1')
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
  }

  /*document.getElementById('usuarioForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        document.getElementById('response').innerText = `Usuario creado con ID: ${result.id}`;
      } else {
        const error = await response.json();
        document.getElementById('response').innerText = `Error: ${error.error}`;
      }
    } catch (error) {
      document.getElementById('response').innerText = `Error: ${error.message}`;
    }
  });*/
  

  //Crear usuario
  const crearUsuarioForm = document.getElementById('crearUsuarioForm');
  if (crearUsuarioForm) {
    crearUsuarioForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      //const data = Object.fromEntries(formData.entries());
      const data = {
        nombre: formData.get('nombre2'),
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
  }
});
