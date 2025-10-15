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
    <div>
      <h3 className="text-2xl font-bold tracking-tight mb-6 text-primary">
        Vacantes Recientes
      </h3>
      <div className="space-y-6">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded"
                style={{ backgroundImage: `url("${job.img}")` }}
              ></div>
            </div>
            <div className="flex-grow">
              <p className="text-lg font-semibold text-primary">{job.title}</p>
              <p className="text-sm text-secondary mt-1">
                {job.company} - {job.location}
              </p>
              <button className="mt-4 bg-primary text-white text-sm font-medium py-2 px-4 rounded hover:bg-primary/90 transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

