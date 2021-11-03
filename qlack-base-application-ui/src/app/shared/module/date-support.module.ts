import {NgModule} from "@angular/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentModule} from "ngx-moment";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {
  NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentAdapter,
  NgxMatMomentModule
} from "@angular-material-components/moment-adapter";

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
    MomentModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
  ],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    },
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS_WITH_TIME
    },
    {
      provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS
    }
  ],
})
export class DateSupportModule {
}
