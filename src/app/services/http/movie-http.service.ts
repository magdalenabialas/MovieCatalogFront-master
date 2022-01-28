import { Movie } from '../../movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieHttpService {
  linkHttp = "http://localhost:9090/api/v1/movie"


  constructor(private http: HttpClient) {}

  public getAll(params: any): Observable<any> {
    return this.http.get<any>(this.linkHttp, { params });
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.linkHttp + "/all");

  }
 // dobra zacznijmy od tego, moze to jednak glupie, ze nie wiem jak pobrac atrybuty filmu do templatki pagedetail, aby sie wyswietlalo dynamicznie
}
 