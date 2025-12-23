// src/app/beta-access/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BACKEND_API_URL } from '@/lib/supabase';

// Dati completi per i dropdown
const curriculaData = {
  italia: [
    { value: 'liceo-classico', label: 'Liceo Classico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-scientifico', label: 'Liceo Scientifico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-linguistico', label: 'Liceo Linguistico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-artistico', label: 'Liceo Artistico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-musicale', label: 'Liceo Musicale', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-scienze-umane', label: 'Liceo delle Scienze Umane', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'istituto-tecnico', label: 'Istituto Tecnico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'istituto-professionale', label: 'Istituto Professionale', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'scuola-media', label: 'Scuola Media', classes: ['Prima', 'Seconda', 'Terza'] },
    { value: 'scuola-elementare', label: 'Scuola Elementare', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] }
  ],
  internazionale: [
    { value: 'ib-diploma', label: 'IB Diploma Programme', classes: ['Year 1', 'Year 2'] },
    { value: 'ib-myp', label: 'IB Middle Years Programme', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'] },
    { value: 'a-levels', label: 'A-Levels', classes: ['AS Level', 'A Level'] },
    { value: 'igcse', label: 'IGCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'ap-courses', label: 'AP Courses', classes: ['Grade 11', 'Grade 12'] },
    { value: 'american-high-school', label: 'American High School', classes: ['Freshman', 'Sophomore', 'Junior', 'Senior'] },
    { value: 'french-bac', label: 'French Baccalauréat', classes: ['Seconde', 'Première', 'Terminale'] },
    { value: 'german-abitur', label: 'German Abitur', classes: ['Klasse 11', 'Klasse 12', 'Klasse 13'] },
    { value: 'other-international', label: 'Altro Sistema Internazionale', classes: ['Anno 1', 'Anno 2', 'Anno 3', 'Anno 4', 'Anno 5'] }
  ]
};

// Materie specifiche per ogni curriculum e classe
const subjectsByCurriculum = {
  // Liceo Classico
  'liceo-classico': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'greco', name: 'Greco', icon: '🏛️' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'greco', name: 'Greco', icon: '🏛️' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'greco', name: 'Greco', icon: '🏛️' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Liceo Scientifico
  'liceo-scientifico': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Liceo Linguistico
  'liceo-linguistico': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'lingua2', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'lingua2', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'lingua2', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'lingua3', name: 'Terza Lingua', icon: '🌍' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'lingua2', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'lingua3', name: 'Terza Lingua', icon: '🌍' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'lingua2', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'lingua3', name: 'Terza Lingua', icon: '🌍' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Liceo delle Scienze Umane
  'liceo-scienze-umane': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'scienze-umane', name: 'Scienze Umane', icon: '🧠' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'latino', name: 'Latino', icon: '🏺' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'scienze-umane', name: 'Scienze Umane', icon: '🧠' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'scienze-umane', name: 'Scienze Umane', icon: '🧠' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'scienze-umane', name: 'Scienze Umane', icon: '🧠' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'scienze-umane', name: 'Scienze Umane', icon: '🧠' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Scuola Media
  'scuola-media': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'seconda-lingua', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'seconda-lingua', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'seconda-lingua', name: 'Seconda Lingua', icon: '🌍' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Istituto Tecnico
  'istituto-tecnico': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Integrate', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'tecnologia', name: 'Tecnologia e Tecniche', icon: '💻' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Integrate', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'tecnologia', name: 'Tecnologia e Tecniche', icon: '💻' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-tecniche', name: 'Materie Tecniche', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-tecniche', name: 'Materie Tecniche', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-tecniche', name: 'Materie Tecniche', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // IB Diploma Programme
  'ib-diploma': {
    'Year 1': [
      { id: 'english-a', name: 'English A', icon: '🇬🇧' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'psychology', name: 'Psychology', icon: '🧠' },
      { id: 'art', name: 'Visual Arts', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'tok', name: 'Theory of Knowledge', icon: '🤔' },
      { id: 'cas', name: 'CAS', icon: '🌍' }
    ],
    'Year 2': [
      { id: 'english-a', name: 'English A', icon: '🇬🇧' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'psychology', name: 'Psychology', icon: '🧠' },
      { id: 'art', name: 'Visual Arts', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'tok', name: 'Theory of Knowledge', icon: '🤔' },
      { id: 'cas', name: 'CAS', icon: '🌍' }
    ]
  },
  // A-Levels
  'a-levels': {
    'AS Level': [
      { id: 'english', name: 'English Literature', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ],
    'A Level': [
      { id: 'english', name: 'English Literature', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ]
  },
  // IGCSE
  'igcse': {
    'Year 10': [
      { id: 'english', name: 'English', icon: '🇬🇧' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'ict', name: 'ICT', icon: '💻' }
    ],
    'Year 11': [
      { id: 'english', name: 'English', icon: '🇬🇧' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'ict', name: 'ICT', icon: '💻' }
    ]
  },
  // IB Middle Years Programme
  'ib-myp': {
    'Year 1': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 2': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 3': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 4': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 5': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 6': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 7': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 8': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ],
    'Year 9': [
      { id: 'language-a', name: 'Language A', icon: '📚' },
      { id: 'language-b', name: 'Language B', icon: '🌍' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'individuals-societies', name: 'Individuals & Societies', icon: '🏛️' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'design', name: 'Design', icon: '💻' }
    ]
  },
  // AP Courses
  'ap-courses': {
    'Grade 11': [
      { id: 'ap-english', name: 'AP English Literature', icon: '📚' },
      { id: 'ap-calculus', name: 'AP Calculus AB', icon: '📐' },
      { id: 'ap-physics', name: 'AP Physics', icon: '⚡' },
      { id: 'ap-chemistry', name: 'AP Chemistry', icon: '🧪' },
      { id: 'ap-biology', name: 'AP Biology', icon: '🧬' },
      { id: 'ap-history', name: 'AP US History', icon: '🏛️' },
      { id: 'ap-economics', name: 'AP Economics', icon: '💰' },
      { id: 'ap-psychology', name: 'AP Psychology', icon: '🧠' },
      { id: 'ap-art', name: 'AP Studio Art', icon: '🎨' },
      { id: 'ap-music', name: 'AP Music Theory', icon: '🎵' }
    ],
    'Grade 12': [
      { id: 'ap-english', name: 'AP English Literature', icon: '📚' },
      { id: 'ap-calculus', name: 'AP Calculus BC', icon: '📐' },
      { id: 'ap-physics', name: 'AP Physics C', icon: '⚡' },
      { id: 'ap-chemistry', name: 'AP Chemistry', icon: '🧪' },
      { id: 'ap-biology', name: 'AP Biology', icon: '🧬' },
      { id: 'ap-history', name: 'AP World History', icon: '🏛️' },
      { id: 'ap-economics', name: 'AP Economics', icon: '💰' },
      { id: 'ap-psychology', name: 'AP Psychology', icon: '🧠' },
      { id: 'ap-art', name: 'AP Studio Art', icon: '🎨' },
      { id: 'ap-music', name: 'AP Music Theory', icon: '🎵' }
    ]
  },
  // American High School
  'american-high-school': {
    'Freshman': [
      { id: 'english', name: 'English', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'social-studies', name: 'Social Studies', icon: '🏛️' },
      { id: 'foreign-language', name: 'Foreign Language', icon: '🌍' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'art', name: 'Art', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ],
    'Sophomore': [
      { id: 'english', name: 'English', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'social-studies', name: 'Social Studies', icon: '🏛️' },
      { id: 'foreign-language', name: 'Foreign Language', icon: '🌍' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'art', name: 'Art', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ],
    'Junior': [
      { id: 'english', name: 'English', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'social-studies', name: 'Social Studies', icon: '🏛️' },
      { id: 'foreign-language', name: 'Foreign Language', icon: '🌍' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'art', name: 'Art', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ],
    'Senior': [
      { id: 'english', name: 'English', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'social-studies', name: 'Social Studies', icon: '🏛️' },
      { id: 'foreign-language', name: 'Foreign Language', icon: '🌍' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'art', name: 'Art', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ]
  },
  // French Baccalauréat
  'french-bac': {
    'Seconde': [
      { id: 'francais', name: 'Français', icon: '🇫🇷' },
      { id: 'mathematiques', name: 'Mathématiques', icon: '📐' },
      { id: 'histoire-geo', name: 'Histoire-Géographie', icon: '🏛️' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'langues', name: 'Langues Vivantes', icon: '🌍' },
      { id: 'eps', name: 'EPS', icon: '⚽' },
      { id: 'arts', name: 'Arts Plastiques', icon: '🎨' },
      { id: 'musique', name: 'Musique', icon: '🎵' }
    ],
    'Première': [
      { id: 'francais', name: 'Français', icon: '🇫🇷' },
      { id: 'mathematiques', name: 'Mathématiques', icon: '📐' },
      { id: 'histoire-geo', name: 'Histoire-Géographie', icon: '🏛️' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'langues', name: 'Langues Vivantes', icon: '🌍' },
      { id: 'eps', name: 'EPS', icon: '⚽' },
      { id: 'philosophie', name: 'Philosophie', icon: '🤔' },
      { id: 'specialites', name: 'Spécialités', icon: '🎯' }
    ],
    'Terminale': [
      { id: 'philosophie', name: 'Philosophie', icon: '🤔' },
      { id: 'mathematiques', name: 'Mathématiques', icon: '📐' },
      { id: 'histoire-geo', name: 'Histoire-Géographie', icon: '🏛️' },
      { id: 'sciences', name: 'Sciences', icon: '🔬' },
      { id: 'langues', name: 'Langues Vivantes', icon: '🌍' },
      { id: 'eps', name: 'EPS', icon: '⚽' },
      { id: 'specialites', name: 'Spécialités', icon: '🎯' }
    ]
  },
  // German Abitur
  'german-abitur': {
    'Klasse 11': [
      { id: 'deutsch', name: 'Deutsch', icon: '🇩🇪' },
      { id: 'mathematik', name: 'Mathematik', icon: '📐' },
      { id: 'geschichte', name: 'Geschichte', icon: '🏛️' },
      { id: 'biologie', name: 'Biologie', icon: '🧬' },
      { id: 'chemie', name: 'Chemie', icon: '🧪' },
      { id: 'physik', name: 'Physik', icon: '⚡' },
      { id: 'englisch', name: 'Englisch', icon: '🇬🇧' },
      { id: 'sport', name: 'Sport', icon: '⚽' }
    ],
    'Klasse 12': [
      { id: 'deutsch', name: 'Deutsch', icon: '🇩🇪' },
      { id: 'mathematik', name: 'Mathematik', icon: '📐' },
      { id: 'geschichte', name: 'Geschichte', icon: '🏛️' },
      { id: 'biologie', name: 'Biologie', icon: '🧬' },
      { id: 'chemie', name: 'Chemie', icon: '🧪' },
      { id: 'physik', name: 'Physik', icon: '⚡' },
      { id: 'englisch', name: 'Englisch', icon: '🇬🇧' },
      { id: 'sport', name: 'Sport', icon: '⚽' }
    ],
    'Klasse 13': [
      { id: 'deutsch', name: 'Deutsch', icon: '🇩🇪' },
      { id: 'mathematik', name: 'Mathematik', icon: '📐' },
      { id: 'geschichte', name: 'Geschichte', icon: '🏛️' },
      { id: 'biologie', name: 'Biologie', icon: '🧬' },
      { id: 'chemie', name: 'Chemie', icon: '🧪' },
      { id: 'physik', name: 'Physik', icon: '⚡' },
      { id: 'englisch', name: 'Englisch', icon: '🇬🇧' },
      { id: 'sport', name: 'Sport', icon: '⚽' }
    ]
  },
  // Altro Sistema Internazionale
  'other-international': {
    'Anno 1': [
      { id: 'lingua-madre', name: 'Lingua Madre', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'lingue-straniere', name: 'Lingue Straniere', icon: '🌍' },
      { id: 'arte', name: 'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' }
    ],
    'Anno 2': [
      { id: 'lingua-madre', name: 'Lingua Madre', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'lingue-straniere', name: 'Lingue Straniere', icon: '🌍' },
      { id: 'arte', name: 'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' }
    ],
    'Anno 3': [
      { id: 'lingua-madre', name: 'Lingua Madre', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'lingue-straniere', name: 'Lingue Straniere', icon: '🌍' },
      { id: 'arte', name: 'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' }
    ],
    'Anno 4': [
      { id: 'lingua-madre', name: 'Lingua Madre', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'lingue-straniere', name: 'Lingue Straniere', icon: '🌍' },
      { id: 'arte', name: 'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' }
    ],
    'Anno 5': [
      { id: 'lingua-madre', name: 'Lingua Madre', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'lingue-straniere', name: 'Lingue Straniere', icon: '🌍' },
      { id: 'arte', name: 'Arte', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' }
    ]
  },
  // Istituto Professionale
  'istituto-professionale': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Integrate', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'tecnologia', name: 'Tecnologia e Tecniche', icon: '💻' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Integrate', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'tecnologia', name: 'Tecnologia e Tecniche', icon: '💻' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-professionali', name: 'Materie Professionali', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-professionali', name: 'Materie Professionali', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'diritto', name: 'Diritto ed Economia', icon: '⚖️' },
      { id: 'materie-professionali', name: 'Materie Professionali', icon: '🔧' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Scuola Elementare
  'scuola-elementare': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'scienze', name: 'Scienze', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Arte e Immagine', icon: '🎨' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Liceo Artistico
  'liceo-artistico': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Discipline Grafiche e Pittoriche', icon: '🎨' },
      { id: 'design', name: 'Design', icon: '🎯' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Discipline Grafiche e Pittoriche', icon: '🎨' },
      { id: 'design', name: 'Design', icon: '🎯' },
      { id: 'musica', name: 'Musica', icon: '🎵' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Discipline Grafiche e Pittoriche', icon: '🎨' },
      { id: 'design', name: 'Design', icon: '🎯' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Discipline Grafiche e Pittoriche', icon: '🎨' },
      { id: 'design', name: 'Design', icon: '🎯' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'arte', name: 'Discipline Grafiche e Pittoriche', icon: '🎨' },
      { id: 'design', name: 'Design', icon: '🎯' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  },
  // Liceo Musicale
  'liceo-musicale': {
    'Prima': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'musica', name: 'Teoria, Analisi e Composizione', icon: '🎵' },
      { id: 'strumento', name: 'Strumento', icon: '🎸' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Seconda': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'musica', name: 'Teoria, Analisi e Composizione', icon: '🎵' },
      { id: 'strumento', name: 'Strumento', icon: '🎸' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Terza': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'geografia', name: 'Geografia', icon: '🌍' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'scienze', name: 'Scienze Naturali', icon: '🔬' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'musica', name: 'Teoria, Analisi e Composizione', icon: '🎵' },
      { id: 'strumento', name: 'Strumento', icon: '🎸' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quarta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'musica', name: 'Teoria, Analisi e Composizione', icon: '🎵' },
      { id: 'strumento', name: 'Strumento', icon: '🎸' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ],
    'Quinta': [
      { id: 'italiano', name: 'Italiano', icon: '📚' },
      { id: 'storia', name: 'Storia', icon: '🏛️' },
      { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
      { id: 'matematica', name: 'Matematica', icon: '📐' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
      { id: 'musica', name: 'Teoria, Analisi e Composizione', icon: '🎵' },
      { id: 'strumento', name: 'Strumento', icon: '🎸' },
      { id: 'arte', name: 'Storia dell\'Arte', icon: '🎨' },
      { id: 'ed-fisica', name: 'Educazione Fisica', icon: '⚽' },
      { id: 'religione', name: 'Religione', icon: '⛪' }
    ]
  }
};

// Materie generiche per curricula non specificati
const genericSubjects = [
  { id: 'matematica', name: 'Matematica', icon: '📐' },
  { id: 'italiano', name: 'Italiano', icon: '📚' },
  { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
  { id: 'storia', name: 'Storia', icon: '🏛️' },
  { id: 'geografia', name: 'Geografia', icon: '🌍' },
  { id: 'scienze', name: 'Scienze', icon: '🔬' },
  { id: 'fisica', name: 'Fisica', icon: '⚡' },
  { id: 'chimica', name: 'Chimica', icon: '🧪' },
  { id: 'latino', name: 'Latino', icon: '🏺' },
  { id: 'greco', name: 'Greco', icon: '🏛️' },
  { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
  { id: 'arte', name: 'Arte', icon: '🎨' }
];

const mapCurriculumToWaitlist = (curriculum: string, sistema: string): 'Italian_Licei' | 'IGCSE' | 'IB_DP' | 'IB_MYP' | 'IB_PYP' => {
  if (!curriculum) {
    return 'Italian_Licei';
  }

  const normalized = curriculum.toLowerCase();
  const system = sistema?.toLowerCase() || 'italia';

  if (system === 'internazionale') {
    if (normalized.includes('myp')) {
      return 'IB_MYP';
    }
    if (normalized.includes('ib')) {
      return 'IB_DP';
    }
    if (
      normalized.includes('igcse') ||
      normalized.includes('a-level') ||
      normalized.includes('ap-') ||
      normalized.includes('american') ||
      normalized.includes('french') ||
      normalized.includes('german') ||
      normalized.includes('international')
    ) {
      return 'IGCSE';
    }
  }

  if (normalized.includes('pyp')) {
    return 'IB_PYP';
  }

  return 'Italian_Licei';
};

// Componente per gli step
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
            currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {step}
        </div>
        <span className={`font-semibold ${currentStep >= step ? 'text-gray-900' : 'text-gray-600'}`}>
          {step === 1 && 'Dati Personali'}
          {step === 2 && 'Percorso di Studi'}
          {step === 3 && 'Motivazione'}
        </span>
      </div>
    ))}
  </div>
);

const BetaAccessPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    userType: 'parent', // Nuovo campo per distinguere genitore/studente
    sistemaScolastico: 'italia',
    curriculum: '',
    classe: '',
    materie: [],
    motivazione: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Posti disponibili coerenti con la homepage (aggiornati)
  const totalPlaces = 500;
  const usedPlaces = 342; // Coerente con la homepage
  const availablePlaces = totalPlaces - usedPlaces;
  const completionPercentage = Math.round((usedPlaces / totalPlaces) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset classe e materie quando cambia il curriculum
      ...(name === 'curriculum' && { classe: '', materie: [] }),
      // Reset materie quando cambia la classe
      ...(name === 'classe' && { materie: [] })
    }));
  };

  const handleSubjectChange = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      materie: prev.materie.includes(subjectId)
        ? prev.materie.filter(id => id !== subjectId)
        : [...prev.materie, subjectId]
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validazione semplice per assicurarsi che i campi principali non siano vuoti
    if (!formData.nome || !formData.cognome || !formData.email || !formData.curriculum || !formData.classe) {
      setError('Per favore, compila tutti i campi obbligatori.');
      setIsSubmitting(false);
      return;
    }

    try {
      const normalizedCurriculum = mapCurriculumToWaitlist(formData.curriculum, formData.sistemaScolastico);
      const motivationNote = formData.motivazione?.trim();
      const noteSections = [
        motivationNote,
        `Sistema scolastico: ${formData.sistemaScolastico}`,
        `Percorso selezionato: ${formData.curriculum || 'n/d'}`,
        `Classe: ${formData.classe || 'n/d'}`
      ].filter(Boolean);

      const response = await fetch(`${BACKEND_API_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          firstName: formData.nome.trim(),
          lastName: formData.cognome.trim(),
          curriculum: normalizedCurriculum,
          classe: formData.classe,
          materie: formData.materie,
          submittedBy: formData.userType,
          notes: noteSections.length > 0 ? noteSections.join('\n') : null
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = errorBody?.detail || 'Errore sconosciuto';
        throw new Error(detail);
      }

      const payload = await response.json();

      if (payload?.already_exists) {
        setError('Sei già presente nella lista d’attesa. Ti contatteremo appena sarà disponibile un posto!');
      } else {
        setIsSubmitted(true);
      }

      setIsSubmitting(false);
    } catch (err) {
      console.error("Errore durante l'invio alla waitlist:", err);
      setError("Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.");
      setIsSubmitting(false);
    }
  };

  // Funzioni per navigare tra gli step
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Ottieni le classi disponibili per il curriculum selezionato
  const getAvailableClasses = () => {
    if (!formData.curriculum) return [];
    const selectedCurriculum = curriculaData[formData.sistemaScolastico]?.find(c => c.value === formData.curriculum);
    return selectedCurriculum?.classes || [];
  };

  // Ottieni le materie disponibili per il curriculum e classe selezionati
  const getAvailableSubjects = () => {
    if (!formData.curriculum || !formData.classe) {
      return genericSubjects;
    }
    
    const curriculumSubjects = subjectsByCurriculum[formData.curriculum];
    
    if (curriculumSubjects && curriculumSubjects[formData.classe]) {
      return curriculumSubjects[formData.classe];
    }
    
    return genericSubjects;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Richiesta Inviata!</h1>
          <p className="text-gray-600 mb-6">
            Grazie per il tuo interesse! Ti contatteremo entro 48 ore per confermare il tuo accesso alla Beta.
          </p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TutorAI
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Torna alla Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unisciti alla Rivoluzione
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Sii tra i primi a testare il futuro dell'apprendimento. Il tuo posto nella Beta ti aspetta.
          </p>
        </div>

        {/* CORREZIONE #2: Modificata la griglia per essere mobile-first */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* La colonna del form ora occupa 2/3 su schermi grandi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <StepIndicator currentStep={step} />
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {step === 1 && (
                  // CONTENUTO STEP 1: DATI PERSONALI
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chi sta compilando questo form? *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="userType"
                            value="parent"
                            checked={formData.userType === 'parent'}
                            onChange={handleInputChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">👨‍👩‍👧‍👦 Genitore</div>
                            <div className="text-sm text-gray-500">Compilo per mio figlio/a</div>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="userType"
                            value="student"
                            checked={formData.userType === 'student'}
                            onChange={handleInputChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">🎓 Studente</div>
                            <div className="text-sm text-gray-500">Compilo per me stesso/a</div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                        <input
                          type="text"
                          name="cognome"
                          value={formData.cognome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button onClick={nextStep} type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                      Prossimo →
                    </button>
                  </section>
                )}

                {step === 2 && (
                  // CONTENUTO STEP 2: PERCORSO DI STUDI
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sistema Scolastico *</label>
                      <select
                        name="sistemaScolastico"
                        value={formData.sistemaScolastico}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="italia">Italia</option>
                        <option value="internazionale">Internazionale</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Percorso di Studi *</label>
                      <select
                        name="curriculum"
                        value={formData.curriculum}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleziona un percorso</option>
                        {curriculaData[formData.sistemaScolastico].map((curriculum) => (
                          <option key={curriculum.value} value={curriculum.value}>
                            {curriculum.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Classe *</label>
                      <select
                        name="classe"
                        value={formData.classe}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.curriculum}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {formData.curriculum ? 'Seleziona la classe' : 'Prima seleziona il percorso di studi'}
                        </option>
                        {getAvailableClasses().map((classe) => (
                          <option key={classe} value={classe}>
                            {classe}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Materie di Interesse
                        {formData.curriculum && formData.classe && (
                          <span className="text-blue-600 ml-2">
                            (specifiche per {formData.curriculum} - {formData.classe})
                          </span>
                        )}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getAvailableSubjects().map((subject) => (
                          <label key={subject.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.materie.includes(subject.id)}
                              onChange={() => handleSubjectChange(subject.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{subject.icon} {subject.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                        ← Indietro
                      </button>
                      <button onClick={nextStep} type="button" className="w-2/3 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                        Prossimo →
                      </button>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  // CONTENUTO STEP 3: MOTIVAZIONE E SUBMIT
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Perché vuoi partecipare alla Beta? *</label>
                      <textarea
                        name="motivazione"
                        value={formData.motivazione}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Raccontaci brevemente le tue aspettative e le difficoltà che stai affrontando..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    {/* Messaggio di errore */}
                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                        ← Indietro
                      </button>
                       <button type="submit" disabled={isSubmitting} className="w-2/3 bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                         {isSubmitting ? 'Invio...' : 'Richiedi Accesso'}
                       </button>
                    </div>
                  </section>
                )}
              </form>
            </div>
          </div>

          {/* La sidebar ora occupa 1/3 su schermi grandi e va a capo automaticamente su mobile */}
          <div className="space-y-6">
            {/* Testimonial */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-white p-6 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Dicono di noi</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/assets/hero/pexels-max-fischer-5212657.jpg" alt="Studente Marco Serra" width={48} height={48} className="rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900">Marco Serra</p>
                    <p className="text-sm text-gray-600">Liceo Classico, Roma</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">"Lottavo con la matematica da sempre. TutorAI ha capito che ragiono per immagini e ha iniziato a spiegarmi i concetti con esempi legati all'arte. Ha cambiato tutto."</p>
              </div>
            </div>

            {/* Vantaggi Beta */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎁 Cosa Include l'Accesso Beta</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Accesso completo a tutte le funzionalità</li>
                  <li>• Supporto prioritario dal team</li>
                  <li>• Feedback diretto agli sviluppatori</li>
                  <li>• Accesso gratuito per 6 mesi</li>
                  <li>• Contenuti esclusivi per beta tester</li>
                </ul>
              </div>
            </div>
            
            {/* Posti Limitati - Coerenti con la homepage */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Posti Limitati</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Solo {totalPlaces} posti disponibili per la Beta. Già {usedPlaces} richieste ricevute!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{completionPercentage}% completato</p>
                <p className="text-sm font-semibold text-green-600 mt-2">{availablePlaces} posti ancora disponibili</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaAccessPage;
