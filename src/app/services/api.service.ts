import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, ICat, IListCatResponse } from '../data/cat.interfacel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('auth_token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json',
      'x-api-key': environment.apiKey
    });
  }
  getAllImages(page: number = 0, size: number = 10): Observable<IListCatResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<IListCatResponse>>(`${this.baseUrl}/api/cats`, { params, headers: this.getHeaders() }).pipe(
      map(response => {
        return response.data;
      },
        catchError(error => {
          console.error('Error fetching cat images:', error);
          return throwError(() => new Error('Failed to fetch cat images. Please try again later.'));
        })
      ));
  }
  uploadImage(file: File): Observable<ICat> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<ApiResponse<ICat>>(
      `${this.baseUrl}/api/cats`,
      formData,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => {
        return response.data;
      }),
      catchError(error => {
        console.error('Upload error:', error);
        return throwError(() => new Error(
          error.error?.message || error.message || 'Upload failed'
        ));
      })
    );
  }

  deleteImage(id: string): Observable<string> {
    return this.http.delete<ApiResponse<string>>(
      `${this.baseUrl}/api/cats/delete/` + id,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => {
        return response.data;
      }),
      catchError(error => {
        console.error('Delete error:', error);
        return throwError(() => new Error(
          error.error?.message || error.message || 'Delete failed'
        ));
      })
    );
  }
  uploadDataCat(body: any): Observable<ICat> {
    return this.http.post<ApiResponse<ICat>>(`${this.baseUrl}/api/cats/insert`, body, { headers: this.getHeaders() }).pipe(
      map(response => {
        return response.data;
      }),
      catchError(error => {
        console.error('Delete error:', error);
        return throwError(() => new Error(
          error.error?.message || error.message || 'Delete failed'
        ));
      })
    );
  }

}
