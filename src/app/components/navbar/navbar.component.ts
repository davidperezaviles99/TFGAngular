import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  logout(){
    this._usersService.logout()
  }

  getUsers(){
    this.getUsers = this._usersService.getUser
  }
}
