import { MovieHttpService } from 'src/app/services/http/movie-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorsHttpService } from 'src/app/services/http/actors-http.service';
import { Movie } from 'src/app/movie';
import { MovieActor } from 'src/app/movie';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesusersHttpService } from 'src/app/services/http/moviesusers-http.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  public actors: MovieActor[] = [];
  public idmovie: number = 0;
  movie: Movie | undefined;
  movieTMP: any;
  isLoggedIn = false;
  username?: string;
  isRated: boolean = false;
  showThanks = false;
  private roles: string[] = [];

  starRating = 0;

  constructor(
    private route: ActivatedRoute,
    private actorHttpService: ActorsHttpService,
    private MovieHttpService: MovieHttpService,
    private tokenStorageService: TokenStorageService,
    private MoviesusersHttpService: MoviesusersHttpService
  ) {}

  ngOnInit(): void {
    this.idmovie = parseInt(this.route.snapshot.params['id']);
    this.getMovieActorsById(this.idmovie);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.getMovieUsersById();
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  /** Funkcja wyświetlająca obsadę danego filmu to przestało dziala*/
  public getMovieActorsById(value: number) {
    this.actorHttpService.getMovieActorsById(this.idmovie).subscribe((s) => {
      s.forEach((src) => {
        this.actors.push({
          nameActor: src.actor.nameActor,
          charactername: src.charactername,
        });
      });

      this.movie = new Movie(s[0].movie);
    });
  }

  saveRate() {
    this.MoviesusersHttpService.addRate(
      this.idmovie,
      this.starRating
    ).subscribe((s) => {
      this.MovieHttpService.update(this.idmovie,this.starRating).subscribe(ss => {
        this.isRated = true;
        this.showThanks = true;
      })
    });
  }

  public getMovieUsersById() {
    this.MoviesusersHttpService.getMoviesUsersById(
      this.tokenStorageService.getUser().id
    ).subscribe((s) => {
      s.forEach((movie) => {
        if (movie.movie.idmovie === this.idmovie) {
          this.isRated = true;
        }
      });
    });
  }
}
