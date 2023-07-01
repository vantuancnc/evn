import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { ApiDinhHuongService } from '../listdinhhuong.service';
import { ApiDinhHuongComponent } from '../listdinhhuong.component';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ApiDinhHuongListComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public selectedStatust: string;
    public actionClick:string = null;
    public listYears = [
        { id: 2024, name: '2024' },
        { id: 2023, name: '2023' },
        { id: 2022, name: '2022' },
        { id: 2021, name: '2021' },
        { id: 2020, name: '2020' },
        { id: 2019, name: '2019' },
        { id: 2018, name: '2018' },
        { id: 2017, name: '2017' }
    ];

    public listStatus = [
        { id: 'TATCA', name: 'Tất cả' },
        { id: 'CHUAGUI', name: 'Chưa gửi' },
        { id: 'CHOPHEDUYET', name: 'Chờ phê duyệt' },
        { id: 'DADUYET', name: 'Đã duyệt' },
        { id: 'YEUCAUHIEUCHINH', name: 'Yêu cầu hiệu chỉnh' },
    ];

    /**
     * Constructor
     */
    constructor(
        public _nguonDuLieuComponent: ApiDinhHuongComponent,
        private _nguonDuLieuService: ApiDinhHuongService,
        private _messageService: MessageService,
        private _userService: UserService,
        public _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _functionService: FunctionService,
        private el: ElementRef
    ) {
    }

    ngOnInit(): void {

    }


    ngOnDestroy(): void {

    }

    onApiSelected(object: any): void {

    }

    addNew():void{
        this.actionClick ='THEMMOI';
    }


}
