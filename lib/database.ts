// import { 
//   collection, addDoc, serverTimestamp, type Firestore 
// } from "firebase/firestore";
// import { 
//   ref, uploadBytes, getDownloadURL, type FirebaseStorage 
// } from "firebase/storage";
// import { db, storage } from "./firebase";

// const firestoreDb: Firestore = db;
// const firebaseStorage: FirebaseStorage = storage;

// export interface CustomerInfo {
//   fullName: string;
//   department: string;
//   customDepartment?: string;
//   responsibility: string;
//   phoneNumber: string;
// }

// export interface FormData {
//   [key: string]: string | number | boolean | null | Date;
// }

// export interface OrderData {
//   serviceType: string;
//   formData: FormData;
//   files?: File[];
// }

// const uploadFiles = async (files: File[]): Promise<string[]> => {
//   const urls: string[] = [];

//   for (const file of files) {
//     try {
//       const fileRef = ref(firebaseStorage, `uploads/${Date.now()}-${file.name}`);
//       await uploadBytes(fileRef, file);
//       const url = await getDownloadURL(fileRef);
//       urls.push(url);
//       console.log(` File uploaded successfully: ${file.name}`);
//     } catch (error) {
//       console.error(` Error uploading file ${file.name}:`, error);
//       throw error;
//     }
//   }

//   return urls;
// };

// export const saveCustomerInfo = async (customerInfo: CustomerInfo): Promise<string> => {
//   try {
//     const sanitizedCustomerInfo = {
//       fullName: customerInfo.fullName.trim(),
//       department: customerInfo.department.trim(),
//       responsibility: customerInfo.responsibility.trim(),
//       phoneNumber: customerInfo.phoneNumber.trim(),
//       ...(customerInfo.customDepartment ? { customDepartment: customerInfo.customDepartment.trim() } : {}),
//       createdAt: serverTimestamp(),
//     };

//     console.log("[] Sending customer info to Firestore:", sanitizedCustomerInfo);

//     const docRef = await addDoc(collection(firestoreDb, "customers"), sanitizedCustomerInfo);
//     console.log("[] Customer info saved:", docRef.id);
//     return docRef.id;
//   } catch (error: unknown) {
//     console.error("[] Error saving customer info:", error);
//     throw error;
//   }
// };


// export const saveOrder = async (customerId: string, orderData: OrderData): Promise<string> => {
//   try {
//     console.log("[] Saving order:", {
//       customerId,
//       serviceType: orderData.serviceType,
//       filesCount: orderData.files?.length || 0,
//     });

//     if (!customerId || !orderData.serviceType || !orderData.formData) {
//       throw new Error("Missing required order information");
//     }

//     // Upload files to storage first
//     let fileUrls: string[] = [];
//     if (orderData.files && orderData.files.length > 0) {
//       console.log("[] Uploading files to Firebase Storage...");
//       fileUrls = await uploadFiles(orderData.files);
//       console.log("[] Files uploaded successfully:", fileUrls);
//     }

//     // Remove undefined and convert Dates
//     const processedFormData = Object.fromEntries(
//       Object.entries(orderData.formData)
//         .filter(([_, value]) => value !== undefined)
//         .map(([key, value]) => [key, value instanceof Date ? value.toISOString() : value])
//     );

//     const docRef = await addDoc(collection(firestoreDb, "orders"), {
//       customerId,
//       serviceType: orderData.serviceType,
//       formData: processedFormData,
//       files: fileUrls,
//       status: "pending",
//       createdAt: serverTimestamp(),
//     });

//     console.log("[] Order saved successfully:", docRef.id);
//     return docRef.id;
//   } catch (error: unknown) {
//     console.error("[] Error saving order:", error);

//     if (error instanceof Error) {
//       if (error.message.includes("permission-denied")) {
//         throw new Error("የማዘዣ ማስቀመጫ ፈቃድ የለም። እባክዎ ድጋሚ ይሞክሩ።");
//       } else if (error.message.includes("unavailable")) {
//         throw new Error("የማዘዣ ማስቀመጫ አገልግሎት አይገኝም። እባክዎ ድጋሚ ይሞክሩ።");
//       }
//     }

//     throw new Error("የማዘዣ ማስቀመጥ ስህተት። እባክዎ ድጋሚ ይሞክሩ።");
//   }
// };

