import { Movie } from '../../movie';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({ providedIn: 'root' })
export class MovieHttpService {
  linkHttp = 'http://localhost:9090/api/v1/movie';

  constructor(private http: HttpClient) {}

  public getAll(params: any): Observable<any> {
    return this.http.get<any>(this.linkHttp, { params });
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.linkHttp + '/all');
  }

  public getMoviesById(idmovie: number): Observable<Movie> {
    return this.http.get<Movie>(this.linkHttp + '/findidmovie/' + idmovie);
  }

  update(idMovie: number, rate: number): Observable<any> {
    const params = new HttpParams();
    params.set('id', idMovie);
    params.set('rate', rate);

    return this.http.get<any>(this.linkHttp + `/update/${idMovie}/${rate}`);
  }
}
