# UniversalFirebaseStartKit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running the example

Run `npm install`. Once all dependencies are installed, please put your firebase credentials in
`environment.ts` and `environment.prod.ts`. Also download your firebase-admin keys and put them inside `utils/serviceAccountKey.json`

Once this is done, run `ng build --prod` followed by `ng run example:server` and `npm run webpack:server`. 

Finally run `node dist/server.js` and navigate to `http://localhost:4000/`
