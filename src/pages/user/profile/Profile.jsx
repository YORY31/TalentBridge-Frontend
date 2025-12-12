import { useState, useEffect } from "react"
import Layout from "../../../components/Layout"

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
    { id: 1, name: "Desarrolladores Full Stack", category: "Tecnología", members: 2847, icon: "code", color: "purple" },
    { id: 2, name: "Diseño UX/UI", category: "Diseño", members: 1523, icon: "palette", color: "fuchsia" },
    { id: 3, name: "Marketing Digital", category: "Marketing", members: 3201, icon: "trending_up", color: "pink" },
    { id: 4, name: "Data Science & AI", category: "Tecnología", members: 1890, icon: "smart_toy", color: "purple" },
    { id: 5, name: "Emprendedores Tech", category: "Negocios", members: 987, icon: "rocket_launch", color: "fuchsia" },
    { id: 6, name: "Recursos Humanos", category: "Negocios", members: 1456, icon: "group", color: "pink" },
    { id: 7, name: "Enfermería y Salud", category: "Salud", members: 2103, icon: "local_hospital", color: "purple" },
    { id: 8, name: "Educación Online", category: "Educación", members: 1678, icon: "school", color: "fuchsia" },
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

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: "bg-background-purple/20",
        icon: "text-accent-purple",
        border: "border-accent-purple",
      },
      fuchsia: {
        bg: "bg-background-violet/20",
        icon: "text-accent-fuchsia",
        border: "border-accent-fuchsia",
      },
      pink: {
        bg: "bg-pink-900/20",
        icon: "text-accent-pink",
        border: "border-accent-pink",
      }
    }
    return colors[color] || colors.purple
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Profile Header */}
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
            <div className="flex flex-col gap-6 sm:gap-8 items-center sm:items-start">
              {/* Avatar y Info */}
              <div className="w-full flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={userProfile.avatar || "/placeholder.svg"}
                      alt={userProfile.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl object-cover border-4 border-accent-purple shadow-xl shadow-accent-purple/30"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=8b5cf6&color=fff&size=144`
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-accent-purple to-accent-fuchsia rounded-xl shadow-lg">
                      <span className="material-symbols-outlined text-white text-xl">verified</span>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-2">{userProfile.name}</h1>
                  <p className="text-xl sm:text-2xl bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent font-bold mb-4">{userProfile.title}</p>
                  <p className="text-base text-text-secondary mb-6 max-w-2xl leading-relaxed">{userProfile.bio}</p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary bg-background-purple/30 px-4 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-lg text-accent-purple">location_on</span>
                      <span className="truncate max-w-[150px] sm:max-w-none">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary bg-background-purple/30 px-4 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-lg text-accent-fuchsia">work</span>
                      <span>{userProfile.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary bg-background-purple/30 px-4 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-lg text-accent-pink">calendar_today</span>
                      <span>Se unió en {userProfile.joined}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:self-start">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Editar Perfil
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent-purple text-accent-purple font-semibold rounded-xl hover:bg-background-purple/30 transition-all transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Descargar CV
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
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
                className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm whitespace-nowrap rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg shadow-accent-purple/30"
                    : "bg-background-header backdrop-blur-md text-text-secondary hover:text-text-hover border border-accent-purple/20"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent-purple text-3xl">person</span>
                    Información Personal
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { label: "Email", value: userProfile.email, icon: "mail" },
                    { label: "Teléfono", value: userProfile.phone, icon: "call" },
                    { label: "Sitio Web", value: userProfile.website, icon: "language" },
                    { label: "LinkedIn", value: userProfile.linkedin, icon: "link" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-background-purple/20 rounded-xl p-4 border border-accent-purple/10">
                      <p className="text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent-purple text-lg">{item.icon}</span>
                        {item.label}
                      </p>
                      <p className="text-base text-text-primary truncate font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Experiencias", value: experience.length, icon: "work", gradient: "from-accent-purple to-accent-fuchsia" },
                    { label: "Habilidades", value: skills.length, icon: "star", gradient: "from-accent-fuchsia to-accent-pink" },
                    { label: "Educación", value: education.length, icon: "school", gradient: "from-accent-pink to-accent-purple" },
                    { label: "Comunidades", value: mySavedCommunities.length, icon: "groups", gradient: "from-accent-purple to-accent-fuchsia" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-background-purple via-background-violet to-background-main rounded-xl p-5 text-center border border-accent-purple/20 hover:shadow-xl hover:shadow-accent-purple/20 transition-all"
                    >
                      <span className={`material-symbols-outlined text-4xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 block`}>
                        {stat.icon}
                      </span>
                      <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</p>
                      <p className="text-xs text-text-secondary mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 hover:shadow-2xl hover:border-accent-purple/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-background-purple/30 rounded-xl backdrop-blur-sm">
                      <span className="material-symbols-outlined text-3xl text-accent-purple">work</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-text-primary mb-1">{exp.position}</h3>
                      <p className="text-base text-accent-fuchsia font-semibold mb-3">{exp.company}</p>
                      <p className="text-sm text-text-secondary flex items-center gap-2 mb-4 bg-background-purple/20 px-3 py-2 rounded-lg w-fit">
                        <span className="material-symbols-outlined text-accent-pink">calendar_month</span>
                        {exp.duration}
                      </p>
                      <p className="text-base text-text-secondary leading-relaxed">{exp.description}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="p-2 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20"
                    >
                      <span className="material-symbols-outlined text-red-500 text-2xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Experience Button */}
              <button
                onClick={() => setEditingSection("experience")}
                className="w-full border-2 border-dashed border-accent-purple/40 rounded-2xl p-8 hover:border-accent-purple hover:bg-background-purple/20 transition-all text-text-secondary hover:text-accent-purple font-semibold flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">add_circle</span>
                Agregar Experiencia
              </button>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 hover:shadow-2xl hover:border-accent-fuchsia/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-background-violet/30 rounded-xl backdrop-blur-sm">
                      <span className="material-symbols-outlined text-3xl text-accent-fuchsia">school</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-text-primary mb-1">{edu.degree}</h3>
                      <p className="text-base text-accent-purple font-semibold mb-3">{edu.institution}</p>
                      <p className="text-sm text-text-secondary flex items-center gap-2 mb-4 bg-background-purple/20 px-3 py-2 rounded-lg w-fit">
                        <span className="material-symbols-outlined text-accent-pink">calendar_month</span>
                        {edu.year}
                      </p>
                      {edu.description && <p className="text-base text-text-secondary leading-relaxed">{edu.description}</p>}
                    </div>
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="p-2 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20"
                    >
                      <span className="material-symbols-outlined text-red-500 text-2xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Education Button */}
              <button
                onClick={() => setEditingSection("education")}
                className="w-full border-2 border-dashed border-accent-purple/40 rounded-2xl p-8 hover:border-accent-fuchsia hover:bg-background-violet/20 transition-all text-text-secondary hover:text-accent-fuchsia font-semibold flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">add_circle</span>
                Agregar Educación
              </button>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 hover:shadow-2xl hover:border-accent-pink/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="p-3 bg-background-purple/30 rounded-xl backdrop-blur-sm">
                        <span className="material-symbols-outlined text-2xl text-accent-pink">check_circle</span>
                      </div>
                      <h3 className="font-bold text-text-primary text-lg truncate">{skill.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <span
                        className={`text-xs font-bold px-4 py-2 rounded-full ${
                          skill.level === "expert"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                            : "bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg shadow-accent-purple/30"
                        }`}
                      >
                        {skill.level === "expert" ? "Experto" : "Avanzado"}
                      </span>
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="p-2 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20"
                      >
                        <span className="material-symbols-outlined text-red-500 text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 bg-background-purple/20 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="material-symbols-outlined text-accent-purple">star</span>
                      <span className="font-medium">{skill.endorsements} endorsements</span>
                    </div>
                    <button
                      onClick={() => handleEndorseSkill(skill.id)}
                      className="text-sm text-accent-purple hover:text-accent-fuchsia font-bold transition-colors"
                    >
                      + Endorse
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Skill Button */}
              <button
                onClick={() => setEditingSection("skill")}
                className="w-full border-2 border-dashed border-accent-purple/40 rounded-2xl p-8 hover:border-accent-pink hover:bg-pink-900/10 transition-all text-text-secondary hover:text-accent-pink font-semibold flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">add_circle</span>
                Agregar Habilidad
              </button>
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === "communities" && (
            <div>
              {mySavedCommunities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mySavedCommunities.map((community) => {
                    const colorClasses = getColorClasses(community.color)
                    return (
                      <div
                        key={community.id}
                        className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-6 hover:shadow-2xl hover:border-accent-purple/40 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 ${colorClasses.bg} rounded-xl backdrop-blur-sm`}>
                            <span className={`material-symbols-outlined text-2xl ${colorClasses.icon}`}>
                              {community.icon}
                            </span>
                          </div>
                          <button
                            onClick={() => removeCommunity(community.id)}
                            className="p-2 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20 ml-auto"
                          >
                            <span className="material-symbols-outlined text-red-500 text-xl">close</span>
                          </button>
                        </div>
                        <h3 className="font-bold text-text-primary mb-2 text-base">{community.name}</h3>
                        <span className={`inline-block text-xs font-medium ${colorClasses.icon} ${colorClasses.bg} px-3 py-1 rounded-full mb-4`}>
                          {community.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-text-secondary border-t border-accent-purple/10 pt-4">
                          <span className="material-symbols-outlined text-lg">group</span>
                          <span className="font-medium">{community.members.toLocaleString()} miembros</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-12 text-center">
                  <div className="inline-block p-6 bg-background-purple/30 rounded-2xl mb-6">
                    <span className="material-symbols-outlined text-6xl text-text-secondary/50">groups</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Sin comunidades guardadas</h3>
                  <p className="text-base text-text-secondary">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-purple text-3xl">edit</span>
              Editar Perfil
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Nombre</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Título Profesional</label>
                <input
                  type="text"
                  value={tempProfile.title}
                  onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Biografía</label>
                <textarea
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Ubicación</label>
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Experiencia</label>
                  <input
                    type="text"
                    value={tempProfile.experience}
                    onChange={(e) => setTempProfile({ ...tempProfile, experience: e.target.value })}
                    placeholder="ej: 5+ años"
                    className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Sitio Web</label>
                <input
                  type="text"
                  value={tempProfile.website}
                  onChange={(e) => setTempProfile({ ...tempProfile, website: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">LinkedIn</label>
                <input
                  type="text"
                  value={tempProfile.linkedin}
                  onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">URL de Avatar</label>
                <input
                  type="text"
                  value={tempProfile.avatar}
                  onChange={(e) => setTempProfile({ ...tempProfile, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-6 py-3 text-base bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-6 py-3 text-base bg-background-main border-2 border-accent-purple/20 text-text-primary font-semibold rounded-xl hover:bg-background-purple/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Habilidad */}
      {editingSection === "skill" && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/30 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-pink text-3xl">star</span>
              Agregar Habilidad
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Nombre de la Habilidad</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="ej: React, Python, SQL"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Nivel</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary transition-all"
                >
                  <option value="advanced">Avanzado</option>
                  <option value="expert">Experto</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAddSkill}
                className="flex-1 px-6 py-3 text-base bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-6 py-3 text-base bg-background-main border-2 border-accent-purple/20 text-text-primary font-semibold rounded-xl hover:bg-background-purple/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Experiencia */}
      {editingSection === "experience" && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/30 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-purple text-3xl">work</span>
              Agregar Experiencia
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Cargo</label>
                <input
                  type="text"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="ej: Senior Developer"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Empresa</label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="ej: Tech Corp"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Periodo</label>
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                  placeholder="ej: 2021 - Presente"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Descripción</label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  rows={3}
                  placeholder="Describe tus responsabilidades y logros..."
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAddExperience}
                className="flex-1 px-6 py-3 text-base bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-6 py-3 text-base bg-background-main border-2 border-accent-purple/20 text-text-primary font-semibold rounded-xl hover:bg-background-purple/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Educación */}
      {editingSection === "education" && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/30 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-fuchsia text-3xl">school</span>
              Agregar Educación
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Título</label>
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="ej: Licenciatura en Ingeniería de Software"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Institución</label>
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="ej: Universidad Tecnológica"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Año</label>
                <input
                  type="text"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                  placeholder="ej: 2018 - 2022"
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Descripción (Opcional)</label>
                <textarea
                  value={newEducation.description}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  rows={3}
                  placeholder="Menciona logros, honores o actividades relevantes..."
                  className="w-full px-4 py-3 text-base bg-background-main border-2 border-accent-purple/20 rounded-xl focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAddEducation}
                className="flex-1 px-6 py-3 text-base bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105"
              >
                Agregar
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-6 py-3 text-base bg-background-main border-2 border-accent-purple/20 text-text-primary font-semibold rounded-xl hover:bg-background-purple/20 transition-all"
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