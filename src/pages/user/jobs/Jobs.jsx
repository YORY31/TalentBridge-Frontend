import { useState, useMemo } from "react"
import Layout from "../../../components/Layout"

export default function Jobs() {
  const [savedJobs, setSavedJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedType, setSelectedType] = useState("Todos")

  const categories = ["Todas", "Tecnología", "Diseño", "Marketing", "Negocios", "Salud", "Educación"]
  const types = ["Todos", "Tiempo completo", "Medio tiempo", "Remoto", "Híbrido", "Freelance"]

  const jobs = [
    {
      id: 1,
      title: "Desarrollador Full Stack Senior",
      company: "Tech Innovators Inc.",
      location: "Ciudad de México, México",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQVM3PRo3wB6-PF9Qax-dqzARLsFLYZ7G80eL4hzsZI2rXVJLD1_7-IjtTvz08NZjFOPku8LcJej0d5P_A9JL4atr851bVz0nXo8M3i-oBvUuDw6fWf4mkFbglKqD0N0caqv0Q5cJadh6ilZr5Biz39m8G1mB9xnUAi8LpdjP9E9GtCKsv5S0S6kDxS3v2drah2zPbyPniK4UutTk35UBtWMphm8WcpuaKyVqzGrYls4jkLYD_beiGvTxa6nub_UBHuWiFGpN23S4",
      category: "Tecnología",
      type: "Tiempo completo",
      salary: "$45,000 - $60,000 MXN",
      experience: "3-5 años",
      postedDate: "Hace 1 día",
      applications: 89,
      urgent: true,
      remote: true,
      color: "purple"
    },
    {
      id: 2,
      title: "Diseñador UX/UI",
      company: "Creative Studio MX",
      location: "Guadalajara, Jalisco",
      img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop",
      category: "Diseño",
      type: "Remoto",
      salary: "$35,000 - $48,000 MXN",
      experience: "2-4 años",
      postedDate: "Hace 2 días",
      applications: 134,
      urgent: false,
      remote: true,
      color: "fuchsia"
    },
    {
      id: 3,
      title: "Especialista en Marketing Digital",
      company: "Growth Marketing Co.",
      location: "Monterrey, Nuevo León",
      img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      category: "Marketing",
      type: "Híbrido",
      salary: "$32,000 - $42,000 MXN",
      experience: "2-3 años",
      postedDate: "Hace 3 días",
      applications: 67,
      urgent: true,
      remote: false,
      color: "pink"
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "AI Solutions Lab",
      location: "Ciudad de México, México",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop",
      category: "Tecnología",
      type: "Tiempo completo",
      salary: "$55,000 - $75,000 MXN",
      experience: "4-6 años",
      postedDate: "Hace 1 día",
      applications: 156,
      urgent: true,
      remote: true,
      color: "purple"
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Business Solutions Inc.",
      location: "Puebla, Puebla",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
      category: "Negocios",
      type: "Tiempo completo",
      salary: "$38,000 - $52,000 MXN",
      experience: "3-5 años",
      postedDate: "Hace 4 días",
      applications: 92,
      urgent: false,
      remote: false,
      color: "fuchsia"
    },
    {
      id: 6,
      title: "Community Manager",
      company: "Social Media Agency",
      location: "Remoto",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
      category: "Marketing",
      type: "Freelance",
      salary: "$18,000 - $28,000 MXN",
      experience: "1-2 años",
      postedDate: "Hace 5 días",
      applications: 203,
      urgent: false,
      remote: true,
      color: "pink"
    },
    {
      id: 7,
      title: "Enfermera Especializada",
      company: "Hospital Central",
      location: "Querétaro, Querétaro",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop",
      category: "Salud",
      type: "Tiempo completo",
      salary: "$28,000 - $38,000 MXN",
      experience: "2-4 años",
      postedDate: "Hace 2 días",
      applications: 45,
      urgent: true,
      remote: false,
      color: "purple"
    },
    {
      id: 8,
      title: "Profesor de Matemáticas",
      company: "Colegio Innovador",
      location: "Mérida, Yucatán",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop",
      category: "Educación",
      type: "Medio tiempo",
      salary: "$15,000 - $22,000 MXN",
      experience: "1-3 años",
      postedDate: "Hace 6 días",
      applications: 78,
      urgent: false,
      remote: false,
      color: "fuchsia"
    },
  ]

  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.category.toLowerCase().includes(searchLower)
      const matchesCategory = selectedCategory === "Todas" || job.category === selectedCategory
      const matchesType = selectedType === "Todos" || job.type === selectedType
      return matchesSearch && matchesCategory && matchesType
    })
  }, [searchTerm, selectedCategory, selectedType])

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
                <span className="material-symbols-outlined text-5xl text-accent-purple">work</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-text-primary mb-2">Oportunidades Laborales</h1>
                <p className="text-xl text-text-secondary max-w-2xl">
                  Descubre tu próxima oportunidad profesional. Explora ofertas que se ajusten a tus habilidades y aspiraciones.
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
                placeholder="Buscar por título, empresa o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-xl text-base focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all shadow-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-secondary mb-3">Categoría</h3>
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

            {/* Type Filters */}
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3">Tipo de empleo</h3>
              <div className="flex flex-wrap gap-3">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      selectedType === type
                        ? "bg-gradient-to-r from-accent-fuchsia to-accent-pink text-white shadow-lg shadow-accent-fuchsia/30 transform scale-105"
                        : "bg-background-header backdrop-blur-md text-text-secondary hover:text-text-hover hover:bg-background-purple/30 border border-accent-purple/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-text-secondary">
              {filteredJobs.length} oportunidad{filteredJobs.length !== 1 ? "es" : ""} encontrada
              {filteredJobs.length !== 1 ? "s" : ""}
            </p>
            {savedJobs.length > 0 && (
              <span className="px-4 py-2 bg-background-purple/30 text-accent-purple rounded-full text-sm font-medium">
                {savedJobs.length} guardadas
              </span>
            )}
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredJobs.map((job) => {
                const isSaved = savedJobs.includes(job.id)
                const colorClasses = getColorClasses(job.color)
                return (
                  <div
                    key={job.id}
                    className={`bg-background-header backdrop-blur-md border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                      isSaved ? `${colorClasses.border} ${colorClasses.shadow}` : "border-accent-purple/10 hover:border-accent-purple/30"
                    }`}
                  >
                    {/* Company Logo & Urgent Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl bg-cover bg-center shadow-lg"
                          style={{ backgroundImage: `url("${job.img}")` }}
                        ></div>
                        <div>
                          <h3 className="text-base font-bold text-text-primary line-clamp-1">{job.title}</h3>
                          <p className="text-sm text-text-secondary">{job.company}</p>
                        </div>
                      </div>
                      {job.urgent && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-accent-pink to-accent-fuchsia text-white shadow-lg">
                          <span className="material-symbols-outlined text-xs">bolt</span>
                        </span>
                      )}
                    </div>

                    {/* Location & Remote */}
                    <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      <span className="line-clamp-1">{job.location}</span>
                      {job.remote && (
                        <span className="ml-auto px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                          Remoto
                        </span>
                      )}
                    </div>

                    {/* Category & Type */}
                    <div className="flex gap-2 mb-4">
                      <span className={`text-xs font-medium ${colorClasses.icon} ${colorClasses.bg} px-3 py-1 rounded-full`}>
                        {job.category}
                      </span>
                      <span className="text-xs font-medium text-text-secondary bg-background-purple/20 px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    {/* Salary & Experience */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-accent-purple/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Salario:</span>
                        <span className="font-semibold text-text-primary">{job.salary}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Experiencia:</span>
                        <span className="font-medium text-text-primary">{job.experience}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-text-secondary">{job.postedDate}</span>
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">group</span>
                        {job.applications} aplicaciones
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 ${
                          isSaved
                            ? `bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg ${colorClasses.shadow}`
                            : `border-2 ${colorClasses.border} ${colorClasses.icon} ${colorClasses.hover} backdrop-blur-sm`
                        }`}
                      >
                        {isSaved ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">bookmark</span>
                            Guardado
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">bookmark_border</span>
                            Guardar
                          </span>
                        )}
                      </button>
                      <button className="px-4 py-3 bg-gradient-to-r from-accent-fuchsia to-accent-pink text-white rounded-xl font-semibold text-sm transition-all transform hover:scale-105 hover:shadow-lg">
                        Ver más
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-12 text-center mb-12">
              <span className="material-symbols-outlined text-6xl text-text-secondary/50 block mb-4">work_off</span>
              <h3 className="text-2xl font-bold text-text-primary mb-2">No hay trabajos que coincidan</h3>
              <p className="text-text-secondary mb-8">Intenta cambiar tus filtros o búsqueda</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todas")
                  setSelectedType("Todos")
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Ver todas las oportunidades
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-background-purple via-background-violet to-background-main backdrop-blur-md rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border border-accent-purple/20">
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent mb-2">
                {jobs.length}
              </p>
              <p className="text-text-secondary">Ofertas activas</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent mb-2">
                {savedJobs.length}
              </p>
              <p className="text-text-secondary">En tu lista</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent mb-2">
                {jobs.filter(j => j.remote).length}
              </p>
              <p className="text-text-secondary">Posiciones remotas</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}