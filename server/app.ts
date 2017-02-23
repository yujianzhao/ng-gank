import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import { indexRouter } from './routes/index';
import { apitestRouter } from './routes/apitest';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));

// your api routes here
app.use('/api/test', apitestRouter);
app.use('/api/*', (req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({
    message: "api not found"
  });
});

if (app.get('env') === 'production' || process.argv[2] === 'prd') {
  //serve angular client files
  app.use(express.static(path.join(__dirname, '/client')));
  //redirect non-api requests such as routes to angular
  app.all('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '/client', 'index.html'));
  });
} else {
  app.use('/', indexRouter);
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
