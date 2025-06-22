import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeFmbuUy_yITn8wUqXNWzC1SjTbAeHv3U",
  authDomain: "langfordlog.firebaseapp.com",
  projectId: "langfordlog",
  storageBucket: "langfordlog.firebasestorage.app",
  messagingSenderId: "314671122997",
  appId: "1:314671122997:web:e3cd05c2b83ee95ad3bf7c",
  measurementId: "G-6VFCXLYBR1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FOREMEN = [
  { name: 'Jeff LaFave', category: 'Plumber & Pipelifters' },
  { name: 'Dalton Miller', category: 'Plumber & Pipelifters' },
  { name: 'Tim Finley', category: 'Plumber & Pipelifters' },
  { name: 'Holden Webb', category: 'Plumber & Pipelifters' },
  { name: 'Grant Ellison', category: 'Plumber & Pipelifters' },
  { name: 'Dylan Snell', category: 'Plumber & Pipelifters' },
  { name: 'Matt Halloway', category: 'Sheetmetal' },
  { name: 'Travis Dirnberger', category: 'Sheetmetal' },
  { name: 'Greg Brawley', category: 'Sheetmetal' },
  { name: 'Martin Johnson', category: 'Sheetmetal' },
  { name: 'Dylan Noll', category: 'Sheetmetal' },
  { name: 'Rob Moughler', category: 'Sheetmetal' },
];

const EMPLOYEES = {
  'Plumber & Pipelifters': [
    'Joe Baker',
    'Mike Swader',
    'Brad Drum',
    'Cory Ellison',
    'Alex Ross',
    'Jeremy Rollet',
    'Jason Wessel',
    'Michael Riney',
    'Mark Vanginnup',
    'Ethan Russel',
    'Kane Duncan',
    'Cooper Dees',
    'Clay Doza',
    'Tyson Ford',
  ],
  'Sheetmetal': [
    'Martin Alcala',
    'Billy Price',
    'Nick Wilson',
    'David Clarke',
    'Mike Crawford',
    'Matt Gehrs',
    'Wyatt Rose',
    'Tony Seabaugh',
  ],
};

async function seed() {
  // ✅ Add missing foremen only
  for (const f of FOREMEN) {
    await setDoc(doc(db, 'foremen', f.name), f, { merge: true });
    console.log(`Ensured foreman: ${f.name}`);
  }

  // ✅ Merge new employees without overwriting
  for (const [category, list] of Object.entries(EMPLOYEES)) {
    const docRef = doc(db, 'employees', category);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      for (const emp of list) {
        await updateDoc(docRef, {
          list: arrayUnion(emp),
        });
      }
    } else {
      await setDoc(docRef, { list });
    }
    console.log(`Ensured employees for ${category}`);
  }

  console.log('Seeding complete!');
}

seed();