import { Injectable } from '@angular/core';
import { ServiceService } from 'app/shared/service/service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListdinhhuongService {

  constructor(private _serviceApi: ServiceService,) { }

  private myBehaviorYear = new BehaviorSubject<any>(this.geListYears());
  private myBehaviorStatus = new BehaviorSubject<any>(this.getListStatus());


  // danh sach nam
  setValueYear(value: any) {
    this.myBehaviorYear.next(value);
  }

  getValueYear() {
    return this.myBehaviorYear.asObservable();
  }

  // danh sach trang thai
  setValueStatus(value: any) {
    this.myBehaviorStatus.next(value);
  }

  getValueStatus() {
    return this.myBehaviorStatus.asObservable();
  }

  geListYears() {
    this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
      let value = data.data || [];
      this.setValueYear(value)
    })
  }

  getListStatus() {
    this._serviceApi.execServiceLogin("77764830-776F-4B85-9D89-C2DA941AA471", null).subscribe((data) => {
      let value = data.data || [];
      this.setValueStatus(value)
    })
  }



}
