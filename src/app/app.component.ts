import { FormControl, Validators } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "train-man";
  progressInputValue: number = 1;

  startFlag: boolean = false;
  private _timeRemainingPer: number = 0;

  timeLeftInSec: number = 0;
  schdeular: any;

  get timeRemainingPer(): number {
    return this._timeRemainingPer;
  }

  set timeRemainingPer(value: number) {
    if (!isNaN(value) && value <= 100) {
      this._timeRemainingPer = value;
    }
  }

  constructor() {}

  onStart() {
    this.startFlag = true;
    if (isNaN(this.progressInputValue) || this.progressInputValue == null) {
      this.startFlag = false;
      return;
    }
    this.timeLeftInSec = this.progressInputValue * 60;

    this.schdeular = setInterval(() => {
      if (this.timeLeftInSec > 0) {
        this.timeLeftInSec = this.timeLeftInSec - 1;
        this.timeRemainingPer =
          (this.timeLeftInSec / (this.progressInputValue * 60)) * 100;
      } else {
        this.onReset();
      }
    }, 1000);
  }

  onStop() {
    this.startFlag = false;
    clearInterval(this.schdeular);
  }

  onReset() {
    this.startFlag = false;
    clearInterval(this.schdeular);
    this.timeLeftInSec = this.progressInputValue * 60;
    this.timeRemainingPer = 0;
  }

  getMyTime() {
    const myTime = new Date(1970, 0, 1);
    myTime.setSeconds(this.timeLeftInSec);
    return myTime;
  }
}
