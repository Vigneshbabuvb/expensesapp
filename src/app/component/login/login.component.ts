import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // If already authenticated go to dashboards page
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onLogin() {
    this.authService.login(this.email, this.password)
    .then(() => {
      this.router.navigate(['/'])
    })
    .catch(() => {
      // Show Error message
    })
  }
}
