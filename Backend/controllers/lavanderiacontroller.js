const { Lavanderia } = require('../models');

const lavanderiaController = {
  //Listar todas las lavanderias
  async list(req, res) {
    try {
      const lavanderias = await Lavanderia.findAll();
      res.json(lavanderias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Crear un nueva lavanderia
  async create(req, res) {
    try {
      const lavanderia = await Lavanderia.create(req.body);
      res.status(201).json(lavanderia);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Obtener una lavanderia por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const lavanderia = await Lavanderia.findByPk(id);
      if (!lavanderia) {
        res.status(404).json({ message: 'Lavanderia no encontrada' });
      } else {
        res.json(lavanderia);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Actualizar un lavanderia por su ID
  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Lavanderia.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedLavanderia = await Lavanderia.findByPk(id);
        res.json(updatedLavanderia);
      } else {
        res.status(404).json({ message: 'Lavanderia no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Eliminar un lavanderia por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Lavanderia.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Lavanderia eliminada correctamente' });
      } else {
        res.status(404).json({ message: 'Lavanderia no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = lavanderiaController;
