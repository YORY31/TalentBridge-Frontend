import { useState } from "react";
import { marked } from "marked";
import Layout from "../../../components/Layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuración Gemini (sin cambios)
const API_KEY = "AIzaSyAW858oFmc7PQtkBASVjdiT3zyYkOPy8L4";
const MODEL = "gemini-2.0-flash-exp";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `Analiza el Currículum Vitae adjunto (CV) como si fueras un revisor de documentos estricto. Aplica las REGLAS y el FORMATO de la instrucción del sistema. 

Tu evaluación debe incluir obligatoriamente:
1.  **Feedback general** (conciso).
2.  **Problemas a corregir** (cambios obligatorios).
3.  **Sugerencias opcionales** (mejoras no urgentes).
4.  **Puntos fuertes** (lo que hace bien).

Sé objetivo, breve y utiliza los bullets según se te ha indicado. Solo proporciona el contenido de las secciones solicitadas.
`;

export default function CVUpload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Estados para el análisis IA (sin cambios)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const clearFile = () => {
    setFile(null);
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = () => reject(new Error("Error al leer el archivo"));
      reader.readAsDataURL(file);
    });
  };

  const analyzeCV = async () => {
    if (!file) return;

    // Solo analizar PDFs
    if (file.type !== "application/pdf") {
      setAnalysisError("El análisis con IA solo está disponible para archivos PDF.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    try {
      // Obtener el modelo con system instruction
      const model = genAI.getGenerativeModel({ 
        model: MODEL,
        systemInstruction: SYSTEM_INSTRUCTION 
      });

      // Convertir archivo a base64
      const base64Data = await fileToBase64(file);
      
      // Crear el objeto con el formato correcto para la API
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf"
        }
      };

      // Generar contenido
      const result = await model.generateContent([
        imagePart,
        "Revisa este CV. Dime directo: ¿qué corregir? ¿qué mejorar? ¿está bien? Sé breve."
      ]);

      const response = await result.response;
      const text = response.text();
      
      setAnalysisResult(text);
    } catch (err) {
      console.error("Error al analizar:", err);
      
      if (err.message?.includes("API_KEY_INVALID") || err.message?.includes("API key")) {
        setAnalysisError("Error de autenticación con la API. Verifica tu API key.");
      } else if (err.message?.includes("quota") || err.message?.includes("429")) {
        setAnalysisError("Se ha excedido la cuota de la API. Intenta más tarde.");
      } else if (err.message?.includes("400")) {
        setAnalysisError("El archivo no pudo ser procesado. Intenta con otro PDF.");
      } else {
        setAnalysisError(`Ocurrió un error al analizar el documento: ${err.message}`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Archivo a subir:", file);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header Section */}
        <div className="relative bg-gradient-to-br from-background-purple via-background-violet to-background-main py-12 mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-accent-purple/20 rounded-2xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-5xl text-accent-purple">description</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-text-primary mb-2">Sube tu Currículum</h1>
                <p className="text-xl text-text-secondary max-w-2xl">
                  Déjanos tu CV para futuras vacantes y sé de los primeros en ser visto por las empresas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Modernizadas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-purple/20 hover:border-accent-purple/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-purple/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-purple/20 rounded-xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-accent-purple">visibility</span>
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">2.5x</p>
                <p className="text-sm text-text-secondary">Más visibilidad</p>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-fuchsia/20 hover:border-accent-fuchsia/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-fuchsia/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-fuchsia/20 rounded-xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-accent-fuchsia">trending_up</span>
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent">80%</p>
                <p className="text-sm text-text-secondary">Más oportunidades</p>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-pink/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-pink/20 rounded-xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-accent-pink">rocket_launch</span>
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">24h</p>
                <p className="text-sm text-text-secondary">Respuesta rápida</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Upload Section */}
        <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-8 mb-8">
          <form onSubmit={handleSubmit}>
            {/* Drag & Drop Zone Mejorada */}
            <div
              className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-accent-purple bg-accent-purple/10 shadow-2xl shadow-accent-purple/20"
                  : "border-accent-purple/20 hover:border-accent-purple/40 hover:shadow-xl"
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
              />

              {!file ? (
                <div className="space-y-4">
                  <div className="p-4 bg-accent-purple/10 rounded-2xl inline-block">
                    <span className="material-symbols-outlined text-6xl text-accent-purple">
                      cloud_upload
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Arrastra tu CV aquí
                  </h3>
                  <p className="text-text-secondary text-lg mb-6">
                    o haz clic para seleccionar un archivo
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white px-8 py-4 rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
                  >
                    <span className="material-symbols-outlined">description</span>
                    Seleccionar archivo
                  </label>
                  <p className="text-sm text-text-secondary mt-6">
                    PDF, DOC o DOCX (máx. 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="p-4 bg-green-500/20 rounded-2xl">
                    <span className="material-symbols-outlined text-5xl text-green-500">
                      check_circle
                    </span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl font-semibold text-text-primary mb-1">
                      {file.name}
                    </p>
                    <p className="text-text-secondary mb-2">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        type="button"
                        onClick={clearFile}
                        className="flex items-center gap-2 text-accent-pink hover:text-accent-pink/80 transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span>
                        Cambiar archivo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botón Analizar con IA Mejorado */}
            {file && file.type === "application/pdf" && !analysisResult && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={analyzeCV}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white px-8 py-5 rounded-xl font-semibold hover:shadow-2xl hover:shadow-accent-purple/30 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Analizando tu CV con IA...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">auto_awesome</span>
                      Analizar CV con Inteligencia Artificial
                    </>
                  )}
                </button>
                <p className="text-center text-text-secondary text-sm mt-3">
                  Nuestra IA revisará tu CV y te dará feedback instantáneo
                </p>
              </div>
            )}

            {/* Error del análisis Mejorado */}
            {analysisError && (
              <div className="mt-6 p-6 bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 border-2 border-accent-pink/30 rounded-2xl flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl text-accent-pink">error</span>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary mb-1">Error en el análisis</p>
                  <p className="text-text-secondary">{analysisError}</p>
                </div>
              </div>
            )}

            {/* Resultados del análisis Mejorados */}
            {analysisResult && (
              <div className="mt-8 border-2 border-accent-purple/30 rounded-2xl overflow-hidden bg-gradient-to-b from-background-header to-background-main">
                <div className="bg-gradient-to-r from-accent-purple to-accent-fuchsia px-8 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-white text-3xl">psychology</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">Análisis de IA</h3>
                      <p className="text-white/80 text-sm">Feedback profesional de tu CV</p>
                    </div>
                  </div>
                  <span className="bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Completado
                  </span>
                </div>
                <div 
                  className="p-8 prose prose-lg max-w-none 
                    prose-headings:text-text-primary prose-headings:font-bold prose-headings:border-b prose-headings:border-accent-purple/20 prose-headings:pb-2
                    prose-p:text-text-secondary prose-p:leading-relaxed
                    prose-ul:text-text-secondary prose-ul:space-y-2
                    prose-li:text-text-secondary prose-li:flex prose-li:items-start prose-li:gap-2
                    prose-strong:text-accent-purple prose-strong:font-semibold
                    prose-code:bg-accent-purple/10 prose-code:text-accent-purple prose-code:px-2 prose-code:py-1 prose-code:rounded
                    before:prose-li:content-['•'] before:prose-li:text-accent-fuchsia before:prose-li:font-bold before:prose-li:text-lg"
                  dangerouslySetInnerHTML={{ __html: marked.parse(analysisResult) }}
                />
                <div className="px-8 pb-6 border-t border-accent-purple/20 pt-4">
                  <button
                    type="button"
                    onClick={() => setAnalysisResult(null)}
                    className="text-accent-purple hover:text-accent-fuchsia font-medium flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Analizar otro archivo
                  </button>
                </div>
              </div>
            )}

            {/* Benefits Section Mejorada */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 bg-background-purple/20 backdrop-blur-sm rounded-2xl border border-accent-purple/20">
                <div className="p-2.5 bg-accent-purple/20 rounded-lg">
                  <span className="material-symbols-outlined text-xl text-accent-purple">verified</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-2">Prioridad en vacantes</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Las empresas verán tu perfil primero cuando publiquen nuevas oportunidades
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-background-violet/20 backdrop-blur-sm rounded-2xl border border-accent-fuchsia/20">
                <div className="p-2.5 bg-accent-fuchsia/20 rounded-lg">
                  <span className="material-symbols-outlined text-xl text-accent-fuchsia">notifications_active</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-2">Alertas personalizadas</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Te notificaremos cuando haya vacantes que coincidan con tu perfil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-pink-900/20 backdrop-blur-sm rounded-2xl border border-accent-pink/20">
                <div className="p-2.5 bg-accent-pink/20 rounded-lg">
                  <span className="material-symbols-outlined text-xl text-accent-pink">security</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-2">100% Confidencial</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Tu información está segura y solo la verán empresas verificadas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-accent-purple/10 backdrop-blur-sm rounded-2xl border border-accent-purple/30">
                <div className="p-2.5 bg-accent-purple/30 rounded-lg">
                  <span className="material-symbols-outlined text-xl text-accent-purple">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-2">Análisis automático</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Nuestro sistema analiza tu CV y te sugiere mejoras para destacar
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button Mejorado */}
            {file && (
              <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-accent-purple/20">
                <button
                  type="button"
                  onClick={clearFile}
                  className="px-8 py-3.5 border-2 border-accent-purple/30 text-accent-purple rounded-xl font-semibold hover:bg-accent-purple/10 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white px-10 py-3.5 rounded-xl font-semibold hover:shadow-2xl hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-xl">upload</span>
                  Subir CV a mi perfil
                </button>
              </div>
            )}

            {/* Success Message Mejorado */}
            {uploadSuccess && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 rounded-2xl flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-green-500">check_circle</span>
                <div className="flex-1">
                  <p className="font-bold text-text-primary mb-1">¡CV subido exitosamente!</p>
                  <p className="text-text-secondary">
                    Las empresas ya pueden ver tu perfil. Revisaremos tu CV y te notificaremos pronto.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Tips Section Mejorada */}
        <div className="bg-gradient-to-br from-accent-purple/10 via-accent-fuchsia/10 to-background-main backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-purple/20 rounded-xl">
              <span className="material-symbols-outlined text-2xl text-accent-purple">lightbulb</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-4">💡 Consejos profesionales para tu CV</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-purple rounded-full mt-2.5"></span>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <span className="font-semibold text-text-primary">Formato profesional:</span> Usa PDF para preservar el formato en todos los dispositivos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fuchsia rounded-full mt-2.5"></span>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <span className="font-semibold text-text-primary">Actualización constante:</span> Mantén tu CV al día con experiencias y habilidades recientes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-pink rounded-full mt-2.5"></span>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <span className="font-semibold text-text-primary">Palabras clave:</span> Incluye términos relevantes de tu industria para destacar en búsquedas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-purple rounded-full mt=2.5"></span>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    <span className="font-semibold text-text-primary">Revisión exhaustiva:</span> Corrige ortografía, gramática y verifica la información de contacto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}