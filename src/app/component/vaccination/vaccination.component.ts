import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { VaccineDataSummary } from 'src/app/models/vaccinedata';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {
// data:VaccineDataSummary[];
demo:string;
columndata: string[]=[];
finalcountries:string[]=[];
// rendatadates:string[]=[];
// rendatacon:string[]=[];
// rendatadppl:string[]=[];
// dates:string[]=[];
// total_vac:string[]=[];
// ppl_vac:string[]=[];
finaldata:string[]=[];
data;
total_vaccinations:string[]=[];
people_vaccinated:string[]=[];
people_fully_vaccinated:string[]=[];
daily_vaccinations_raw:string[]=[];
daily_vaccinations:string[]=[];
dates:string[]=[];
// twoppl:string[]=[];
countries: string[]=[];
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
constructor(private dataservice : DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getVaccineData().subscribe(result=>{
      this.demo=result;
      // console.log("resulttttt",this.demo);

      var lines=this.demo.split("\n");
      // lines.splice(0,1);
      // lines.pop();
      // lines.shift();
      var re=[];
      var headers=lines[0].split(",");
      for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");
  // console.log("current lines",currentline);
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
            // console.log(obj);
            
        }
  
        re.push(obj);
      
        
    }
    this.data=re;
    // console.log("re",re);
for(let k=0;k<re.length;k++)
{
  var dt=re[k].location;
  
}
    
      lines.forEach(cols=>{
        this.columndata=cols.split(/,(?=\S)/);
        // console.log("colssssssss",this.columndata);
this.finaldata.push(cols);

      this.countries.push(this.columndata[0]);
      
      // this.rendatacon.push(this.columndata[0])
      // this.rendatadates.push(this.columndata[1])
      // console.log("dates",this.rendatadates);
     


      })
      
this.finalcountries=this.removeduplicate(this.countries);
this.finalcountries.shift();

this.updateValues("India");
      
    })
    
}
removeduplicate(data:string[])
{
  return data.filter((value,index)=>data.indexOf(value)===index);
}
updateValues(country : string)
{
  this.dates=[];
  this.total_vaccinations=[];
  this.daily_vaccinations=[];
  this.daily_vaccinations_raw=[];
  this.people_vaccinated=[];
  this.people_fully_vaccinated=[];
  console.log("areee reee",this.data);
  for(let k=0;k<this.data.length;k++)
  {
    if(country==this.data[k].location)
    {
    // FOR DATES
      this.dates.push(this.data[k].date);
  
      //TOTAL VACCINATION
      if(this.data[k].total_vaccinations)
      {
        this.total_vaccinations.push(this.data[k].total_vaccinations);
      }
      else{
        this.total_vaccinations.push("-");
      }
      //pEOPLE VACCINATED
      if(this.data[k].people_vaccinated)
      {
        this.people_vaccinated.push(this.data[k].people_vaccinated);
      }
      else{
        this.people_vaccinated.push("-");
      }
      //PEOPLE FULLY VACCINATED
      if(this.data[k].people_fully_vaccinated)
      {
        this.people_fully_vaccinated.push(this.data[k].people_fully_vaccinated);
      }
      else{
        this.people_fully_vaccinated.push("-");
      }
      //DAILY VACCINATIONS RAW
      if(this.data[k].daily_vaccinations_raw)
      {
        this.daily_vaccinations_raw.push(this.data[k].daily_vaccinations_raw);
      }
      else{
        this.daily_vaccinations_raw.push("-");
      }
      //Daily vaccination
    if(this.data[k].daily_vaccinations)
    {
      this.daily_vaccinations.push(this.data[k].daily_vaccinations);
    }
    else{
      this.daily_vaccinations.push("-");
    }
    }
    
  }
  this.updateChart(this.dates,this.total_vaccinations);

  console.log("location",country);
  console.log("dates",this.dates);
  console.log("ppl",this.total_vaccinations);
  
  
  
 
}
updateChart(dates,total_vaccinations)
{
this.datatable=[]
// this.datatable.push(['dates','total_vaccinations'])
this.datatable.push([total_vaccinations,dates])
console.log("dattattataftfdgdff",this.datatable);

}

}
