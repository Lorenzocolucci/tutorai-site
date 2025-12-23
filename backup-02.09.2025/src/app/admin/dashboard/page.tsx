'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Modal from '@/components/ui/Modal';

interface BetaRequest {
  id: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    curriculum: string;
    classe: string;
    materie: string[];
    motivazione: string;
  };
  timestamp: any;
  status: string;
}

interface ModalState {
  isOpen: boolean;
  type: 'confirm' | 'alert' | null;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<BetaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'requests' | 'analytics'>('analytics');
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    title: '',
    message: '',
  });

  const showModal = (type: 'confirm' | 'alert', title: string, message: string, onConfirm?: () => void, onCancel?: () => void) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      title: '',
      message: '',
    });
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    closeModal();
  };

  // Mock analytics data - in futuro si può integrare con Google Analytics o Firebase Analytics
  const analyticsData = {
    totalVisitors: 1247,
    uniqueVisitors: 892,
    pageViews: 3456,
    avgSessionDuration: '4m 32s',
    bounceRate: '23%',
    topPages: [
      { page: '/', views: 1247, percentage: 36.1 },
      { page: '/en', views: 892, percentage: 25.8 },
      { page: '/chi-siamo', views: 456, percentage: 13.2 },
      { page: '/en/about-us', views: 389, percentage: 11.3 },
      { page: '/testimonianze', views: 234, percentage: 6.8 },
      { page: '/en/testimonials', views: 198, percentage: 5.7 },
      { page: '/faq', views: 156, percentage: 4.5 },
      { page: '/en/faq', views: 134, percentage: 3.9 }
    ],
    topReferrers: [
      { source: 'Google', visitors: 567, percentage: 45.5 },
      { source: 'Direct', visitors: 234, percentage: 18.8 },
      { source: 'Facebook', visitors: 189, percentage: 15.2 },
      { source: 'LinkedIn', visitors: 156, percentage: 12.5 },
      { source: 'Twitter', visitors: 89, percentage: 7.1 },
      { source: 'Instagram', visitors: 12, percentage: 1.0 }
    ],
    deviceTypes: [
      { device: 'Desktop', visitors: 678, percentage: 54.4 },
      { device: 'Mobile', visitors: 445, percentage: 35.7 },
      { device: 'Tablet', visitors: 124, percentage: 9.9 }
    ],
    countries: [
      { country: 'Italia', visitors: 789, percentage: 63.3 },
      { country: 'Regno Unito', visitors: 234, percentage: 18.8 },
      { country: 'Stati Uniti', visitors: 156, percentage: 12.5 },
      { country: 'Germania', visitors: 45, percentage: 3.6 },
      { country: 'Francia', visitors: 23, percentage: 1.8 }
    ]
  };

  const handleLogin = () => {
    if (password === "TutorAIAdmin2025") {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      showModal('alert', 'Errore', 'Password non corretta!');
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated');
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = onSnapshot(collection(db, 'form_submissions'), (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BetaRequest[];
      
      const sortedRequests = requestsData.sort((a, b) => {
        const timestampA = a.timestamp?.toDate?.() || a.timestamp || new Date(0);
        const timestampB = b.timestamp?.toDate?.() || b.timestamp || new Date(0);
        return new Date(timestampB).getTime() - new Date(timestampA).getTime();
      });
      
      setRequests(sortedRequests);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const updateRequestStatus = async (requestId: string, newStatus: string, email: string) => {
    try {
      const requestRef = doc(db, 'form_submissions', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        respondedAt: new Date()
      });

      const responseDocRef = doc(db, 'betaResponses', `${requestId}_${Date.now()}`);
      await setDoc(responseDocRef, {
        email: email,
        status: newStatus,
        requestId: requestId,
        timestamp: serverTimestamp()
      });

      showModal('alert', 'Successo', `Email di ${newStatus === 'approved' ? 'approvazione' : 'rifiuto'} inviata con successo!`);
    } catch (error) {
      console.error('Errore nell\'aggiornamento dello status:', error);
      showModal('alert', 'Errore', 'Errore nell\'aggiornamento dello status');
    }
  };

  const deleteRequest = async (requestId: string) => {
    showModal('confirm', 'Conferma Cancellazione', 'Sei sicuro di voler cancellare questa richiesta? Questa azione non può essere annullata.', 
      async () => {
        try {
          await deleteDoc(doc(db, 'form_submissions', requestId));
          showModal('alert', 'Successo', 'Richiesta cancellata con successo!');
        } catch (error) {
          console.error('Errore nella cancellazione:', error);
          showModal('alert', 'Errore', 'Errore nella cancellazione della richiesta');
        }
      }
    );
  };

  const deleteSelectedRequests = async () => {
    if (selectedRequests.length === 0) {
      showModal('alert', 'Attenzione', 'Seleziona almeno una richiesta da cancellare.');
      return;
    }

    showModal('confirm', 'Conferma Cancellazione Multipla', `Sei sicuro di voler cancellare ${selectedRequests.length} richieste? Questa azione non può essere annullata.`,
      async () => {
        try {
          const deletePromises = selectedRequests.map(requestId => 
            deleteDoc(doc(db, 'form_submissions', requestId))
          );
          await Promise.all(deletePromises);
          setSelectedRequests([]);
          showModal('alert', 'Successo', `${selectedRequests.length} richieste cancellate con successo!`);
        } catch (error) {
          console.error('Errore nella cancellazione multipla:', error);
          showModal('alert', 'Errore', 'Errore nella cancellazione delle richieste');
        }
      }
    );
  };

  const handleRequestSelection = (requestId: string) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map(req => req.id));
    }
  };

  const formatSubjects = (subjects: string[]) => {
    if (!subjects || subjects.length === 0) return 'Nessuna materia';
    if (subjects.length <= 3) return subjects.join(', ');
    return `${subjects.slice(0, 3).join(', ')} +${subjects.length - 3} altre`;
  };

  const getUserTypeBadge = (userType: string) => {
    const badges = {
      parent: { text: '👨‍👩‍👧‍👦 Genitore', color: 'bg-blue-100 text-blue-800' },
      student: { text: '🎓 Studente', color: 'bg-green-100 text-green-800' }
    };
    return badges[userType as keyof typeof badges] || { text: '❓ Sconosciuto', color: 'bg-gray-100 text-gray-800' };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔐 Admin Dashboard</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci la password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Accedi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento richieste...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">📊 Dashboard Admin</h1>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === 'requests' ? `${requests.length} richieste totali` : 'Statistiche del sito'}
                {activeTab === 'requests' && selectedRequests.length > 0 && ` • ${selectedRequests.length} selezionate`}
              </p>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'requests'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📧 Richieste Beta
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📈 Analytics
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {selectedRequests.length > 0 && (
                <button
                  onClick={deleteSelectedRequests}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  🗑️ Cancella selezionate ({selectedRequests.length})
                </button>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuthenticated');
                  setIsAuthenticated(false);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                🔓 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Sezione Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-100">Visitatori Totali</p>
                    <p className="text-3xl font-bold">{analyticsData.totalVisitors.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-blue-100">
                  <span className="text-green-300">↗ +12%</span>
                  <span className="ml-2">vs settimana scorsa</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-100">Visitatori Unici</p>
                    <p className="text-3xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-100">
                  <span className="text-green-200">↗ +8%</span>
                  <span className="ml-2">vs settimana scorsa</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-100">Pagine Viste</p>
                    <p className="text-3xl font-bold">{analyticsData.pageViews.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="text-2xl">📄</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-purple-100">
                  <span className="text-green-300">↗ +15%</span>
                  <span className="ml-2">vs settimana scorsa</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-100">Tempo Medio</p>
                    <p className="text-3xl font-bold">{analyticsData.avgSessionDuration}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="text-2xl">⏱️</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-yellow-100">
                  <span className="text-green-300">↗ +23s</span>
                  <span className="ml-2">vs settimana scorsa</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-100">Bounce Rate</p>
                    <p className="text-3xl font-bold">{analyticsData.bounceRate}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-red-100">
                  <span className="text-green-300">↓ -2%</span>
                  <span className="ml-2">vs settimana scorsa</span>
                </div>
              </div>
            </div>

            {/* Charts and Data Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Top Pages Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">📊 Pagine Più Visitate</h3>
                  <span className="text-sm text-gray-500">Ultimi 7 giorni</span>
                </div>
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="group hover:bg-gray-50 rounded-lg p-3 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
                            {index + 1}
                          </span>
                          <p className="text-sm font-medium text-gray-900 truncate">{page.page}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{page.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{page.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${page.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">🔗 Fonti di Traffico</h3>
                  <span className="text-sm text-gray-500">Ultimi 7 giorni</span>
                </div>
                <div className="space-y-4">
                  {analyticsData.topReferrers.map((referrer, index) => (
                    <div key={index} className="group hover:bg-gray-50 rounded-lg p-3 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                            {referrer.source.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{referrer.source}</p>
                            <p className="text-xs text-gray-500">{referrer.percentage}% del traffico totale</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{referrer.visitors.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">visitatori</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Types */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">📱 Dispositivi</h3>
                  <span className="text-sm text-gray-500">Distribuzione utenti</span>
                </div>
                <div className="space-y-4">
                  {analyticsData.deviceTypes.map((device, index) => (
                    <div key={index} className="group hover:bg-gray-50 rounded-lg p-3 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">
                              {device.device === 'Desktop' ? '💻' : device.device === 'Mobile' ? '📱' : '📟'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{device.visitors.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{device.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">🌍 Geografia Utenti</h3>
                  <span className="text-sm text-gray-500">Top 5 paesi</span>
                </div>
                <div className="space-y-4">
                  {analyticsData.countries.map((country, index) => (
                    <div key={index} className="group hover:bg-gray-50 rounded-lg p-3 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">
                              {index === 0 ? '🇮🇹' : index === 1 ? '🇬🇧' : index === 2 ? '🇺🇸' : index === 3 ? '🇩🇪' : '🇫🇷'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{country.visitors.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{country.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Beta Requests Summary */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">📧 Riassunto Richieste Beta</h3>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Visualizza Richieste
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{requests.length}</p>
                  <p className="text-sm font-medium text-blue-800">Totale Richieste</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {requests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-sm font-medium text-green-800">Approvate</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-sm font-medium text-yellow-800">In Attesa</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {requests.filter(r => r.status === 'rejected').length}
                  </p>
                  <p className="text-sm font-medium text-red-800">Rifiutate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sezione Richieste */}
        {activeTab === 'requests' && (
          <>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Nessuna richiesta</h2>
                <p className="text-gray-600">Non ci sono ancora richieste beta da gestire.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRequests.length === requests.length && requests.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Seleziona tutto</span>
                    </label>
                    {selectedRequests.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {selectedRequests.length} di {requests.length} selezionate
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <input
                                type="checkbox"
                                checked={selectedRequests.includes(request.id)}
                                onChange={() => handleRequestSelection(request.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <h3 className="font-semibold text-gray-900 truncate">
                                {request.data.firstName} {request.data.lastName}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeBadge(request.data.userType).color}`}>
                                {getUserTypeBadge(request.data.userType).text}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                📧 {request.data.email}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1">
                                📅 {request.timestamp?.toDate?.()?.toLocaleDateString('it-IT') || 'Data non disponibile'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === 'approved' ? 'bg-green-100 text-green-800' :
                              request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {request.status === 'approved' ? '✅ Approvata' :
                               request.status === 'rejected' ? '❌ Rifiutata' :
                               '⏳ In attesa'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">📚 Percorso di Studi</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div><strong>Curriculum:</strong> {request.data.curriculum || 'Non specificato'}</div>
                              <div><strong>Classe:</strong> {request.data.classe || 'Non specificata'}</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">📖 Materie di Interesse</h4>
                            <div className="text-sm text-gray-600">
                              {formatSubjects(request.data.materie)}
                            </div>
                          </div>
                        </div>

                        {request.data.motivazione && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">💭 Motivazione</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {request.data.motivazione}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateRequestStatus(request.id, 'approved', request.data.email)}
                                className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                              >
                                ✅ Approva
                              </button>
                              <button
                                onClick={() => updateRequestStatus(request.id, 'rejected', request.data.email)}
                                className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                              >
                                ❌ Rifiuta
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteRequest(request.id)}
                            className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                          >
                            🗑️ Cancella
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
      >
        <p className="text-gray-600 mb-4">
          {modal.message}
        </p>
        {modal.type === 'confirm' && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Conferma
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
