import { collection, getDocs, query, where } from "firebase/firestore";

export async function fetchData(db,data) {
    if (data) {
      const q = query(collection(db, "Todo"), where("createBy", "==", data.user.email));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      return [];
    }
  }