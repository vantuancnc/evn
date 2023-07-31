import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import {
    AbstractControl,
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
import { BaoCaoThongkeService } from '../baocao-thongke.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from 'app/shared/service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCbkhComponent } from './popup-cbkh/popup-cbkh.component';
import { PageEvent } from '@angular/material/paginator';


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
    public actionType =  null
    public listDonViChuTri = [];
    public listCapQuanLy=[];
    public donViChuTri:String=null;
    public capQuanLy:String=null;
    public linhVucNghienCuu:String=null;
    public listLinhVucNghienCuu:[];
    public phanLoai:String=null;
    public fromNam:number;
    public toNam:number;
    public listPhanLoai=[];
    public form: FormGroup;
	public loaiThongKe:String=null;
    public loaiTimKiem:String=null;
    public actionSearch:String=null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _messageService: MessageService,
        public _router: Router,
        private _serviceApi: ServiceService,
        public dialog: MatDialog
    ) {
        this.initForm();
        this._activatedRoute.queryParams
        .subscribe(params => {
          if(params?.type){
            this.actionType = params?.type
          }else{
            this.actionType =null
          }
          if(params?.search){
            this.actionSearch = params?.search
          }else{
            this.actionSearch =null
          }
          if(this.actionSearch=="TKKHOAHOC"){
            this.loaiTimKiem ="DETAI";
            this.loaiThongKe="KHOAHOC"
          }else if(this.actionSearch=="TKDETAI"){
            this.loaiTimKiem ="DETAI";
            this.loaiThongKe="CAPDETAI"
          }else if(this.actionSearch=="TKDONVI"){
            this.loaiTimKiem ="DETAI";
            this.loaiThongKe="CAPDONVI"
          }else if(this.actionSearch=="TKAPDUNG"){
            this.loaiTimKiem ="SANGKIEN";
            this.loaiThongKe="KHOAHOC"
          }else if(this.actionSearch=="TKSANGKIEN"){
            this.loaiTimKiem ="SANGKIEN";
            this.loaiThongKe="CAPDETAI"
          }else if(this.actionSearch=="TKSKDONVI"){
            this.loaiTimKiem ="SANGKIEN";
            this.loaiThongKe="CAPDONVI"
          }
          
        }
      );
    }


    ngOnInit(): void {
        this.geListYears();
        this.getlistDonViChuTri();
        this.getListCapQuanLy();
        this.getListPhanLoai();
    }
    newLinhVuc(){

    }
    initForm() {
        this.form = this._formBuilder.group({
            linhVuc: this._formBuilder.array([])
        })
    }
    getlistDonViChuTri(){
       this._serviceApi.execServiceLogin("D3F0F915-DCA5-49D2-9A5B-A36EBF8CA5D1", null).subscribe((data) => {
            this.listDonViChuTri = data.data || [];
        })
    }
    getListCapQuanLy() {
        this._serviceApi
            .execServiceLogin('2977F0EA-A6C6-4A32-A36B-8617898B710D', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listCapQuanLy = data.data || [];
            });
    }

    geListYears() {
        var obj = { "NAME": 0, "ID": 0 };
        var year = (new Date()).getFullYear();
        var yearStart = 2023;
        var yearEnd = year + 10;
        for (let i = yearStart; i <= yearEnd; i++) {
            obj = { "NAME": i, "ID": i }
            this.listYears.push(obj);
        }
        this.fromNam = (new Date()).getFullYear();
        this.toNam = (new Date()).getFullYear();
    }

    getListLinhVucNghienCuu() {
        this._serviceApi
            .execServiceLogin('FF1D2502-E182-4242-A754-BCCC29B70C61', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listLinhVucNghienCuu = data.data || [];
            });
    }

    getListPhanLoai() {
        let obj ={"ID":"GIAOKY","NAME":"Nhiệm vụ được giao/ ký hợp đồng thực hiện"}
        this.listPhanLoai.push(obj);
        obj ={"ID":"NHIEMTHU","NAME":"Nhiệm vụ được nghiệm thu"}
        this.listPhanLoai.push(obj);
    }

    timKiem(){
        let obj={
			loaiThongKe:this.loaiThongKe,
            donViChuTri: this.donViChuTri,
            capQuanLy: this.capQuanLy,
            linhVucNghienCuu: this.linhVucNghienCuu,
            phanLoai:this.phanLoai,
            fromNam:this.fromNam,
            toNam:this.toNam,
        }
        this._serviceApi.execServiceLogin("8EA6E3A8-860D-46A9-98B6-AD215E62FE45", [{"name":"LOAI_TIM_KIEM","value":this.loaiTimKiem},{"name":"TIM_KIEM","value":JSON.stringify(obj)},{"name":"PAGE_NUM","value":this.pageIndex},{"name":"PAGE_ROW_NUM","value":this.pageSize}]).subscribe((data) => {
            debugger;
           console.log(data.data);
            this.form.patchValue(data.data);
            let formDocParent = this.form.get(
              'linhVuc'
          ) as FormArray;

          if (data.data != null && data.data.length >0) {
            for (let i = 0; i < data.data.length; i++) {
                formDocParent.push(
                    this.addListDocParent(data.data[i])
                );
                if (
                    data.data[i].listData != null &&
                    data.data[i].listData.length > 0
                ) {
                    let formChild = formDocParent
                        .at(i)
                        .get('listData') as FormArray;
                    for (
                        let j = 0;
                        j < data.data[i].listData.length;
                        j++
                    ) {
                        formChild.push(
                            this.addListDocChild(
                                data.data[i].listData[j]
                            )
                        );
                    }
                }
            }
        }
        console.log(this.form);
        })
    }

    addListDocParent(item?: any) {
      return this._formBuilder.group({
        tenLinhVuc: item?.tenLinhVuc || null,
        listData: this._formBuilder.array([]),
      });
  }

  addListDocChild(item?: any) {
      return this._formBuilder.group({
        capQuanLy: item?.capQuanLy || null,
        donViChuTri: item?.donViChuTri || null,
        hoatDongKeHoach: item?.hoatDongKeHoach || 0,
        kinhPhi: item?.kinhPhi || null,
        linhVucKhoaHoc: item?.linhVucKhoaHoc || null,
        loaiDeTaiSK: item?.loaiDeTaiSK || null,
        maCapQuanLy: item?.maCapQuanLy || null,
        maDeTaiSK: item?.maDeTaiSK || null,
        maDonViChuTri: item?.maDonViChuTri || null,
        maNghienCuu: item?.maNghienCuu || null,
        nam: item?.nam || null,
        nguonKinhPhi: item?.nguonKinhPhi || null,
        tenChuNhiemTG: item?.tenChuNhiemTG || null,
        tenDeTaiSK: item?.tenDeTaiSK || null,
        tenNghienCuu: item?.tenNghienCuu || null,
        thoiGianThucHien: item?.thoiGianThucHien || null,
      });
  }

    length = 0;
    pageSize = 20;
    pageIndex = 0;
    pageSizeOptions = [10, 20, 50,100];
    showFirstLastButtons = true;
  
    handlePageEvent(event: PageEvent) {
      this.length = event.length;
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.timKiem();

    }

    openAlertDialog() {
        this.dialog.open(PopupCbkhComponent, {
            data: {
                message: 'HelloWorld',
                buttonText: {
                    cancel: 'Done'
                }
            },
            width: '800px',
            panelClass: 'custom-PopupCbkh',
            position: {
                top: '100px',
            }
        });
    }


}
