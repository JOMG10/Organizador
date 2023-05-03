import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import * as path from "path";
import {QueryFn} from "@angular/fire/compat/firestore/interfaces";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore/collection/collection";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }
  creatDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
  copyCollection(path : string, pathDestino:string) {
    const sourceCollection = this.firestore.collection(path).ref;
    const targetCollection = this.firestore.collection(pathDestino).ref;

    sourceCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        targetCollection.doc(doc.id).set(data);
      });
    });
  }

  getDoc(path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection =this.firestore.collection(path);
    return collection.doc(id).delete();
  }
  deleteCollection(path:string) {
    const collectionRef = this.firestore.collection(path).ref;
    collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }
  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
    return this.firestore.createId();
  }
  getCollection<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  agregarColeccion(nuevoDato:number, path:string, documento:string){
    this.firestore
      .collection(path)
      .doc(documento)
      .update({ campo: nuevoDato })
  }

  copiarDocumento(id_documento:string,coleccionOrigen:string,coleccionDestino:string) {
    const documentoId = id_documento; // Reemplaza con el ID del documento que deseas copiar
    const origenColeccion = coleccionOrigen; // Reemplaza con el nombre de la colección de origen
    const destinoColeccion = coleccionDestino; // Reemplaza con el nombre de la colección de destino

    const origenDocumentoRef = this.firestore.collection(origenColeccion).doc(documentoId);
    const destinoDocumentoRef = this.firestore.collection(destinoColeccion).doc(documentoId);

    origenDocumentoRef.get().subscribe(documento => {
      if (documento.exists) {
        const data = documento.data();
        destinoDocumentoRef.set(data);
      }
    });
  }

}
