import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MoviesusersHttpService } from 'src/app/services/http/moviesusers-http.service';
import { MoviesUsers } from 'src/app/movie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public iduser: number = 0;
  public rates: MoviesUsers[] = [];

  constructor(
    private token: TokenStorageService,
    private MoviesusersHttpService: MoviesusersHttpService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.iduser = this.token.getUser().id;
    this.getMovieUsersById(this.iduser);
  }

    public getMovieUsersById(value: number) {
    this.MoviesusersHttpService.getMoviesUsersById(this.iduser).subscribe((s) => {
      s.forEach((src) => {
        this.rates.push({
          rate: src.rate,
          title: src.movie.title
        });
      });
    });
  }
}