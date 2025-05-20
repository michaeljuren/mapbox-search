import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapboxServiceService } from '../../services/mapbox-service.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-mapbox-search',
  standalone: false,
  templateUrl: './mapbox-search.component.html',
  styleUrl: './mapbox-search.component.css'
})
export class MapboxSearchComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<any>();

  searchTerm: string = '';
  searchResults: any[] = [];
  private searchTerms = new Subject<string>();
  isLoading: boolean = false;

  constructor(private mapboxService: MapboxServiceService) { }
  ngOnInit(): void {
    // Set up the search with debounce to avoid too many requests
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.isLoading = true;
        return this.mapboxService.search(term);
      })
    ).subscribe(results => {
      this.searchResults = results;
      this.isLoading = false;
    });
  }


   // Push a search term into the observable stream
  search(term: string): void {
    if (term.trim()) {
      this.searchTerms.next(term);
    } else {
      this.searchResults = [];
    }
  }

  onSearchChange(): void {
    this.search(this.searchTerm);

    // If search is cleared, emit null to clear the selected location
    if (!this.searchTerm.trim()) {
      this.locationSelected.emit(null);
    }
  }

  selectLocation(location: any): void {
    this.searchTerm = location.place_name;
    this.searchResults = [];
    this.locationSelected.emit(location);
  }

  clearSearch(): void {
  this.searchTerm = '';
  this.searchResults = [];
  this.locationSelected.emit(null);
}
}

