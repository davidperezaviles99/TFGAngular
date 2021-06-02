import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuard implements CanActivate {
  
  constructor(
    private _usersService: UsersService,
    private _router: Router) {}
  
  canActivate() {
    const user = this._usersService.getUser()

    if(user.role === 'Profesor') {
      return true;
    } else {
      this._router.navigateByUrl('/home')
      return false;
    }

  }
  
}