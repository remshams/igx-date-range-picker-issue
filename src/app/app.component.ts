import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { DateRange } from 'igniteui-angular';
import { interval, Observable } from 'rxjs';
import { scan, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /**
   * When changing the "Default" the initial disabled value is reflected.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  range: DateRange = {
    start: new Date(),
    end: new Date(new Date().getTime() + 86400000),
  };

  disabled$: Observable<boolean>;

  constructor(ref: ChangeDetectorRef) {
    // requestAnimationFrame(() => {
    //   ref.detectChanges();
    // });
    this.disabled$ = this.setupDisabled();
  }

  setupDisabled(): Observable<boolean> {
    return interval(4000).pipe(
      scan((disabled) => !disabled, true as boolean),
      tap((disabled) => console.log(disabled)),
      startWith(true)
    );
  }
}
