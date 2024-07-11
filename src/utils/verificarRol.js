export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (rolesPermitidos.includes(req.rol)) {
            next(); // El rol está permitido, continúa con el procesamiento de la solicitud
        } else {
            // Rol no permitido, devuelve un error
            return res.status(403).json({ msg: "Acceso denegado. Rol no autorizado para esta operación." });
        }
    };
};

