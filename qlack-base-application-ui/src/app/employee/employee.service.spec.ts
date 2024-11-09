import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { AppConstants } from '../app.constants';
import { EmployeeDto } from './dto/employee-dto';

const date: any = { value : new Date(2023-11-21) };

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should save an employee', () => {
  const mockEmployee: EmployeeDto = { id: '123', firstName: 'John', lastName: 'Doe', department: 'HR', hiringDate: date };
  service.save(mockEmployee).subscribe(response => {
    expect(response).toEqual(mockEmployee);
  });

  const req = httpMock.expectOne(`${AppConstants.API_ROOT}/employee`);
  expect(req.request.method).toBe('POST');
  req.flush(mockEmployee);
});

it('should get all employees', () => {
  const mockResponse = { content: [{ id: '123', firstName: 'John', lastName: 'Doe', department: 'HR', hiringDate: date }], totalElements: 1,
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
const queryString = 'param=value';
  service.getAll().subscribe(response => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${AppConstants.API_ROOT}/employee`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});

it('should get an employee by id', () => {
  const mockEmployee: EmployeeDto = { id: '123', firstName: 'John', lastName: 'Doe', department: 'HR', hiringDate: date };

  service.get('123').subscribe(response => {
    expect(response).toEqual(mockEmployee);
  });

  const req = httpMock.expectOne(`${AppConstants.API_ROOT}/employee/123`);
  expect(req.request.method).toBe('GET');
  req.flush(mockEmployee);
});

it('should delete an employee by id', () => {
  service.delete('123').subscribe(response => {
    expect(response).toEqual({});
  });

  const req = httpMock.expectOne(`${AppConstants.API_ROOT}/employee/123`);
  expect(req.request.method).toBe('DELETE');
  req.flush({});
});
});