import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesusersHttpService {
  linkHttp = 'http://localhost:9090/api/v1/moviesusers/';

  constructor(
    private httpClient: HttpClient, private token: TokenStorageService
  ) {}

  getMoviesUsersById(id: number): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.linkHttp + 'iduser/' + id);
  }
  addRate(idMovie: number, rate: number): Observable<any> {
    const userId = this.token.getUser().id;

    return this.httpClient.post<any>(this.linkHttp + 'add', {
      rate: rate,
      iduser: userId,
      idmovie: idMovie,
    });
  }
}
