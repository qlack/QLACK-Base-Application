import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {BusyService} from '../service/busy.service';

@Directive({
  selector: '[busyButton]'
})
export class BusyButtonDirective implements OnDestroy, AfterViewInit {
  private busySubscription: Subscription;
  private originalButtonHTML?: string;
  private originalButtonBackgroundColor?: string;
  private originalButtonForegroundColor?: string;

  constructor(private el: ElementRef<HTMLButtonElement>, private busyService: BusyService) {
    this.busySubscription = this.busyService.message$.subscribe(
      (msg) => {
        if (msg) {
          this.el.nativeElement.innerHTML = "<i class=\"fa fa-rotate fa-spin fa-arrow-right\"></i>";
          this.el.nativeElement.disabled = true;
          this.el.nativeElement.style.backgroundColor = "#252628";
          this.el.nativeElement.style.color = "#ffffff";
        } else {
          this.el.nativeElement.innerHTML = this.originalButtonHTML!;
          this.el.nativeElement.style.backgroundColor = this.originalButtonBackgroundColor!;
          this.el.nativeElement.style.color = this.originalButtonForegroundColor!;
          this.el.nativeElement.disabled = false;
        }
      });
  }

  ngAfterViewInit(): void {
    this.originalButtonHTML = this.el.nativeElement.innerHTML;
    this.originalButtonBackgroundColor = this.el.nativeElement.style.backgroundColor;
    this.originalButtonForegroundColor = this.el.nativeElement.style.color;
    this.el.nativeElement.style.width = `${this.el.nativeElement.offsetWidth}px`;
  }

  ngOnDestroy() {
    this.busySubscription.unsubscribe();
  }

}
