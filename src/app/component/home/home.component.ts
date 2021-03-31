import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import {DataServiceService} from 'src/app/services/data-service.service';
// import { DataServiceService } from "d:/ANGULAR/covid19-tracker/src/app/services/data-service.service"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
totalConfirmed=0;
totalActive=0;
totalRecovered=0;
totalDeaths=0; 
globalData:GlobalDataSummary[];
datatable= [];
loading=true;
chart={
  PieChart :"PieChart",
  ColumnChart:"ColumnChart",
  height : 500,
  // width :600,
  options: {
    
    animation:{
      duration:1000,
      easing:'out',
     
    },
    is3D: true
  }
}
  constructor(private dataService : DataServiceService ) { }

  initChart(caseType: string)
  {
   this.datatable=[];
    // this.datatable.push(["Country","Cases"])
    this.globalData.forEach(cs=>{
      let value:number;
      if(caseType == 'c'){
        if(cs.confirmed>300000)
      value=cs.confirmed
      console.log("value",value)
      }
      if(caseType == 'a'){
        if(cs.active>300000)
     value=cs.active
     console.log("value",value)
      }
      if(caseType == 'r'){
        if(cs.recovered>300000)
      value=cs.recovered
      }
      if(caseType == 'd'){
        if(cs.deaths>50000)
        value=cs.deaths
      }     
      this.datatable.push([
      cs.country , value
    ])
      
      
    })
    console.log("datatable",this.datatable);
    // this.loading=false;
    
  }
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
next:(result)=>{
  console.log(result);
  this.globalData=result;
  result.forEach(cs=>{
    if(!Number.isNaN(cs.confirmed))
    {
      this.totalActive+=cs.active;
      this.totalConfirmed+=cs.confirmed;
      this.totalDeaths+=cs.deaths;
      this.totalRecovered+=cs.recovered;
    }
  
  })
  this.initChart('c');
  this.loading=false;
}
      }
    )  }
updateChart(input : HTMLInputElement)
{
  console.log(input.value);
  this.initChart(input.value);
  
}
}
