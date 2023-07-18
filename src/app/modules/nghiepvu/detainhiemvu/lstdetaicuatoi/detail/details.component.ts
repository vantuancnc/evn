import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MessageService } from 'app/shared/message.services';
import { SnotifyToast } from 'ng-alt-snotify';
import { State } from 'app/shared/commons/conmon.types';
import { BaseDetailInterface } from 'app/shared/commons/basedetail.interface';
import { UserService } from 'app/core/user/user.service';
import { BaseComponent } from 'app/shared/commons/base.component';
import { FunctionService } from 'app/core/function/function.service';
import { lstdetaicuatoiService } from '../lstdetaicuatoi.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from 'app/shared/service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCbkhComponent } from './popup-cbkh/popup-cbkh.component';

@Component({
    selector: 'component-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class LstdetaicuatoiDetailsComponent implements OnInit {
    public selectedYear: number;
    public getYearSubscription: Subscription;
    public listYears = [];
    public actionType: string = null;
    public form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _messageService: MessageService,
        public _router: Router,
        private _serviceApi: ServiceService,
        public dialog: MatDialog
    ) {
        this.initForm()
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params?.type) {
                this.actionType = params?.type;
            } else {
                this.actionType = null;
            }
        });
    }

    initForm() {
        this.form = this._formBuilder.group({
            TENDETAI: [null, [Validators.required]],
            CANCUTHUCHIEN: [null],
            CAPQUANLY: [null, [Validators.required]],
            VANBANCHIDAOSO: [null],
            LINHVUCNGHIENCUU: this._formBuilder.array([]),
            DONVICHUTRI: [null, [Validators.required]],
            THOIGIANTHUCHIENTU: [null, [Validators.required]],
            THOIGIANTHUCHIENDEN: [null, [Validators.required]],

            CHUNHIEMDETAI: [null, [Validators.required]],
            GIOTINH: [null],
            HOCHAM: [null],
            HOCVI: [null],
            DONVICONGTAC: [null],

            DONGCHUNHIEMDETAI: [null, [Validators.required]],
            GIOTINH_DONGCHUNHIEM: [null],
            HOCHAM_DONGCHUNHIEM: [null],
            HOCVI_DONGCHUNHIEM: [null],
            DONVICONGTAC_DONGCHUNHIEM: [null],

            THUKYDETAI: [null],
            GIOTINH_THUKY: [null],
            HOCHAM_THUKY: [null],
            HOCVI_THUKY: [null],
            DONVICONGTAC_THUKY: [null],

            DANHSACH_THANHVIEN: this._formBuilder.array([this.THEM_THANHVIEN()]),

            NGUONKINHPHI: [null, [Validators.required]],
            TONGKINHPHI: [null, [Validators.required]],
            PHHUONGTHUCKHOANCHI: [null],
            KINHPHIKHOAN: [null],
            KHINHPHIKHONGKHOAN: [null],

            TINHCAPTHIETCUA_DETAI_NHIEMVU: [null],
            MUCTIEU: [null],
            NHIEMVUVAPHAMVINGHIENCUU: [null],
            KETQUADUKIEN: [null],
            KIENNGHIDEXUAT: [null],

            LIST_FILE1: this._formBuilder.array([]),
            LIST_FILE2: this._formBuilder.array([]),
            LIST_FILE3: this._formBuilder.array([]),
            LIST_FILE4: this._formBuilder.array([]),
            LIST_FILE5: this._formBuilder.array([]),
            LIST_FILE6: this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {
        this.geListYears();
        this._messageService.showSuccessMessage('Thông báo', 'Thành công');
        console.log(this.actionType);
    }

    geListYears() {
        this.getYearSubscription = this._serviceApi
            .execServiceLogin('E5050E10-799D-4F5F-B4F2-E13AFEA8543B', null)
            .subscribe((data) => {
                this.listYears = data.data || [];
            });
    }

    openAlertDialog() {
        this.dialog.open(PopupCbkhComponent, {
            data: {
                message: 'HelloWorld',
                buttonText: {
                    cancel: 'Done',
                },
            },
            width: '800px',
            panelClass: 'custom-PopupCbkh',
            position: {
                top: '100px',
            },
        });
    }


    THEM_THANHVIEN(): FormGroup {
        return this._formBuilder.group({
          TEN: 'LE VAN A',
          CHUCDANH: ' GIAM DOC',
          SODIENTHOAI: '03921983',
          EMAIL:'email',
          DONVICONGTAC:'baoiv'
        });
    }

    onSubmit(){
     console.log(this.form.value);
     

    }
}
