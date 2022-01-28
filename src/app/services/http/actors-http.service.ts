import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsHttpService {

linkHttp = "http://localhost:9090/api/v1/moviesactors/"

  constructor(private httpClient:HttpClient) { }

  getMovieActorsById(id:number):Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.linkHttp +"idmovie/" + id);
  }
}
