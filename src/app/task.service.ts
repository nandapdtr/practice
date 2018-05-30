import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader-state';

import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  getTasks(): Observable<Task[]> {
    this.loaderService.show();
    return this.http.get<Task[]>(this.url)
      .pipe(tap(() => this.hideLoader(),
    error => this.hideLoader()));
  }
  addTask(task: Task): Observable<Task> {
    this.loaderService.show();
    return this.http.post<Task>(this.url, task, httpOptions)
    .pipe(tap(() => this.hideLoader(),
    error => this.hideLoader()));
  }
  updateTask(task: Task): Observable<Task> {
    this.loaderService.show();
    console.log('inside update task in task service');
    let url = `${this.url}/${task._id}`;
    return this.http.put<Task>(url, task)
    .pipe(tap(() => this.hideLoader(),
    error => this.hideLoader()));
  }

  deleteTask(task: Task): Observable<Task> {
    this.loaderService.show();
    let url = `${this.url}/${task._id}`;
    return this.http.delete<Task>(url)
    .pipe(tap(() => this.hideLoader(),
    error => this.hideLoader()));
  }

  hideLoader(){
    this.loaderService.hide();
  }
}
