import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {QFormsService} from "@qlack/forms";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {EmployeeService} from "../employee.service";
import {UtilityService} from "../../shared/service/utility.service";
import {BaseComponent} from "../../shared/component/base-component";
import {EmployeeDto} from "../dto/employee-dto";
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  CdkTable
} from "@angular/cdk/table";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
    selector: "app-employee",
    templateUrl: "./employee-list.component.html",
    imports: [ReactiveFormsModule, CdkTable, MatSort, CdkColumnDef, CdkHeaderCellDef, CdkHeaderCell, MatSortHeader, CdkCellDef, CdkCell, CdkHeaderRowDef, CdkHeaderRow, CdkRowDef, CdkRow, RouterLink, MatPaginator, DatePipe]
})
export class EmployeeListComponent extends BaseComponent implements AfterViewInit, OnInit {
  // References to sorting and pagination.
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  // Table data definitions.
  displayedColumns = ["firstName", "lastName", "department", "hiringDate"];
  datasource = new MatTableDataSource<EmployeeDto>();
  filterForm: FormGroup;

  constructor(private employeeService: EmployeeService, private qForms: QFormsService,
              private fb: FormBuilder, private utilityService: UtilityService) {
    super();
    this.filterForm = this.fb.group({
      firstName: [],
      lastName: [],
    });
  }

  ngOnInit(): void {
    // Listen for filter changes to fetch new data.
    this.filterForm.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(() => {
      this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
        this.sort.start);
    });
  }

  ngAfterViewInit(): void {
    // Initial fetch of data.
    this.fetchData(0, this.paginator.pageSize, this.sort.active, this.sort.start);

    // Each time the sorting changes, reset the page number.
    this.sort.sortChange.subscribe((onNext: { active: string; direction: string; }) => {
      this.paginator.pageIndex = 0;
      this.fetchData(0, this.paginator.pageSize, onNext.active, onNext.direction);
    });
  }

  fetchData(page: number, size: number, sort: string, sortDirection: string) {
    // Convert FormGroup to a query string to pass as a filter.
    this.employeeService.getAll(this.qForms.makeQueryStringForData(this.filterForm.getRawValue(),
      [], false, page, size, sort, sortDirection)).subscribe({
      next: (onNext) => {
        this.datasource.data = onNext.content;
        this.paginator.length = onNext.totalElements;
      }, error: (() => {
        this.utilityService.popupError("Could not fetch employees.");
      })
    });
  }

  clearFilter() {
    this.filterForm.reset();
  }

  changePage() {
    this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      this.sort.start);
  }
}
