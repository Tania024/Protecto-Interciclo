import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, collection, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentReference, CollectionReference } from 'firebase/firestore';
import { Cliente } from '../domain/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private collectionName = 'clientes';
  private collectionRef: CollectionReference<Cliente>;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, this.collectionName) as CollectionReference<Cliente>;
  }

  getClientes(): Observable<Cliente[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getCliente(id: string): Observable<Cliente> {
    const clienteDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(clienteDoc, { idField: 'id' }) as Observable<Cliente>;
  }

  addCliente(cliente: Cliente): Promise<DocumentReference<Cliente>> {
    return addDoc(this.collectionRef, cliente);
  }

  updateCliente(id: string, cliente: Cliente): Promise<void> {
    const clienteDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(clienteDoc, { ...cliente });
  }

  deleteCliente(id: string): Promise<void> {
    const clienteDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(clienteDoc);
  }
}
