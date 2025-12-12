import { useState, useMemo } from "react"
import Layout from "../components/Layout"

export default function Comunidades() {
  const [joinedCommunities, setJoinedCommunities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const categories = ["Todas", "Tecnología", "Negocios", "Diseño", "Marketing", "Salud", "Educación"]

  const communities = [
    {
      id: 1,
      name: "Desarrolladores Full Stack",
      category: "Tecnología",
      members: 2847,
      description: "Comunidad de desarrolladores que comparten experiencias, proyectos y oportunidades laborales.",
      icon: "code",
      trending: true,
    },
    {
      id: 2,
      name: "Diseño UX/UI",
      category: "Diseño",
      members: 1523,
      description: "Espacio para diseñadores que buscan feedback, recursos y networking profesional.",
      icon: "palette",
      trending: true,
    },
    {
      id: 3,
      name: "Marketing Digital",
      category: "Marketing",
      members: 3201,
      description: "Profesionales del marketing compartiendo estrategias, tendencias y casos de éxito.",
      icon: "trending_up",
      trending: false,
    },
    {
      id: 4,
      name: "Data Science & AI",
      category: "Tecnología",
      members: 1890,
      description: "Comunidad dedicada a ciencia de datos, machine learning e inteligencia artificial.",
      icon: "smart_toy",
      trending: true,
    },
    {
      id: 5,
      name: "Emprendedores Tech",
      category: "Negocios",
      members: 987,
      description: "Red de emprendedores tecnológicos compartiendo ideas, recursos y mentorías.",
      icon: "rocket_launch",
      trending: false,
    },
    {
      id: 6,
      name: "Recursos Humanos",
      category: "Negocios",
      members: 1456,
      description: "Profesionales de RRHH discutiendo tendencias en reclutamiento y gestión del talento.",
      icon: "group",
      trending: false,
    },
    {
      id: 7,
      name: "Enfermería y Salud",
      category: "Salud",
      members: 2103,
      description: "Comunidad de profesionales de la salud compartiendo conocimientos y experiencias.",
      icon: "local_hospital",
      trending: false,
    },
    {
      id: 8,
      name: "Educación Online",
      category: "Educación",
      members: 1678,
      description: "Educadores innovadores explorando nuevas metodologías y herramientas digitales.",
      icon: "school",
      trending: false,
    },
  ]

  const handleJoinCommunity = (communityId) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId))
    } else {
      setJoinedCommunities([...joinedCommunities, communityId])
    }
  }

  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        community.name.toLowerCase().includes(searchLower) ||
        community.description.toLowerCase().includes(searchLower) ||
        community.category.toLowerCase().includes(searchLower)
      const matchesCategory = selectedCategory === "Todas" || community.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-4">Comunidades Profesionales</h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Conecta con profesionales, comparte experiencias y expande tu red en comunidades de tu interés.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Section */}
          <div className="mb-12">
            <div className="relative mb-8">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar comunidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-slate-200 rounded-lg text-base focus:outline-none focus:border-blue-500 text-slate-900 placeholder-slate-500 transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-slate-600">
              {filteredCommunities.length} comunidad{filteredCommunities.length !== 1 ? "es" : ""} encontrada
              {filteredCommunities.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Communities Grid */}
          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCommunities.map((community) => {
                const isJoined = joinedCommunities.includes(community.id)
                return (
                  <div
                    key={community.id}
                    className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Icon & Trending Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-blue-600">{community.icon}</span>
                      </div>
                      {community.trending && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                          <span className="material-symbols-outlined text-xs">local_fire_department</span>
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{community.name}</h3>
                    <span className="inline-block text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
                      {community.category}
                    </span>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">{community.description}</p>

                    {/* Members */}
                    <div className="flex items-center gap-2 text-slate-600 text-sm mb-6 border-t border-slate-200 pt-4">
                      <span className="material-symbols-outlined text-lg">group</span>
                      <span className="font-medium">{community.members.toLocaleString()} miembros</span>
                    </div>

                    {/* Join Button */}
                    <button
                      onClick={() => handleJoinCommunity(community.id)}
                      className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                        isJoined
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {isJoined ? "Guardado" : "Guardar"}
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-12 text-center mb-12">
              <span className="material-symbols-outlined text-6xl text-slate-300 block mb-4">search_off</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No hay comunidades que coincidan</h3>
              <p className="text-slate-600 mb-8">Intenta cambiar tus filtros o búsqueda</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todas")
                }}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver todas las comunidades
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-slate-50 rounded-xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-1">{communities.length}</p>
              <p className="text-slate-600">Comunidades activas</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-1">{joinedCommunities.length}</p>
              <p className="text-slate-600">En tu colección</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-1">
                {(communities.reduce((sum, c) => sum + c.members, 0) / 1000).toFixed(1)}K+
              </p>
              <p className="text-slate-600">Miembros totales</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
