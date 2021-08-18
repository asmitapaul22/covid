import { Component, OnInit } from '@angular/core';
import { DateWiseDataModel } from 'src/app/models/date-wise-data-model';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
data: GlobalDataSummary[];
countries: string[]=[];
totalConfirmed=0;
totalActive=0;
totalRecovered=0;
totalDeaths=0;
selectedCountryData : DateWiseDataModel[]; 
dateWiseData;
loading = true;
datatable= [];
chart={
 LineChart :"LineChart",
  // ColumnChart:"ColumnChart",
  height : 500,
  // width :600,
  options: {
    
    animation:{
      duration:1000,
      easing:'out',
     
    },
    // is3D: true
  }
}
  constructor(private dataservice : DataServiceService ) { }

  ngOnInit(): void {
    this.dataservice.getDateWiseData().subscribe(result=>{
      // console.log("result",result);
      this.dateWiseData=result;
      // this.updateChart();
      // console.log("datewise data of afg",this.dateWiseData);
      
    })
    this.dataservice.getGlobalData().subscribe(result=>{
this.data=result;
// console.log(this.data);

this.data.forEach(cs=>{
  // console.log("country",cs.country);
this.countries.push(cs.country);
this.updateValues('Bahamas');
})
    })
    // this.selectedCountryData=this.dateWiseData["Afghanistan"]
    // console.log("data of af",this.selectedCountryData);
  }
  updateChart(con: string,datacon : DateWiseDataModel[])
  {
    this.datatable=[];
    //  let datatable=[];
    console.log("connn",con);
    // console.log("connndata",datacon)
    // console.log(datacon.ca);
    
  //  this.datatable.push(['Cases','Date'])
  //  this.datatable.push([,cs.date])
  datacon.forEach(cs=>{
    // console.log("dtacon cs",cs);
    
    // this.datatable.push(['Cases','Date'])
   this.datatable.push([cs.cases,cs.date])
console.log(cs.cases,cs.date)
  //  console.log("datafinal",this.datatable);
   
  })
  //  console.log(this.dateWiseData);
    // this.dateWiseData.forEach(cs=>{
    //   console.log("cs",cs);
      
    //   if(con==cs)
    //   {
    //     this.datatable.push([cs.cases,cs.date])
    //   console.log("datttttaaatable",this.datatable);
    //   }
     
      
    // })
  }
updateValues(country : string)
{
  this.loading = false;
 
  this.data?.forEach(cs=>{
    if(cs.country == country)
    {
      this.totalConfirmed=cs.confirmed;
      this.totalActive=cs.active;
      this.totalDeaths=cs.deaths;
      this.totalRecovered=cs.recovered;
      
    }
  })
  this.selectedCountryData=this.dateWiseData[country]
      this.updateChart(country,this.selectedCountryData);
  console.log(country);
  
 
// console.log(this.selectedCountryData);
//  this.loading = false;

}
}
