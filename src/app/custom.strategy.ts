import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload === false ? of(null) : load();
  }
}
