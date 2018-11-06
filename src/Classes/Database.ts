// Database.ts
import firebaseImport = require('firebase/app');
import { DatabaseInterface, DocumentInterface } from '../Interfaces';

export class Database implements DatabaseInterface {

  private firestore: firebaseImport.firestore.Firestore;

  /**
   * Database construct
   * @param firestore Firebase Firestore Database
   */
  constructor(firestore: firebaseImport.firestore.Firestore) {
    this.firestore = firestore;
    this.firestore.settings({timestampsInSnapshots: true});
  }

  /**
   * Save a new bin
   *
   * @param  collection Where the document will be saved
   * @param  data       The bin information
   * @return            A promise that resolves to an ID
   */
  async create(collection: string, data: DocumentInterface): Promise<string> {
    return this.firestore.collection(collection).add(data).then((docref) => {
      return docref.id;
    });
  }

  /**
   * Retrieve a Document from a Collection
   * @param  collection Where the document is saved
   * @param  doc        The document ID
   * @return            A snapshot of a document
   */
  async retrieve(collection: string, doc: string): Promise<firebaseImport.firestore.DocumentSnapshot> {
    const docref = this.firestore.collection(collection).doc(doc);
    return docref.get().then((docsnapshot) => {
      if(docsnapshot.exists) {
        // @TODO have it return a DocumentInterface type
        return docsnapshot;
      }
    });
  }

  // @NOTE this isn't used yet
  update(collection: string, doc: string, data: DocumentInterface): void {
    const docref = this.firestore.collection(collection).doc(doc);
    docref.set(data);
  }

  // @NOTE this isn't used yet
  delete(collection: string, doc: string): void {
    const docref = this.firestore.collection(collection).doc(doc);
    docref.delete();
  }
}
