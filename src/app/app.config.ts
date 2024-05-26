import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"proyectointerciclo-9b608","appId":"1:496817323580:web:70a600906732f3888a8d39","storageBucket":"proyectointerciclo-9b608.appspot.com","apiKey":"AIzaSyDGNMQyP9CmnlXa6RNbKi3_38r3_7vtE0w","authDomain":"proyectointerciclo-9b608.firebaseapp.com","messagingSenderId":"496817323580"})), provideFirestore(() => getFirestore())]
};
