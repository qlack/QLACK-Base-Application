import { waitForAsync, ComponentFixture, TestBed, flush } from "@angular/core/testing";
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import { EmployeeListComponent } from "./employee-list.component";
import { QFormsService, QPageableReply } from "@qlack/forms";
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule } from "@angular/forms";
import { EmployeeService } from "../employee.service";
import { UtilityService } from "../../shared/service/utility.service";
import { Observable, of } from "rxjs";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmployeeDto} from '../dto/employee-dto';
import {Type} from '@angular/core';
import Spy = jasmine.Spy;
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const date: any = { value : new Date(2023-11-21) };

describe("EmployeeListComponent", () => {
  let testEmployee: any;
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let fakeEmployeeService: jasmine.SpyObj<EmployeeService>;
  let fakeQForms: jasmine.SpyObj<QFormsService>;
  let fakeFb: jasmine.SpyObj<FormBuilder>;
  let fakeFg: jasmine.SpyObj<FormGroup>;
  let fakeUtilityService: jasmine.SpyObj<UtilityService>;
  let httpTestingController: HttpTestingController;
  let spy: Spy;
  let spyReset: Spy;
  let fetchDataSpy: Spy;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    fakeEmployeeService = jasmine.createSpyObj<EmployeeService>("EmployeeService", ["getAll"]);
    fakeQForms = jasmine.createSpyObj<QFormsService>("QFormsService", ["makeQueryStringForData"]);
    fakeFb = jasmine.createSpyObj<FormBuilder>("FormBuilder", ["group"]);
    fakeFg = jasmine.createSpyObj<FormGroup>("FormGroup", ["getRawValue"]);
    fakeUtilityService = jasmine.createSpyObj<UtilityService>("UtilityService", ["popupError"]);

    TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, BrowserAnimationsModule, NoopAnimationsModule, EmployeeListComponent],
    providers: [
        { provide: EmployeeService, useFactory: () => fakeEmployeeService },
        { provide: QFormsService, useFactory: () => fakeQForms },
        { provide: FormBuilder, useFactory: () => fakeFb },
        { provide: FormGroup, useFactory: () => fakeFg },
        { provide: UtilityService, useFactory: () => fakeUtilityService },
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    testEmployee = { id: '1', firstName: 'John', lastName: 'Doe', department: 'Law', hiringDate: date} as EmployeeDto;
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.sort = { active: 'firstName', start: 'asc', direction: 'asc', sortChange: of({ active: 'firstName', direction: 'asc' }) } as MatSort;
    component.paginator = { pageIndex: 0, pageSize: 10, length: 0, page: of({ pageIndex: 0, pageSize: 10 }) } as MatPaginator;
    component.datasource = new MatTableDataSource<EmployeeDto>();
    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create EmployeeListComponent", () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchData on form value changes', () => {
    component.filterForm= formBuilder.group({
      firstName: testEmployee.firstName,
      lastName: testEmployee.lastName
    });
    spyOn(component, 'fetchData');
    fixture.detectChanges();
    component.ngOnInit();
  
    component.filterForm.setValue({ firstName: "New", lastName: "Change" });
    
      expect(component.fetchData).toHaveBeenCalledWith(
        component.paginator.pageIndex,
        component.paginator.pageSize,
        component.sort.active,
        component.sort.start
      );
    
  });

  it('should fetch data from the server', () => {
   
    component.filterForm= formBuilder.group({
      firstName: testEmployee.firstName,
      lastName: testEmployee.lastName
    });
    spyOn(component, 'fetchData');
    fixture.detectChanges();
    component.ngAfterViewInit();
    expect(component.fetchData).toHaveBeenCalledWith(
      0,
      component.paginator.pageSize,
      component.sort.active,
      component.sort.start
    );
  });

  it('should fetch data and update datasource on success', () => {
    component.filterForm= formBuilder.group({
      firstName: testEmployee.firstName,
      lastName: testEmployee.lastName
    });
    const mockResponse: QPageableReply<EmployeeDto> = {
      content: [testEmployee], totalElements: 1,
      first: true,
      last: true,
      number: 1,
      numberOfElements: 1,
      pageable: {
        offset: 1,
        pageNumber: 1,
        pageSize: 10,
        paged: true,
        unpages: false,
        sort: {
          sorted: true,
          unsorted: false
      }
      },
      size: 1,
      sort: {
        sorted: true,
        unsorted: false
    },
      totalPages: 1
    };
 
    fakeEmployeeService.getAll.and.returnValue(of(mockResponse));
    fixture.detectChanges();
    component.fetchData(1, 10, 'name', 'asc');

    expect(fakeEmployeeService.getAll).toHaveBeenCalled();
    expect(component.datasource.data).toEqual(mockResponse.content);
    expect(component.paginator.length).toBe(mockResponse.totalElements);
  });

  it('should fetch data on page change', () => {
    fetchDataSpy = spyOn(component, 'fetchData');
    component.paginator.pageIndex = 1;
    component.paginator.pageSize = 10;
    component.sort.active = 'firstName';
    component.sort.start = 'asc';
    component.changePage();
    expect(fetchDataSpy).toHaveBeenCalledWith(1, 10, 'firstName', 'asc');
  });

});
