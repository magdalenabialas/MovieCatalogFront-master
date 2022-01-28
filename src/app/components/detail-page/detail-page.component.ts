import { MovieHttpService } from 'src/app/services/http/movie-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorsHttpService } from 'src/app/services/http/actors-http.service';
import { Movie } from 'src/app/movie';
import { MovieActor } from 'src/app/movie';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private route: ActivatedRoute,
    private actorHttpService: ActorsHttpService,
    private MovieHttpService: MovieHttpService
  ) {}

  ngOnInit(): void {
    this.idmovie = this.route.snapshot.params['id'];
    this.getMovieActorsById(this.idmovie);
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
}
