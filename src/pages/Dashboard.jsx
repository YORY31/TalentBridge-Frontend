import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-secondary">
          Estudiantes de tu universidad
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold text-primary">25%</p>
          <p className="text-sm font-medium text-success flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            5%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-secondary">
          Tasa de empleo de tu grupo
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold text-primary">70%</p>
          <p className="text-sm font-medium text-success flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            10%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-secondary">Vacantes aplicadas</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold text-primary">5</p>
          <p className="text-sm font-medium text-success flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            2
          </p>
        </div>
      </div>
    </div>
  );
}
