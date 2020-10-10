const express = require("express");
const { uuid } = require("uuidv4");

let projects = [];

const app = express();

app.use(express.json());

app.get("/projects", (req, res) => {
  return res.status(200).json(projects);
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json(projects[id - 1]);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;
  const id = uuid();
  const project = { id, title, owner };
  projects.push(project);
  return res.status(200).json(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  const position = projects.findIndex((project) => project.id === id);
  if (position < 0)
    return res.status(404).send("<p>Projeto não Encontrado!</p>");
  projects[position].title = title;
  projects[position].owner = owner;
  return res.status(200).json(projects[position]);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const position = projects.findIndex((project) => project.id === id);
  if (position < 0)
    return res.status(404).send("<p>Projeto não Encontrado!</p>");
  const project = projects[position];
  const newArray = projects.filter((p) => p.id !== id);
  projects = [...newArray];
  return res.status(200).json(project);
});

app.listen(3333, () =>
  console.log("🚀 BackEnd Started in http://localhost:3333")
);
