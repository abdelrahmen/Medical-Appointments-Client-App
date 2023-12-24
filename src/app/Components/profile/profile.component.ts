import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserDTO } from 'src/app/ViewModels/UserVM';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userDTO?: UserDTO;

  constructor(private authService: AuthService) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserData().subscribe({
      next: (res) => {
        console.log(res)
        this.userDTO = res;
      },
      error: (err)=>{
        this.openSnackBar(err.error.error);
      }
    })
  }

  showSnackBar: boolean = false;
  snackbarMessage: string = "";
  openSnackBar(msg: string) {
    this.showSnackBar = true;
    this.snackbarMessage = msg;
    setTimeout(() => this.showSnackBar = false, 3000);
  }
}
