
import React from "react";
import Layout from "../../../components/Layout";

export default function JobDetail() {
  const job = {
    title: "Desarrollador de Software Junior",
    company: "Tech Innovators Inc.",
    location: "Ciudad de México, México",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQVM3PRo3wB6-PF9Qax-dqzARLsFLYZ7G80eL4hzsZI2rXVJLD1_7-IjtTvz08NZjFOPku8LcJej0d5P_A9JL4atr851bVz0nXo8M3i-oBvUuDw6fWf4mkFbglKqD0N0caqv0Q5cJadh6ilZr5Biz39m8G1mB9xnUAi8LpdjP9E9GtCKsv5S0S6kDxS3v2drah2zPbyPniK4UutTk35UBtWMphm8WcpuaKyVqzGrYls4jkLYD_beiGvTxa6nub_UBHuWiFGpN23S4",
    type: "Tiempo completo",
    experience: "1-3 años",
    salary: "$35,000 - $45,000 MXN",
    postedDate: "Hace 2 días",
    applications: 127,
    remote: true,
    urgent: true,
  };

  const requirements = [
    "Licenciatura en Ingeniería de Software, Ciencias de la Computación o carrera afín",
    "1-3 años de experiencia en desarrollo web",
    "Conocimiento sólido de JavaScript, HTML5, CSS3",
    "Experiencia con React.js o frameworks similares",
    "Conocimiento de Git y metodologías ágiles",
    "Capacidad para trabajar en equipo y habilidades de comunicación",
    "Inglés intermedio (deseable)",
  ];

  const responsibilities = [
    "Desarrollar y mantener aplicaciones web responsive",
    "Colaborar con equipos multidisciplinarios (diseño, producto, QA)",
    "Escribir código limpio, eficiente y bien documentado",
    "Participar en revisiones de código y pair programming",
    "Resolver bugs y problemas técnicos",
    "Aprender y adoptar nuevas tecnologías según sea necesario",
  ];

  const benefits = [
    "Seguro de gastos médicos mayores",
    "Vales de despensa y restaurante",
    "Bonos de desempeño trimestrales",
    "Home office parcial (3 días remotos)",
    "Capacitaciones y certificaciones pagadas",
    "Plan de desarrollo de carrera",
    "Ambiente de trabajo innovador y dinámico",
    "Equipo de última generación",
  ];

  const companyInfo = {
    name: "Tech Innovators Inc.",
    description: "Somos una startup tecnológica enfocada en desarrollar soluciones innovadoras para empresas de retail y e-commerce. Nuestra misión es transformar la manera en que las empresas interactúan con sus clientes a través de tecnología de vanguardia.",
    founded: "2018",
    employees: "150+",
    industry: "Tecnología / SaaS",
    website: "www.techinnovators.com",
  };

  const similarJobs = [
    {
      title: "Frontend Developer",
      company: "Digital Solutions MX",
      location: "Guadalajara, Jalisco",
      type: "Remoto",
      salary: "$40,000 - $50,000",
      urgent: false,
    },
    {
      title: "Full Stack Developer",
      company: "Startup Factory",
      location: "Monterrey, Nuevo León",
      type: "Híbrido",
      salary: "$38,000 - $48,000",
      urgent: true,
    },
    {
      title: "React Developer",
      company: "Web Masters",
      location: "Ciudad de México",
      type: "Presencial",
      salary: "$32,000 - $42,000",
      urgent: false,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background-main">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-background-purple via-background-violet to-background-main py-12 mb-8 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-accent-purple/20 rounded-2xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-4xl text-accent-purple">work</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-text-primary mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-lg text-text-secondary">{job.company}</span>
                    <span className="flex items-center gap-1 text-text-secondary">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {job.urgent && (
                  <span className="px-3 py-1 bg-gradient-to-r from-accent-pink to-accent-fuchsia text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    Urgente
                  </span>
                )}
                <span className="text-text-secondary text-sm">{job.postedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview */}
              <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Descripción del Puesto</h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Estamos buscando un Desarrollador de Software Junior apasionado por la tecnología y la innovación. 
                  Formarás parte de un equipo dinámico donde podrás contribuir al desarrollo de productos digitales 
                  disruptivos mientras creces profesionalmente en un ambiente de aprendizaje continuo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Información General</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent-purple">schedule</span>
                        <div>
                          <p className="text-sm text-text-secondary">Tipo de contrato</p>
                          <p className="font-medium text-text-primary">{job.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent-purple">work_history</span>
                        <div>
                          <p className="text-sm text-text-secondary">Experiencia requerida</p>
                          <p className="font-medium text-text-primary">{job.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent-purple">attach_money</span>
                        <div>
                          <p className="text-sm text-text-secondary">Salario mensual</p>
                          <p className="font-medium text-text-primary">{job.salary}</p>
                        </div>
                      </div>
                      {job.remote && (
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-accent-purple">home</span>
                          <div>
                            <p className="text-sm text-text-secondary">Modalidad</p>
                            <p className="font-medium text-text-primary">Híbrido (3 días remoto)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Habilidades Requeridas</h3>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "React", "Node.js", "Git", "HTML/CSS", "REST APIs", "MongoDB", "Agile"].map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gradient-to-r from-background-purple/30 to-background-violet/30 text-text-primary text-sm font-medium rounded-xl border border-accent-purple/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Responsabilidades</h3>
                  <ul className="space-y-3">
                    {responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary">
                        <span className="material-symbols-outlined text-accent-purple mt-0.5">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Requisitos</h3>
                  <ul className="space-y-3">
                    {requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary">
                        <span className="material-symbols-outlined text-accent-purple mt-0.5">arrow_right_alt</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Beneficios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-background-purple/10 to-background-violet/10 rounded-xl border border-accent-purple/10"
                      >
                        <span className="material-symbols-outlined text-accent-fuchsia">star</span>
                        <span className="text-text-primary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Sobre la Empresa</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl shadow-lg"
                      style={{ backgroundImage: `url("${job.img}")` }}
                    ></div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{companyInfo.name}</h3>
                    <p className="text-text-secondary mb-4">{companyInfo.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-background-purple/20 to-background-violet/20 rounded-xl">
                        <p className="text-lg font-bold text-accent-purple">{companyInfo.founded}</p>
                        <p className="text-xs text-text-secondary">Fundación</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-background-purple/20 to-background-violet/20 rounded-xl">
                        <p className="text-lg font-bold text-accent-purple">{companyInfo.employees}</p>
                        <p className="text-xs text-text-secondary">Empleados</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-background-purple/20 to-background-violet/20 rounded-xl">
                        <p className="text-lg font-bold text-accent-purple">{companyInfo.industry}</p>
                        <p className="text-xs text-text-secondary">Industria</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-background-purple/20 to-background-violet/20 rounded-xl">
                        <p className="text-lg font-bold text-accent-purple">Website</p>
                        <p className="text-xs text-text-secondary">{companyInfo.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Apply Card */}
              <div className="bg-gradient-to-br from-background-purple/30 via-background-violet/30 to-background-main border-2 border-accent-purple/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-text-primary mb-6">Postularme</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Postulaciones:</span>
                    <span className="font-medium text-text-primary">{job.applications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Estatus:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-500 text-sm font-medium rounded-full">
                      Activo
                    </span>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-bold rounded-xl hover:shadow-xl hover:shadow-accent-purple/30 transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">send</span>
                  Postularme ahora
                </button>

                <div className="space-y-3">
                  <button className="w-full py-3 border-2 border-accent-purple/30 text-accent-purple font-medium rounded-xl hover:border-accent-purple hover:bg-accent-purple/5 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">bookmark</span>
                    Guardar vacante
                  </button>
                  <button className="w-full py-3 border-2 border-accent-purple/30 text-accent-purple font-medium rounded-xl hover:border-accent-purple hover:bg-accent-purple/5 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">share</span>
                    Compartir
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-accent-purple/20">
                  <p className="text-sm text-text-secondary text-center">
                    ¿Preguntas? <span className="text-accent-purple cursor-pointer hover:underline">Contacta al reclutador</span>
                  </p>
                </div>
              </div>

              {/* Similar Jobs */}
              <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-text-primary mb-6">Oportunidades Similares</h3>
                <div className="space-y-4">
                  {similarJobs.map((similarJob, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-r from-background-purple/10 to-background-violet/10 rounded-xl border border-accent-purple/10 hover:border-accent-purple/30 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-text-primary">{similarJob.title}</h4>
                        {similarJob.urgent && (
                          <span className="text-xs bg-accent-pink/20 text-accent-pink px-2 py-1 rounded-full">Urgente</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{similarJob.company}</p>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span>
                          {similarJob.location}
                        </span>
                        <span>{similarJob.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 text-accent-purple font-medium rounded-xl hover:bg-accent-purple/5 transition-all flex items-center justify-center gap-2">
                  Ver más oportunidades
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-background-purple via-background-violet to-background-main backdrop-blur-md rounded-2xl p-6 border border-accent-purple/20">
                <h3 className="text-xl font-bold text-text-primary mb-6">Proceso de Selección</h3>
                <div className="space-y-4">
                  {[
                    { step: "Postulación", time: "24-48h", icon: "send" },
                    { step: "Revisión de CV", time: "2-3 días", icon: "description" },
                    { step: "Entrevista técnica", time: "1 semana", icon: "code" },
                    { step: "Oferta", time: "1-2 días", icon: "check_circle" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple/20 to-accent-fuchsia/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-accent-purple text-sm">{item.icon}</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-text-primary">{item.step}</p>
                        <p className="text-xs text-text-secondary">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}