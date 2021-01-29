import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  submitted = false;
  task:any={}
  taskForm:FormGroup
  taskDescription = new FormControl('');
  dueDate = new FormControl('');
  priority = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private fb:FormBuilder
  ) {
    dialogRef.disableClose = true;
    if(data){
      this.task = data;
      this.taskDescription.setValue(data.taskDescription);
      this.dueDate.setValue(data.dueDate);
      this.priority.setValue(data.priority);
    } else {
      this.task.id = 'id' + (new Date()).getTime()
    }
      
    
   }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskDescription:[],
      dueDate:[],
      priority:[],
    })
    let task:any = localStorage.getItem('task')
    if(task){
      localStorage.removeItem('task')
      this.task = JSON.parse(task);
      this.taskDescription.setValue(task.taskDescription);
      this.dueDate.setValue(task.dueDate);
      this.priority.setValue(task.priority);
    }
  }
  submit(){
    this.submitted= true;
    if(this.taskDescription.value)
    this.dialogRef.close({taskDescription:this.taskDescription.value, dueDate:this.dueDate.value || new Date(), priority:this.priority.value, id:this.task.id});
  }
  close(){
    this.dialogRef.close()
  }
}
