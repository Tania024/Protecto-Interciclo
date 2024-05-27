import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, setDoc, doc, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { Auth, signOut, UserCredential } from '@angular/fire/auth';
import { from, Observable, of, switchMap, map } from 'rxjs';
import { Cliente } from '../domain/cliente';
import { Administrador } from '../domain/administrador';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private clientesCollection: CollectionReference<DocumentData>;
  private administradoresCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.clientesCollection = collection(this.firestore, 'clientes');
    this.administradoresCollection = collection(this.firestore, 'administradores');
  }

  private findPasswordByUsername(collection: CollectionReference<DocumentData>, username: string): Observable<string | null> {
    const q = query(collection, where('usuario', '==', username));
    return from(getDocs(q)).pipe(
      switchMap(snapshot => {
        if (snapshot.empty) {
          return of(null);
        } else {
          const userDoc = snapshot.docs[0].data() as { contrasena: string };
          return of(userDoc.contrasena);
        }
      })
    );
  }

  login(usuario: string, contrasena: string): Observable<UserCredential | null> {
    return this.findPasswordByUsername(this.clientesCollection, usuario).pipe(
      switchMap(password => {
        if (password === contrasena) {
          return of({ user: { uid: 'cliente_uid' } } as UserCredential);
        } else {
          return this.findPasswordByUsername(this.administradoresCollection, usuario).pipe(
            switchMap(adminPassword => {
              if (adminPassword === contrasena) {
                return of({ user: { uid: 'admin_uid' } } as UserCredential);
              } else {
                return of(null);
              }
            })
          );
        }
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  registerCliente(cliente: Cliente): Observable<void> {
    const docRef = doc(this.clientesCollection);
    cliente.id = docRef.id;
    return from(setDoc(docRef, cliente));
  }

  registerAdministrador(admin: Administrador): Observable<void> {
    const docRef = doc(this.administradoresCollection);
    admin.id = docRef.id;
    return from(setDoc(docRef, admin));
  }
}