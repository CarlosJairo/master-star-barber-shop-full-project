import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LogInPage";
import SingUpPage from "./pages/SingUpPage";
import Home from "./pages/Home";
import HomeInicial from "./components/HomeInicial";
import HomeSearchHairSalon from "./components/HomeSearchHairSalon";
import HomeSearchStylist from "./components/HomeSearchStylist";
import StylistSchedule from "./components/StylistSchedule";
import HomeServices from "./components/HomeServices";
import HomeGenerateAppo from "./components/HomeGenerateAppo";
import PendingAppointments from "./components/PendingAppointments";
import HomeUserInfo from "./components/HomeUserInfo";
import HomeSettings from "./components/HomeSettings";
import HomeConditions from "./components/HomeConditions";
import SingUpHairSalon from "./pages/SingUpHairSalon";
import AdminHome from "./pages/AdminHome";
import AdminInicialHome from "./components/AdminInicialHome";
import FunctionalityInDevelopment from "./pages/FunctionalityInDevelopment";
import AdminSingUpEmpl from "./components/AdminSingUpEmpl";
import AdminReservations from "./components/AdminReservations";
import EmployeHome from "./components/EmployeHome";
import EmployeInicialHome from "./components/EmployeInicialHome";
import SingUpEmploye from "./pages/SingUpEmploye";
import EmployeeReservations from "./components/EmployeeReservations";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppoimentDetailsProvider } from "./context/AppoimentDetailsContext";

function App() {
  return (
    <>
      <HashRouter>
        {/* Ruta principal */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sing-up" element={<SingUpPage />} />
          <Route path="/sing-up-hair-salon" element={<SingUpHairSalon />} />

          {/* Ruta para usuarios o empleados y administradores cuando desean una cita */}
          <Route
            path="/home"
            element={
              <ProtectedRoute
                rolesPermitidos={["cliente", "empleado", "administrador"]}
              >
                <AppoimentDetailsProvider>
                  <Home />
                </AppoimentDetailsProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeInicial />} />
            <Route path="buscar-peluqueria" element={<HomeSearchHairSalon />} />
            <Route path=":idSalon" element={<HomeSearchStylist />}>
              <Route path=":idEmpleado/horario" element={<StylistSchedule />} />
              <Route path=":idEmpleado/servicios" element={<HomeServices />} />
              <Route
                path=":idEmpleado/generarCita"
                element={<HomeGenerateAppo />}
              />
            </Route>
            <Route path="citas-pendientes" element={<PendingAppointments />} />
            <Route path="user" element={<HomeUserInfo />} />
            <Route path="settings" element={<HomeSettings />} />
            <Route path="condiciones" element={<HomeConditions />} />
          </Route>

          {/* Ruta para administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute rolesPermitidos={["administrador"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminInicialHome />} />
            <Route path="registrar-empleados" element={<AdminSingUpEmpl />} />
            <Route
              path="formulario-registrar-empleado/:clienteId"
              element={<SingUpEmploye />}
            />
            <Route path="reservaciones" element={<AdminReservations />} />
            <Route path="inventario" element={<FunctionalityInDevelopment />} />
            <Route path="informes" element={<FunctionalityInDevelopment />} />
          </Route>

          {/* Ruta para empleados */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute rolesPermitidos={["empleado"]}>
                <EmployeHome />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeInicialHome />} />
            <Route path="inventario" element={<FunctionalityInDevelopment />} />
            <Route path="reservaciones" element={<EmployeeReservations />} />
          </Route>
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
