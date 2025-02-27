import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BusyService {
  private messageSource = new Subject<boolean>();
  message$ = this.messageSource.asObservable();
  public isBusy = false;

  setBusy(message: boolean) {
    this.isBusy = message;
    this.messageSource.next(message);
  }
}
