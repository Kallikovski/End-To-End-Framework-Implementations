import { Router } from "express";
import { Controller } from "./controller";
import { Middleware } from "./middleware";

export class Routes
{

    router: Router;
    public controller: Controller = new Controller();
    public middleware: Middleware = new Middleware();

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    routes()
    {
        this.router.post('/signup', this.controller.signup);
        this.router.post('/signin', this.controller.signin);
        this.router.post('/signout', this.middleware.authenticate, this.controller.signout);
        this.router.get('/profile', this.middleware.authenticate, this.controller.profile);
        this.router.put('/profile/update', this.middleware.authenticate, this.controller.update);
        this.router.delete('/profile/delete', this.middleware.authenticate, this.controller.delete);
    }
}
