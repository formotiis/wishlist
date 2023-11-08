import { memoize } from 'lodash';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config';

// Initialize Firebase
export const initFirebase = memoize(() => {
	const app = initializeApp(firebaseConfig);
	// const analytics = getAnalytics(app);
	const auth = getAuth(app);
	const db = getFirestore(app);
	const wishlistCollection = collection(db, "wishlist");
	return { auth, wishlistCollection, db }
})
