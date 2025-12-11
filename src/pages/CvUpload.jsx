import { useState } from "react";
import Layout from "../components/Layout";
import { uploadCV } from "../services/cvsService";
import { getCurrentUser } from "../services/authServices";

export default function CVUpload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = getCurrentUser();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    // Validar tipo de archivo
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Solo se permiten archivos PDF, DOC o DOCX");
      return;
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      setUploadError("El archivo no debe superar los 5MB");
      return;
    }

    setFile(file);
    setUploadError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError("Por favor selecciona un archivo");
      return;
    }

    if (!currentUser || !currentUser.id) {
      setUploadError("Debes iniciar sesión para subir tu CV");
      return;
    }

    setLoading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      // Crear FormData según el DTO de tu API
      const formData = new FormData();
      formData.append('UserId', currentUser.id);
      formData.append('File', file);
      formData.append('IsActive', 'true'); // Por defecto el CV será activo

      console.log("Subiendo CV...", {
        userId: currentUser.id,
        fileName: file.name,
        fileSize: file.size
      });

      const response = await uploadCV(formData);

      console.log("Respuesta del servidor:", response);

      if (response.success) {
        setUploadSuccess(true);
        setFile(null);
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setUploadSuccess(false);
        }, 5000);
      } else {
        setUploadError(response.message || "Error al subir el CV");
      }

    } catch (error) {
      console.error("Error al subir CV:", error);
      
      // Manejar diferentes tipos de errores
      if (error.response) {
        const errorData = error.response.data;
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Errores de validación de FluentValidation
          const errorMessages = errorData.errors
            .map(e => e.error)
            .join(', ');
          setUploadError(errorMessages);
        } else if (errorData.message) {
          setUploadError(errorData.message);
        } else {
          setUploadError("Error al subir el archivo. Por favor intenta nuevamente.");
        }
      } else if (error.request) {
        setUploadError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        setUploadError("Error inesperado. Por favor intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadError("");
    setUploadSuccess(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Sube tu Currículum
          </h2>
          <p className="text-secondary text-lg">
            Déjanos tu CV para futuras vacantes y sé de los primeros en ser
            visto por las empresas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-blue-500">
                visibility
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">2.5x</p>
                <p className="text-sm text-secondary">Más visibilidad</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-green-500">
                trending_up
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">80%</p>
                <p className="text-sm text-secondary">Más oportunidades</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-purple-500">
                rocket_launch
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">24h</p>
                <p className="text-sm text-secondary">Respuesta rápida</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-primary bg-blue-50"
                  : "border-gray-300 hover:border-primary"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                disabled={loading}
              />

              {!file ? (
                <>
                  <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                    cloud_upload
                  </span>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Arrastra tu CV aquí
                  </h3>
                  <p className="text-secondary mb-4">
                    o haz clic para seleccionar un archivo
                  </p>
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-primary/90 transition-colors ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      description
                    </span>
                    Seleccionar archivo
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    PDF, DOC o DOCX (máx. 5MB)
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <span className="material-symbols-outlined text-5xl text-green-500">
                    check_circle
                  </span>
                  <div className="text-left">
                    <p className="text-lg font-semibold text-primary">
                      {file.name}
                    </p>
                    <p className="text-sm text-secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={loading}
                    className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-red-600">
                  error
                </span>
                <p className="text-red-800 font-medium">{uploadError}</p>
              </div>
            )}

            {/* Success Message */}
            {uploadSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600">
                  check_circle
                </span>
                <p className="text-green-800 font-medium">
                  ¡CV subido exitosamente! Las empresas ya pueden ver tu perfil.
                </p>
              </div>
            )}

            {/* Benefits Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  verified
                </span>
                <div>
                  <h4 className="font-semibold text-primary mb-1">
                    Prioridad en vacantes
                  </h4>
                  <p className="text-sm text-secondary">
                    Las empresas verán tu perfil primero cuando publiquen nuevas
                    oportunidades
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  notifications_active
                </span>
                <div>
                  <h4 className="font-semibold text-primary mb-1">
                    Alertas personalizadas
                  </h4>
                  <p className="text-sm text-secondary">
                    Te notificaremos cuando haya vacantes que coincidan con tu
                    perfil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  security
                </span>
                <div>
                  <h4 className="font-semibold text-primary mb-1">
                    100% Confidencial
                  </h4>
                  <p className="text-sm text-secondary">
                    Tu información está segura y solo la verán empresas
                    verificadas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  auto_awesome
                </span>
                <div>
                  <h4 className="font-semibold text-primary mb-1">
                    Análisis automático
                  </h4>
                  <p className="text-sm text-secondary">
                    Nuestro sistema analiza tu CV y te sugiere mejoras para
                    destacar
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {file && (
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={clearFile}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">upload</span>
                      <span>Subir CV</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 text-2xl">
              lightbulb
            </span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                💡 Consejos para tu CV
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  Mantén tu CV actualizado con tus últimas experiencias y habilidades
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  Usa un formato claro y profesional (PDF recomendado)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  Incluye palabras clave relacionadas con tu carrera
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  Revisa ortografía y gramática antes de subir
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}