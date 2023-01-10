import { Component, OnInit } from '@angular/core';
import {Movie} from "../model/movie";
import {MovieService} from "../services/movie/movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = []

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      movieFromApiDto => this.movies = movieFromApiDto.results
    )
  }

  getMovieByWordSearch(keyword: string){
    this.movieService.getMovieByWordSearch(keyword)
  }

}
