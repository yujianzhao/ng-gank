import { Router, Response, Request, NextFunction } from 'express';

const apitestRouter: Router = Router();

apitestRouter.get('/', function(req, res, next) {
  res.json({message: 'API test returned'});
});


export { apitestRouter }
