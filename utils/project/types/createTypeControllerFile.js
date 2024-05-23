const fs = require('fs');

const createTypeControllerFile = () => {
    const controllerReqResContent = 
`import { Request, Response } from 'express';

export interface Controller {
    [key: string]: (req: Request, res: Response) => Promise<void>;
}
`
    fs.writeFileSync('./types/controller.d.ts', controllerReqResContent);
};

module.exports = { createTypeControllerFile };