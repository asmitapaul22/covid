import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import {DateWiseDataModel} from '../models/date-wise-data-model';
import {VaccineDataSummary} from '../models/vaccinedata';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private baseUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
private globalDataUrl='';
// https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports
//WORKING URL https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-10-2020.csv
private dateWiseDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
private extention = '.csv';  
private baseVaccineDataUrl ="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
private vaccineDataUrl="";
month;
date;
year;

formatDateMonth(digit : number)
{
  if(digit<10)
  {
    return '0'+digit;
  }
  else{
    return digit;
  }
}
constructor(private http: HttpClient) {
  let now =new Date();
  this.month=now.getMonth() + 1;
  this.date=now.getDate();
  this.year=now.getFullYear();
console.log({
  date: this.date,
  month:this.month,
  year:this.year
}) 

this.globalDataUrl=`${this.baseUrl}${this.formatDateMonth(this.month)}-${this.formatDateMonth(this.date)}-${this.year}${this.extention}`;
// this.vaccineDataUrl=`${this.baseUrl}${this.extention}`;

}
  getGlobalData(){
      return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
        map(result=>{
        // console.log(result);
        // console.log("---------------------------------------------------------------");
        let rows= result.split('\n');
        // console.log(rows);
        rows.splice(0,1);
        let data: GlobalDataSummary[] =[]; 
        let raw = {}
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/);
          
          // console.log(cols);
          let cs={
            country :cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10]

          };
          // console.log(cs);
          let temp: GlobalDataSummary = raw[cs.country];
          // console.log("temp",temp);
          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered
            raw[cs.country]=temp;  
          }
          else{
            raw[cs.country]=cs;
          }
       
          // data.push()
        })
        // console.log(raw);
        
        return <GlobalDataSummary>Object.values(raw);
           }),
           catchError((error : HttpErrorResponse)=>{
             if(error.status==404)
             {
               this.date=this.date-1;
               this.globalDataUrl=`${this.baseUrl}${this.formatDateMonth(this.month)}-${this.formatDateMonth(this.date)}-${this.year}${this.extention}`;
              //  console.log(this.globalDataUrl);
               return this.getGlobalData();
             }
           }
           )
           ) 
  }
  getDateWiseData(){
    return this.http.get(this.dateWiseDataUrl,{responseType : 'text'})
    .pipe(map(result =>{
      let rows =result.split('\n');
      // console.log(rows);
      let mainData={};
      let header = rows[0];
      let dates =header.split(/,(?=\S)/)
      // console.log(dates)
      dates.splice(0,4);
      // console.log("header values",dates);
 rows.splice(0,1);
 rows.forEach(row=>{
   let cols = row.split(/,(?=\S)/)
  //  console.log("coooooooooollll",cols);
  
   let con = cols[1];
   cols.splice(0,4); 
  //  console.log(con,cols);  
   mainData[con]=[];
   cols.forEach((value, index)=>{
     let dw : DateWiseDataModel= {
       cases : +value,
       country : con ,
       date : new Date(Date.parse(dates[index]))
     }
     mainData[con].push(dw)
   })
  //  let con = cols[1];
 })    
//  console.log(mainData);
  
      return mainData;
    }))
  }

//   getvaccineData()
//   {
// return this.http.get(this.baseVaccineDataUrl,{responseType : 'text'}).pipe(
//   map(result=>{
//     let rows=result.split('\n');
//     rows.splice(0,1);
//     let vacdata : VaccineDataSummary[]=[];
//     let raw = {}

// rows.forEach(row=>{
//   let cols = row.split(/,(?=\S)/)
//   let mainData={};
//   let con = cols[0];
//   mainData[con]=[];
//   // console.log("vaccine col",cols);
//   let cs={
//     country :cols[0],
//     dates : cols[2],
//     total_vaccinations : +cols[3],
//     people_vaccinated : +cols[4],
//     people_fully_vaccinated : +cols[5],
//     daily_vaccinations_raw : +cols[6],
//     daily_vaccinations : +cols[7]
//   };
//   // console.log("cssssssss",cs);
//   let temp: VaccineDataSummary = raw[cs.country];
//           // console.log("temp",temp);
//           if(temp){
//             // temp.total_vaccinations = cs.total_vaccinations + temp.total_vaccinations
//             // temp.people_vaccinated = cs.people_vaccinated + temp.people_vaccinated
//             // temp.people_fully_vaccinated = cs.people_fully_vaccinated + temp.people_fully_vaccinated
//             // temp.daily_vaccinations_raw = cs.daily_vaccinations_raw + temp.daily_vaccinations_raw
//             // temp.daily_vaccinations = cs.daily_vaccinations + temp.daily_vaccinations
//             raw[cs.country]=temp;  
//           }
//           else{
//             raw[cs.country]=cs;
//           }
//           // console.log(<VaccineDataSummary>Object.values(raw));
          
          
//           // data.push()
//         })
//         return Object.values(raw);
// })
//     // console.log("vaccine row",rows);
//   // })
// )
//   }
}
