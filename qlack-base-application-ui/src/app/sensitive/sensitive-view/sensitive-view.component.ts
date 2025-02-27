import {Component, OnInit} from "@angular/core";
import {SensitiveService} from "../sensitive.service";
import {EmployeeDto} from "../../employee/dto/employee-dto";
import {JsonPipe} from "@angular/common";

@Component({
    selector: "app-sensitive",
    templateUrl: "./sensitive-view.component.html",
    imports: [JsonPipe]
})
export class SensitiveViewComponent implements OnInit {
  oneUnfiltered?: EmployeeDto;
  oneFiltered?: EmployeeDto;
  multipleUnfiltered?: EmployeeDto;
  multipleFiltered?: EmployeeDto;

  constructor(private sensitiveService: SensitiveService) { }

  ngOnInit(): void {
    this.sensitiveService.getAll().subscribe(onNext => {
      this.multipleFiltered = onNext.content[0];
      this.sensitiveService.get(onNext.content[0].id).subscribe(filteredData => {
        this.oneFiltered = filteredData;
      });
      this.sensitiveService.getUnfiltered(onNext.content[0].id).subscribe(unfilteredData => {
        this.oneUnfiltered = unfilteredData;
      });
    });

    this.sensitiveService.getAllUnfiltered().subscribe(onNext => {
      this.multipleUnfiltered = onNext.content[0];
    });
  }
}
