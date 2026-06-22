import { db } from '../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ANIMAL_GUIDES } from '../data/content';

async function seedDatabase() {
  console.log("Iniciando carga de datos a Firestore...");
  
  try {
    const guidesCollection = collection(db, 'guides');
    
    for (const guide of ANIMAL_GUIDES) {
      // Usamos el ID de la guía como ID del documento en Firestore
      const guideDocRef = doc(guidesCollection, guide.id);
      
      await setDoc(guideDocRef, {
        category: guide.category,
        title: guide.title,
        pages: guide.pages,
        level: guide.level,
        topics: guide.topics,
        pdfUrl: guide.pdfUrl
      });
      
      console.log(`Guía cargada: ${guide.title}`);
    }
    
    console.log("¡Carga de datos completada exitosamente!");
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

seedDatabase();
