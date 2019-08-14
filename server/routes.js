const routesUser =  require('./users/users.controller');
const routesFiles =  require('./files/index');


const myRoute = (app, jwt) => {
    // routes
    // app.get('/', authorize(Role.Admin), getAll); // admin only
    // app.get('/:id', authorize(), getById);       // all authenticated users
    //files
    app.get("/createFile",jwt,routesFiles.createFile)
    app.get("/files",jwt,routesFiles.getAllFiles)
    app.post("/writeFile",jwt,routesFiles.writeFile)

    // routes
    app.post("/authenticate", routesUser.authenticate);
    app.post("/register", routesUser.register);
    app.get("/", jwt, routesUser.getAll);
    app.get("/current", jwt, routesUser.getCurrent);
    app.get("/:id", jwt, routesUser.getById);
    app.put("/:id", jwt, routesUser.update);
    app.delete("/:id", jwt, routesUser._delete);
  };
  module.exports = myRoute;