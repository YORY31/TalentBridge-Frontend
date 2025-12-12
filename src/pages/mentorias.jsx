import { useState } from "react";
import Layout from "../components/Layout";

export default function Mentorias() {
  const [joinedMentors, setJoinedMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");

  const areas = [
    "Todas",
    "Tecnología",
    "Liderazgo",
    "Finanzas",
    "Emprendimiento",
    "Marketing",
    "Desarrollo Personal",
  ];

  const mentors = [
    {
      id: 1,
      name: "Laura Fernández",
      specialty: "Desarrollo Web",
      area: "Tecnología",
      experience: "6 años",
      mentees: 245,
      description:
        "Mentora especializada en desarrollo full stack, crecimiento profesional y creación de portafolios.",
      emoji: "💼",
      color: "blue",
      trending: true,
    },
    {
      id: 2,
      name: "Carlos Martínez",
      specialty: "Liderazgo Juvenil",
      area: "Liderazgo",
      experience: "10 años",
      mentees: 389,
      description:
        "Ayuda a jóvenes a desarrollar mentalidad de liderazgo, comunicación profesional y toma de decisiones.",
      emoji: "🧠",
      color: "purple",
      trending: true,
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      specialty: "Marketing Digital",
      area: "Marketing",
      experience: "5 años",
      mentees: 190,
      description:
        "Experta en marketing digital, creación de contenido estratégico y crecimiento en redes sociales.",
      emoji: "📣",
      color: "pink",
      trending: false,
    },
    {
      id: 4,
      name: "Diego Salazar",
      specialty: "Startups y Estrategia",
      area: "Emprendimiento",
      experience: "8 años",
      mentees: 301,
      description:
        "Mentor para jóvenes emprendedores, validación de ideas, innovación y modelos de negocio.",
      emoji: "🚀",
      color: "orange",
      trending: true,
    },
    {
      id: 5,
      name: "María Gómez",
      specialty: "Finanzas Personales",
      area: "Finanzas",
      experience: "7 años",
      mentees: 167,
      description:
        "Guía a jóvenes en planificación financiera, inversiones básicas y manejo saludable del dinero.",
      emoji: "💰",
      color: "green",
      trending: false,
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200",
    pink: "bg-pink-100 text-pink-600 border-pink-200",
    green: "bg-green-100 text-green-600 border-green-200",
    orange: "bg-orange-100 text-orange-600 border-orange-200",
  };

  const handleJoinMentor = (mentorId) => {
    if (joinedMentors.includes(mentorId)) {
      setJoinedMentors(joinedMentors.filter((id) => id !== mentorId));
    } else {
      setJoinedMentors([...joinedMentors, mentorId]);
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesArea =
      selectedArea === "Todas" || mentor.area === selectedArea;

    return matchesSearch && matchesArea;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Mentorías Virtuales TalentBridge
          </h2>
          <p className="text-secondary text-lg">
            Conéctate con mentores especializados, recibe asesoría profesional y potencia tu futuro.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-blue-500">
                support_agent
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {mentors.length}
                </p>
                <p className="text-sm text-secondary">Mentores activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-green-500">
                person_check
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {joinedMentors.length}
                </p>
                <p className="text-sm text-secondary">Mentores seguidos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-purple-500">
                trending_up
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {mentors.reduce((acc, m) => acc + m.mentees, 0).toLocaleString()}
                </p>
                <p className="text-sm text-secondary">Jóvenes impactados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar mentor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedArea === area
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => {
            const joined = joinedMentors.includes(mentor.id);

            return (
              <div
                key={mentor.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
              >
                <div className={`p-6 ${colorClasses[mentor.color]} border-b-2`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{mentor.emoji}</div>
                    {mentor.trending && (
                      <span className="flex items-center gap-1 text-xs font-semibold bg-white/80 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">
                          trending_up
                        </span>
                        Tendencia
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {mentor.name}
                  </h3>

                  <p className="text-sm font-medium bg-white/80 px-3 py-1 rounded-full inline-block">
                    {mentor.specialty}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-sm text-secondary mb-4 line-clamp-3">
                    {mentor.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm text-secondary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">
                        person
                      </span>
                      {mentor.experience} experiencia
                    </span>

                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">
                        group
                      </span>
                      {mentor.mentees.toLocaleString()} mentees
                    </span>
                  </div>

                  <button
                    onClick={() => handleJoinMentor(mentor.id)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      joined
                        ? "bg-gray-100 text-gray-700"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {joined ? "check_circle" : "add_circle"}
                    </span>
                    {joined ? "Siguiendo" : "Seguir mentor"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMentors.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
              search_off
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron mentores
            </h3>
            <p className="text-secondary">
              Intenta ajustar tu búsqueda o filtros
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
