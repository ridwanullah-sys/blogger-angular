import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private ui: string = 'create';
  private subject = new Subject<any>();

  constructor() {}

  setUi(ui: string) {
    this.ui = ui;
    this.subject.next(this.ui);
  }

  getUi(): Observable<string> {
    return this.subject.asObservable();
  }
}
