import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async get(item:string)
  {    
    return sessionStorage.getItem(item)
  }

  async set(name:string,value:string)
  {
    return sessionStorage.setItem( name , value )
  }

  async remove(item:string)
  {
    return sessionStorage.removeItem(item)
  }
}
