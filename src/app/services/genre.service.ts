import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genres.model';

const baseUrl = 'https://library-application-backend.onrender.com/api/genres';
@Injectable({
    providedIn: 'root'
})
export class GenreService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Genre[]> {
        return this.http.get<Genre[]>(baseUrl);
    }

    get(id: any): Observable<Genre> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByName(title: any): Observable<Genre[]> {
        return this.http.get<Genre[]>(`${baseUrl}?title=${title}`); //name or title?
    }
}