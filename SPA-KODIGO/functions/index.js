/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Configura el transporte de correo (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pesv8806@gmail.com', // Cambia esto por tu correo
    pass: 'fwcy xthh dmfa mhnb', // Usa una contraseña de aplicación
  },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const mailOptions = {
    from: '"Tu App" <TU_CORREO@gmail.com>', // Cambia esto por tu correo
    to: user.email,
    subject: '¡Bienvenido a la app!',
    text: `Hola ${user.displayName || ''}, gracias por registrarte.`,
    html: `<b>Hola ${user.displayName || ''}</b><br>¡Gracias por registrarte!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de bienvenida enviado a:', user.email);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
});
