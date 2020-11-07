import React, { useState, useEffect } from "react";
import Header from "./Header";
import api from "./services/api";

import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      console.log(response);
    });
  }, []);

  const handleAddProject = () => {
    const newArray = [...projects, `Projeto ${Date.now()}`];
    setProjects([...newArray]);
    console.log(projects);
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
            <li key={project}>{project}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
