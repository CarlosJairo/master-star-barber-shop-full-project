import Cita from "../models/Cita.js";
import Cliente from "../models/Cliente.js";
import Pago from "../models/Pago.js";
import Peluqueria from "../models/Peluqueria.js";
import { Empleado, Hora, Horario, Servicio } from "../models/Empleado.js";
import { Types } from "mongoose";
import { Administrador } from "../models/Administrador.js";

async function listarClientes(req, res) {
  try {
    const data = await Cliente.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function obtenerCliente(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw { message: "Por favor proporciona el id" };

    const data = await Cliente.findOne({ _id: id });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function registrarCliente(req, res) {
  try {
    const client = Cliente(req.body);
    const data = await client.save();

    res.json({
      err: false,
      message: "El usuario ha sido registrado",
      data,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function eliminarCliente(req, res) {
  try {
    const clientId = req.params.id;
    const data = await Cliente.findByIdAndDelete(clientId);

    if (!data) {
      return res.status(404).json({
        err: true,
        message: "El cliente no fue encontrado",
      });
    }

    res.json({
      err: false,
      message: "El cliente ha sido eliminado",
      data,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function iniciarSesion(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar el usuario
    const user = await Cliente.findOne({ email });

    // si el Usuario no está registrado
    if (!user) {
      return res
        .status(400)
        .json({ err: true, message: "Usuario no registrado" });
    }

    // Comparar la contraseña
    const passwordIsCorrect = password === user.password;

    if (!passwordIsCorrect) {
      return res.status(400).json({
        err: true,
        message: "Error en la autenticación, contraseña incorrecta",
      });
    }

    // Mensaje de confirmación
    res.json({ err: false, message: "Autenticación satisfactoria", user });
  } catch (error) {
    res.json(error);
  }
}

async function registrarPeluqueria(req, res) {
  try {
    const nuevaPeluqueria = new Peluqueria(req.body);
    const peluqueria = await nuevaPeluqueria.save();

    const { clienteId } = req.body;

    // Actualizar el rol del cliente a "administrador" y agregar peluqueriaId
    await Cliente.findByIdAndUpdate(
      clienteId,
      {
        $set: {
          roles: ["administrador"],
          peluqueriaId: peluqueria._id,
        },
      },
      { new: true },
    );

    // Crear una nueva instancia del administrador
    const nuevoAdministrador = new Administrador({
      peluqueriaId: peluqueria._id,
      clienteId: clienteId,
      fechaIngreso: new Date().toISOString(), // Puedes ajustar el formato de fecha según tus necesidades
    });

    // Guardar el nuevo administrador
    const administrador = await nuevoAdministrador.save();

    res.status(201).json({
      err: false,
      message: "Peluquería y administrador registrados con éxito",
      peluqueria,
      administrador,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarPeluquerias(req, res) {
  try {
    const data = await Peluqueria.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function obtenerPeluqueria(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw { message: "Por favor proporciona el id" };

    const data = await Peluqueria.findOne({ _id: id });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarReservacionesPeluquerias(req, res) {
  try {
    const { peluqueriaId } = req.params;

    const result = Types.ObjectId.createFromHexString(peluqueriaId);

    const citas = await Cita.find({
      peluqueriaId: result,
    })
      .populate("clienteId")
      .populate("servicios");

    res.json(citas);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

const registrarEmpleado = async (req, res) => {
  try {
    const { peluqueriaId } = req.params;

    const {
      especialidad,
      descripcion,
      clienteId,
      fechaIngreso,
      numIdentificacion,
      contactoEmergencia,
      salarioBase,
      servicios,
    } = req.body;

    // Crear los horarios y las horas automáticamente para los próximos 5 días
    const generarHorarios = async () => {
      const horarios = [];
      const ahora = new Date();
      for (let i = 0; i < 5; i++) {
        const fecha = new Date(ahora);
        fecha.setDate(ahora.getDate() + i);
        const fechaString = fecha.toISOString().split("T")[0];

        const horas = [
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
        ];
        const horaIds = await Promise.all(
          horas.map(async (hora) => {
            const newHora = new Hora({ hora, libre: true });
            await newHora.save();
            return newHora._id;
          }),
        );

        const newHorario = new Horario({ fecha: fechaString, horas: horaIds });
        await newHorario.save();
        horarios.push(newHorario._id);
      }
      return horarios;
    };

    const horarioIds = await generarHorarios();

    // Crear el empleado
    const nuevoEmpleado = new Empleado({
      especialidad,
      descripcion,
      peluqueriaId: Types.ObjectId.createFromHexString(peluqueriaId),
      clienteId: Types.ObjectId.createFromHexString(clienteId),
      fechaIngreso,
      numIdentificacion,
      contactoEmergencia,
      salarioBase,
      servicios,
      horarios: horarioIds,
    });

    const data = await nuevoEmpleado.save();

    await Cliente.findByIdAndUpdate(
      clienteId,
      {
        $set: {
          roles: ["empleado"],
        },
      },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Empleado registrado exitosamente",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

async function listarEmpleados(req, res) {
  try {
    const { peluqueriaId } = req.params;

    const result = Types.ObjectId.createFromHexString(peluqueriaId);

    const empleados = await Empleado.find({
      peluqueriaId: result,
    }).populate("clienteId");

    res.json(empleados);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function obtenerEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId })
      .populate("clienteId")
      .populate("servicios")
      .populate({
        path: "horarios",
        populate: {
          path: "horas",
          model: "Hora",
        },
      });
    // .populate("servicios")
    // .populate("clienteId");
    res.json(empleadoInfo);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function serviciosEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId }).populate(
      "servicios",
    );
    res.json(empleadoInfo.servicios);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function horariosEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId });
    res.json(empleadoInfo.horarios);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarReservacionesEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;

    const result = Types.ObjectId.createFromHexString(empleadoId);

    const citas = await Cita.find({
      empleadoId: result,
    })
      .populate("clienteId")
      .populate("servicios");

    res.json(citas);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function generarCita(req, res) {
  try {
    const cita = Cita(req.body);
    const data = await cita.save(cita);

    res.json({
      err: false,
      message: "La cita se ha generado - sin pagar",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function pagarCita(req, res) {
  try {
    const { citaId, monto, fecha, metodoPago, horaId } = req.body;

    const pago = Pago({ citaId, monto, fecha, metodoPago });
    const data = await pago.save(pago);

    const cita = await Cita.findByIdAndUpdate(
      citaId,
      { pagada: true },
      { new: true },
    );

    const hora = await Hora.findByIdAndUpdate(
      horaId,
      { libre: false },
      { new: true },
    );

    res.json({
      err: false,
      message: "Cita generarda con exito",
      hora,
      data,
      cita,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarCitasPendientes(req, res) {
  try {
    const { clienteId } = req.params;

    const citasPendientes = await Cita.findOne({
      clienteId,
      estado: "pendiente",
    })
      .populate({
        path: "empleadoId",
        populate: "clienteId",
      })
      .populate("servicios")
      .populate("horarioId")
      .populate("horaId");

    res.status(200).json(citasPendientes);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function cancelarCita(req, res) {
  try {
    const { citaId } = req.params;

    // Encontrar la cita y actualizar su estado a "cancelado"
    const cita = await Cita.findByIdAndUpdate(
      citaId,
      { estado: "cancelado" },
      { new: true },
    );

    if (!cita) {
      return res.status(404).json({ err: true, message: "Cita no encontrada" });
    }

    // Actualizar la hora correspondiente para que esté disponible
    const hora = await Hora.findByIdAndUpdate(
      cita.horaId, // Asumiendo que cita tiene un campo horaId que referencia a la Hora
      { libre: true },
      { new: true },
    );

    if (!hora) {
      return res.status(404).json({ err: true, message: "Hora no encontrada" });
    }

    res.status(200).json({
      err: false,
      message: "Cita cancelada con éxito y hora disponible actualizada",
      cita,
      hora,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function citaRealizada(req, res) {
  try {
    const { citaId } = req.params;

    const cita = await Cita.findByIdAndUpdate(
      citaId,
      { estado: "realizada" },
      { new: true },
    );

    if (!cita) {
      return res.status(404).json({ err: true, message: "Cita no encontrada" });
    }

    res
      .status(200)
      .json({ err: false, message: "Cita realizada con éxito", cita });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

export {
  listarClientes,
  obtenerCliente,
  registrarCliente,
  iniciarSesion,
  listarPeluquerias,
  obtenerPeluqueria,
  listarEmpleados,
  obtenerEmpleado,
  serviciosEmpleado,
  horariosEmpleado,
  listarReservacionesEmpleado,
  generarCita,
  pagarCita,
  listarCitasPendientes,
  cancelarCita,
  registrarPeluqueria,
  registrarEmpleado,
  eliminarCliente,
  citaRealizada,
  listarReservacionesPeluquerias,
};
