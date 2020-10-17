const express = require('express');
const server = express();
server.use(express.json());

const route = '/projects';
const projects = [];

//Global Middleware
server.use((req, res, next) => {
  console.count("Total de requisições");
  next();
});

//Local Middleware
function checkProjectIdExists(req, res, next) {
  const { id } = req.params;
  if (!projects.find(project => project.id == id)) {
    return res.status(400).json({ error: "Project doesn't exist!" });
  }
  return next();
}

//Create a project
server.post(`${route}`, (req, res) => {
  const { title } = req.body;

  const id = getNextId();
  const project = {
    id,
    title,
    tasks: []
  }
  projects.push(project);

  return res.json(projects);
});

//Get all projects
server.get(`${route}`, (req, res) => {
  return res.json(projects);
});

//Get an especific project
server.get(`${route}/:id`, checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  return res.json(projects.find(project => project.id == id));
});

//Update an especific project
server.put(`${route}/:id`, checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
});

//Delete an especific project
server.delete(`${route}/:id`, checkProjectIdExists, (req, res) => {
  const { id } = req.params;

  projects.splice(projects.findIndex(project => project.id == id), 1);

  return res.json(projects);
});

//Create a task in an especific project
server.post(`${route}/:id/tasks`, checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(task);

  return res.json(projects);
});

server.listen(3000);

function getNextId() {
  return (projects.length + 1 || 1).toString();
}