import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  public persons: Person[];
  public totalOwed: number;
  constructor(private personService: PersonService) {
    this.persons = [];
    this.totalOwed = 0;
  }

  ngOnInit(): void {
    this.personService.getPersons().subscribe(persons => {
      this.persons = persons;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.persons.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

}
