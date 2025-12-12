import { useState, useEffect } from "react"
import Layout from "../components/Layout"

export default function Profile() {
  // Estados principales
  const [activeTab, setActiveTab] = useState("about")
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState(null)

  // Datos del perfil con valores por defecto
  const defaultProfile = {
    name: "Tu Nombre",
    title: "Tu Título Profesional",
    bio: "Describe tu experiencia, pasión y objetivos profesionales. Este es tu espacio para destacar.",
    avatar: "",
    location: "Tu Ciudad, País",
    joined: new Date().getFullYear().toString(),
    experience: "0+ años",
    email: "tu@email.com",
    phone: "+1 (234) 567-8900",
    website: "www.tusitioweb.com",
    linkedin: "linkedin.com/in/tuperfil",
  }

  const [userProfile, setUserProfile] = useState(defaultProfile)
  const [tempProfile, setTempProfile] = useState(defaultProfile)
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [savedCommunities, setSavedCommunities] = useState([])

  // Estados para formularios de agregar nuevo
  const [newSkill, setNewSkill] = useState({ name: "", level: "advanced", endorsements: 0 })
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    duration: "",
    description: "",
  })
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    description: "",
  })

  // Cargar datos desde localStorage al montar
  useEffect(() => {
    const loadData = () => {
      try {
        const savedProfile = localStorage.getItem("userProfile")
        const savedSkills = localStorage.getItem("userSkills")
        const savedExperience = localStorage.getItem("userExperience")
        const savedEducation = localStorage.getItem("userEducation")
        const joinedCommunities = localStorage.getItem("joinedCommunities")

        if (savedProfile) {
          const parsed = JSON.parse(savedProfile)
          setUserProfile(parsed)
          setTempProfile(parsed)
        }
        if (savedSkills) setSkills(JSON.parse(savedSkills))
        if (savedExperience) setExperience(JSON.parse(savedExperience))
        if (savedEducation) setEducation(JSON.parse(savedEducation))
        if (joinedCommunities) setSavedCommunities(JSON.parse(joinedCommunities))
      } catch (e) {
        console.error("Error loading profile data:", e)
      }
    }
    loadData()
  }, [])

  // Guardar automáticamente cuando cambian los datos
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile))
  }, [userProfile])

  useEffect(() => {
    localStorage.setItem("userSkills", JSON.stringify(skills))
  }, [skills])

  useEffect(() => {
    localStorage.setItem("userExperience", JSON.stringify(experience))
  }, [experience])

  useEffect(() => {
    localStorage.setItem("userEducation", JSON.stringify(education))
  }, [education])

  // Sincronizar con comunidades guardadas
  useEffect(() => {
    const interval = setInterval(() => {
      const joinedCommunities = localStorage.getItem("joinedCommunities")
      if (joinedCommunities) {
        setSavedCommunities(JSON.parse(joinedCommunities))
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Todas las comunidades disponibles
  const allCommunities = [
    { id: 1, name: "Desarrolladores Full Stack", category: "Tecnología", members: 2847, icon: "code" },
    { id: 2, name: "Diseño UX/UI", category: "Diseño", members: 1523, icon: "palette" },
    { id: 3, name: "Marketing Digital", category: "Marketing", members: 3201, icon: "trending_up" },
    { id: 4, name: "Data Science & AI", category: "Tecnología", members: 1890, icon: "smart_toy" },
    { id: 5, name: "Emprendedores Tech", category: "Negocios", members: 987, icon: "rocket_launch" },
    { id: 6, name: "Recursos Humanos", category: "Negocios", members: 1456, icon: "group" },
    { id: 7, name: "Enfermería y Salud", category: "Salud", members: 2103, icon: "local_hospital" },
    { id: 8, name: "Educación Online", category: "Educación", members: 1678, icon: "school" },
  ]

  const mySavedCommunities = allCommunities.filter((c) => savedCommunities.includes(c.id))

  // Funciones de edición
  const handleEditProfile = () => {
    setTempProfile(userProfile)
    setEditingSection("profile")
  }

  const handleSaveProfile = () => {
    setUserProfile(tempProfile)
    setEditingSection(null)
  }

  const handleCancelEdit = () => {
    setTempProfile(userProfile)
    setEditingSection(null)
  }

  // Funciones para habilidades
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill.name,
        level: newSkill.level,
        endorsements: 0,
      }
      setSkills([...skills, skill])
      setNewSkill({ name: "", level: "advanced", endorsements: 0 })
      setEditingSection(null)
    }
  }

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter((s) => s.id !== id))
  }

  const handleEndorseSkill = (id) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, endorsements: s.endorsements + 1 } : s)))
  }

  // Funciones para experiencia
  const handleAddExperience = () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      const exp = {
        id: Date.now(),
        ...newExperience,
      }
      setExperience([...experience, exp])
      setNewExperience({ position: "", company: "", duration: "", description: "" })
      setEditingSection(null)
    }
  }

  const handleRemoveExperience = (id) => {
    setExperience(experience.filter((e) => e.id !== id))
  }

  // Funciones para educación
  const handleAddEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      const edu = {
        id: Date.now(),
        ...newEducation,
      }
      setEducation([...education, edu])
      setNewEducation({ degree: "", institution: "", year: "", description: "" })
      setEditingSection(null)
    }
  }

  const handleRemoveEducation = (id) => {
    setEducation(education.filter((e) => e.id !== id))
  }

  // Función para quitar comunidad
  const removeCommunity = (id) => {
    const updated = savedCommunities.filter((cId) => cId !== id)
    setSavedCommunities(updated)
    localStorage.setItem("joinedCommunities", JSON.stringify(updated))
  }

  // Función para descargar CV
  const handleDownloadCV = () => {
    const cvData = {
      profile: userProfile,
      skills: skills,
      experience: experience,
      education: education,
      communities: mySavedCommunities,
    }
    const dataStr = JSON.stringify(cvData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `CV_${userProfile.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Profile Header */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-sm">
            <div className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start">
              {/* Avatar y Botones - Mobile First */}
              <div className="w-full flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt={userProfile.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=0D8ABC&color=fff&size=128`
                    }}
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">{userProfile.name}</h1>
                  <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3 sm:mb-4">{userProfile.title}</p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 max-w-2xl leading-relaxed">{userProfile.bio}</p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base sm:text-lg">location_on</span>
                      <span className="truncate max-w-[150px] sm:max-w-none">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base sm:text-lg">work</span>
                      <span>{userProfile.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base sm:text-lg">calendar_today</span>
                      <span>Se unió en {userProfile.joined}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-2 sm:self-start">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg whitespace-nowrap text-sm sm:text-base"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">edit</span>
                  Editar Perfil
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-600 dark:bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-md hover:shadow-lg whitespace-nowrap text-sm sm:text-base"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">download</span>
                  Descargar CV
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-1 mb-6 sm:mb-8 overflow-x-auto pb-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1 scrollbar-hide">
            {[
              { id: "about", label: "Acerca de", icon: "info" },
              { id: "experience", label: "Experiencia", icon: "work" },
              { id: "education", label: "Educación", icon: "school" },
              { id: "skills", label: "Habilidades", icon: "star" },
              { id: "communities", label: "Comunidades", icon: "groups" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm whitespace-nowrap rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="material-symbols-outlined text-base sm:text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Información Personal</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Email</p>
                    <p className="text-sm sm:text-base text-slate-900 dark:text-white truncate">{userProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Teléfono</p>
                    <p className="text-sm sm:text-base text-slate-900 dark:text-white">{userProfile.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Sitio Web</p>
                    <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 truncate">{userProfile.website}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">LinkedIn</p>
                    <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 truncate">{userProfile.linkedin}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Experiencias", value: experience.length },
                    { label: "Habilidades", value: skills.length },
                    { label: "Educación", value: education.length },
                    { label: "Comunidades", value: mySavedCommunities.length },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 sm:p-4 text-center border border-blue-200 dark:border-blue-700"
                    >
                      <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-4">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined text-xl sm:text-2xl text-blue-600 dark:text-blue-400">
                        work
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{exp.position}</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        {exp.duration}
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{exp.description}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl sm:text-2xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Experience Button */}
              <button
                onClick={() => setEditingSection("experience")}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 sm:p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Agregar Experiencia
              </button>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined text-xl sm:text-2xl text-blue-600 dark:text-blue-400">
                        school
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2">{edu.institution}</p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        {edu.year}
                      </p>
                      {edu.description && <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{edu.description}</p>}
                    </div>
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl sm:text-2xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Education Button */}
              <button
                onClick={() => setEditingSection("education")}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 sm:p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Agregar Educación
              </button>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                        <span className="material-symbols-outlined text-lg sm:text-xl text-blue-600 dark:text-blue-400">
                          check_circle
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg truncate">{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          skill.level === "expert"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {skill.level === "expert" ? "Experto" : "Avanzado"}
                      </span>
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-base sm:text-lg">star</span>
                      <span>{skill.endorsements} endorsements</span>
                    </div>
                    <button
                      onClick={() => handleEndorseSkill(skill.id)}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      + Endorse
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Skill Button */}
              <button
                onClick={() => setEditingSection("skill")}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 sm:p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Agregar Habilidad
              </button>
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === "communities" && (
            <div>
              {mySavedCommunities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {mySavedCommunities.map((community) => (
                    <div
                      key={community.id}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                          <span className="material-symbols-outlined text-xl sm:text-2xl text-blue-600 dark:text-blue-400">
                            {community.icon}
                          </span>
                        </div>
                        <button
                          onClick={() => removeCommunity(community.id)}
                          className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-auto"
                        >
                          <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">close</span>
                        </button>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">{community.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">{community.category}</p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-base sm:text-lg">group</span>
                        <span>{community.members.toLocaleString()} miembros</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 sm:p-12 text-center">
                  <div className="inline-block p-3 sm:p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mb-4">
                    <span className="material-symbols-outlined text-5xl sm:text-6xl text-slate-400 dark:text-slate-500">
                      groups
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Sin comunidades guardadas
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    Ve a la página de Comunidades para unirte a grupos profesionales
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición de Perfil */}
      {editingSection === "profile" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Editar Perfil</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Título Profesional
                </label>
                <input
                  type="text"
                  value={tempProfile.title}
                  onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Biografía
                </label>
                <textarea
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Experiencia
                  </label>
                  <input
                    type="text"
                    value={tempProfile.experience}
                    onChange={(e) => setTempProfile({ ...tempProfile, experience: e.target.value })}
                    placeholder="ej: 5+ años"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Sitio Web
                </label>
                <input
                  type="text"
                  value={tempProfile.website}
                  onChange={(e) => setTempProfile({ ...tempProfile, website: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">LinkedIn</label>
                <input
                  type="text"
                  value={tempProfile.linkedin}
                  onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  URL de Avatar
                </label>
                <input
                  type="text"
                  value={tempProfile.avatar}
                  onChange={(e) => setTempProfile({ ...tempProfile, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Habilidad */}
      {editingSection === "skill" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Agregar Habilidad</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Nombre de la Habilidad
                </label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="ej: React, Python, SQL"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nivel</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="advanced">Avanzado</option>
                  <option value="expert">Experto</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleAddSkill}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Experiencia */}
      {editingSection === "experience" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Agregar Experiencia</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Cargo</label>
                <input
                  type="text"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="ej: Senior Developer"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Empresa</label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="ej: Tech Corp"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Periodo</label>
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                  placeholder="ej: 2021 - Presente"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  rows={3}
                  placeholder="Describe tus responsabilidades y logros..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleAddExperience}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Educación */}
      {editingSection === "education" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Agregar Educación</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Título</label>
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="ej: Licenciatura en Ingeniería de Software"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Institución
                </label>
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="ej: Universidad Tecnológica"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Año</label>
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                  placeholder="ej: 2018 - 2022"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Descripción (Opcional)
                </label>
                <textarea
                  value={newEducation.description}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  rows={3}
                  placeholder="Menciona logros, honores o actividades relevantes..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleAddEducation}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}