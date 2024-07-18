import express from "express";
import {
  cancelarCita,
  citaRealizada,
  eliminarCliente,
  generarCita,
  horariosEmpleado,
  iniciarSesion,
  listarCitasPendientes,
  listarClientes,
  listarEmpleados,
  listarPeluquerias,
  listarReservacionesEmpleado,
  listarReservacionesPeluquerias,
  obtenerCliente,
  obtenerEmpleado,
  obtenerPeluqueria,
  pagarCita,
  registrarCliente,
  registrarEmpleado,
  registrarPeluqueria,
  serviciosEmpleado,
} from "../controllers/controllers.js";

const router = express.Router();

// Clientes
router.get("/clientes", listarClientes);
router.post("/clientes/registro", registrarCliente);
router.get("/clientes/:id", obtenerCliente);
router.post("/clientes/login", iniciarSesion);
router.delete("/clientes/eliminar/:id", eliminarCliente);

// Rutas de Peluquerías
router.get("/peluquerias", listarPeluquerias);
router.get("/peluquerias/:id", obtenerPeluqueria);
router.post("/peluquerias/registrar/:clienteId", registrarPeluqueria);
router.get(
  "/peluquerias/:peluqueriaId/reservaciones",
  listarReservacionesPeluquerias,
);

// Rutas de Empleados
router.post(
  "/peluquerias/:peluqueriaId/empleados/registrar",
  registrarEmpleado,
);
router.get("/peluquerias/:peluqueriaId/empleados", listarEmpleados);

// Ruta horarios de empleados
router.get("/peluquerias/:peluqueriaId/empleados/:empleadoId", obtenerEmpleado);
router.get(
  "/peluquerias/:peluqueriaId/empleados/:empleadoId/servicios",
  serviciosEmpleado,
);
router.get(
  "/peluquerias/:peluqueriaId/empleados/:empleadoId/horarios",
  horariosEmpleado,
);
router.get(
  "/peluquerias/empleados/:empleadoId/reservaciones",
  listarReservacionesEmpleado,
);

// Pago
router.post("/citas/pagar", pagarCita);

// // Rutas de Citas
router.post("/citas/generar", generarCita);
router.get("/clientes/:clienteId/citas/pendientes", listarCitasPendientes);
router.put("/citas/:citaId/cancelar", cancelarCita);
router.put("/citas/:citaId/realizar", citaRealizada);

export default router;
