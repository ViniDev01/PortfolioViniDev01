
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebase"; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const uploadImage = async (imageFile) => {
    const storage = getStorage();
    const imageRef = ref(storage, `projects/image/${imageFile.name}`);
    
    try {
      // Faz o upload da imagem
      const snapshot = await uploadBytes(imageRef, imageFile);
      // Obtém a URL de download da imagem
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      throw new Error("Falha ao enviar a imagem.");
    }
};

export const createProject = async (data) => {
    try {
        await addDoc(collection(db, "projects"), {
          ...data,
          updatedAt: serverTimestamp(), // Adiciona o timestamp
        });
    } catch (error) {
        console.error("Erro ao criar projeto:", error);
        throw error;
    }
}

