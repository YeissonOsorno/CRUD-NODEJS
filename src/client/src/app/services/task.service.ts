import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Task } from '../Task';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  domain:string = "http://localhost:3000/"
  constructor(private HttpClient : HttpClient) { }
  
  getTasks(){
    return this.HttpClient.get<Task[]>(`${this.domain}api/task`).pipe(map(res=>res))
    
  }
  addTask(newTask:Task){
    return this.HttpClient.post<Task>(`${this.domain}api/task`,newTask).pipe(map(res=>res))
  }  
  deleteTask(id){
    return this.HttpClient.delete<Task>(`${this.domain}api/task/${id}`).pipe(map(res=>res))
  }
  updateTask(newTask){
    return this.HttpClient.put<Task>(`${this.domain}api/task/${newTask._id}`,newTask)
    .pipe(map(res=>res))
  }
}
