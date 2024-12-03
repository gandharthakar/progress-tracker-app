// @ts-ignore
import { Request, Response } from 'express';

const homeController = (req: Request, res: Response) => {
    res.send(`<h1 style="font-family: 'Arial', sans-serif;">Welcome to, GT Progress Tracker App.</h1>`);
}

module.exports = homeController;