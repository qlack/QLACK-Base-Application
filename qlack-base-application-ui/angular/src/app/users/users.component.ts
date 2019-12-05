import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {QFormsService} from '@eurodyn/forms';
import {UserDto} from '../dto/user-dto';
import {UserService} from './user.service';
import 'rxjs/add/operator/debounceTime';
import {BaseComponent} from '../shared/component/base-component';
import {FileService} from '../services/file.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit, AfterViewInit {
  displayedColumns = ['profilepic', 'email', 'firstname', 'lastname', 'status'];
  dataSource: MatTableDataSource<UserDto> = new MatTableDataSource<UserDto>();
  filterForm: FormGroup;
  enabled = [this.constants.USER_STATUS.ENABLED];
  // References to sorting and pagination.
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
              private qForms: QFormsService, private fileService: FileService) {
    super();
    this.filterForm = this.fb.group({
      email: [''],
      status: [this.enabled]
    });
  }

  ngAfterViewInit(): void {
    // Initial fetch of data.
    this.fetchData(0, this.paginator.pageSize, this.sort.active, this.sort.start);

    // Each time the sorting changes, reset the page number.
    this.sort.sortChange.subscribe(onNext => {
      this.paginator.pageIndex = 0;
      this.fetchData(0, this.paginator.pageSize, onNext.active, onNext.direction);
    });
  }

  ngOnInit() {
    // Listen for filter changes to fetch new data.
    this.filterForm.valueChanges.debounceTime(500).subscribe(onNext => {
      this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
        this.sort.start);
    });
  }

  fetchData(page: number, size: number, sort: string, sortDirection: string) {
    let filterValue = this.filterForm.value;
    let statusQueryString = this.geStatusQueryString(filterValue.status);

    // Convert FormGroup to a query string to pass as a filter.
    this.userService.getAll(
      this.qForms.makeQueryString(
        this.fb.group({email: [filterValue.email], status: [statusQueryString]}), null, false, page,
        size, sort, sortDirection))
    .subscribe(onNext => {
      this.dataSource.data = onNext.content;
      this.paginator.length = onNext.totalElements;
    });
  }

  geStatusQueryString(status) {
    let statusString = "";
    if (status) {
      if (status.length > 1) {
        statusString = status[0];
        for (let index = 1; index < status.length; index++) {
          statusString += '&status=' + status[index];
        }
      } else {
        statusString = status[0];
      }
    }
    return statusString;
  }

  changePage() {
    this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      this.sort.start);
  }

  clearFilter() {
    this.filterForm.reset();
  }

  getFileSrc(profilepic: any) {
    if (profilepic) {
      return this.fileService.getImage(profilepic.id);
    } else {
      return '../assets/img/default.png';
    }
  }
}
