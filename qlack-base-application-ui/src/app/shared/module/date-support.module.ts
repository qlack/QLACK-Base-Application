import {NgModule} from "@angular/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "YYYY-MM-DD",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  }
};

const CUSTOM_DATE_FORMATS_WITH_TIME = {
  ...CUSTOM_DATE_FORMATS, display: {
    dateInput: "YYYY-MM-DD HH:mm",
  }
};

@NgModule({
  declarations: [],
  exports: [
    MatDatepickerModule,
  ],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS
    }
  ],
})
export class DateSupportModule {
}
