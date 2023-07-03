import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, RequiredValidator, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'app/shared/message.services';
import { SnotifyToast } from 'ng-alt-snotify';
import { State } from 'app/shared/commons/conmon.types';
import { BaseDetailInterface } from 'app/shared/commons/basedetail.interface';
import { UserService } from 'app/core/user/user.service';
import { BaseComponent } from 'app/shared/commons/base.component';
import { FunctionService } from 'app/core/function/function.service';
import { ListdinhhuongService } from '../listdinhhuong.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from 'app/shared/service/service.service';
@Component({
    selector: 'component-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class ApiDinhHuongDetailsComponent implements OnInit {

    public selectedYear: number;
    public selectedStatus: string;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getStatusSubscription: Subscription;
    public listYears = [];
    public listStatus = [];
    public form;

    constructor(
        private _formBuilder: FormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _router: Router,
        private _serviceApi: ServiceService,
    ) {

    }


    ngOnInit() {
        this.initForm()
        this.geListYears()
        this.getListStatus()
        console.log(this.form.value);

    }

    initForm() {
        this.form = this._formBuilder.group({
            name: [null, [Validators.required]],
            year: [null, [Validators.required]]
        }
        )
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



    ngOnDestroy() {
        this.getYearSubscription.unsubscribe();
        this.getStatusSubscription.unsubscribe();
    }
    onSubmit() {

    }

}
