import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskList = [];
  constructor(
    private dialog:MatDialog
  ){
    this.taskList = [{taskDescription:'new task added', dueDate:new Date(), priority:2, id:'id' + (new Date()).getTime()}]
  }
  delete(task){
    this.taskList.splice(this.taskList.indexOf(task),1)
  }
  addTask(task?){
    if(task){ // edit this task
      let dialogRef = this.dialog.open(TaskComponent, {
        width: '500px',
        data:task
      });
      dialogRef.afterClosed().subscribe(res=>{
        this.taskList = this.taskList.map(x=>{
          if(x.id == res.id){
            x = res;
          }
          return x;
        })
        
      })
    } else { // Add new task
      let dialogRef = this.dialog.open(TaskComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.taskList.push(res)
        }        
      })
    }
  }
}

