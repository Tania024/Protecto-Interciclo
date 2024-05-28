import { Injectable } from '@angular/core';
import { Libro } from '../domain/libro';
import { Firestore, collectionData, docData, collection, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { DocumentReference, CollectionReference } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private collectionName = 'libros';
  private collectionRef: CollectionReference<Libro>;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, this.collectionName) as CollectionReference<Libro>;
  }

  getLibros(): Observable<Libro[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Libro[]>; 
  }

  getLibro(id: string): Observable<Libro> {
    const libroDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(libroDoc, { idField: 'id' }) as Observable<Libro>; 
  }

  addLibro(libro: Libro): Promise<DocumentReference<Libro>> {
    return addDoc(this.collectionRef, libro).catch(error => {
      console.error("Error adding book: ", error);
      throw error; 
    });
  }

  updateLibro(id: string, libro: Libro): Promise<void> {
    const libroDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(libroDoc, { ...libro }).catch(error => {
      console.error("Error updating book: ", error);
      throw error; 
    });
  }

  deleteLibro(id: string): Promise<void> {
    const libroDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(libroDoc).catch(error => {
      console.error("Error deleting book: ", error);
      throw error; 
    });
  }
}
