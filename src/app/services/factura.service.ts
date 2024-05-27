import { Injectable } from '@angular/core';
import { Factura } from '../domain/factura';
import { Firestore, collectionData, docData, collection, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { DocumentReference, CollectionReference } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private collectionName = 'facturas';
  private collectionRef: CollectionReference<Factura>;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, this.collectionName) as CollectionReference<Factura>;
  }

  getFacturas(): Observable<Factura[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Factura[]>;
  }

  getFactura(id: string): Observable<Factura> {
    const facturaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(facturaDoc, { idField: 'id' }) as Observable<Factura>;
  }

  addFactura(factura: Factura): Promise<DocumentReference<Factura>> {
    return addDoc(this.collectionRef, factura);
  }

  updateFactura(id: string, factura: Factura): Promise<void> {
    const facturaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(facturaDoc, { ...factura });
  }

  deleteFactura(id: string): Promise<void> {
    const facturaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(facturaDoc);
  }
}
