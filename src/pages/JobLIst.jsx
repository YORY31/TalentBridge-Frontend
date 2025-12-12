import React from "react";

export default function JobList() {
  const jobs = [
    {
      title: "Desarrollador de Software Junior",
      company: "Tech Innovators Inc.",
      location: "Ciudad de Mexico, Mexico",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQVM3PRo3wB6-PF9Qax-dqzARLsFLYZ7G80eL4hzsZI2rXVJLD1_7-IjtTvz08NZjFOPku8LcJej0d5P_A9JL4atr851bVz0nXo8M3i-oBvUuDw6fWf4mkFbglKqD0N0caqv0Q5cJadh6ilZr5Biz39m8G1mB9xnUAi8LpdjP9E9GtCKsv5S0S6kDxS3v2drah2zPbyPniK4UutTk35UBtWMphm8WcpuaKyVqzGrYls4jkLYD_beiGvTxa6nub_UBHuWiFGpN23S4",
    },
    {
      title: "Analista de Datos",
      company: "Data Solutions Co.",
      location: "Guadalajara, Mexico",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFx-H0IrAMpvkCsT-2GGcpfl3FYqVuAwgx4BHq2qGkJU9O9ZJccDABoI4vhIt6IU2ry4vC93-B3CCeFbK66seqlqv_Sq07QZArXHuxijYzhaj-2s3feS1LRV5N4Ic4DzsPA503lzIo7KeVB_4hOzSIxf_O1hJgcIAKVPa_bIY4laT5Urs6ElAz8PgJ0wOFeK9aFIEzceOiKNg6B01Gm76KkqGFq7oi_DejjaFpMWfXGs-IXTOqimme8xEwGGnHW5S2RhNbyCKAFKA",
    },
    {
      title: "Diseñador UX/UI",
      company: "Creative Minds Studio",
      location: "Monterrey, Mexico",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPZ7iAPI1L9NQCvXCtHOL8NSV9WjhZ-sd1PPCZSQnLQyrQ11e_qAOOGA6oaxpAymy5nBac5JybQQ84KgUosBnzcusBjVd6bYWodWX2PIMqCD2ydca9wupvZO1gXxY00Pa2PvTUW676li59h848SAKKBbwDkqb6Dm-cBYXVKA2xuuCty17UQBHojkq6RWY_o371Y1Dd3zz3hEF1ZWrkiL-GzZDJ3nh2CFbcmuN05PuH6fkiVjOBl5vXbEQ3KmJcw6khJbs97DLgugY",
    },
  ];

  return (
    <div className="min-h-screen bg-background-main">
      {/* Hero Section for Job Listings */}
      <div className="relative bg-gradient-to-br from-background-purple via-background-violet to-background-main py-12 mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent-purple/20 rounded-2xl backdrop-blur-sm">
              <span className="material-symbols-outlined text-4xl text-accent-purple">work</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">Vacantes Recientes</h1>
              <p className="text-lg text-text-secondary max-w-2xl">
                Descubre oportunidades profesionales que se ajustan a tu perfil y aspiraciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por puesto, empresa o ubicación..."
                className="w-full pl-12 pr-6 py-3 bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-xl text-base focus:outline-none focus:border-accent-purple text-text-primary placeholder-text-secondary transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-3 bg-background-header backdrop-blur-md border border-accent-purple/20 rounded-xl text-text-secondary hover:text-text-primary hover:border-accent-purple/40 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">tune</span>
                Filtrar
              </button>
              <button className="px-5 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105">
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-background-header backdrop-blur-md border-2 border-accent-purple/10 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-accent-purple/30"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Company Logo */}
                <div className="w-full md:w-48 h-40 md:h-32 flex-shrink-0 relative group">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl shadow-lg"
                    style={{ backgroundImage: `url("${job.img}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Job Details */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-text-secondary mb-3">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">business</span>
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">location_on</span>
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-accent-purple/20 to-accent-fuchsia/20 text-accent-purple text-sm font-medium rounded-full border border-accent-purple/20">
                        Nueva
                      </span>
                      <span className="px-3 py-1 bg-background-purple/20 text-text-secondary text-sm font-medium rounded-full">
                        Tecnología
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6">
                    Estamos buscando un profesional apasionado por la tecnología y la innovación para unirse a nuestro equipo dinámico.
                    Se valorará experiencia en metodologías ágiles y capacidad de trabajo en equipo.
                  </p>

                  {/* Skills and Actions */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-accent-purple/10">
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "React", "Node.js", "Git", "Agile"].slice(0, 3).map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1 bg-background-header backdrop-blur-md text-text-secondary text-sm rounded-lg border border-accent-purple/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="px-5 py-2.5 border-2 border-accent-purple/30 text-accent-purple font-medium rounded-xl hover:border-accent-purple hover:bg-accent-purple/5 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">bookmark</span>
                        Guardar
                      </button>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105 flex items-center gap-2">
                        <span className="material-symbols-outlined">visibility</span>
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-br from-background-purple via-background-violet to-background-main backdrop-blur-md rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border border-accent-purple/20">
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent mb-2">
              3,500+
            </p>
            <p className="text-text-secondary">Vacantes activas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent mb-2">
              15K+
            </p>
            <p className="text-text-secondary">Empresas asociadas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent mb-2">
              48h
            </p>
            <p className="text-text-secondary">Tiempo promedio de respuesta</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/30 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
            <span className="material-symbols-outlined">auto_awesome</span>
            Ver todas las vacantes
          </button>
        </div>
      </div>
    </div>
  );
}