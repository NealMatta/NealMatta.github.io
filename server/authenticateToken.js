// authenticateToken.js
const admin = require('firebase-admin');

// console.log(process.env.FIREBASE_PROJECT_ID);
// console.log(process.env.FIREBASE_PRIVATE_KEY);
// console.log(process.env.FIREBASE_CLIENT_EMAIL);

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    // Do I need an instance of this?
    // databaseURL: "https://my-firebase-app.firebaseio.com"
});

// Checks the incoming request for a Bearer token
async function decodeIDToken(req, res, next) {
    const header = req.headers?.authorization;
    // Send it to Firebase for verification
    console.log(req);
    if (
        header !== 'Bearer null' &&
        req.headers?.authorization?.startsWith('Bearer ')
    ) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);

            req['currentUser'] = decodedToken;
        } catch (err) {
            console.log(err);
        }
    }
    next();
}
module.exports = decodeIDToken;
