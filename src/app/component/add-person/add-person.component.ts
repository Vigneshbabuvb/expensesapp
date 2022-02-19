import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  public person: Person = {
    id: '',
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
    balance: 0
  };

  @ViewChild('personForm') personForm: any;
  public disableBalanceOnAdd: boolean = true;
  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formValue: NgForm) {
    const value = formValue.value;
    const valid = formValue.valid;
    // We need to manually add balance as 0 if it is disabled
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(valid) {
      // Add new person
      this.personService.addPerson(value);
      // Show success message
      // Route to dashboard
      this.router.navigate(['/']);
    } else {
      // Show warning message
    }
  }
}
