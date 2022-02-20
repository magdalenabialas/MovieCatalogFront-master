import { Movie } from '../../movie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MovieHttpService {
  linkHttp = 'http://localhost:9090/api/v1/movie';

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.linkHttp + '/all');
  }

  public getMoviesById(idmovie: number): Observable<Movie> {
    return this.http.get<Movie>(this.linkHttp + '/findidmovie/' + idmovie);
  }

  public update(idMovie: number, rate: number): Observable<any> {
  
    return this.http.put<any>(this.linkHttp + `/update/${idMovie}/${rate}`, undefined);
  }
}
