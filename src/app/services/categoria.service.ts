import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../domain/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private collectionRef = collection(this.firestore, 'clientes');

  constructor(private firestore: Firestore) { }

  addCliente(cliente: Cliente): Promise<void> {
    const docRef = doc(this.collectionRef);
    cliente.id = docRef.id;
    return setDoc(docRef, cliente);
  }

  getCliente(id: string): Observable<Cliente | undefined> {
    const docRef = doc(this.collectionRef, id);
    return from(getDoc(docRef)).pipe(
      map(docSnapshot => {
        return docSnapshot.exists() ? (docSnapshot.data() as Cliente) : undefined;
      })
    );
  }

  getClientes(): Observable<Cliente[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Cliente[]>;
  }

  updateCliente(cliente: Cliente): Promise<void> {
    const docRef = doc(this.collectionRef, cliente.id);
    return updateDoc(docRef, { ...cliente });
  }

  deleteCliente(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    return deleteDoc(docRef);
  }
}
