import { useState } from "react";
import Layout from "../components/Layout";

export default function Comunidades() {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = [
    "Todas",
    "Tecnología",
    "Negocios",
    "Diseño",
    "Marketing",
    "Salud",
    "Educación",
  ];

  const communities = [
    {
      id: 1,
      name: "Desarrolladores Full Stack",
      category: "Tecnología",
      members: 2847,
      description:
        "Comunidad de desarrolladores que comparten experiencias, proyectos y oportunidades laborales.",
      image: "💻",
      color: "blue",
      trending: true,
    },
    {
      id: 2,
      name: "Diseño UX/UI",
      category: "Diseño",
      members: 1523,
      description:
        "Espacio para diseñadores que buscan feedback, recursos y networking profesional.",
      image: "🎨",
      color: "purple",
      trending: true,
    },
    {
      id: 3,
      name: "Marketing Digital",
      category: "Marketing",
      members: 3201,
      description:
        "Profesionales del marketing compartiendo estrategias, tendencias y casos de éxito.",
      image: "📱",
      color: "pink",
      trending: false,
    },
    {
      id: 4,
      name: "Data Science & AI",
      category: "Tecnología",
      members: 1890,
      description:
        "Comunidad dedicada a ciencia de datos, machine learning e inteligencia artificial.",
      image: "🤖",
      color: "green",
      trending: true,
    },
    {
      id: 5,
      name: "Emprendedores Tech",
      category: "Negocios",
      members: 987,
      description:
        "Red de emprendedores tecnológicos compartiendo ideas, recursos y mentorías.",
      image: "🚀",
      color: "orange",
      trending: false,
    },
    {
      id: 6,
      name: "Recursos Humanos",
      category: "Negocios",
      members: 1456,
      description:
        "Profesionales de RRHH discutiendo tendencias en reclutamiento y gestión del talento.",
      image: "👥",
      color: "indigo",
      trending: false,
    },
    {
      id: 7,
      name: "Enfermería y Salud",
      category: "Salud",
      members: 2103,
      description:
        "Comunidad de profesionales de la salud compartiendo conocimientos y experiencias.",
      image: "🏥",
      color: "red",
      trending: false,
    },
    {
      id: 8,
      name: "Educación Online",
      category: "Educación",
      members: 1678,
      description:
        "Educadores innovadores explorando nuevas metodologías y herramientas digitales.",
      image: "📚",
      color: "yellow",
      trending: false,
    },
  ];

  const handleJoinCommunity = (communityId) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId));
    } else {
      setJoinedCommunities([...joinedCommunities, communityId]);
    }
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch = community.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200",
    pink: "bg-pink-100 text-pink-600 border-pink-200",
    green: "bg-green-100 text-green-600 border-green-200",
    orange: "bg-orange-100 text-orange-600 border-orange-200",
    indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
    red: "bg-red-100 text-red-600 border-red-200",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Comunidades Profesionales
          </h2>
          <p className="text-secondary text-lg">
            Únete a grupos de interés, comparte experiencias y amplía tu red
            profesional
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-blue-500">
                groups
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {communities.length}
                </p>
                <p className="text-sm text-secondary">Comunidades activas</p>
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
                  {joinedCommunities.length}
                </p>
                <p className="text-sm text-secondary">Comunidades unidas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-purple-500">
                forum
              </span>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {communities
                    .reduce((sum, c) => sum + c.members, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-secondary">Miembros totales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar comunidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => {
            const isJoined = joinedCommunities.includes(community.id);
            return (
              <div
                key={community.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div
                  className={`p-6 ${colorClasses[community.color]} border-b-2`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{community.image}</div>
                    {community.trending && (
                      <span className="flex items-center gap-1 text-xs font-semibold bg-white/80 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm">
                          trending_up
                        </span>
                        Tendencia
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {community.name}
                  </h3>
                  <span className="inline-block text-xs font-medium px-3 py-1 bg-white/80 rounded-full">
                    {community.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-sm text-secondary mb-4 line-clamp-3">
                    {community.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <span className="material-symbols-outlined text-base">
                        group
                      </span>
                      <span className="font-medium">
                        {community.members.toLocaleString()} miembros
                      </span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => handleJoinCommunity(community.id)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isJoined
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {isJoined ? "check_circle" : "add_circle"}
                    </span>
                    {isJoined ? "Unido" : "Unirse"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
              search_off
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron comunidades
            </h3>
            <p className="text-secondary">
              Intenta ajustar tu búsqueda o filtros
            </p>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            ¿Por qué unirte a una comunidad?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <span className="material-symbols-outlined text-5xl text-blue-600 mb-3">
                handshake
              </span>
              <h4 className="font-semibold text-primary mb-2">Networking</h4>
              <p className="text-sm text-secondary">
                Conoce profesionales de tu área
              </p>
            </div>

            <div className="text-center">
              <span className="material-symbols-outlined text-5xl text-green-600 mb-3">
                school
              </span>
              <h4 className="font-semibold text-primary mb-2">Aprendizaje</h4>
              <p className="text-sm text-secondary">
                Comparte y adquiere conocimientos
              </p>
            </div>

            <div className="text-center">
              <span className="material-symbols-outlined text-5xl text-purple-600 mb-3">
                work
              </span>
              <h4 className="font-semibold text-primary mb-2">Oportunidades</h4>
              <p className="text-sm text-secondary">
                Accede a ofertas exclusivas
              </p>
            </div>

            <div className="text-center">
              <span className="material-symbols-outlined text-5xl text-orange-600 mb-3">
                support_agent
              </span>
              <h4 className="font-semibold text-primary mb-2">Mentoría</h4>
              <p className="text-sm text-secondary">
                Encuentra guías en tu carrera
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}