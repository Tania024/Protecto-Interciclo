import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../domain/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private collectionRef = collection(this.firestore, 'administradores');

  constructor(private firestore: Firestore) { }

  addAdministrador(admin: Administrador): Promise<void> {
    const docRef = doc(this.collectionRef);
    admin.id = docRef.id;
    return setDoc(docRef, admin);
  }

  getAdministrador(id: string): Observable<Administrador | undefined> {
    const docRef = doc(this.collectionRef, id);
    return from(getDoc(docRef)).pipe(
      map(docSnapshot => {
        return docSnapshot.exists() ? (docSnapshot.data() as Administrador) : undefined;
      })
    );
  }

  getAdministradores(): Observable<Administrador[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Administrador[]>;
  }

  updateAdministrador(admin: Administrador): Promise<void> {
    const docRef = doc(this.collectionRef, admin.id);
    return updateDoc(docRef, { ...admin });
  }

  deleteAdministrador(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    return deleteDoc(docRef);
  }
}