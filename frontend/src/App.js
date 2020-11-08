import React, { useState, useEffect } from "react";
import Header from "./Header";
import api from "./services/api";

import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);

  
  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects([...response.data]);
    });
  }, []);

  const handleAddProject = async () => {
    const data = {
      title : `Projeto ${Date.now()}`,
      owner: `Dono ${Date.now()}`
    }
    const project = await (await api.post("projects", data)).data;
    setProjects([...projects, project]);
  };
  return (
    <>
      <Header title="Projects" />
      <div id="content">
        <button type="button" onClick={handleAddProject}>
          Adicionar
        </button>
        <ul>
          {projects.map((project) => (
            <li key={project.id}><h1>{project.title}</h1><p>{project.owner}<br />{project.id}</p></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
