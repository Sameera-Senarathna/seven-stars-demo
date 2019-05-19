import forebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = forebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()