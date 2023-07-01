import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { ApiPheDuyetDinhHuongService } from '../pheduyetdinhhuong.service';
import { ApiPheDuyetDinhHuongComponent } from '../pheduyetdinhhuong.component';
import { ServiceService } from 'app/shared/service/service.service';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ApiPheduyetdinhhuongListComponent implements OnInit {

    public selectedYear: number;
    public selectedStatus: string;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getStatusSubscription: Subscription;
    public getPheDuyetSubcription: Subscription;
    public listYears = [];
    public listStatus = [];
    public listPheDuyet = [];
    public checked;

    /**
     * Constructor
     */
    constructor(
        private _messageService: MessageService,
        private _userService: UserService,
        public _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _functionService: FunctionService,
        private el: ElementRef,
        private _serviceApi: ServiceService,
    ) {
    }

    ngOnInit(): void {
        this.geListYears()
        this.getListStatus()
        this.getListPheduyet()
    }

    addNew(): void {
        this.actionClick = 'THEMMOI';
    }


    geListYears() {
        this.getYearSubscription = this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
            this.listYears = data.data || [];
        })
    }

    getListStatus() {
        this.getStatusSubscription = this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
            this.listStatus = data.data || [];
        })
    }

    getListPheduyet() {
        this.getPheDuyetSubcription = this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
            this.listPheDuyet = data.data || [];
        })
    }


    ngOnDestroy() {
        this.getYearSubscription.unsubscribe();
        this.getStatusSubscription.unsubscribe();
        this.getPheDuyetSubcription.unsubscribe()
    }


}
