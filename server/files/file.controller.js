const fileService = require("./file.service");


const  writeFile=(req, res, next) =>{
    fileService
      .writeFile(req,res)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
  const  createFile=(req, res, next) =>{
    fileService
      .createFile(req,res)
      .then(() => res.json({}))
      .catch(err => next(err));
  }
  module.exports = {
    writeFile,
    createFile
  };