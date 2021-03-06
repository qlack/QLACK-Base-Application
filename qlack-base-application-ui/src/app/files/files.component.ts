import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FileDto} from "../dto/file-dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FilesService} from "./files.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements AfterViewInit {
  columns = ['fileName', 'description', 'size', 'actions'];
  datasource = new MatTableDataSource<FileDto>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private filesService: FilesService) { }

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
    this.filesService.getAll()
    .subscribe(onNext => {
      this.datasource.data = onNext.content;
      this.paginator.length = onNext.totalElements;
    });
  }

  changePage() {
    this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      this.sort!.start);
  }

  download(id: string) {
    console.log(id);
      this.filesService.download(id);
  }
}

