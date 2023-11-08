let process: any;

const p = process?.env ? process.env : import.meta.env;

export const firebaseConfig = {
	apiKey: p.VITE_FIREBASE_APIKEY,
	authDomain: p.VITE_FIREBASE_AUTHDOMAIN,
	// The value of `databaseURL` depends on the location of the database
	//databaseURL: "https://DATABASE_NAME.firebaseio.com",
	projectId: p.VITE_FIREBASE_PROJECTID,
	storageBucket: p.VITE_FIREBASE_STORAGEBUCKET,
	//messagingSenderId: "SENDER_ID",
	appId: p.VITE_FIREBASE_APPID,
};
