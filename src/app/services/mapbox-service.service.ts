import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {
  private accessToken = environment.mapbox.accessToken;

  constructor(private http:HttpClient) { }

  search(query: string): Observable<any> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${this.accessToken}&autocomplete=true`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.features;
      })
    );
  }
  
}
