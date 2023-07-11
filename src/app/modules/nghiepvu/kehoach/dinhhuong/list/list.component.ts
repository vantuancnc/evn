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
       // this.getListDinhHuong();
    }


    onApiSelected(object: any): void {

    }

    addNew(): void {
        this.actionClick = 'THEMMOI';
    }


    getListDinhHuong() {
        this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":""},{"name":"NAM","value":""},{"name":"ORGID","value":"115"}]).subscribe((data) => {
           console.log(data);
            this.listDinhHuong = data.data || [];
        })
    }

    timKiem(){
        this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":this.selectedStatus},{"name":"NAM","value":this.selectedYear},{"name":"ORGID","value":"115"}]).subscribe((data) => {
            console.log(data);
             this.listDinhHuong = data.data || [];
         })
    }


    ngOnDestroy() {
        this.getDinhHuongSubcription.unsubscribe()
        this.getYearSubscription.unsubscribe()
        this.getStatusSubscription.unsubscribe()
    }


}
