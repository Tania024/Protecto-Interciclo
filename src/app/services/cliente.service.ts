import { Injectable } from '@angular/core';
import { Cliente } from '../domain/cliente';
import { Observable, map } from 'rxjs';
import { DocumentReference, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private firestore: Firestore) { }

  getClientes(): Observable<Cliente[]> {
    return this.firestore.collection<Cliente>('clientes').valueChanges({ idField: 'id' });
  }

  getCliente(id: string): Observable<Cliente> {
    return this.firestore.doc<Cliente>(`clientes/${id}`).valueChanges({ idField: 'id' });
  }

  addCliente(cliente: Cliente): Promise<DocumentReference> {
    return this.firestore.collection<Cliente>('clientes').add(cliente);
  }

  updateCliente(id: string, cliente: Cliente): Promise<void> {
    delete cliente.id; // Remove id field from object
    return this.firestore.doc<Cliente>(`clientes/${id}`).update(cliente);
  }

  deleteCliente(id: string): Promise<void> {
    return this.firestore.doc<Cliente>(`clientes/${id}`).delete();
  }
}
