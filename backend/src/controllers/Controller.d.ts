import express = require('express');

export interface CrudController{
    insert(req :express.Request, res: express.Response) : any;
}