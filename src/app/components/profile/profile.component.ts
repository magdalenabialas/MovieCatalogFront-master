import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MoviesusersHttpService } from 'src/app/services/http/moviesusers-http.service';
import { Movie, MoviesUsers } from 'src/app/movie';
import { MovieHttpService } from 'src/app/services/http/movie-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public iduser: number = 0;
  public rates: MoviesUsers[] = [];
  public number_of_rates: number = 0;
  public recco_message: any = false;
  public idmoviereko1: number = 0;
  public idmoviereko2: number = 0;
  movies: Movie[] = [];

  constructor(
    private token: TokenStorageService,
    private MoviesusersHttpService: MoviesusersHttpService,
    private movieHttpService: MovieHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.iduser = this.token.getUser().id;
    this.idmoviereko1 = this.token.getUser().reccoMovie1;
    this.idmoviereko2 = this.token.getUser().reccoMovie2;
    this.getMovieUsersById(this.iduser);
    this.getReccommendMovie(this.idmoviereko1);
    this.getReccommendMovie(this.idmoviereko2);
  }

  findInRatedMovies(movie: Movie): boolean {
    return !this.rates.some(({idmovie}) => idmovie === movie.idmovie)
  }
  findAnyInRatedMovies(): boolean {
    return this.movies.some(movie => this.findInRatedMovies(movie))
  }
  

  public getMovieUsersById(value: number) {
    this.MoviesusersHttpService.getMoviesUsersById(this.iduser).subscribe(
      (s) => {
        s.forEach((src) => {
          this.rates.push({
            rate: src.rate,
            title: src.movie.title,
            idmovie: src.movie.idmovie
          });
        });

        if (this.rates.length >= 3) {
          this.recco_message = true;
        }
      }
    );
  }
  getReccommendMovie(id: number) {
    this.movieHttpService.getMoviesById(id).subscribe((src) => {
      this.movies.push(src);
    });
  }
}
