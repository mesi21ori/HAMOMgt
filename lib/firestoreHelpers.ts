import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Safely write a document to Firestore.
 * Removes undefined fields and validates parameters.
 */
export async function safeWrite(
  collection: string,
  docId: string,
  data: Record<string, any>
) {
  if (!collection || !docId || !data) {
    throw new Error("Invalid parameters for Firestore write");
  }

  // Remove undefined fields
  const cleanData: Record<string, any> = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) cleanData[key] = data[key];
  });

  await setDoc(doc(db, collection, docId), cleanData);
  console.log(`[] Document written to ${collection}/${docId}`);
}
