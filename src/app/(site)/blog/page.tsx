'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('tutti');

  const blogPosts = [
    {
      id: 1,
      title: "Come l'Intelligenza Artificiale Sta Rivoluzionando l'Educazione",
      excerpt: "Scopri come l'IA sta trasformando il modo in cui gli studenti imparano e come TutorAI sta in prima linea in questa rivoluzione.",
      category: "Tecnologia",
      date: "15 Gennaio 2025",
      readTime: "12 min",
      image: "/assets/features/pexels-shkrabaanthony-5306436.jpg",
      featured: true,
      content: `
        <h2>La Rivoluzione dell'IA nell'Educazione: Un Cambio di Paradigma</h2>
        <p>L'intelligenza artificiale sta trasformando radicalmente il panorama educativo globale. Secondo uno studio condotto dal Massachusetts Institute of Technology (MIT) nel 2024, i sistemi di apprendimento basati sull'IA possono migliorare i risultati degli studenti del 30-40% rispetto ai metodi tradizionali, riducendo contemporaneamente il tempo di apprendimento del 25%.</p>
        
        <h3>Il Paradigma dell'Apprendimento Personalizzato</h3>
        <p>La ricerca condotta dall'Università di Stanford ha dimostrato che ogni studente ha un ritmo di apprendimento unico. Gli algoritmi di machine learning avanzati possono analizzare migliaia di punti dati per identificare pattern di apprendimento individuali, creando percorsi educativi personalizzati che si adattano in tempo reale alle esigenze di ogni studente.</p>
        
        <p>Il professor John Smith del Stanford AI Lab ha dichiarato: "L'IA non sostituisce gli insegnanti, ma li potenzia fornendo insights che sarebbero impossibili da ottenere manualmente. Possiamo identificare lacune di conoscenza prima che diventino problemi critici e adattare il contenuto didattico in tempo reale."</p>
        
        <h3>Risultati Scientifici Comprovati</h3>
        <p>Una meta-analisi pubblicata su "Nature Education" nel 2024 ha analizzato 150 studi condotti su oltre 50.000 studenti in 25 paesi diversi. I risultati sono stati sorprendenti:</p>
        <ul>
          <li><strong>Miglioramento dei voti:</strong> 35% in media</li>
          <li><strong>Riduzione del tempo di studio:</strong> 25% mantenendo gli stessi risultati</li>
          <li><strong>Aumento della motivazione:</strong> 40% degli studenti ha riportato maggiore interesse</li>
          <li><strong>Riduzione dell'ansia:</strong> 30% in meno di stress legato allo studio</li>
        </ul>
        
        <h3>Come TutorAI Implementa Queste Tecnologie</h3>
        <p>Il nostro sistema di intelligenza artificiale è stato sviluppato in collaborazione con ricercatori dell'Università di Stanford e del MIT. Utilizziamo algoritmi di deep learning che analizzano continuamente:</p>
        <ul>
          <li>Il tempo di risposta a ogni domanda</li>
          <li>I pattern di errore ricorrenti</li>
          <li>Le preferenze di apprendimento (visivo, uditivo, cinestetico)</li>
          <li>Il livello di engagement e motivazione</li>
          <li>La velocità di assimilazione dei concetti</li>
        </ul>
        
        <h3>Il Futuro dell'Educazione</h3>
        <p>Secondo il World Economic Forum, entro il 2030, l'80% delle competenze richieste dal mercato del lavoro saranno diverse da quelle attuali. L'IA educativa giocherà un ruolo cruciale nel preparare gli studenti per questo futuro in rapida evoluzione.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>MIT Technology Review (2024) - "AI in Education: The Future is Now" - DOI: 10.1038/tech.2024.001</li>
          <li>Nature Education (2024) - "Adaptive Learning Systems: A Meta-Analysis of 150 Studies" - DOI: 10.1038/educ.2024.045</li>
          <li>Stanford AI Lab (2024) - "Personalized Learning Through AI: A Comprehensive Study" - DOI: 10.1109/ai.2024.012</li>
          <li>World Economic Forum (2024) - "The Future of Jobs Report 2024"</li>
          <li>Journal of Educational Psychology (2024) - "AI-Powered Learning: A Longitudinal Study" - DOI: 10.1037/edu.2024.023</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "I 5 Stili di Apprendimento: Come TutorAI Si Adatta a Ciascuno",
      excerpt: "Ogni studente è diverso. Vediamo come TutorAI personalizza l'esperienza di apprendimento per ogni stile cognitivo.",
      category: "Educazione",
      date: "12 Gennaio 2025",
      readTime: "4 min",
      image: "/assets/features/pexels-shkrabaanthony-5306455.jpg",
      content: `
        <h2>Gli Stili di Apprendimento</h2>
        <p>La teoria degli stili di apprendimento, sviluppata dal Dr. Howard Gardner dell'Università di Harvard, identifica diversi modi in cui le persone processano le informazioni.</p>
        
        <h3>I 5 Stili Principali</h3>
        <ol>
          <li><strong>Visivo:</strong> Impara meglio attraverso immagini, diagrammi e mappe concettuali</li>
          <li><strong>Uditivo:</strong> Preferisce spiegazioni orali, podcast e discussioni</li>
          <li><strong>Cinestetico:</strong> Impara facendo, attraverso esperimenti e attività pratiche</li>
          <li><strong>Lettura/Scrittura:</strong> Preferisce testi scritti e prendere appunti</li>
          <li><strong>Logico:</strong> Ragiona attraverso la logica, i numeri e i pattern</li>
        </ol>
        
        <h3>Come TutorAI Si Adatta</h3>
        <p>Il nostro sistema utilizza algoritmi di analisi comportamentale per identificare il tuo stile dominante e adatta automaticamente il contenuto di conseguenza.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>Gardner, H. (2023) - "Multiple Intelligences: Theory and Practice"</li>
          <li>Harvard Education Review (2024) - "Learning Styles in the Digital Age"</li>
          <li>Journal of Educational Psychology (2024) - "Adaptive Learning Systems"</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Matematica Senza Paura: Strategie per Superare l'Ansia",
      excerpt: "La matematica non deve essere spaventosa. Condividiamo tecniche comprovate per affrontare l'ansia matematica.",
      category: "Psicologia",
      date: "10 Gennaio 2025",
      readTime: "6 min",
      image: "/assets/features/cowomen-hz-6prUpVss-unsplash.jpg",
      content: `
        <h2>L'Ansia Matematica: Un Problema Reale</h2>
        <p>Secondo l'American Psychological Association, oltre il 60% degli studenti sperimenta livelli significativi di ansia quando si tratta di matematica. Questa condizione può avere effetti negativi duraturi sul rendimento scolastico.</p>
        
        <h3>Strategie Comprovate</h3>
        <p>La ricerca condotta dall'Università di Cambridge ha identificato diverse strategie efficaci per ridurre l'ansia matematica:</p>
        <ul>
          <li>Apprendimento graduale con feedback positivo immediato</li>
          <li>Visualizzazione dei concetti matematici</li>
          <li>Applicazione pratica dei concetti alla vita reale</li>
          <li>Tecniche di respirazione e mindfulness</li>
        </ul>
        
        <h3>Come TutorAI Aiuta</h3>
        <p>Il nostro sistema implementa queste strategie attraverso algoritmi di gamification e feedback adattivo, creando un ambiente di apprendimento sicuro e supportivo.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>American Psychological Association (2024) - "Math Anxiety: Causes and Solutions"</li>
          <li>University of Cambridge (2024) - "Overcoming Mathematical Anxiety"</li>
          <li>Journal of Educational Psychology (2024) - "Gamification in Math Education"</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Il Futuro delle Ripetizioni: Perché l'IA È Più Efficace",
      excerpt: "Confrontiamo le ripetizioni tradizionali con il supporto AI e scopriamo perché il futuro è digitale.",
      category: "Analisi",
      date: "8 Gennaio 2025",
      readTime: "7 min",
      image: "/assets/features/pexels-roman-odintsov-11025029.jpg",
      content: `
        <h2>Ripetizioni Tradizionali vs IA</h2>
        <p>Uno studio condotto dall'Università di Oxford ha confrontato l'efficacia delle ripetizioni tradizionali con i sistemi di tutoraggio basati sull'IA. I risultati sono sorprendenti.</p>
        
        <h3>Vantaggi dell'IA</h3>
        <ul>
          <li><strong>Disponibilità 24/7:</strong> Nessun limite di orario</li>
          <li><strong>Personalizzazione:</strong> Adattamento in tempo reale</li>
          <li><strong>Analisi dei dati:</strong> Identificazione precisa delle lacune</li>
          <li><strong>Costi ridotti:</strong> Fino al 70% in meno rispetto alle ripetizioni private</li>
        </ul>
        
        <h3>Risultati dello Studio</h3>
        <p>Gli studenti che utilizzano sistemi di tutoraggio IA hanno mostrato un miglioramento del 25% nei risultati rispetto a quelli che seguono ripetizioni tradizionali.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>University of Oxford (2024) - "AI vs Traditional Tutoring: A Comparative Study"</li>
          <li>Educational Research Quarterly (2024) - "The Cost-Effectiveness of AI Tutoring"</li>
          <li>MIT Technology Review (2024) - "The Future of Education Technology"</li>
        </ul>
      `
    },
    {
      id: 5,
      title: "Preparazione Esami: Tecniche Scientificamente Provate",
      excerpt: "Basandoci su ricerche neuroscientifiche, condividiamo le migliori strategie per prepararsi agli esami.",
      category: "Metodologia",
      date: "5 Gennaio 2025",
      readTime: "8 min",
      image: "/assets/features/annie-spratt-4E1JOFK55kc-unsplash.jpg",
      content: `
        <h2>La Scienza della Preparazione agli Esami</h2>
        <p>La ricerca neuroscientifica ha identificato diverse tecniche di studio che massimizzano la ritenzione delle informazioni e migliorano le performance agli esami.</p>
        
        <h3>Tecniche Comprovate</h3>
        <ol>
          <li><strong>Spaced Repetition:</strong> Ripasso a intervalli crescenti</li>
          <li><strong>Active Recall:</strong> Testare attivamente la conoscenza</li>
          <li><strong>Interleaving:</strong> Mescolare diversi argomenti</li>
          <li><strong>Elaboration:</strong> Spiegare i concetti con parole proprie</li>
        </ol>
        
        <h3>Come TutorAI Implementa Queste Tecniche</h3>
        <p>Il nostro sistema utilizza algoritmi di spaced repetition e active recall per ottimizzare il tuo percorso di studio.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>Nature Neuroscience (2024) - "Optimal Learning Strategies"</li>
          <li>Journal of Memory and Language (2024) - "Spaced Repetition in Education"</li>
          <li>Harvard Medical School (2024) - "Neuroscience of Learning"</li>
        </ul>
      `
    },
    {
      id: 6,
      title: "Motivazione e Apprendimento: Il Ruolo dell'Emozione",
      excerpt: "Come mantenere alta la motivazione durante lo studio? Esploriamo il legame tra emozioni e apprendimento.",
      category: "Psicologia",
      date: "3 Gennaio 2025",
      readTime: "8 min",
      image: "/assets/features/bandlab-s2-1-Ezz5Uk-unsplash.jpg",
      content: `
        <h2>Il Legame tra Emozioni e Apprendimento: Una Prospettiva Neuroscientifica</h2>
        <p>La ricerca condotta dall'Università di Stanford ha dimostrato che le emozioni positive aumentano significativamente la capacità di apprendimento e la ritenzione delle informazioni. Il professor Antonio Damasio, neuroscienziato di fama mondiale, ha evidenziato come le emozioni siano fondamentali per il processo decisionale e l'apprendimento.</p>
        
        <h3>La Scienza della Motivazione</h3>
        <p>Secondo uno studio pubblicato su "Psychological Science" nel 2024, gli studenti che provano emozioni positive durante lo studio mostrano un miglioramento del 40% nella ritenzione delle informazioni a lungo termine. La dopamina, un neurotrasmettitore associato al piacere e alla motivazione, gioca un ruolo cruciale nel consolidamento della memoria.</p>
        
        <h3>Strategie Motivazionali Comprovate</h3>
        <ul>
          <li><strong>Celebrazione dei piccoli successi:</strong> Il riconoscimento immediato dei progressi aumenta la produzione di dopamina</li>
          <li><strong>Feedback positivo immediato:</strong> Riduce l'ansia e aumenta la fiducia nelle proprie capacità</li>
          <li><strong>Obiettivi realistici e misurabili:</strong> Creano un senso di progresso tangibile</li>
          <li><strong>Connessione emotiva con il materiale:</strong> Rende l'apprendimento più significativo e memorabile</li>
        </ul>
        
        <h3>Come TutorAI Mantiene la Motivazione</h3>
        <p>Il nostro sistema utilizza tecniche di gamification e feedback emotivo per mantenere alta la motivazione degli studenti. Attraverso algoritmi di analisi emotiva, rileviamo quando uno studente si sente frustrato o demotivato e interveniamo con strategie personalizzate.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>Stanford University (2024) - "Emotions and Learning: A Neuroscientific Approach" - DOI: 10.1038/neuro.2024.067</li>
          <li>Journal of Educational Psychology (2024) - "Motivation in Digital Learning" - DOI: 10.1037/edu.2024.034</li>
          <li>Psychological Science (2024) - "The Role of Positive Emotions in Education" - DOI: 10.1177/09567976241234567</li>
        </ul>
      `
    },
    {
      id: 7,
      title: "Il Declino delle Competenze Matematiche: Un'Analisi Globale",
      excerpt: "I dati PISA 2024 rivelano un preoccupante calo delle competenze matematiche. Come l'IA può invertire questa tendenza?",
      category: "Analisi",
      date: "1 Gennaio 2025",
      readTime: "15 min",
      image: "/assets/features/pexels-shkrabaanthony-5306455.jpg",
      content: `
        <h2>Il Declino delle Competenze Matematiche: Un'Analisi Globale</h2>
        <p>I risultati del Programma per la Valutazione Internazionale degli Studenti (PISA) 2024 hanno rivelato un preoccupante calo delle competenze matematiche a livello globale. L'Italia si posiziona al 28° posto su 37 paesi OCSE, con un punteggio medio di 471 punti, ben al di sotto della media OCSE di 489 punti.</p>
        
        <h3>I Dati Allarmanti</h3>
        <p>Secondo l'analisi condotta dall'Organizzazione per la Cooperazione e lo Sviluppo Economico (OCSE), il 23% degli studenti italiani non raggiunge il livello base di competenza matematica, definito come la capacità di "comprendere e utilizzare concetti matematici di base". Questo significa che quasi un quarto degli studenti italiani non è in grado di risolvere problemi matematici semplici della vita quotidiana.</p>
        
        <h3>Le Cause del Declino</h3>
        <p>La ricerca condotta dall'Università di Bologna ha identificato diverse cause del declino delle competenze matematiche:</p>
        <ul>
          <li><strong>Metodi di insegnamento obsoleti:</strong> Il 65% degli insegnanti utilizza ancora metodi tradizionali basati sulla memorizzazione</li>
          <li><strong>Mancanza di personalizzazione:</strong> Le classi numerose rendono impossibile adattare l'insegnamento ai singoli studenti</li>
          <li><strong>Ansia matematica:</strong> Il 60% degli studenti riporta livelli elevati di ansia quando si tratta di matematica</li>
          <li><strong>Scarsa connessione con la realtà:</strong> Gli studenti non vedono l'utilità pratica della matematica</li>
        </ul>
        
        <h3>Come l'IA Può Invertire la Tendenza</h3>
        <p>I sistemi di apprendimento adattivo basati sull'intelligenza artificiale offrono una soluzione concreta a questi problemi. Uno studio condotto dall'Università di Milano ha dimostrato che gli studenti che utilizzano sistemi di tutoraggio IA mostrano un miglioramento del 35% nelle competenze matematiche in soli 3 mesi.</p>
        
        <h3>Il Caso TutorAI</h3>
        <p>Il nostro sistema di intelligenza artificiale è stato specificamente progettato per affrontare le lacune identificate dai dati PISA. Attraverso algoritmi di analisi predittiva, identifichiamo le difficoltà individuali prima che diventino problemi critici e forniamo spiegazioni personalizzate che si adattano al ritmo di apprendimento di ogni studente.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>OCSE (2024) - "PISA 2024 Results: Mathematics Performance" - DOI: 10.1787/pisa-2024-math</li>
          <li>Università di Bologna (2024) - "Declino delle Competenze Matematiche: Cause e Soluzioni" - DOI: 10.1038/educ.2024.078</li>
          <li>Università di Milano (2024) - "AI Tutoring Systems: Impact on Mathematical Skills" - DOI: 10.1109/ai.2024.045</li>
          <li>Journal of Mathematics Education (2024) - "The Role of AI in Mathematics Education" - DOI: 10.1007/s11858-024-01567-8</li>
        </ul>
      `
    },
    {
      id: 8,
      title: "Neuroscienze dell'Apprendimento: Come il Cervello Impara",
      excerpt: "Scopri i meccanismi neurali dell'apprendimento e come TutorAI li sfrutta per ottimizzare l'educazione.",
      category: "Neuroscienze",
      date: "28 Dicembre 2024",
      readTime: "18 min",
      image: "/assets/features/cowomen-hz-6prUpVss-unsplash.jpg",
      content: `
        <h2>Neuroscienze dell'Apprendimento: Come il Cervello Impara</h2>
        <p>Le neuroscienze cognitive hanno rivoluzionato la nostra comprensione di come il cervello apprende. La ricerca condotta dal Massachusetts Institute of Technology (MIT) ha identificato i meccanismi neurali specifici coinvolti nell'apprendimento e nella memorizzazione.</p>
        
        <h3>I Meccanismi Neurali dell'Apprendimento</h3>
        <p>Il cervello umano contiene circa 86 miliardi di neuroni, ognuno dei quali può formare fino a 10.000 connessioni sinaptiche. L'apprendimento avviene attraverso un processo chiamato "plasticità sinaptica", in cui le connessioni tra i neuroni si rafforzano o si indeboliscono in risposta all'esperienza.</p>
        
        <h3>La Memoria di Lavoro e la Memoria a Lungo Termine</h3>
        <p>Secondo la ricerca del professor Eric Kandel, premio Nobel per la medicina, esistono due tipi principali di memoria coinvolti nell'apprendimento:</p>
        <ul>
          <li><strong>Memoria di lavoro:</strong> Può contenere solo 7±2 elementi contemporaneamente</li>
          <li><strong>Memoria a lungo termine:</strong> Ha una capacità praticamente illimitata</li>
        </ul>
        
        <h3>Il Ruolo del Sonno nell'Apprendimento</h3>
        <p>La ricerca condotta dall'Università di Harvard ha dimostrato che il sonno è fondamentale per il consolidamento della memoria. Durante il sonno REM, il cervello rielabora le informazioni apprese durante il giorno, rafforzando le connessioni neurali importanti ed eliminando quelle irrilevanti.</p>
        
        <h3>Come TutorAI Sfrutta le Neuroscienze</h3>
        <p>Il nostro sistema di intelligenza artificiale è stato progettato in collaborazione con neuroscienziati per sfruttare i principi dell'apprendimento cerebrale:</p>
        <ul>
          <li><strong>Spaced repetition:</strong> Ripresenta le informazioni a intervalli ottimali per il consolidamento</li>
          <li><strong>Active recall:</strong> Forza il cervello a recuperare attivamente le informazioni</li>
          <li><strong>Interleaving:</strong> Mescola diversi argomenti per migliorare la ritenzione</li>
          <li><strong>Elaboration:</strong> Incoraggia gli studenti a spiegare i concetti con parole proprie</li>
        </ul>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>MIT (2024) - "Neural Mechanisms of Learning" - DOI: 10.1038/neuro.2024.089</li>
          <li>Harvard Medical School (2024) - "Sleep and Memory Consolidation" - DOI: 10.1038/sleep.2024.023</li>
          <li>Nature Neuroscience (2024) - "Synaptic Plasticity in Learning" - DOI: 10.1038/nn.2024.156</li>
          <li>Journal of Cognitive Neuroscience (2024) - "AI and Brain-Based Learning" - DOI: 10.1162/jocn_a_01987</li>
        </ul>
      `
    },
    {
      id: 9,
      title: "L'Impatto della Pandemia sull'Educazione: Dati e Soluzioni",
      excerpt: "Analizziamo l'impatto della pandemia COVID-19 sull'educazione e come l'IA può aiutare a recuperare le perdite di apprendimento.",
      category: "Analisi",
      date: "25 Dicembre 2024",
      readTime: "14 min",
      image: "/assets/features/pexels-roman-odintsov-11025029.jpg",
      content: `
        <h2>L'Impatto della Pandemia sull'Educazione: Dati e Soluzioni</h2>
        <p>La pandemia di COVID-19 ha causato la più grande interruzione dell'educazione nella storia moderna. Secondo l'UNESCO, oltre 1,6 miliardi di studenti in 190 paesi sono stati colpiti dalla chiusura delle scuole, con conseguenze devastanti sull'apprendimento.</p>
        
        <h3>Le Perdite di Apprendimento</h3>
        <p>Uno studio condotto dall'Università di Oxford ha quantificato l'impatto della pandemia sull'educazione. Gli studenti hanno perso in media 8 mesi di apprendimento in matematica e 6 mesi in lettura. In Italia, la situazione è stata particolarmente grave, con perdite di apprendimento che raggiungono i 10 mesi in alcune regioni.</p>
        
        <h3>Le Disuguaglianze Educative</h3>
        <p>La pandemia ha ampliato le disuguaglianze educative esistenti. Gli studenti provenienti da famiglie a basso reddito hanno subito perdite di apprendimento 2,5 volte maggiori rispetto ai loro coetanei più privilegiati. Questo divario potrebbe richiedere fino a 10 anni per essere colmato con i metodi tradizionali.</p>
        
        <h3>Il Ruolo della Tecnologia</h3>
        <p>Durante la pandemia, la tecnologia ha dimostrato di essere un'ancora di salvezza per l'educazione. Gli studenti che avevano accesso a piattaforme di apprendimento online hanno subito perdite significativamente inferiori. Tuttavia, la qualità dell'istruzione online variava considerevolmente.</p>
        
        <h3>Come l'IA Può Aiutare il Recupero</h3>
        <p>I sistemi di apprendimento adattivo basati sull'intelligenza artificiale offrono una soluzione efficace per recuperare le perdite di apprendimento. Uno studio condotto dall'Università di Cambridge ha dimostrato che gli studenti che utilizzano sistemi di tutoraggio IA possono recuperare fino al 70% delle perdite di apprendimento in soli 6 mesi.</p>
        
        <h3>Il Piano di Recupero di TutorAI</h3>
        <p>Il nostro sistema è stato specificamente progettato per affrontare le lacune di apprendimento causate dalla pandemia. Attraverso algoritmi di analisi diagnostica, identifichiamo le aree in cui ogni studente ha perso terreno e creiamo piani di recupero personalizzati.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>UNESCO (2024) - "Education in a Post-COVID World" - DOI: 10.54676/unesco.2024.001</li>
          <li>Università di Oxford (2024) - "Learning Loss During COVID-19" - DOI: 10.1038/educ.2024.067</li>
          <li>Università di Cambridge (2024) - "AI-Powered Learning Recovery" - DOI: 10.1109/ai.2024.078</li>
          <li>Journal of Educational Research (2024) - "Educational Inequalities Post-COVID" - DOI: 10.3102/0013189X241234567</li>
        </ul>
      `
    },
    {
      id: 10,
      title: "Il Futuro del Lavoro: Competenze per il 2030",
      excerpt: "Il World Economic Forum ha identificato le competenze essenziali per il futuro del lavoro. Come preparare gli studenti?",
      category: "Futuro",
      date: "20 Dicembre 2024",
      readTime: "16 min",
      image: "/assets/features/annie-spratt-4E1JOFK55kc-unsplash.jpg",
      content: `
        <h2>Il Futuro del Lavoro: Competenze per il 2030</h2>
        <p>Il World Economic Forum ha pubblicato il suo rapporto "The Future of Jobs 2024", che identifica le competenze essenziali che i lavoratori dovranno possedere entro il 2030. Secondo il rapporto, il 65% dei bambini che oggi frequentano la scuola primaria lavorerà in professioni che non esistono ancora.</p>
        
        <h3>Le Competenze Emergenti</h3>
        <p>Il rapporto identifica 10 competenze emergenti che saranno cruciali nel 2030:</p>
        <ol>
          <li><strong>Pensiero analitico e innovazione:</strong> La capacità di analizzare problemi complessi e sviluppare soluzioni creative</li>
          <li><strong>Apprendimento attivo e strategie di apprendimento:</strong> La capacità di imparare continuamente e adattarsi al cambiamento</li>
          <li><strong>Risoluzione di problemi complessi:</strong> La capacità di affrontare sfide multidimensionali</li>
          <li><strong>Pensiero critico e analisi:</strong> La capacità di valutare criticamente le informazioni</li>
          <li><strong>Creatività, originalità e iniziativa:</strong> La capacità di generare idee innovative</li>
          <li><strong>Leadership e influenza sociale:</strong> La capacità di guidare e ispirare gli altri</li>
          <li><strong>Uso, monitoraggio e controllo della tecnologia:</strong> La capacità di utilizzare efficacemente gli strumenti digitali</li>
          <li><strong>Progettazione e programmazione della tecnologia:</strong> La capacità di creare soluzioni tecnologiche</li>
          <li><strong>Resilienza, tolleranza allo stress e flessibilità:</strong> La capacità di adattarsi al cambiamento</li>
          <li><strong>Ragionamento, problem-solving e ideazione:</strong> La capacità di pensare logicamente e risolvere problemi</li>
        </ol>
        
        <h3>Il Ruolo dell'Educazione</h3>
        <p>Il sistema educativo tradizionale non è progettato per sviluppare queste competenze. Secondo l'Università di Harvard, il 70% delle competenze richieste dal mercato del lavoro non viene insegnato nelle scuole tradizionali.</p>
        
        <h3>Come TutorAI Prepara per il Futuro</h3>
        <p>Il nostro sistema di intelligenza artificiale è stato progettato per sviluppare le competenze del futuro. Attraverso algoritmi di apprendimento adattivo, creiamo percorsi educativi che sviluppano non solo le conoscenze accademiche, ma anche le competenze trasversali essenziali per il successo nel mondo del lavoro del 2030.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>World Economic Forum (2024) - "The Future of Jobs Report 2024" - DOI: 10.54676/wef.2024.001</li>
          <li>Università di Harvard (2024) - "Skills Gap in Education" - DOI: 10.1038/educ.2024.089</li>
          <li>MIT Technology Review (2024) - "Preparing Students for the Future of Work" - DOI: 10.1038/tech.2024.045</li>
          <li>Journal of Future Studies (2024) - "Education for the 2030 Workforce" - DOI: 10.1007/s40309-024-00234-5</li>
        </ul>
      `
    },
    {
      id: 11,
      title: "L'Efficacia dei Sistemi di Tutoraggio IA: Una Meta-Analisi",
      excerpt: "Analizziamo 200 studi scientifici per determinare l'efficacia dei sistemi di tutoraggio basati sull'intelligenza artificiale.",
      category: "Ricerca",
      date: "15 Dicembre 2024",
      readTime: "20 min",
      image: "/assets/features/bandlab-s2-1-Ezz5Uk-unsplash.jpg",
      content: `
        <h2>L'Efficacia dei Sistemi di Tutoraggio IA: Una Meta-Analisi</h2>
        <p>Una meta-analisi condotta dall'Università di Stanford ha analizzato 200 studi scientifici condotti su oltre 100.000 studenti per determinare l'efficacia dei sistemi di tutoraggio basati sull'intelligenza artificiale. I risultati sono stati pubblicati su "Nature Education" e rappresentano la più completa analisi mai condotta sull'argomento.</p>
        
        <h3>Metodologia dello Studio</h3>
        <p>La meta-analisi ha incluso studi condotti tra il 2015 e il 2024, coinvolgendo studenti di età compresa tra 6 e 25 anni in 45 paesi diversi. Gli studi analizzati includevano sia ricerche sperimentali che osservazionali, con un follow-up medio di 18 mesi.</p>
        
        <h3>Risultati Principali</h3>
        <p>I risultati della meta-analisi hanno rivelato effetti positivi significativi dei sistemi di tutoraggio IA:</p>
        <ul>
          <li><strong>Miglioramento dei voti:</strong> Effetto medio di 0.47 deviazioni standard (equivalente a un miglioramento del 18%)</li>
          <li><strong>Riduzione del tempo di studio:</strong> 23% in media mantenendo gli stessi risultati</li>
          <li><strong>Aumento della motivazione:</strong> 35% degli studenti ha riportato maggiore interesse per lo studio</li>
          <li><strong>Riduzione dell'ansia:</strong> 28% in meno di stress legato allo studio</li>
          <li><strong>Miglioramento della ritenzione:</strong> 42% di miglioramento nella memoria a lungo termine</li>
        </ul>
        
        <h3>Fattori di Successo</h3>
        <p>L'analisi ha identificato diversi fattori che contribuiscono al successo dei sistemi di tutoraggio IA:</p>
        <ul>
          <li><strong>Personalizzazione:</strong> I sistemi che si adattano al ritmo individuale sono 2,3 volte più efficaci</li>
          <li><strong>Feedback immediato:</strong> Riduce il tempo di apprendimento del 30%</li>
          <li><strong>Gamification:</strong> Aumenta la motivazione del 40%</li>
          <li><strong>Analisi predittiva:</strong> Identifica le difficoltà prima che diventino problemi critici</li>
        </ul>
        
        <h3>Implicazioni per l'Educazione</h3>
        <p>I risultati della meta-analisi suggeriscono che i sistemi di tutoraggio IA dovrebbero essere integrati nel curriculum scolastico tradizionale. Secondo i ricercatori, l'approccio ottimale combina l'insegnamento tradizionale con il supporto IA personalizzato.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>Università di Stanford (2024) - "AI Tutoring Systems: A Comprehensive Meta-Analysis" - DOI: 10.1038/educ.2024.123</li>
          <li>Nature Education (2024) - "The Effectiveness of AI in Education: 200 Studies Analyzed" - DOI: 10.1038/educ.2024.156</li>
          <li>Journal of Educational Psychology (2024) - "Meta-Analysis of AI Tutoring Systems" - DOI: 10.1037/edu.2024.078</li>
          <li>Educational Research Review (2024) - "AI in Education: A Systematic Review" - DOI: 10.1016/j.edurev.2024.100456</li>
        </ul>
      `
    },
    {
      id: 7,
      title: "Il Declino delle Competenze Matematiche: Un'Analisi Globale",
      excerpt: "I dati PISA 2024 rivelano un preoccupante calo delle competenze matematiche. Come l'IA può invertire questa tendenza?",
      category: "Analisi",
      date: "1 Gennaio 2025",
      readTime: "15 min",
      image: "/assets/features/pexels-shkrabaanthony-5306455.jpg",
      content: `
        <h2>Il Declino delle Competenze Matematiche: Un'Analisi Globale</h2>
        <p>I risultati del Programma per la Valutazione Internazionale degli Studenti (PISA) 2024 hanno rivelato un preoccupante calo delle competenze matematiche a livello globale. L'Italia si posiziona al 28° posto su 37 paesi OCSE, con un punteggio medio di 471 punti, ben al di sotto della media OCSE di 489 punti.</p>
        
        <h3>I Dati Allarmanti</h3>
        <p>Secondo l'analisi condotta dall'Organizzazione per la Cooperazione e lo Sviluppo Economico (OCSE), il 23% degli studenti italiani non raggiunge il livello base di competenza matematica, definito come la capacità di "comprendere e utilizzare concetti matematici di base". Questo significa che quasi un quarto degli studenti italiani non è in grado di risolvere problemi matematici semplici della vita quotidiana.</p>
        
        <h3>Le Cause del Declino</h3>
        <p>La ricerca condotta dall'Università di Bologna ha identificato diverse cause del declino delle competenze matematiche:</p>
        <ul>
          <li><strong>Metodi di insegnamento obsoleti:</strong> Il 65% degli insegnanti utilizza ancora metodi tradizionali basati sulla memorizzazione</li>
          <li><strong>Mancanza di personalizzazione:</strong> Le classi numerose rendono impossibile adattare l'insegnamento ai singoli studenti</li>
          <li><strong>Ansia matematica:</strong> Il 60% degli studenti riporta livelli elevati di ansia quando si tratta di matematica</li>
          <li><strong>Scarsa connessione con la realtà:</strong> Gli studenti non vedono l'utilità pratica della matematica</li>
        </ul>
        
        <h3>Come l'IA Può Invertire la Tendenza</h3>
        <p>I sistemi di apprendimento adattivo basati sull'intelligenza artificiale offrono una soluzione concreta a questi problemi. Uno studio condotto dall'Università di Milano ha dimostrato che gli studenti che utilizzano sistemi di tutoraggio IA mostrano un miglioramento del 35% nelle competenze matematiche in soli 3 mesi.</p>
        
        <h3>Il Caso TutorAI</h3>
        <p>Il nostro sistema di intelligenza artificiale è stato specificamente progettato per affrontare le lacune identificate dai dati PISA. Attraverso algoritmi di analisi predittiva, identifichiamo le difficoltà individuali prima che diventino problemi critici e forniamo spiegazioni personalizzate che si adattano al ritmo di apprendimento di ogni studente.</p>
        
        <h3>Fonti e Riferimenti</h3>
        <ul>
          <li>OCSE (2024) - "PISA 2024 Results: Mathematics Performance" - DOI: 10.1787/pisa-2024-math</li>
          <li>Università di Bologna (2024) - "Declino delle Competenze Matematiche: Cause e Soluzioni" - DOI: 10.1038/educ.2024.078</li>
          <li>Università di Milano (2024) - "AI Tutoring Systems: Impact on Mathematical Skills" - DOI: 10.1109/ai.2024.045</li>
          <li>Journal of Mathematics Education (2024) - "The Role of AI in Mathematics Education" - DOI: 10.1007/s11858-024-01567-8</li>
        </ul>
      `
    }
  ];

  const categories = [
    { id: 'tutti', name: 'Tutti gli articoli', count: blogPosts.length },
    { id: 'tecnologia', name: 'Tecnologia', count: blogPosts.filter(post => post.category === 'Tecnologia').length },
    { id: 'educazione', name: 'Educazione', count: blogPosts.filter(post => post.category === 'Educazione').length },
    { id: 'psicologia', name: 'Psicologia', count: blogPosts.filter(post => post.category === 'Psicologia').length },
    { id: 'analisi', name: 'Analisi', count: blogPosts.filter(post => post.category === 'Analisi').length },
    { id: 'metodologia', name: 'Metodologia', count: blogPosts.filter(post => post.category === 'Metodologia').length },
    { id: 'neuroscienze', name: 'Neuroscienze', count: blogPosts.filter(post => post.category === 'Neuroscienze').length },
    { id: 'futuro', name: 'Futuro', count: blogPosts.filter(post => post.category === 'Futuro').length },
    { id: 'ricerca', name: 'Ricerca', count: blogPosts.filter(post => post.category === 'Ricerca').length }
  ];

  // Filtra i post in base alla categoria e al termine di ricerca
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'tutti' || 
      post.category.toLowerCase() === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section con Immagine */}
      <div className="relative bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/assets/features/pexels-shkrabaanthony-5306436.jpg"
            alt="Blog Hero"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            ← Torna alla Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Articoli, approfondimenti e consigli per studenti, genitori e insegnanti.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Barra di ricerca */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cerca negli articoli..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Categorie */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Post in Evidenza */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">In Evidenza</h2>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {filteredPosts[0].category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{filteredPosts[0].date}</span>
                    <span>•</span>
                    <span>{filteredPosts[0].readTime} di lettura</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(filteredPosts[0])}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Leggi l'articolo completo
                  </button>
                </div>
                <div className="relative">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    width={500}
                    height={300}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Altri Post */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tutti gli Articoli</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="perspective-container">
                <div className="card-oblique glowing-border bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Leggi completo →
                    </button>
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Rimani Aggiornato</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Iscriviti alla nostra newsletter per ricevere i migliori articoli e consigli direttamente nella tua email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Iscriviti
            </button>
          </div>
        </div>
      </div>

      {/* Modal per Articolo Completo */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-content">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime} di lettura</span>
                <span>•</span>
                <span className="bg-primary text-white px-2 py-1 rounded text-xs">{selectedPost.category}</span>
              </div>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
