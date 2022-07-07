
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs,
    doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCncyhU5k9y1Xn_7Gjqdoe3p-O27a87pjk",
  authDomain: "tienda-online-d47e0.firebaseapp.com",
  projectId: "tienda-online-d47e0",
  storageBucket: "tienda-online-d47e0.appspot.com",
  messagingSenderId: "779941043927",
  appId: "1:779941043927:web:c3f3d914aaf04c41361a92"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export const getProductos = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));
    const productos = []

    querySnapshot.forEach((doc) => {
    productos.push(doc);
    });

    return productos;
}


export const getProducto = async (id) => {

const docRef = doc(db, "productos", id);

const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap;
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

}




