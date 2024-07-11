const { Usuario } = require('../models');

const usuarioController = {
  //Listar todos los usuarios
  async list(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Crear un nuevo usuario
  async create(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Obtener un usuario por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json(usuario);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Actualizar un usuario por su ID
  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Usuario.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedUsuario = await Usuario.findByPk(id);
        res.json(updatedUsuario);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Eliminar un usuario por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Usuario.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = usuarioController;
