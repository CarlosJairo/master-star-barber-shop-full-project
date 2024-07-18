import mongoose from "mongoose";

const adminiSchema = mongoose.Schema({
  peluqueriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Peluqueria" },
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  fechaIngreso: { type: String, required: true },
});

const Administrador = mongoose.model("Administrador", adminiSchema);

export { Administrador };
