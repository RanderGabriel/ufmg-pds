import express = require('express');

export interface Controller{
    insert(req :express.Request, res: express.Response) : any;
}