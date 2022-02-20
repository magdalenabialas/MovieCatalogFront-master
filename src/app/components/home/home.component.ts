import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';;
import { Movie } from 'src/app/movie';
import { MovieHttpService } from 'src/app/services/http/movie-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort: string = '';
  public movies: Movie[] = [];
  public p: any;

  constructor(
    private MovieHttpService: MovieHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

    /** Funkcja wyświetlająca liste wszystkich filmów */
  public getMovies(): void {
    this.MovieHttpService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /** Funkcja filtrujaca filmy */
  filterMovies(value: string) {
    this.MovieHttpService.getMovies().subscribe((src) => {
      this.movies = src.filter((s) =>
        s.title.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  /** Pobieranie wszystkich filmow */
  restartFilterMovies() {
    this.getMovies();
  }

  sortMovie() {
    switch (this.sort) {
      case 'title A-Z':
        this.movies = this.movies.sort((a,b) => (a.title > b.title) ? 1 : -1);
        break;
      case 'top rated':
        this.movies = this.movies.sort((a,b) => (a.average_rate < b.average_rate) ? 1 : -1); 
        break;
      case 'title Z-A':
        this.movies = this.movies.sort((a,b) => (a.title < b.title) ? 1 : -1);
        break;
      case 'low rated':
        this.movies = this.movies.sort((a,b) => (a.average_rate > b.average_rate) ? 1 : -1); 
        break;
      case 'earliest released':
        this.movies = this.movies.sort((a,b) => (a.release_date > b.release_date) ? 1 : -1); 
        break;
      case 'latest released':
        this.movies = this.movies.sort((a,b) => (a.release_date < b.release_date) ? 1 : -1); 
        break;
      default:
        break;
    }
  }
}