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
// data :VaccineDataSummary[];
// private country;
// selectedCountryData: VaccineDataSummary[];
// dateWiseData;
// dates;
// total_vaccinations=0;
// people_vaccinated=0;
// people_fully_vaccinated=0;
// daily_vaccinations_raw=0;
// daily_vaccinations=0;
// // data: GlobalDataSummary[];
// countries: string[]=[];
// constructor(private dataservice : DataServiceService) { }

  ngOnInit(): void {
//     this.dataservice.getvaccineData().subscribe(result=>{
//       console.log("RESULT",result);
//      this.data=result;
//      console.log("data",this.data);
//      this.data.forEach(cs=>{
//        this.countries.push(cs.country);
       
//      })
//      console.log("countries",this.countries);

//       // this.data=result;
//       // this.vaccineData.forEach(cs => {
        
//       // });
//       // console.log("vaccination",this.vaccineData);
//     })
//     // this.dataservice.getGlobalData().subscribe(result=>{
//     //   this.data=result;
//     //   // console.log("eeeeeeeeeeeeeeeeeeeeee",this.data);
      
//     //   this.data.forEach(cs=>{
//     //     // console.log("country",cs.country);
//     //   this.countries.push(cs.country);
//     //   this.updateValues('Afghanistan');
//     //   })
//     //       })
//   }
//   updateValues(country : string)
// {
//   this.data?.forEach(cs=>{
//     if(cs.country == country)
//     {
//     //   this.dates =cs.dates,
//     // this.total_vaccinations=cs.total_vaccinations,
//     // this.people_vaccinated=cs.people_vaccinated,
//     // this.people_fully_vaccinated=cs.people_fully_vaccinated,
//     // this.daily_vaccinations_raw=cs.daily_vaccinations_raw,
//     // this.daily_vaccinations=cs.daily_vaccinations
//     console.log("jhgfdsdfghuji",this.data);
    
//     this.selectedCountryData=this.data[country]
//     console.log(this.selectedCountryData);
    
//     }
//   })
 
// // console.log(this.selectedCountryData);
// //  this.loading = false;

}

}
