const express = require("express");
const cors = require("cors");
const { v1, validate } = require("uuid");

let projects = [];

const logRequest = (req, res, next) => {
  const { method, url } = req;
  const logLabel = `${method.toUpperCase()} ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
};

const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  if (validate(id) === false)
    return res.status(404).send("<p>ID Invalido!</p>");
  else return next();
};

const app = express();

app.use(cors());
app.use(express.json());

app.use(logRequest);
app.use("/projects/:id", validateProjectId);

app.get("/projects", (req, res) => {
  const { title } = req.query;
  const result = title
    ? projects.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      )
    : projects;
  return res.status(200).json(result);
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const position = projects.findIndex((project) => project.id === id);
  if (position < 0)
    return res.status(404).send("<p>Projeto não Encontrado!</p>");
  return res.status(200).json(projects[position]);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;
  const project = { id: v1(), title, owner };
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
