import { Component, OnInit } from '@angular/core';
import {SensitiveService} from "./sensitive.service";
import {EmployeeDto} from "../dto/employee-dto";

@Component({
  selector: 'app-sensitive',
  templateUrl: './sensitive.component.html',
  styleUrls: ['./sensitive.component.scss']
})
export class SensitiveComponent implements OnInit {
  oneUnfiltered: EmployeeDto;
  oneFiltered: EmployeeDto;
  multipleUnfiltered: EmployeeDto;
  multipleFiltered: EmployeeDto;

  constructor(private sensitiveService: SensitiveService) { }

  ngOnInit(): void {
    this.sensitiveService.getAll().subscribe(onNext => {
      this.multipleFiltered = onNext.content[0];
      this.sensitiveService.get(onNext.content[0].id).subscribe(onNext => {
        this.oneFiltered = onNext;
      });
      this.sensitiveService.getUnfiltered(onNext.content[0].id).subscribe(onNext => {
        this.oneUnfiltered = onNext;
      });
    });

    this.sensitiveService.getAllUnfiltered().subscribe(onNext => {
      this.multipleUnfiltered = onNext.content[0];
    });
  }
}
