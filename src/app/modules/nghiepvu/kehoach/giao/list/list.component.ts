import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { ApiGiaoService } from '../giao.service';
import { ApiGiaoComponent } from '../giao.component';
import { ServiceService } from 'app/shared/service/service.service';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ApiGiaoListComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getGiaoSubcription: Subscription;
    public listYears = [];
    public listGiao = [];


    /**
     * Constructor
     */
    constructor(
        public _nguonDuLieuComponent: ApiGiaoComponent,
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
        this.geListYears();
        this.getListDinhHuong()
    }

    geListYears() {
        this.getYearSubscription = this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
            this.listYears = data.data || [];
        })
    }


    addNew(): void {
        this.actionClick = 'THEMMOI';
    }

    ngOnDestroy() {
        this.getYearSubscription.unsubscribe()
        this.getGiaoSubcription.unsubscribe();
    }

    getListDinhHuong() {
        this.getGiaoSubcription = this._serviceApi.execServiceLogin("E5050E10-799D-4F5F-B4F2-E13AFEA8543B", null).subscribe((data) => {
            this.listGiao = data.data || [];
        })
    }
}
