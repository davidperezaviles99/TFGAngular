import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: IUser;

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.getUser()
  }

  logout(){
    this._usersService.logout()
  }

  getUser(){
    this.user = this._usersService.getUser();
  }
}
