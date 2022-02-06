export class Movie{
    idmovie: number;
    title: string;
    original_lang: string;
    release_date: Date;
    description: string;
    average_rate: number;
    vote_count: number;
    poster_path: string;
    director:string;
    genres:string;

    constructor(movie:any) {
       this.idmovie = movie.idmovie;
       this.title = movie.title;
       this.original_lang = movie.original_lang;
       this.release_date = movie.release_date;
       this.description = movie.description;
       this.average_rate = movie.average_rate;
       this.vote_count = movie.vote_count;
       this.poster_path = movie.poster_path;
       this.director = movie.movies_directors[0].nameDirector;
       this.genres = movie.movies_genres.map((s:any) => s.nameGenre).join(", ");
    }
}

export interface MovieActor {
    nameActor?: string;
    charactername?: string;
}

export interface MoviesUsers {
    rate?: number;
    title?: string;
}