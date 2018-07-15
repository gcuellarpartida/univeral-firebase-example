import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import {join} from 'path';
import * as cors from 'cors';

const isAuthenticated = require('./utils/firebase-auth-middleware.js');
const multer  = require('multer');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const UPLOAD_FOLDER = join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
app.use(cors());

// Universal express-engine (https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// Example Express Rest API endpoints
app.get('/restricted', isAuthenticated, (req, res) => {
  res.setHeader('content-type', 'text/javascript');
  res.send(`${res.locals.user.email} ... You can access!`);
});
// Upload api
app.post('/upload', [upload.single('file'), isAuthenticated], (req, res, next) => {
  console.log('upload requested');
  console.log(req.body); // form fields
  console.log(req.files); // form files
  res.status(204).end();
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
