import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  Logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.openSnackBar("logged out succefully")
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar(err.message);
      }
    });
  }

  showSnackBar: boolean = false;
  snackbarMessage: string = "";
  openSnackBar(msg: string) {
    this.showSnackBar = true;
    this.snackbarMessage = msg;
    setTimeout(() => this.showSnackBar = false, 3000);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
