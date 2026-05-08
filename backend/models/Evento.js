const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data: { type: String, required: true },
  horarioInicio: { type: String, required: true },
  horarioTermino: { type: String, required: true },
  local: { type: String, required: true },
  vagas: { type: Number, required: true },
  tipo: { type: String, required: true }
});

module.exports = mongoose.model('Evento', eventoSchema);