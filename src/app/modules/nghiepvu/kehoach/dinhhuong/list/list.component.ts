import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, of, Subscription, switchMap, take, tap, throwError } from 'rxjs';

import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { ListdinhhuongService } from '../listdinhhuong.service';
import { ApiDinhHuongComponent } from '../listdinhhuong.component';
import { ServiceService } from 'app/shared/service/service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ApiDinhHuongListComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public selectedStatus: string;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getStatusSubscription: Subscription;
    public getDinhHuongSubcription: Subscription;
    public listYears = [];
    public listStatus = [];
    public listDinhHuong = [];

    /**
     * Constructor
     */
    constructor(
        public _nguonDuLieuComponent: ApiDinhHuongComponent,
        private _nguonDuLieuService: ListdinhhuongService,
        private _messageService: MessageService,
        private _userService: UserService,
        public _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _functionService: FunctionService,
        private _serviceApi: ServiceService,
        private _listdinhhuongService: ListdinhhuongService,
        private el: ElementRef
    ) {

        this._activatedRoute.queryParams
        .subscribe(params => {
          if(params?.type){
            this.actionClick = params?.type
          }else{
            this.actionClick = null
          }
        }
      );

    }

    ngOnInit() {
        this.getYearSubscription = this._listdinhhuongService.getValueYear().subscribe((values: any) => {
            if (values){
                this.listYears = values;
            }
               
        })
        this.getStatusSubscription = this._listdinhhuongService.getValueStatus().subscribe((values: any) => {
            if (values)
                this.listStatus = values;
        })
        this.selectedYear=(new Date()).getFullYear();
        this.selectedStatus='';
        this.timKiem();
    }


    onApiSelected(object: any): void {

    }

    addNew(): void {
        this._router.navigate(
            ['/nghiepvu/kehoach/dinhhuong'],
            { queryParams: { type: 'THEMMOI' } }
          );
    }

    detail(item){
        this._router.navigate(
            ['/nghiepvu/kehoach/dinhhuong'],
            { queryParams: { type: 'CHITIET' } }
          );
    }
    
    editer(item){
        this._router.navigate(
            ['/nghiepvu/kehoach/dinhhuong'],
            { queryParams: { type: 'CHINHSUA' } }
          );
    }
    


    // getListDinhHuong() {
    //     this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":""},{"name":"NAM","value":(new Date()).getFullYear()},{"name":"ORGID","value":"115"}]).subscribe((data) => {
    //        console.log(data);
    //         this.listDinhHuong = data.data || [];
    //     })
    // }

    timKiem(){
        this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":this.selectedStatus},{"name":"MA_TRANG_THAI_LIST","value":"SOAN,CHO_PHE_DUYET,Y_CAU_HIEU_CHINH,DA_PHE_DUYET"},{"name":"NAM_LIST","value":""},{"name":"NAM","value":this.selectedYear},{"name":"ORGID","value":"115"},{"name":"PAGE_NUM","value":this.pageIndex},{"name":"PAGE_ROW_NUM","value":this.pageSize}]).subscribe((data) => {
            this.listDinhHuong = data.data || [];
             if(data.data != null && data.data.length >0){
                this.length = data.data[0].TotalPage;
             }
             
         })
    }


    ngOnDestroy() {
        this.getDinhHuongSubcription.unsubscribe()
       // this.getYearSubscription.unsubscribe()
        this.getStatusSubscription.unsubscribe()
    }

     //phân trang
     length = 0;
     pageSize = 20;
     pageIndex = 0;
     pageSizeOptions = [10, 20, 50,100];
     showFirstLastButtons = true;
   
     handlePageEvent(event: PageEvent) {
       this.length = event.length;
       this.pageSize = event.pageSize;
       this.pageIndex = event.pageIndex;
       debugger;
       this.timKiem();

     }


}
