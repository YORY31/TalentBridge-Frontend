import { useEffect, useState } from "react";
import { getProfile } from "../services/authServices";

export default function Bienvenida() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((data) => {
          setUserName(data.FullName || data.fullName);
        })
        .catch((error) => console.error("Error al obtener perfil:", error));
    }
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-primary">
        {userName ? `¡Bienvenida, ${userName}!` : "¡Bienvenida!"}
      </h2>
      <p className="text-secondary mt-1">
        Tu progreso y oportunidades en un solo lugar.
      </p>
    </div>
  );
}