// export const checkFirebaseConnection = async (): Promise<boolean> => {
//   try {
//     await addDoc(collection(firestoreDb, "connection-test"), {
//       timestamp: serverTimestamp(),
//     });
//     return true;
//   } catch (error) {
//     console.error("[] Firebase connection check failed:", error);
//     return false;
//   }
// };


import {
  collection,
  addDoc,
  serverTimestamp,
  type Firestore,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
} from "firebase/storage";
import { db, storage } from "./firebase";
// lib/database.ts



export  const firestoreDb: Firestore = db;
export const firebaseStorage: FirebaseStorage = storage;

export interface CustomerInfo {
  fullName: string;
  department: string;
  customDepartment?: string;
  responsibility: string;
  phoneNumber: string;
}

export interface FormData {
  [key: string]: string | number | boolean | null | Date;
}

export interface OrderData {
  serviceType: string;
  formData: FormData;
  files?: File[];
}

const uploadFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    try {
      const fileRef = ref(firebaseStorage, `uploads/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
      console.log(` File uploaded successfully: ${file.name}`);
    } catch (error) {
      console.error(` Error uploading file ${file.name}:`, error);
      throw error;
    }
  }

  return urls;
};

// ✅ Save Customer Info
export const saveCustomerInfo = async (
  customerInfo: CustomerInfo
): Promise<string> => {
  try {
    const sanitizedCustomerInfo = {
      fullName: customerInfo.fullName.trim(),
      department: customerInfo.department.trim(),
      responsibility: customerInfo.responsibility.trim(),
      phoneNumber: customerInfo.phoneNumber.trim(),
      ...(customerInfo.customDepartment
        ? { customDepartment: customerInfo.customDepartment.trim() }
        : {}),
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(firestoreDb, "customers"),
      sanitizedCustomerInfo
    );
    return docRef.id;
  } catch (error: unknown) {
    console.error("[] Error saving customer info:", error);
    throw error;
  }
};

// ✅ Save Order
export const saveOrder = async (
  customerId: string,
  orderData: OrderData
): Promise<string> => {
  try {
    if (!customerId || !orderData.serviceType || !orderData.formData) {
      throw new Error("Missing required order information");
    }

    // Upload files
    let fileUrls: string[] = [];
    if (orderData.files && orderData.files.length > 0) {
      fileUrls = await uploadFiles(orderData.files);
    }

    const processedFormData = Object.fromEntries(
      Object.entries(orderData.formData)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [
          key,
          value instanceof Date ? value.toISOString() : value,
        ])
    );

    const docRef = await addDoc(collection(firestoreDb, "orders"), {
      customerId,
      serviceType: orderData.serviceType,
      formData: processedFormData,
      files: fileUrls,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error: unknown) {
    console.error("[] Error saving order:", error);
    throw error;
  }
};

//
// 🔽 New Functions for Orders
//
// ✅ Get all orders (latest first)
export const getOrders = async (): Promise<any[]> => {
  try {
    const q = query(collection(firestoreDb, "orders"), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("[] Error fetching orders:", error)
    throw error
  }
}

// ✅ Get single order by ID
export const getOrderById = async (orderId: string): Promise<any | null> => {
  try {
    const docRef = doc(firestoreDb, "orders", orderId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } catch (error) {
    console.error("[] Error fetching order:", error)
    throw error
  }
}

// ✅ Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: "accepted" | "rejected" | "pending",
): Promise<void> => {
  try {
    const docRef = doc(firestoreDb, "orders", orderId)
    await updateDoc(docRef, { status })
    console.log(`[] Order ${orderId} updated to status: ${status}`)
  } catch (error) {
    console.error("[] Error updating order status:", error)
    throw error
  }
}

// ✅ Delete order
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    const docRef = doc(firestoreDb, "orders", orderId)
    await deleteDoc(docRef)
    console.log(`[] Order ${orderId} deleted successfully`)
  } catch (error) {
    console.error("[] Error deleting order:", error)
    throw error
  }
}

// ✅ Connection test
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    await addDoc(collection(firestoreDb, "connection-test"), {
      timestamp: serverTimestamp(),
    })
    return true
  } catch (error) {
    console.error("[] Firebase connection check failed:", error)
    return false
  }
}



