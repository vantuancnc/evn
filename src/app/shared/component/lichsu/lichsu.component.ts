import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.component.html',
  styleUrls: ['./lichsu.component.scss']
})
export class LichsuComponent implements OnInit {

  public title ='LỊCH SỬ PHÊ DUYỆT, CẬP NHẬP ĐỊNH HƯỚNG ĐĂNG KÝ';
  @Input() title_lichsu;
  constructor() { }

  ngOnInit(): void {
  }
  

}
