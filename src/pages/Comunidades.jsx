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
      color: "purple"
    },
    {
      id: 2,
      name: "Diseño UX/UI",
      category: "Diseño",
      members: 1523,
      description: "Espacio para diseñadores que buscan feedback, recursos y networking profesional.",
      icon: "palette",
      trending: true,
      color: "fuchsia"
    },
    {
      id: 3,
      name: "Marketing Digital",
      category: "Marketing",
      members: 3201,
      description: "Profesionales del marketing compartiendo estrategias, tendencias y casos de éxito.",
      icon: "trending_up",
      trending: false,
      color: "pink"
    },
    {
      id: 4,
      name: "Data Science & AI",
      category: "Tecnología",
      members: 1890,
      description: "Comunidad dedicada a ciencia de datos, machine learning e inteligencia artificial.",
      icon: "smart_toy",
      trending: true,
      color: "purple"
    },
    {
      id: 5,
      name: "Emprendedores Tech",
      category: "Negocios",
      members: 987,
      description: "Red de emprendedores tecnológicos compartiendo ideas, recursos y mentorías.",
      icon: "rocket_launch",
      trending: false,
      color: "fuchsia"
    },
    {
      id: 6,
      name: "Recursos Humanos",
      category: "Negocios",
      members: 1456,
      description: "Profesionales de RRHH discutiendo tendencias en reclutamiento y gestión del talento.",
      icon: "group",
      trending: false,
      color: "pink"
    },
    {
      id: 7,
      name: "Enfermería y Salud",
      category: "Salud",
      members: 2103,
      description: "Comunidad de profesionales de la salud compartiendo conocimientos y experiencias.",
      icon: "local_hospital",
      trending: false,
      color: "purple"
    },
    {
      id: 8,
      name: "Educación Online",
      category: "Educación",
      members: 1678,
      description: "Educadores innovadores explorando nuevas metodologías y herramientas digitales.",
      icon: "school",
      trending: false,
      color: "fuchsia"
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

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: "bg-background-purple/20",
        icon: "text-accent-purple",
        border: "border-accent-purple",
        hover: "hover:border-accent-purple",
        shadow: "shadow-accent-purple/20"
      },
      fuchsia: {
        bg: "bg-background-violet/20",
        icon: "text-accent-fuchsia",
        border: "border-accent-fuchsia",
        hover: "hover:border-accent-fuchsia",
        shadow: "shadow-accent-fuchsia/20"
      },
      pink: {
        bg: "bg-pink-900/20",
        icon: "text-accent-pink",
        border: "border-accent-pink",
        hover: "hover:border-accent-pink",
        shadow: "shadow-accent-pink/20"
      }
    }
    return colors[color] || colors.purple
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-background-purple via-background-violet to-background-main py-16 mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-accent-purple/20 rounded-2xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-5xl text-accent-purple">groups</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-text-primary mb-2">Comunidades Profesionales</h1>
                <p className="text-xl text-text-secondary max-w-2xl">
                  Conecta con profesionales, comparte experiencias y expande tu red en comunidades de tu interés.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Search Section */}
          <div className="mb-12">
            <div className="relative mb-8">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-2xl pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar comunidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-xl text-base focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all shadow-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg shadow-accent-purple/30 transform scale-105"
                      : "bg-background-header backdrop-blur-md text-text-secondary hover:text-text-hover hover:bg-background-purple/30 border border-accent-purple/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-text-secondary">
              {filteredCommunities.length} comunidad{filteredCommunities.length !== 1 ? "es" : ""} encontrada
              {filteredCommunities.length !== 1 ? "s" : ""}
            </p>
            {joinedCommunities.length > 0 && (
              <span className="px-4 py-2 bg-background-purple/30 text-accent-purple rounded-full text-sm font-medium">
                {joinedCommunities.length} guardadas
              </span>
            )}
          </div>

          {/* Communities Grid */}
          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCommunities.map((community) => {
                const isJoined = joinedCommunities.includes(community.id)
                const colorClasses = getColorClasses(community.color)
                return (
                  <div
                    key={community.id}
                    className={`bg-background-header backdrop-blur-md border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                      isJoined ? `${colorClasses.border} ${colorClasses.shadow}` : "border-accent-purple/10 hover:border-accent-purple/30"
                    }`}
                  >
                    {/* Icon & Trending Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${colorClasses.bg} rounded-xl backdrop-blur-sm`}>
                        <span className={`material-symbols-outlined text-3xl ${colorClasses.icon}`}>{community.icon}</span>
                      </div>
                      {community.trending && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-accent-pink to-accent-fuchsia text-white shadow-lg animate-pulse">
                          <span className="material-symbols-outlined text-xs">local_fire_department</span>
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-lg font-bold text-text-primary mb-2">{community.name}</h3>
                    <span className={`inline-block text-xs font-medium ${colorClasses.icon} ${colorClasses.bg} px-3 py-1 rounded-full mb-3`}>
                      {community.category}
                    </span>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-6 line-clamp-2">{community.description}</p>

                    {/* Members */}
                    <div className="flex items-center gap-2 text-text-secondary text-sm mb-6 border-t border-accent-purple/10 pt-4">
                      <span className="material-symbols-outlined text-lg">group</span>
                      <span className="font-medium">{community.members.toLocaleString()} miembros</span>
                    </div>

                    {/* Join Button */}
                    <button
                      onClick={() => handleJoinCommunity(community.id)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 ${
                        isJoined
                          ? `bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg ${colorClasses.shadow}`
                          : `border-2 ${colorClasses.border} ${colorClasses.icon} ${colorClasses.hover} backdrop-blur-sm`
                      }`}
                    >
                      {isJoined ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg">check_circle</span>
                          Guardado
                        </span>
                      ) : (
                        "Guardar"
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-12 text-center mb-12">
              <span className="material-symbols-outlined text-6xl text-text-secondary/50 block mb-4">search_off</span>
              <h3 className="text-2xl font-bold text-text-primary mb-2">No hay comunidades que coincidan</h3>
              <p className="text-text-secondary mb-8">Intenta cambiar tus filtros o búsqueda</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todas")
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Ver todas las comunidades
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-background-purple via-background-violet to-background-main backdrop-blur-md rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border border-accent-purple/20">
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent mb-2">
                {communities.length}
              </p>
              <p className="text-text-secondary">Comunidades activas</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent mb-2">
                {joinedCommunities.length}
              </p>
              <p className="text-text-secondary">En tu colección</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent mb-2">
                {(communities.reduce((sum, c) => sum + c.members, 0) / 1000).toFixed(1)}K+
              </p>
              <p className="text-text-secondary">Miembros totales</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}