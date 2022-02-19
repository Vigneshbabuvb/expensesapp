import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public persons: Observable<Person[]>;
  public person: Observable<Person>;
  public personsCollection: AngularFirestoreCollection<Person>;
  public personDoc: AngularFirestoreDocument<Person>;

  constructor(private afs: AngularFirestore) {
    this.personsCollection = this.afs.collection('persons', ref => ref.orderBy('firstName', 'asc'));
  }

  getPersons(): Observable<Person[]> {
    this.persons = this.personsCollection.snapshotChanges().pipe(
      map((changes: any[]) => changes.map(action => {
        const data = action.payload.doc.data() as Person;
        data.id = action.payload.doc.id;
        return data;
      }))
    );
    return this.persons;
  }

  addPerson(person: Person) {
    this.personsCollection.add(person);
  }

  getPerson(id: string): Observable<Person> {
    this.personDoc = this.afs.doc<Person>(`persons/${id}`);
    this.person = this.personDoc.snapshotChanges().pipe(map(action => {
      const data = action.payload.data() as Person;
      data.id = action.payload.id;
      return data;
    }));
    return this.person;
  }

  updatePerson(person: Person) {
    this.personDoc = this.afs.doc(`persons/${person.id}`);
    this.personDoc.update(person);
  }

  deletePerson(person: Person) {
    this.personDoc = this.afs.doc(`persons/${person.id}`);
    this.personDoc.delete();
  }
}
