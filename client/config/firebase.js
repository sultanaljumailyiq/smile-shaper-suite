// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// إعدادات Firebase - يجب استبدالها بالإعدادات الحقيقية
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "zindenta-project.firebaseapp.com",
  projectId: "zindenta-project",
  storageBucket: "zindenta-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// الخدمات الأساسية
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// تهيئة المحاكيات في بيئة التطوير
if (process.env.NODE_ENV === 'development') {
  // توصيل المحاكيات إذا لم تكن متصلة بالفعل
  try {
    // محاكي Firestore
    if (!db._delegate._databaseId.projectId.includes('localhost')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    
    // محاكي Authentication
    if (!auth.config.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    
    // محاكي Storage
    if (!storage._delegate._bucket.includes('localhost')) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    
    // محاكي Functions
    if (!functions._delegate._url.includes('localhost')) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  } catch (error) {
    console.log('Emulators already connected or not needed:', error.message);
  }
}

export default app;
