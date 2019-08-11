const express = require("express");
const router = express.Router();
const userService = require("./user.service");

const myRoute = (app, jwt) => {
  // routes
  // app.get('/', authorize(Role.Admin), getAll); // admin only
  // app.get('/:id', authorize(), getById);       // all authenticated users

  // routes
  app.post("/authenticate", authenticate);
  app.post("/register", register);
  app.get("/", jwt, getAll);
  app.get("/current", jwt, getCurrent);
  app.get("/:id", jwt, getById);
  app.put("/:id", jwt, update);
  app.delete("/:id", jwt, _delete);
};
module.exports = myRoute;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
