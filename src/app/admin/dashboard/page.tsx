// src/app/admin/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';

// Interfaccia per tipizzare i dati delle richieste
interface BetaRequest {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  curriculum: string;
  classe: string;
  materie: string[];
  motivazione: string;
  requestedAt: {
    toDate: () => Date;
  };
  status: string;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<BetaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NOTA: Questa è una protezione base. Per un'applicazione reale,
  // implementeremo un vero sistema di login per l'admin.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Semplice prompt per la password per questa versione alpha
    if (!isAuthenticated) {
      const password = prompt("Inserisci la password di accesso per l'admin:");
      if (password === "TutorAIAdmin2025") { // Password temporanea, da cambiare!
        setIsAuthenticated(true);
      } else if (password !== null) { // Solo se l'utente ha inserito qualcosa
        alert("Password errata.");
        window.location.href = '/'; // Reindirizza se la password è sbagliata
      }
    }
  }, []); // Rimuoviamo isAuthenticated dalle dipendenze

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const q = query(collection(db, "betaRequests"), orderBy("requestedAt", "desc"));

    // onSnapshot crea un listener in tempo reale.
    // La dashboard si aggiornerà automaticamente!
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BetaRequest[];
      setRequests(requestsData);
      setLoading(false);
    });

    // Pulisce il listener quando il componente viene smontato
    return () => unsubscribe();
  }, [isAuthenticated]);

  // Funzione per aggiornare lo status di una richiesta
  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const requestRef = doc(db, 'betaRequests', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        respondedAt: new Date()
      });
    } catch (error) {
      console.error('Errore nell\'aggiornamento dello status:', error);
      alert('Errore nell\'aggiornamento dello status');
    }
  };

  // Funzione per inviare email di risposta
  const sendResponseEmail = (email: string, status: string) => {
    const subject = status === 'approved' 
      ? 'TutorAI - La tua richiesta Beta è stata approvata! 🎉'
      : 'TutorAI - Informazioni sulla tua richiesta Beta';
    
    const body = status === 'approved'
      ? `Ciao!

Siamo felici di informarti che la tua richiesta di accesso alla Beta di TutorAI è stata APPROVATA! 🎉

Nei prossimi giorni riceverai un'email con le credenziali di accesso e le istruzioni per iniziare.

Grazie per il tuo interesse in TutorAI!

Il Team TutorAI`
      : `Ciao!

Grazie per il tuo interesse in TutorAI!

Al momento la tua richiesta di accesso alla Beta è in fase di valutazione. Ti contatteremo presto con ulteriori informazioni.

Nel frattempo, puoi seguire i nostri aggiornamenti sui social media.

Il Team TutorAI`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Accesso non autorizzato.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin - Richieste Beta</h1>
            <div className="text-sm text-gray-600">
              Totale richieste: {requests.length}
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Caricamento delle richieste...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">Nessuna richiesta beta trovata.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curriculum / Classe</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {req.requestedAt ? req.requestedAt.toDate().toLocaleString('it-IT') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {req.nome} {req.cognome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={`mailto:${req.email}`} className="text-blue-600 hover:text-blue-800">
                          {req.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {req.curriculum} / {req.classe}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {req.materie?.slice(0, 3).map((materia, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {materia}
                            </span>
                          ))}
                          {req.materie?.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{req.materie.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          req.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : req.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                                                 }`}>
                           {req.status === 'pending' ? 'In attesa' : req.status === 'approved' ? 'Approvata' : 'Rifiutata'}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         <div className="flex gap-2">
                           {req.status === 'pending' && (
                             <>
                               <button
                                 onClick={() => {
                                   updateRequestStatus(req.id, 'approved');
                                   sendResponseEmail(req.email, 'approved');
                                 }}
                                 className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                               >
                                 Approva
                               </button>
                               <button
                                 onClick={() => {
                                   updateRequestStatus(req.id, 'rejected');
                                   sendResponseEmail(req.email, 'rejected');
                                 }}
                                 className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                               >
                                 Rifiuta
                               </button>
                             </>
                           )}
                           {req.status !== 'pending' && (
                             <span className="text-xs text-gray-400">
                               {req.status === 'approved' ? '✅ Approvata' : '❌ Rifiutata'}
                             </span>
                           )}
                         </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
