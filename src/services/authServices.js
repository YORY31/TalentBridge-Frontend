// LOGIN
export async function login({ email, password }) {
  // Aquí iría la llamada a tu backend
  // Por ahora hacemos un mock simple
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@correo.com" && password === "123456") {
        resolve({ message: "Login exitoso", user: { email } });
      } else {
        reject(new Error("Correo o contraseña incorrectos"));
      }
    }, 500);
  });
}

// REGISTER
export async function register({ name, email, password }) {
  // Mock de registro
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && name) {
        resolve({ message: "Registro exitoso", user: { name, email } });
      } else {
        reject(new Error("Faltan datos"));
      }
    }, 500);
  });
}
