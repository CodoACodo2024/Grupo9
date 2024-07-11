const { Resena } = require('../models');

const resenaController = {
  //Listar todas las reseñas
  async list(req, res) {
    try {
      const resenas = await Resena.findAll();
      res.json(resenas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Crear una nueva reseña
  async create(req, res) {
    try {
      const resena = await Resena.create(req.body);
      res.status(201).json(resena);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Obtener un reseña por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const resena = await Resena.findByPk(id);
      if (!resena) {
        res.status(404).json({ message: 'Reseña no encontrada' });
      } else {
        res.json(resena);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Actualizar una reseña por su ID
  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Resena.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedResena = await Resena.findByPk(id);
        res.json(updatedResena);
      } else {
        res.status(404).json({ message: 'Reseña no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Eliminar un resena por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Resena.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Reseña eliminada correctamente' });
      } else {
        res.status(404).json({ message: 'Reseña no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = resenaController;
