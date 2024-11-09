import { waitForAsync, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { EmployeeEditComponent } from "./employee-edit.component";
import { FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { QFormsService } from "@qlack/forms";
import {RouterTestingModule} from '@angular/router/testing';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UtilityService } from "../../shared/service/utility.service";
import { EmployeeService } from "../employee.service";
import { Observable, of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { EmployeeDto } from "../dto/employee-dto";
import { MatSnackBar } from "@angular/material/snack-bar";
import Spy = jasmine.Spy;
import { AppConstants } from "src/app/app.constants";
import { OkCancelModalComponent } from "src/app/shared/component/ok-cancel-modal/ok-cancel-modal.component";

const date: any = { value : new Date(2023-11-21) };

class EmployeeServiceStub {
    get(): Observable<EmployeeDto> {
      return of( { id: '1', firstName: 'John', lastName: 'Doe', department: 'Law', hiringDate: date} as EmployeeDto );
    }
    save(): Observable<EmployeeDto> {
      return of( { id: '1', firstName: 'John', lastName: 'Doe', department: 'Law', hiringDate: date} as EmployeeDto );
    }
    delete(): Observable<EmployeeDto> {
      return of( { id: '1', firstName: 'John', lastName: 'Doe', department: 'Law', hiringDate: date} as EmployeeDto );
    }
}

class UtilityServiceStub {
  popupSuccess(): Observable<String>{
    return of( "Employee successfully saved.")
    };
  }

class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    };
  }

}

describe("EmployeeEditComponent", () => {
  let component: EmployeeEditComponent;
    let fixture: ComponentFixture<EmployeeEditComponent>;
    let testEmployee: any;
    let employeeService: EmployeeService;
    let activatedRoute: ActivatedRoute;
    let utilityService: jasmine.SpyObj<UtilityService>;
    let employeeServiceSpy: Spy;
    let utilityServiceSpy: Spy;
    let submitSpy: Spy;
    let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
    let dialog: jasmine.SpyObj<MatDialog>;

    beforeEach(waitForAsync(() => {
      const utilityServiceSpy = jasmine.createSpyObj('UtilityService', ['popupSuccess']);
      const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        TestBed.configureTestingModule({
          declarations: [EmployeeEditComponent],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
          // schemas: [ NO_ERRORS_SCHEMA ],
          imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, MatDialogModule],
          providers: [
            {provide: EmployeeService, useClass: EmployeeServiceStub},
            { provide: UtilityService, useValue: utilityServiceSpy },
            {provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
            {provide: MatSnackBar , useClass: MatSnackBarStub},
            { provide: MatDialog, useValue: dialogSpy }
          ]
        })
          .compileComponents();
    }));

  beforeEach(() => {
    testEmployee = { id: '1', firstName: 'John', lastName: 'Doe', department: 'Law', hiringDate: date} as EmployeeDto;
    utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch employee data if editing', () => {
    employeeServiceSpy = spyOn(employeeService, 'get').and.returnValue(of(testEmployee));
    component.ngOnInit();
  
    expect(component.form.value).toEqual(testEmployee);
    expect(employeeServiceSpy).toHaveBeenCalledWith('1');
  });

  it('should initialize the form without fetching data if creating a new employee', () => {
    employeeServiceSpy = spyOn(employeeService, 'get').and.returnValue(of());
    activatedRoute.snapshot.paramMap.get = () => AppConstants.NEW_RECORD_ID;
    
    component.ngOnInit();
  
    expect(component.form.value).toEqual({
      id: null,
      firstName: [],
      lastName: [],
      department: null,
      hiringDate: null
    });
    expect(employeeServiceSpy).not.toHaveBeenCalled();
  });
  
  it('should save employee data', (inject([Router], (mockRouter: Router) => {
    submitSpy = spyOn(mockRouter, 'navigate').and.stub();
    component.form.setValue(testEmployee);
    employeeServiceSpy = spyOn(employeeService, 'save').and.returnValue(of(testEmployee));
    
  
    component.save();
  
    expect(employeeServiceSpy).toHaveBeenCalledWith(testEmployee);
    expect(utilityService.popupSuccess).toHaveBeenCalledWith('Employee successfully saved.');
    expect (submitSpy).toHaveBeenCalledWith(['employee']);
  })));

  it('should delete employee data and navigate to employee list', (inject([Router], (mockRouter: Router) => {
    submitSpy = spyOn(mockRouter, 'navigate').and.stub();
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpy);
    employeeServiceSpy = spyOn(employeeService, 'delete').and.returnValue(of({}));
  
    component.delete();
  
    expect(dialog.open).toHaveBeenCalledWith(OkCancelModalComponent, {
      data: {
        title: 'Delete employee',
        question: 'Do you really want to delete this employee?',
        buttons: { ok: true, cancel: true, reload: false }
      }
    });
    expect(employeeService.delete).toHaveBeenCalledWith('1');
    expect(utilityService.popupSuccess).toHaveBeenCalledWith('Employee successfully deleted.');
    expect(submitSpy).toHaveBeenCalledWith(['employee']);
  })));

});
