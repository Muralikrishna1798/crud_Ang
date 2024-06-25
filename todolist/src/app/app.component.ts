import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Ang';
  // @ViewChild('myModal') model: ElementRef | undefined;
  @ViewChild('myModal', { static: true }) model:
    | ElementRef<HTMLDivElement>
    | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angularcrud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    // the below code is calling the cosntructor of the property to set the empty when click of add new
   
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
      // this.model.nativeElement.style.display = 'none';s
    }
  }
  updateStudent(){
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if(currentRecord != undefined){
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.email = this.studentObj.email;
      currentRecord.city = this.studentObj.city;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.state = this.studentObj.state;
    }
    localStorage.setItem('angularcrud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  onEdit(item:Student){
  this.studentObj = item;
  this.openModel();
  }
  onDelete(item:Student){
 const isDelete = confirm("Are you sure want to delete?");
 if(isDelete){
  const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
  this.studentList.splice(currentRecord,1);
  localStorage.setItem('angularcrud', JSON.stringify(this.studentList));
 }
  }
  saveStudent() {
    const isLocalPresent = localStorage.getItem('angularcrud');
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      //  the below code setting the id value to be increamented with array length to edit the record
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angularcrud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      //  the below code writtern to set the initial value of id to 1 since 1st time adding value to array
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angularcrud', JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

export class Student {
  id:number;
  name: string;
  mobileNo: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  email: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
    this.email = '';
  }
}
