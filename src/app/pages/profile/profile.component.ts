import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interfaces';
import { User } from 'src/app/models/models';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public showModal = false;

  public users: IUser[] = [];

  public user = new User();

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.user = this._usersService.getUser();
  }

  getUserList() {
    this._usersService.getUserList().subscribe(
      (resp) => {
        this.users = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(user?: IUser){
    if(user){
      this.user = JSON.parse(JSON.stringify(user))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.user = new User();
    this.showModal = showModal;
  }

  updateUser (user: IUser){
    const index = this.users.findIndex((p) => p.id == user.id);
    if (index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `User actualizado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.users.splice(index, 1, user);
      location.reload();
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `User creado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.users.push(user);
      this.getUser();
    }
  }

}
