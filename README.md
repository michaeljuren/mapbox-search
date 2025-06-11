# Mapbox Search

An Angular application that integrates Mapbox functionality for interactive mapping and location search features.

## Prerequisites

- Node.js (version 18.x or higher recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)
- Mapbox API key (Get one at [mapbox.com](https://www.mapbox.com/))

## Installation

1. Clone this repository
   ```bash
   git clone https://github.com/michaeljuren/mapbox-search.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Mapbox API key (see Configuration section)

## Configuration

Add your Mapbox API key to the environment file at `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  mapboxAccessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
};
```

## Development

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Building

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run e2e
```

## Features

- Interactive maps powered by Mapbox
- Location search functionality
- [Add other features specific to your implementation]

## Technologies

- Angular 19.0.7
- TypeScript
- Mapbox GL JS
- Mapbox Search API

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

