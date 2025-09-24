// Firebase Configuration - Temporarily Disabled
// import { initializeApp } from 'firebase/app';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// import { getAuth, connectAuthEmulator } from 'firebase/auth';
// import { getStorage, connectStorageEmulator } from 'firebase/storage';
// import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

console.log("Firebase is temporarily disabled. Please use Supabase integration for backend functionality.");

// Mock Firebase services to prevent crashes
export const db = {
  collection: () => ({ add: () => Promise.resolve(), get: () => Promise.resolve({ docs: [] }) }),
  doc: () => ({ get: () => Promise.resolve({ exists: false }), set: () => Promise.resolve() })
};

export const auth = {
  currentUser: null,
  signInWithEmailAndPassword: () => Promise.reject(new Error("Please use Supabase integration")),
  createUserWithEmailAndPassword: () => Promise.reject(new Error("Please use Supabase integration")),
  signOut: () => Promise.resolve()
};

export const storage = {
  ref: () => ({ put: () => Promise.reject(new Error("Please use Supabase integration")) })
};

export const functions = {
  httpsCallable: () => () => Promise.reject(new Error("Please use Supabase integration"))
};

// Firebase emulators are disabled since we're using mock services
console.log("Firebase services mocked. For full backend functionality, please use Supabase integration.");

// Mock app export
export default { name: "mock-firebase-app" };
