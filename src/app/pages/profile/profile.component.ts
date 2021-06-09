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

  /**
   * Metodo que obtiene el usuario
   */
  getUser(){
    this.user = this._usersService.getUser();
  }

  /**
   * Metodo que obtiene la lista de usuarios
   */
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

  /**
   * Abre el Modal del usuario
   * @param user 
   */
  openModal(user?: IUser){
    if(user){
      this.user = JSON.parse(JSON.stringify(user))
    }
    this.showModal = true;
  }

  /**
   * Cierra el Modal
   * @param showModal 
   */
  closeModal(showModal: boolean) {
    this.user = new User();
    this.showModal = showModal;
  }

  /**
   * Metodo que actualiza el usuario
   * @param user 
   */
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
        text: `User Actualizado.
        Para ver los cambios actualizados, reinicie sesion`,       
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
