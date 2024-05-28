import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, doc, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { Auth, signOut, UserCredential } from '@angular/fire/auth';
import { from, Observable, of, switchMap} from 'rxjs';
import { Cliente } from '../domain/cliente';
import { Administrador } from '../domain/administrador';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // private clientesCollection: CollectionReference<DocumentData>;
  // private administradoresCollection: CollectionReference<DocumentData>;

  // constructor(private firestore: Firestore, private auth: Auth) {
  //   this.clientesCollection = collection(this.firestore, 'clientes');
  //   this.administradoresCollection = collection(this.firestore, 'administradores');
  // }

  // private findPasswordByUsername(collection: CollectionReference<DocumentData>, username: string): Observable<string | null> {
  //   const q = query(collection, where('usuario', '==', username));
  //   return from(getDocs(q)).pipe(
  //     switchMap(snapshot => {
  //       if (snapshot.empty) {
  //         return of(null);
  //       } else {
  //         const userDoc = snapshot.docs[0].data() as { contrasena: string };
  //         return of(userDoc.contrasena);
  //       }
  //     })
  //   );
  // }

  // login(usuario: string, contrasena: string): Observable<UserCredential | null> {
  //   return this.findPasswordByUsername(this.clientesCollection, usuario).pipe(
  //     switchMap(password => {
  //       if (password === contrasena) {
  //         return of({ user: { uid: 'cliente_uid' } } as UserCredential);
  //       } else {
  //         return this.findPasswordByUsername(this.administradoresCollection, usuario).pipe(
  //           switchMap(adminPassword => {
  //             if (adminPassword === contrasena) {
  //               return of({ user: { uid: 'admin_uid' } } as UserCredential);
  //             } else {
  //               return of(null);
  //             }
  //           })
  //         );
  //       }
  //     })
  //   );
  // }

  // logout(): Observable<void> {
  //   return from(signOut(this.auth));
  // }

  // registerCliente(cliente: Cliente): Observable<void> {
  //   const docRef = doc(this.clientesCollection);
  //   cliente.id = docRef.id;
  //   return from(setDoc(docRef, cliente));
  // }

  // registerAdministrador(admin: Administrador): Observable<void> {
  //   const docRef = doc(this.administradoresCollection);
  //   admin.id = docRef.id;
  //   return from(setDoc(docRef, admin));
  // }

  // register(nombre: string, email: string, usuario: string, contrasena: string, tipoUsuario: string): Observable<UserCredential> {
  //   return from(createUserWithEmailAndPassword(this.auth, email, contrasena).then(userCredential => {
  //     const user = {
  //       uid: userCredential.user.uid,
  //       nombre,
  //       email,
  //       usuario,
  //       contrasena
  //     };

  //     if (tipoUsuario === 'cliente') {
  //       const docRef = doc(this.clientesCollection, user.uid);
  //       return setDoc(docRef, user).then(() => userCredential);
  //     } else {
  //       const docRef = doc(this.administradoresCollection, user.uid);
  //       return setDoc(docRef, user).then(() => userCredential);
  //     }
  //   }));
  // }



  private clientesCollection: CollectionReference<DocumentData>;
  private administradoresCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.clientesCollection = collection(this.firestore, 'clientes');
    this.administradoresCollection = collection(this.firestore, 'administradores');
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  registerCliente(cliente: Cliente): Observable<void> {
    const docRef = doc(this.clientesCollection, cliente.id);
    return from(setDoc(docRef, cliente));
  }

  registerAdministrador(admin: Administrador): Observable<void> {
    const docRef = doc(this.administradoresCollection, admin.id);
    return from(setDoc(docRef, admin));
  }

  register(nombre: string, email: string, usuario: string, contrasena: string, tipoUsuario: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, contrasena)).pipe(
      switchMap(userCredential => {
        const user = {
          uid: userCredential.user.uid,
          nombre,
          email,
          usuario,
          contrasena
        };

        if (tipoUsuario === 'cliente') {
          const docRef = doc(this.clientesCollection, user.uid);
          return from(setDoc(docRef, user)).pipe(
            switchMap(() => of(userCredential))
          );
        } else {
          const docRef = doc(this.administradoresCollection, user.uid);
          return from(setDoc(docRef, user)).pipe(
            switchMap(() => of(userCredential))
          );
        }
      })
    );
  }

  login(email: string, contrasena: string): Observable<UserCredential | null> {
    return from(signInWithEmailAndPassword(this.auth, email, contrasena)).pipe(
      switchMap(userCredential => {
        if (userCredential) {
          const uid = userCredential.user.uid;
          const userDocRef = doc(this.clientesCollection, uid);
          return from(getDoc(userDocRef)).pipe(
            switchMap(docSnap => {
              if (docSnap.exists()) {
                return of(userCredential);
              } else {
                const adminDocRef = doc(this.administradoresCollection, uid);
                return from(getDoc(adminDocRef)).pipe(
                  switchMap(adminSnap => {
                    if (adminSnap.exists()) {
                      return of(userCredential);
                    } else {
                      return of(null);
                    }
                  })
                );
              }
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
}