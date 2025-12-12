import { useState } from "react";
import { marked } from "marked";
import Layout from "../components/Layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuración Gemini
const API_KEY = "AIzaSyCsV4QVb_ip7O0kGg7HmEmOX2pCQH2WZu0";
const MODEL = "gemini-2.0-flash-exp";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `Eres un revisor de documentos directo y conciso. 

REGLAS:
- Sé BREVE y al grano
- NO des explicaciones largas
- Usa bullets cortos
- Si algo está bien, solo di "✓ Correcto" o "✓ Sin problemas"

FORMATO DE RESPUESTA:

## Feedback

## Problemas a corregir
- [Problema específico → Cómo arreglarlo]
- [Solo lista lo que DEBE cambiar]

## Sugerencias opcionales
- [Mejoras que no son urgentes pero ayudarían]

## Lo que está bien
- [Lista breve de puntos fuertes]

Si el documento está bien, simplemente dilo sin inventar problemas.`;

export default function CVUpload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Estados para el analisis IA
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
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-primary/90 transition-colors"
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
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Botón Analizar con IA */}
            {file && file.type === "application/pdf" && !analysisResult && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={analyzeCV}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analizando tu CV...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Analizar CV con IA
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error del análisis */}
            {analysisError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-red-600">error</span>
                <p className="text-red-800">{analysisError}</p>
              </div>
            )}

            {/* Resultados del análisis */}
            {analysisResult && (
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white text-2xl">psychology</span>
                    <h3 className="text-white font-semibold text-lg">Análisis de tu CV</h3>
                  </div>
                  <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                    ✓ Completado
                  </span>
                </div>
                <div 
                  className="p-6 prose prose-sm max-w-none prose-headings:text-indigo-900 prose-headings:font-semibold prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-indigo-600"
                  dangerouslySetInnerHTML={{ __html: marked.parse(analysisResult) }}
                />
                <div className="px-6 pb-4">
                  <button
                    type="button"
                    onClick={() => setAnalysisResult(null)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Analizar de nuevo
                  </button>
                </div>
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
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined">upload</span>
                  Subir CV
                </button>
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