//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

import auth_routes from "./auth_routes.js"
import person_routes from "./person_routes.js"
import health_event_routes from "./health_event_routes.js"


const constructorMethod = (app) => {
    app.use("/", auth_routes);
    
    app.use("/person",person_routes);
    
    app.use("/health",health_event_routes)

    app.use("*", (req, res) => {
      res.sendStatus(404);
    });
  };
  

export default constructorMethod;

