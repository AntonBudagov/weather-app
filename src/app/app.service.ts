import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiKey = '9c979471ac2ddceb26ede287659e5f19';
  constructor(private http: HttpClient) {
  }

  public get(pathName: string, cnt?: string, units?: string, name?: string, params?) {
    params = new HttpParams()
      .append('APPID', this.apiKey)
      .append('cnt', cnt || '1')
      .append('units', units || '')
      .append('q', name || 'Dnipropetrovsk')
    return this.http.get(pathName, {params: params}).pipe(
      catchError(this.handleError('get', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('AppService', message);
    // this.messageService.add('HeroService: ' + message);
  }
}
