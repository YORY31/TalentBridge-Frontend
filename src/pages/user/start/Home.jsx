import React from "react";
import Layout from "../../../components/Layout";
import Bienvenida from "./Bienvenida";
import Dashboard from "./Dashboard";
import JobList from "../jobs/JobLIst";

export default function Home() {
  return (
    <Layout>
      <Bienvenida />
      <Dashboard />
      <JobList />
    </Layout>
  );
}
