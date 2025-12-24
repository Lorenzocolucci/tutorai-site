import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, curriculum, classe, materie } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtps.aruba.it",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // SSL/TLS
      auth: {
        user: process.env.SMTP_USER || "noreply@mytutorai.app",
        pass: process.env.SMTP_PASSWORD // NEVER hardcode passwords!
      }
    });

    const mailOptions = {
      from: "noreply@mytutorai.app",
      to: email,
      subject: "TutorAI - Benvenuto nella Waiting List! 🎓",
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>TutorAI - Benvenuto nella Waiting List</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1A202C;
              background-color: #F7FAFC;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #FFFFFF;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .header {
              background: linear-gradient(135deg, #5A67D8 0%, #8B5CF6 100%);
              padding: 32px 24px;
              text-align: center;
              color: white;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 4px;
              letter-spacing: -0.025em;
            }
            
            .header p {
              font-size: 16px;
              font-weight: 500;
              opacity: 0.95;
            }
            
            .content {
              padding: 32px 24px;
            }
            
            .greeting {
              font-size: 22px;
              font-weight: 600;
              color: #1A202C;
              margin-bottom: 20px;
              letter-spacing: -0.025em;
            }
            
            .main-text {
              font-size: 16px;
              color: #4A5568;
              margin-bottom: 24px;
              line-height: 1.7;
            }
            
            .info-section {
              background-color: #F7FAFC;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
              border-left: 3px solid #5A67D8;
            }
            
            .info-section h3 {
              font-size: 16px;
              font-weight: 600;
              color: #1A202C;
              margin-bottom: 12px;
            }
            
            .info-list {
              list-style: none;
              color: #4A5568;
              font-size: 14px;
            }
            
            .info-list li {
              margin-bottom: 6px;
              padding-left: 0;
            }
            
            .info-list strong {
              color: #1A202C;
              font-weight: 600;
            }
            
            .benefits-section {
              background-color: #F0FFF4;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 24px;
              border-left: 3px solid #38A169;
            }
            
            .benefits-section h3 {
              font-size: 16px;
              font-weight: 600;
              color: #22543D;
              margin-bottom: 12px;
            }
            
            .benefits-list {
              list-style: none;
              color: #22543D;
              font-size: 14px;
            }
            
            .benefits-list li {
              margin-bottom: 6px;
              padding-left: 0;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .benefits-list li::before {
              content: "✓";
              color: #38A169;
              font-weight: bold;
              font-size: 12px;
            }
            
            .cta-section {
              text-align: center;
              margin: 24px 0;
            }
            
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #5A67D8 0%, #8B5CF6 100%);
              color: white;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 15px;
              transition: all 0.3s ease;
            }
            
            .footer-text {
              font-size: 14px;
              color: #718096;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            
            .footer {
              background-color: #F7FAFC;
              padding: 20px 24px;
              text-align: center;
              border-top: 1px solid #E2E8F0;
            }
            
            .footer p {
              font-size: 12px;
              color: #A0AEC0;
              margin-bottom: 4px;
            }
            
            @media (max-width: 600px) {
              .email-container {
                margin: 0;
                border-radius: 0;
              }
              
              .header {
                padding: 24px 20px;
              }
              
              .header h1 {
                font-size: 24px;
              }
              
              .header p {
                font-size: 15px;
              }
              
              .content {
                padding: 24px 20px;
              }
              
              .greeting {
                font-size: 20px;
              }
              
              .info-section,
              .benefits-section {
                padding: 16px;
              }
              
              .cta-button {
                padding: 12px 24px;
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🧠 TutorAI</h1>
              <p>Benvenuto nella Waiting List!</p>
            </div>
            
            <div class="content">
              <h2 class="greeting">Ciao ${firstName} ${lastName}!</h2>
              
              <p class="main-text">
                Grazie per aver richiesto l'accesso a <strong>TutorAI</strong>! 
                Sei stato aggiunto con successo alla nostra <strong>Waiting List</strong>.
              </p>
              
              <div class="info-section">
                <h3>📋 La tua richiesta</h3>
                <ul class="info-list">
                  <li><strong>Curriculum:</strong> ${curriculum || 'Non specificato'}</li>
                  <li><strong>Classe:</strong> ${classe || 'Non specificata'}</li>
                  <li><strong>Materie:</strong> ${materie ? materie.join(", ") : "Non specificate"}</li>
                </ul>
              </div>
              
              <div class="benefits-section">
                <h3>🎁 Cosa ti aspetta</h3>
                <ul class="benefits-list">
                  <li>Codice di invito personale</li>
                  <li>1 mese di accesso gratuito</li>
                  <li>1000 crediti per testare</li>
                  <li>Supporto prioritario</li>
                </ul>
              </div>
              
              <p class="main-text">
                Ti invieremo il tuo codice di accesso non appena la piattaforma sarà pronta per il tuo curriculum.
              </p>
              
              <div class="cta-section">
                <a href="https://mytutorai.app" class="cta-button">
                  Visita il nostro sito
                </a>
              </div>
              
              <p class="footer-text">
                Seguici sui social per rimanere aggiornato sulle novità di TutorAI.
              </p>
            </div>
            
            <div class="footer">
              <p>Email automatica - Non rispondere</p>
              <p>© 2025 TutorAI. Tutti i diritti riservati.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return NextResponse.json({ success: false, error: 'Errore nell\'invio dell\'email' }, { status: 500 });
  }
}
