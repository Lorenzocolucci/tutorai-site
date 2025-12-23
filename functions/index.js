/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

// Configurazione SMTP Aruba con variabili d'ambiente
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtps.aruba.it",
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true, // SSL/TLS
  auth: {
    user: process.env.SMTP_USER || "noreply@mytutorai.app",
    pass: process.env.SMTP_PASS || "Nor3ply-@1"
  }
});

// ============================================================================
// NUOVA IMPLEMENTAZIONE (2025-11-10)
// Invece di salvare solo in Firestore, chiamiamo il backend API
// che salva in Supabase + invia email
// ============================================================================

// Funzione che si attiva quando viene creata una nuova richiesta beta
exports.sendBetaWelcomeEmail = onDocumentCreated({
  document: "form_submissions/{docId}",
  region: "us-central1",
}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log("No data associated with the event");
    return;
  }

  const data = snapshot.data();
  const docId = event.params.docId;

  logger.log("Nuova richiesta beta ricevuta:", {
    docId: docId,
    email: data.data.email,
    nome: data.data.firstName,
    cognome: data.data.lastName,
  });

  try {
    // 🆕 CHIAMATA AL BACKEND API (Render.com)
    // Invece di inviare email qui, chiamiamo il backend che:
    // 1. Salva in Supabase waitlist_submissions
    // 2. Invia email di conferma
    const backendUrl = process.env.BACKEND_URL || "https://tutor-agent-aff7.onrender.com";

    const payload = {
      email: data.data.email,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      curriculum: data.data.curriculum,
      classe: data.data.classe,
      materie: data.data.materie || [],
      submittedBy: data.data.submittedBy || "student"
    };

    logger.log("Chiamata backend API:", backendUrl + "/api/waitlist/submit");

    const response = await fetch(backendUrl + "/api/waitlist/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("❌ Backend API error:", {
        status: response.status,
        error: errorText
      });
      throw new Error(`Backend API failed: ${response.status}`);
    }

    const result = await response.json();
    logger.log("✅ Backend API success:", result);

    // ⚠️ FALLBACK: Se backend fallisce, invia email qui (backward compatibility)
    // Questo codice sotto verrà eseguito SOLO se backend non è raggiungibile
  } catch (backendError) {
    logger.error("❌ Backend API unreachable, using fallback email:", backendError);

    // FALLBACK: Email diretta (codice originale)
    const mailOptions = {
      from: "noreply@mytutorai.app",
      to: data.data.email,
      subject: "TutorAI - Grazie per la tua richiesta Beta! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🎓 TutorAI</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Grazie per il tuo interesse!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Ciao ${data.data.firstName} ${data.data.lastName}!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Grazie per aver inviato la tua richiesta di accesso alla <strong>Beta di TutorAI</strong>! 
              Siamo entusiasti di avere persone come te che credono nel futuro dell'educazione personalizzata.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">📋 Dettagli della tua richiesta:</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li><strong>Curriculum:</strong> ${data.data.curriculum || 'Non specificato'}</li>
                <li><strong>Classe:</strong> ${data.data.classe || 'Non specificata'}</li>
                <li><strong>Materie di interesse:</strong> ${data.data.materie ? data.data.materie.join(", ") : "Non specificate"}</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Il nostro team esaminerà la tua richiesta e ti contatterà entro <strong>48 ore</strong> 
              con ulteriori informazioni e, speriamo, con le credenziali di accesso alla piattaforma!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mytutorai.app" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                🌐 Visita il nostro sito
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              Nel frattempo, puoi seguire i nostri aggiornamenti sui social media o visitare il nostro blog 
              per rimanere aggiornato sulle ultime novità di TutorAI.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>Questa email è stata inviata automaticamente. Non rispondere a questo messaggio.</p>
            <p>© 2025 TutorAI. Tutti i diritti riservati.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.log("✅ [FALLBACK] Email di benvenuto inviata con successo a", data.data.email);
  }
});

// Funzione per inviare email di risposta quando l'admin approva/rifiuta
exports.sendBetaResponseEmail = onDocumentCreated({
  document: "betaResponses/{docId}",
  region: "us-central1",
}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log("No data associated with the event");
    return;
  }

  const data = snapshot.data();
  const docId = event.params.docId;

  logger.log("Nuova risposta beta da inviare:", {
    docId: docId,
    email: data.email,
    status: data.status,
  });

  try {
    const subject = data.status === "approved" ?
      "TutorAI - La tua richiesta Beta è stata approvata! 🎉" :
      "TutorAI - Informazioni sulla tua richiesta Beta";

    const htmlContent = data.status === "approved" ?
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🎉 APPROVATA!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Benvenuto nella Beta di TutorAI</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Congratulazioni!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Siamo felici di informarti che la tua richiesta di accesso alla <strong>Beta di TutorAI</strong> 
              è stata <strong>APPROVATA</strong>! 🎉
            </p>
            
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #155724; margin-top: 0;">🚀 Prossimi passi:</h3>
              <ol style="color: #155724; line-height: 1.6;">
                <li>Riceverai un'email separata con le tue credenziali di accesso</li>
                <li>Potrai accedere alla piattaforma beta entro 24 ore</li>
                <li>Inizierai il tuo percorso di apprendimento personalizzato</li>
              </ol>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Grazie per aver scelto TutorAI. Non vediamo l'ora di vedere i tuoi progressi!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mytutorai.app" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                🎓 Accedi alla piattaforma
              </a>
            </div>
          </div>
        </div>
      ` :
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #6c757d 0%, #495057 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📋 Aggiornamento</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Informazioni sulla tua richiesta</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Grazie per il tuo interesse!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Al momento la tua richiesta di accesso alla <strong>Beta di TutorAI</strong> 
              è in fase di valutazione. Ti contatteremo presto con ulteriori informazioni.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">📱 Resta connesso:</h3>
              <p style="color: #666; line-height: 1.6;">
                Seguici sui nostri canali social per rimanere aggiornato su tutte le novità 
                e le funzionalità di TutorAI.
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Grazie per la tua pazienza e per aver scelto TutorAI!
            </p>
          </div>
        </div>
      `;

    const mailOptions = {
      from: "noreply@mytutorai.app",
      to: data.email,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    logger.log("✅ Email di risposta inviata con successo a", data.email);
  } catch (error) {
    logger.error("❌ Errore nell'invio dell'email di risposta:", error);
    throw error;
  }
});
