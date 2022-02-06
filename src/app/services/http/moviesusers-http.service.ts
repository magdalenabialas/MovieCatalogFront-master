import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesusersHttpService {

  linkHttp = "http://localhost:9090/api/v1/moviesusers/"

  constructor(private httpClient:HttpClient) { }

  getMoviesUsersById(id:number):Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.linkHttp +"iduser/" + id);
  }
}
