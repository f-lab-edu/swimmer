import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore, doc, setDoc } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6wXhBHLfJrbtt1rJYN5OYALZR1PAaqCQ",
  authDomain: "project01-80eb1.firebaseapp.com",
  projectId: "project01-80eb1",
  storageBucket: "project01-80eb1.appspot.com",
  messagingSenderId: "708304216648",
  appId: "1:708304216648:web:dea2783bb3d914a7596e7d",
  measurementId: "G-9W4W29GWVQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchReviewData() {
    const querySnapShot = await getDocs(collection(db, "project01"));
    
    if(querySnapShot.empty){
        return [];
    }

    const fetchedData: { id: string; address: string; contents: string; name: string; }[] = [];

    querySnapShot.forEach((doc) => {

        const reviewData = {
            id: doc.data()["id"],
            address: doc.data()["address"],
            contents: doc.data()["contents"],
            name: doc.data()["name"],
            user: doc.data()["user"]
        }
        fetchedData.push(reviewData);
    }); 
    return fetchedData;
}

fetchReviewData();

export async function addDataToFirestore(data: string) {
    try {
        await setDoc(doc(db, "review"), {
            id: "5",
            name: "안성시수영장",
            address: "안성시",
            contents: data,
            user: "user1"
        });
        console.log('add 성공');
    } catch (error) {
        console.error('add 실패: ', error);
    }
}