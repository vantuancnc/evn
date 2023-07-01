import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'app/shared/message.services';
import { SnotifyToast } from 'ng-alt-snotify';
import { State } from 'app/shared/commons/conmon.types';
import { BaseDetailInterface } from 'app/shared/commons/basedetail.interface';
import { UserService } from 'app/core/user/user.service';
import { BaseComponent } from 'app/shared/commons/base.component';
import { FunctionService } from 'app/core/function/function.service';
import { ApiDinhHuongService } from '../listdinhhuong.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'component-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class ApiDinhHuongDetailsComponent  implements OnInit {

    public selectedYear: number;
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

    constructor(
        private _formBuilder: UntypedFormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _router: Router,
    ) {

    }


    ngOnInit(): void {

    }

}
