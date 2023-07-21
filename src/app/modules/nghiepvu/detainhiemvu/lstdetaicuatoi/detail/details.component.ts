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
    public selectedLinhVucNghienCuu:[];
    public listLinhVucNghienCuu;

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
            tenDeTai: [null, [Validators.required]],
            canCuThucHien: [null],
            capQuanLy: [null, [Validators.required]],
            vanBanChiDaoSo: [null],
            linhVucNghienCuu:[],
            //LINHVUCNGHIENCUU: this._formBuilder.array([]),
            donViChuTri: [null, [Validators.required]],
            thoiGianThucHienTu: [null, [Validators.required]],
            thoiGianThucHienDen: [null, [Validators.required]],

            chuNhiemDeTai: [null, [Validators.required]],
            gioiTinh: [null],
            hocHam: [null],
            hocVi: [null],
            donViCongTac: [null],

            dongChuNhiemDeTai: [null, [Validators.required]],
            gioiTinhDongChuNhiem: [null],
            hocHamDongChuNhiem: [null],
            hocViDongChuNhiem: [null],
            donViCongTacDongChuNhiem: [null],

            thuKyDeTai: [null],
            gioiTinhThuKy: [null],
            hocHamThuKy: [null],
            hocViThuKy: [null],
            donViCongTacThuKy: [null],

            danhSachThanhVien: this._formBuilder.array([this.THEM_THANHVIEN()]),

            nguonKinhPhi: [null, [Validators.required]],
            tongKinhPhi: [null, [Validators.required]],
            phuongThucKhoanChi: [null],
            kinhPhiKhoan: [null],
            kinhPhiKhongKhoan: [null],

            tinhCapThietCuaDeTaiNhiemVu: [null],
            mucTieu: [null],
            nhiemVuVaPhamViNghienCuu: [null],
            ketQuaDuKien: [null],
            kienNghiDeXuat: [null],

            listFile1: this._formBuilder.array([]),
            listFile2: this._formBuilder.array([]),
            listFile3: this._formBuilder.array([]),
            listFile4: this._formBuilder.array([]),
            listFile5: this._formBuilder.array([]),
            listFile6: this._formBuilder.array([]),
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
          ten: 'LE VAN A',
          chucDanh: ' GIAM DOC',
          soDienThoai: '03921983',
          email:'email',
          donViCongTac:'baoiv'
        });
    }

    onSubmit(){
     console.log(this.form.value);
     

    }
}
