import CryptoJS from "crypto-js";
import axios from "axios";

// 🔐 Claves de encriptación (deben coincidir con el backend)
const KEY = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012");
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

// ✅ Función para cifrar contraseña
const encryptPassword = (password) => {
  const encrypted = CryptoJS.AES.encrypt(password, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

// 👥 Usuarios a crear
const users = [
  {
    email: "admin@ecommerce.com",
    password: "Admin123!",
    firstName: "Admin",
    lastName: "Sistema",
    identificationNumber: "9999999999",
    role: "ADMIN",
  },
  {
    email: "buyer@ecommerce.com",
    password: "Buyer123!",
    firstName: "Comprador",
    lastName: "Prueba",
    identificationNumber: "1111111111",
    role: "BUYER",
  },
  {
    email: "seller@ecommerce.com",
    password: "Seller123!",
    firstName: "Vendedor",
    lastName: "Prueba",
    identificationNumber: "2222222222",
    role: "SELLER",
  },
  {
    email: "aux1@ecommerce.com",
    password: "Aux123!",
    firstName: "Auxiliar",
    lastName: "Uno",
    identificationNumber: "3333333333",
    role: "BUYER", // Puedes cambiar a otro rol si es necesario
  },
];

// 🚀 Función para registrar usuario
const registerUser = async (user, baseUrl) => {
  try {
    const encryptedPassword = encryptPassword(user.password);

    const response = await axios.post(
      `${baseUrl}/api/auth/register`,
      {
        email: user.email,
        encryptedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        identificationNumber: user.identificationNumber,
        role: user.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `✅ ${user.email} (${user.role}) - Registro exitoso`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `❌ ${user.email} - Error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// 🎯 Función principal
const createAllUsers = async () => {
  const baseUrl =
    process.env.API_URL ||
    "https://ecommerce-api.wittysky-ae597b7e.westus2.azurecontainerapps.io";

  console.log(`\n🚀 Iniciando creación de usuarios en: ${baseUrl}\n`);

  for (const user of users) {
    try {
      await registerUser(user, baseUrl);
      // Esperar un poco entre registros
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      // Continuar con el siguiente usuario aunque falle uno
      console.log(`⏭️  Continuando con el siguiente usuario...\n`);
    }
  }

  console.log(
    "\n✨ Proceso completado. Los usuarios están listos para usar.\n"
  );
  console.log("📋 Resumen de credenciales:");
  users.forEach((user) => {
    console.log(`   ${user.email} / ${user.password} (${user.role})`);
  });
};

// Ejecutar
createAllUsers().catch((error) => {
  console.error("Error fatal:", error);
  process.exit(1);
});
