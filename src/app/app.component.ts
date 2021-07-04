import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travel';
  offerEndTime = '';

  // weather details
  weatherReports = [];
  destinationList: any;

  // form
  userForm: FormGroup;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  successFormSubmit = false;

  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.countdownTimeStart();
    this.fetchWeather();
    this.fetchDestinations();
  }

  countdownTimeStart() {
    // let countDownDate = new Date(new Date(new Date(new Date(new Date().setDate(10)).setHours(18)).setMinutes(0)).setSeconds(0));
    let countDownDate = new Date();
    countDownDate.setTime(1625920200174);

    var x = setInterval(() => {

      // Get today date and time
      var now = new Date();

      // Find the distance between now an the count down date
      var distance = countDownDate.getTime() - now.getTime();

      // Time calculations for days, hours, minutes and seconds
      var days =  Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.offerEndTime =days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        this.offerEndTime = "EXPIRED";
      }
    }, 1000);
  }

  fetchWeather() {
    this.appService.getWeather().subscribe((data) => {
      console.log(data);
      this.weatherReports = [];
      if (data && data.body && data.body.result) {
        data.body.result.forEach(element => {
          this.weatherReports.push({
            city: element.city,
            temperature: element.temp_Celsius
          })
        });
      }
    })
  }

  fetchDestinations() {
    this.appService.getDestinations().subscribe((data) => {
      console.log(data);
      this.destinationList = [];
      if (data && data.body && data.body.result) {
        data.body.result.forEach(element => {
          this.destinationList.push({
            city: element.city,
            imageUrl: element.imageUrl
          })
        });
      }
    })
  }

  onSubmit() {
    console.log("sdsdf")
    this.userForm.reset();
    this.successFormSubmit = true;
  }
  
  // nameMessage: string;


  // userNameValidation = false;
  // emailValidation = false;
  // confirmEmailValidation = false;


  // onSubmit() {
  //   let userName = this.userForm.get('name').value.split(' ');
  //   let emailValue = this.userForm.get('emailAddress').value;
  //   let confirmEmail = this.userForm.get('confirmEmailAddress').value;

  //   if (userName.length === 1 || (userName.length > 1 && userName[1] == "")) {
  //     this.userNameValidation = true;
  //   } else {
  //     this.userNameValidation = false;
  //   }

  //   if (emailValue !== confirmEmail) {
  //     this.confirmEmailValidation = true;
  //   } else {
  //     this.confirmEmailValidation = false;
  //   }

  //   if (this.userNameValidation && this.confirmEmailValidation) {
  //     return;
  //   }


  // }
}
