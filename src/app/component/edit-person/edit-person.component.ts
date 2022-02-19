import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  public person: Person = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  public personID: string;
  public loaded = false;

  disableBalanceOnAdd: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.personID = this.route.snapshot.params['id'];
    this.personService.getPerson(this.personID).subscribe((person) => {
      this.person = person;
      this.loaded = true;
    });
  }

  onSubmit(formValue) {
    const value = formValue.value;
    const valid = formValue.valid;

    if(!valid) {
      //Throw error valid
    } else {
      // Update person
      value.id = this.personID;
      this.personService.updatePerson(value);
      this.router.navigate(['/person/', this.personID]);
    }
  }



}
