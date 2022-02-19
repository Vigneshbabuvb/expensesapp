import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  public personID: string | null = null;
  public person: Person;
  public loaded = false;
  public showBalanceEditForm: boolean = false;

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

  onClickDelete() {
    this.personService.deletePerson(this.person);
    this.router.navigate(['/']);
  }

  updatePerson() {
    this.showBalanceEditForm = !this.showBalanceEditForm;
    this.personService.updatePerson(this.person);
  }

}
