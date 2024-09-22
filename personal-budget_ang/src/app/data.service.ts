import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getBudgetData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/budget`);
  }
}
