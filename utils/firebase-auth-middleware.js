const admin = require('firebase-admin');


const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gabcue-4ee6a.firebaseio.com'
});

const isAuthenticated = function(req, res, next) {
    const authorization = req.header('Authorization');
    if (authorization) {
        admin.auth().verifyIdToken(authorization)
        .then((decodedToken) => {
            res.locals.user = decodedToken;
            next();
        })
        .catch(err => {
            res.sendStatus(401);
        });
    } else {
        console.log('Authorization header is not found');
        res.sendStatus(401);
    }
};

module.exports = isAuthenticated;