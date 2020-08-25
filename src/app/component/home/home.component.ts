import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService : DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobaldata().subscribe(
      {
next:(result)=>{
  console.log(result);

}
      }
    )  }

}
