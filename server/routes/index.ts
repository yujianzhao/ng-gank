import { Router, Response, Request, NextFunction } from 'express';

const indexRouter: Router = Router();

indexRouter.get('/', function(req, res, next) {
  res.json({response: 'API test landing page'});
});


export { indexRouter }
