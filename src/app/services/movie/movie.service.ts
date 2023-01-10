import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {MovieFromApiDto} from "../../model/movieFromApiDto";
import {Movie} from "../../model/movie";
import * as stream from "stream";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKeyQueryParam: string = "?api_key=b9e250836c77731e4daa1e7f4714d416";

  baseUrl:string ="https://api.themoviedb.org/3";
  constructor(private http: HttpClient) {
  }
  getPopularMovies(): Observable<MovieFromApiDto>{
    let fullUrl: string = this.baseUrl + "/movie/popular" + this.apiKeyQueryParam;
    return this.http.get<MovieFromApiDto>(fullUrl).pipe(
      catchError(this.handleError<MovieFromApiDto>("getMovies"))
    );
  }

  getMovieByWordSearch(keyword: string): Observable<MovieFromApiDto>{
    let fullUrl: string = this.baseUrl + `/search/movie?q=${keyword}`;
    fullUrl = `${this.baseUrl}/search/movie${this.apiKeyQueryParam}&language=fr&page=1&query=${keyword}`;

    return this.http.get<MovieFromApiDto>(fullUrl).pipe(
      catchError(this.handleError<MovieFromApiDto>("getMovies"))
    );
  }

  getMovieById(id:number): Observable<Movie>{
    let fullUrl = this.baseUrl+`/movie/${id}` + this.apiKeyQueryParam + "&language=fr";
    return this.http.get<Movie>(fullUrl).pipe(
      catchError(this.handleError<Movie>("getMovieById"))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
