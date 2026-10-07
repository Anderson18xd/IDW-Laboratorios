const cursos = require("../data/cursosData");

exports.getAllCursos = (req, res) => {
  const { creditos } = req.query;
  let resultado = cursos;
  if (creditos) {
    resultado = cursos.filter(c => c.creditos === parseInt(creditos));
  }
  res.status(200).json({ status: "success", data: resultado });
};

exports.getCursoById = (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find(c => c.id === id);
  if (!curso) {
    return res.status(404).json({ status: "fail", message: "Curso no encontrado" });
  }
  res.status(200).json({ status: "success", data: curso });
};

exports.createCurso = (req, res) => {
  const { nombre, codigo, creditos } = req.body;
  if (!nombre || !codigo || !creditos) {
    return res.status(400).json({ status: "fail", message: "Faltan campos obligatorios" });
  }
  const nuevo = {
    id: cursos.length + 1,
    nombre,
    codigo,
    creditos: parseInt(creditos)
  };
  cursos.push(nuevo);
  res.status(201).json({ status: "success", data: nuevo });
};

exports.updateCurso = (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find(c => c.id === id);
  if (!curso) {
    return res.status(404).json({ status: "fail", message: "Curso no encontrado" });
  }
  const { nombre, codigo, creditos } = req.body;
  if (nombre) curso.nombre = nombre;
  if (codigo) curso.codigo = codigo;
  if (creditos) curso.creditos = parseInt(creditos);
  res.status(200).json({ status: "success", data: curso });
};

exports.deleteCurso = (req, res) => {
  const id = parseInt(req.params.id);
  const index = cursos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ status: "fail", message: "Curso no encontrado" });
  }
  const eliminado = cursos.splice(index, 1)[0];
  res.status(200).json({ status: "success", message: "Curso eliminado", data: eliminado });
};