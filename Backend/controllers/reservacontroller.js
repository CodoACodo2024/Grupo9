const { Reserva } = require('../models');

const reservaController = {
  //Listar todas las reservas
  async list(req, res) {
    try {
      const reservas = await Reserva.findAll();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Crear una nueva reserva
  async create(req, res) {
    try {
      const reserva = await Reserva.create(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Obtener un reserva por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        res.status(404).json({ message: 'Reserva no encontrada' });
      } else {
        res.json(reserva);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Actualizar un reserva por su ID
  async update(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Reserva.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedReserva = await Reserva.findByPk(id);
        res.json(updatedReserva);
      } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //Eliminar un reserva por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Reserva.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Reserva eliminada correctamente' });
      } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reservaController;
