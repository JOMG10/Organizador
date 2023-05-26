import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QuerySnapshot
} from "@angular/fire/compat/firestore";
import {combineLatest, map, Observable} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore,private afAuth: AngularFireAuth) { }
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

  //CALCULAR LA SUMA DE LA VENTA
  sumarPreciosDocumentos(path:string,id:string,pathV:string,iva:number, subtotal:number) {
    let totalSuma = 0;

    this.firestore
      .collection(path)
      .get()
      .subscribe((snapshot) => {
        snapshot.forEach((doc) => {
          const precio = (doc.data() as any).precio;
           iva += precio*.16;
           subtotal +=precio
          totalSuma = subtotal + iva;
        });
        // Guardar la suma en otro documento
        this.guardarSumaEnDocumento(totalSuma,id,pathV, iva, subtotal);
      });
  }



  obtenerCampoDeColeccion(collectionName: string, documentId: string) {
    return this.firestore
      .collection(collectionName)
      .doc(documentId)
      .get();
  }
  guardarSumaEnDocumento(totalSuma: number,id:string,pathV:string, iva:number, subtotal:number) {

    this.firestore
      .collection(pathV)
      .doc(id)
      .set({ total: totalSuma,
        fecha: new Date(),
        iva:iva,
        subtotal:subtotal

        })
      .then(() => {
        console.log('Suma almacenada correctamente en el documento.');
      })
      .catch((error) => {
        console.error('Error al almacenar la suma:', error);
      });
  }

  //calcular suma carrito

  guardarSuma(path: string, id: string) {
    const docRef = this.firestore.collection(path).doc(id);

    docRef.ref.get().then((doc) => {
      const campoActual = (doc.data() as any).campo || 0;
      const nuevaSuma = campoActual + 1;

      docRef.update({campo: nuevaSuma})
    });
  }
  guardarResta(path: string, id: string) {
    const docRef = this.firestore.collection(path).doc(id);

    docRef.ref.get().then((doc) => {
      const campoActual = (doc.data() as any).campo || 0;
      const nuevaSuma = campoActual - 1;

      docRef.update({campo: nuevaSuma})
    });
  }
  cambiar(path:string,id:string) {
    this.firestore
      .collection(path)
      .doc(id)
      .set({
        campo: 0
      })
  }

/*

//metodo para realizar la busqueda
  search(query: string, path:string,path2:string, path3:string,path4:string,path5:string,
         path6:string, path7:string,path8:string): Observable<any[]> {
    const collection1Ref = this.firestore.collection(path);
    const collection2Ref = this.firestore.collection(path2);
    const collection3Ref = this.firestore.collection(path3);
    const collection4Ref = this.firestore.collection(path4);
    const collection5Ref = this.firestore.collection(path5);
    const collection6Ref = this.firestore.collection(path6);
    const collection7Ref = this.firestore.collection(path7);
    const collection8Ref = this.firestore.collection(path8);

    const collection1Data: Observable<any[]> = collection1Ref.valueChanges();
    const collection2Data: Observable<any[]> = collection2Ref.valueChanges();
    const collection3Data: Observable<any[]> = collection3Ref.valueChanges();
    const collection4Data: Observable<any[]> = collection4Ref.valueChanges();
    const collection5Data: Observable<any[]> = collection5Ref.valueChanges();
    const collection6Data: Observable<any[]> = collection6Ref.valueChanges();
    const collection7Data: Observable<any[]> = collection7Ref.valueChanges();
    const collection8Data: Observable<any[]> = collection8Ref.valueChanges();

    return combineLatest([collection1Data, collection2Data,collection3Data,collection4Data,collection5Data,
      collection6Data,collection7Data,collection8Data]).pipe(
      map(([collection1Docs, collection2Docs, collection3Docs, collection4Docs,collection5Docs,
             collection6Docs, collection7Docs, collection8Docs]) => {
        const combinedCollection = [...collection1Docs, ...collection2Docs, ...collection3Docs,
          ...collection4Docs,...collection5Docs,...collection6Docs,...collection7Docs,
          ...collection8Docs];

        const searchResults = combinedCollection.filter((item) => {
          // Reemplaza 'name' por el campo en el que deseas realizar la búsqueda
          return item['descripcion'].toLowerCase().includes(query.toLowerCase());
        });

        return searchResults;
      })
    );
  }
*/

  search(query: string, ...paths: string[]): Observable<any[]> {
    const observables = paths.map((path) => {
      const collectionRef = this.firestore.collection(path);
      return collectionRef.valueChanges();
    });

    return combineLatest(observables).pipe(
      map((collections) => {
        const combinedCollection = collections.reduce((acc, curr) => acc.concat(curr), []);

        const searchResults = combinedCollection.filter((item) => {
          const descripcion = item['categoria'];
          return descripcion && descripcion.toLowerCase().includes(query.toLowerCase());
        });

        return searchResults;
      })
    );
  }

  //***********************************************************************************************************/
  getData(path:string): Observable<any> {
    const collectionRef: AngularFirestoreCollection<any> = this.firestore.collection(path);

    return collectionRef.valueChanges();
  }
    getRandomDocumentFromCollection(collectionName: string): Observable<any> {
    const collectionRef: AngularFirestoreCollection<any> = this.firestore.collection(collectionName);

    return collectionRef.snapshotChanges().pipe(
      map((snapshot) => {
        if (snapshot.length === 0) {
          return null;
        }
        const randomIndex = Math.floor(Math.random() * snapshot.length);
        return snapshot[randomIndex].payload.doc.data();
      })
    );
  }

  //comienzo de validacion de usuarios
  getUserByEmail(nombre: string, contrasena: string, path: string): Promise<QuerySnapshot<any>> {
    return this.firestore.collection(path, ref => ref.where('nombre', '==', nombre).where('contrasena', '==', contrasena)).get().toPromise();
  }

  private userData: any; // Variable privada para almacenar los datos del usuario

  clearUserData(): void {
    this.userData = null;
  }

  copyDocumentByName(originalCollection: string, destinationCollection: string, nombre: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection(originalCollection, ref => ref.where('nombre', '==', nombre))
        .get()
        .subscribe((querySnapshot) => {
          if (!querySnapshot.empty) {
            const originalDocument = querySnapshot.docs[0];
            const originalDocumentId = originalDocument.id;
            const data = originalDocument.data();
            const newDocumentId = this.firestore.createId();

            this.firestore
              .doc(`${destinationCollection}/${newDocumentId}`)
              .set(data)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject('No se encontró un documento con ese nombre');
          }
        });
    });
  }


}
