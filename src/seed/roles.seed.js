// cspell: ignore descripcion
import sequelize from "../database/db.js";
import { Roles } from "../models/roles.model.js";

const seedRoles = async () => {
  await sequelize.sync({ force: false }); // Utiliza force: true con precaución, ya que esto borrará todas las tablas

  const rolesData = [
    { nombre: "Admin", descripcion: "Administrador del sistema" },
    { nombre: "Usuario", descripcion: "Usuario estándar" },
    {
      nombre: "Contadora",
      descripcion: "Es la contadora que atenderá a los clientes",
    },
    {
      nombre: "Postulante",
      descripcion:
        "Es la persona que postula a un trabajo en la empresa como contadora",
    },
    // Añade más roles según sea necesario
  ];

  try {
    for (const rol of rolesData) {
      await Roles.create(rol);
    }
    console.log("Los roles fueron insertados exitosamente.");
  } catch (error) {
    console.error("Ocurrió un error al insertar los roles: ", error);
  } finally {
    await sequelize.close(); // Opcional: cierra la conexión si ya no vas a realizar más operaciones
  }
};

seedRoles();
