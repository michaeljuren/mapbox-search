import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mapbox-search';
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  selectedLocation: any = null;
  marker: mapboxgl.Marker | undefined;

   @ViewChild('mapContainer') mapContainer: ElementRef | undefined;
   mapInitialized = false;

  constructor() {
    // Set the access token for the Mapbox GL instance
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
  }

  onLocationSelected(location: any) {
    this.selectedLocation = location;

    // If location is null or empty, clear the map
    if (!location || !location.center) {
      return;
    }

    // Use Angular's change detection cycle to ensure the map container is ready
    setTimeout(() => {
      this.initOrUpdateMap(location);
    });
  }
  initOrUpdateMap(location: any) {
    if (!this.map) {
      this.initializeMap(location);
    } else {
      // Update existing map
      this.map.flyTo({
        center: location.center,
        zoom: 14
      });

      // Update marker position
      if (this.marker) {
        this.marker.remove();
      }

      this.marker = new mapboxgl.Marker()
        .setLngLat(location.center)
        .addTo(this.map);
    }
  }

  initializeMap(location: any) {
    try {
      // Check if map container exists in DOM
      if (!document.getElementById('map')) {
        console.error('Map container not found');

        // Wait for next change detection cycle and try again
        setTimeout(() => {
          this.initializeMap(location);
        }, 100);
        return;
      }

      // Initialize the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: location.center
      });

      // Add navigation controls and listen for map load
      this.map.on('load', () => {
        this.mapInitialized = true;
        console.log('Map loaded successfully');
      });

      this.map.addControl(new mapboxgl.NavigationControl());

      // Add marker at selected location
      this.marker = new mapboxgl.Marker()
        .setLngLat(location.center)
        .addTo(this.map);

      // Handle errors
      this.map.on('error', (e) => {
        console.error('Mapbox error:', e);
      });
    } catch (error) {
      console.error('Error initializing Mapbox map:', error);
    }
  }
}
