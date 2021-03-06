import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../shared/component/base-component";
import {MatTableDataSource} from "@angular/material/table";
import {EmployeeDto} from "../dto/employee-dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {QFormsService} from "@qlack/forms";
import {EmployeeService} from "./employee.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseComponent implements AfterViewInit, OnInit {
  columns = ['firstName', 'lastName', 'department', 'hiringDate'];
  datasource = new MatTableDataSource<EmployeeDto>();
  filterForm: FormGroup;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private qForms: QFormsService,
              private fb: FormBuilder) {
    super();
    this.filterForm = this.fb.group({
      firstName: ['', null],
      lastName: ['', null],
    });
  }

  ngOnInit(): void {
    // Listen for filter changes to fetch new data.
    this.filterForm.valueChanges.debounceTime(500).subscribe(onNext => {
      this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
        this.sort.start);
    });
  }

  ngAfterViewInit(): void {
    // Initial fetch of data.
    this.fetchData(0, this.paginator.pageSize, this.sort.active, this.sort.start);

    // Each time the sorting changes, reset the page number.
    this.sort!.sortChange.subscribe((onNext: { active: string; direction: string; }) => {
      this.paginator!.pageIndex = 0;
      this.fetchData(0, this.paginator!.pageSize, onNext.active, onNext.direction);
    });
  }

  fetchData(page: number, size: number, sort: string, sortDirection: string) {
    // Convert FormGroup to a query string to pass as a filter.
    this.employeeService.getAll(this.qForms.makeQueryStringForData(this.filterForm.getRawValue(),
      null!, false, page, size, sort, sortDirection))
    .subscribe(onNext => {
      this.datasource.data = onNext.content;
      this.paginator.length = onNext.totalElements;
    });
  }

  changePage() {
    this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      this.sort!.start);
  }

  clearFilter() {
    this.filterForm.reset();
  }
}
