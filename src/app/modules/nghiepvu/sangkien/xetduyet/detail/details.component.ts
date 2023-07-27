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
import { xetduyetService } from '../xetduyet.service';
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
export class DetailsComponent implements OnInit {
    public selectedYear: number;
    public getYearSubscription: Subscription;
    public listYears = [];
    public actionType = null;
    public form;
    public method;
    public idParam;
    public submitted = { check: false };

    constructor(
        private _formBuilder: UntypedFormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _messageService: MessageService,
        public _router: Router,
        private _serviceApi: ServiceService,
        public dialog: MatDialog
    ) {
        this.initFormUpdateActionHDXDCN();
        this.initFormUpdateActionKQXDCN();
        this.idParam = this._activatedRoute.snapshot.paramMap.get('id');
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params?.type) {
                this.actionType = params?.type;
            } else {
                this.actionType = null;
            }
            if (this.actionType == 'updateActionRaSoat') {
                this.method = 'RASOAT';
            } else  if (this.actionType == 'updateActionHDXDCN') {
                this.method = 'HOIDONGXD';
            }  else  if (this.actionType == 'updateActionKQXDCN') {
                this.method = 'KETQUAXD';
            }  else  if (this.actionType == 'updateActionKQ') {
                this.method = 'CHUNGNHANSK';
            } 
            console.log(this.actionType);
            this.detail(this.method);
        });
    }
    detail(method) {
        this._serviceApi
            .execServiceLogin('F360054F-7458-443A-B90E-50DB237B5642', [
                { name: 'MA_DE_TAI', value: this.idParam },
                { name: 'METHOD_BUTTON', value: method },
            ])
            .subscribe((data) => {
                this.form.patchValue(data.data);
            });
    }

    initFormUpdateActionHDXDCN() {
        this.form = this._formBuilder.group({
            tenGiaiPhap: [null, [Validators.required]],
            capDoSangKien: [null],
            nam: [null],
            tacGia: [null],
            donViCongTac: [null],
            donViThucHien: [null],
            vanBan: this._formBuilder.array([]),
            thanhVien: this._formBuilder.array([]),
            trangThai: [null],
        });
    }

    initFormUpdateActionKQXDCN() {
        this.form = this._formBuilder.group({
            tenGiaiPhap: [null, [Validators.required]],
            capDoSangKien: [null],
            nam: [null],
            tacGia: [null],
            donViCongTac: [null],
            donViThucHien: [null],
            quyetDinhThanhLapHoiDing: [null],
            diemHop: [null],
            thoiGianHop: [null],
            ketQuaPhieuDanhGia: [null],
            thuLaoTacGia: [null],
            thuLaoChoNguoiLanDau: [null],
            thoaThuanChiPhi: [null],
            trangThai: [null],
            luanGiaiHoiDong: [null],
            kienNghiHoiDong: [null],
            phieuDanhGia: [null],
            bienBan: [null],
            guiMail: [false],
        });
    }

    ngOnInit(): void {
        this.geListYears();
        this._messageService.showSuccessMessage('Thông báo', 'Thành công');
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

    onSubmit() {
        this.submitted.check = true;
        if (this.form.invalid) {
            return;
        }
        console.log(this.form.value);
    }
}
