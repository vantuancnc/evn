import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { NghiemThuService } from '../nghiemthu.service';
import { NghiemthuComponent } from '../nghiemthu.component';
import { ServiceService } from 'app/shared/service/service.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupFileComponent } from 'app/shared/component/popup-file/popup-filecomponent';
import { PopupConfirmComponent } from 'app/shared/component/popup-confirm/popup-confirmcomponent';
import { SnotifyToast } from 'ng-alt-snotify';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListItemComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public actionClick: string = null; 
    public getYearSubscription: Subscription;
    public getGiaoSubcription: Subscription;
    public listYears = [];
    public listGiao = [];
    public ListFleDemo = [
        {id:1,name:'ten_file',kichthuoc:'20mb'},
        {id:2,name:'ten_file1',kichthuoc:'20mb'},
        {id:3,name:'ten_file2',kichthuoc:'20mb'}
    ]


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
        public dialog: MatDialog
    ) {

        this._activatedRoute.queryParams
        .subscribe(params => {
          if(params?.type){
            this.actionClick = params?.type;
          }else{
            this.actionClick = null
          }
        }
      );
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
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/lstdetaicuatoi'],
            { queryParams: { type: 'THEMMOI' } }
          );
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
    //phân trang
    length = 500;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];
    showFirstLastButtons = true;
  
    handlePageEvent(event: PageEvent) {
      this.length = event.length;
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }

   // mo popup file
    openAlertDialog() {
        this.dialog.open(PopupFileComponent, {
            data: {
                listFile:this.ListFleDemo
            },
            width: '800px',
            panelClass: 'custom-PopupCbkh',
            position: {
                top: '100px',
            }
        });
    }


  
    // editer(item){
    //     this._router.navigate(
    //         ['/nghiepvu/detainhiemvu/nghiemthu'],
    //         { queryParams: { type: 'CHINHSUA' } }
    //       );
    // }

    // detail(item){
    //     this._router.navigate(
    //         ['/nghiepvu/detainhiemvu/lstdetaicuatoi'], 
    //         { queryParams: { type: 'CHITIET' } }
    //       );
    // }

    updateActionHSTH(item){
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/lstdetaicuatoi/'+item.maDeTai],
            { queryParams: { type: 'updateActionHSTH' } }
          );
    }
    updateActionHD(item) {
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/xetduyet/' + item.maDeTai],
            { queryParams: { type: 'updateActionHD' } }
        );
    }

    updateActionKQ(item) {
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/xetduyet/' + item.maDeTai],
            { queryParams: { type: 'updateActionKQ' } }
        );
    }


    updateActionKQNT(item){
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/nghiemthu'],
            { queryParams: { type: 'updateActionKQNT' } }
          );
    }
    updateActionHSQT(item){

        this._router.navigate(
          ['/nghiepvu/detainhiemvu/lstdetaicuatoi/'+item.maDeTai],
          { queryParams: { type: 'updateActionHSQT' } }
        );
      
      }
      editer(item){
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/lstdetaicuatoi/'+item.maDeTai],
            { queryParams: { type: 'CHINHSUA',screen:"/nghiepvu/detainhiemvu/lstdetaicuatoi/"  } }
          );
       }
       detail(item){
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/lstdetaicuatoi/'+item.maDeTai],
            { queryParams: { type: 'CHITIET' } }
          );
       }
    
       xoa(item){
        this._messageService.showConfirm("Thông báo", "Bạn chắc chắn muốn xóa \"" + item.tenDeTai + "\"", (toast: SnotifyToast) => {
          this._messageService.notify().remove(toast.id);
          this._serviceApi.execServiceLogin("9A2E2C8E-72F8-41E1-BEF7-A14E4FF5DF62", [{"name":"MA_DE_TAI","value":item.tenDeTai},{"name":"USERID","value":"STR"}]).subscribe((data) => {
            console.log(data);
            switch (data.data) {
                              case 1:
                                  this._messageService.showSuccessMessage("Thông báo", "Xóa bản đăng ký thành công");
                                  break;
                              case 0:
                                  this._messageService.showErrorMessage("Thông báo", "Không tìm thấy bản đăng ký cần xóa");
                                  break;
                              case -1:
                                  this._messageService.showErrorMessage("Thông báo", "Xảy ra lỗi khi thực hiện xóa bản đăng ký");
                                  break;
                          }
           })
        })
       }

    timKiem() {
        let obj={
            capQuanLy:'',
            q:""
        }
        this._serviceApi
            .execServiceLogin('F2F9604E-336C-47FB-BA0B-53A4D3869795', [
                { name: 'LOAI_TIM_KIEM', value: 'NGHIEMTHU' },
                { name: 'TIM_KIEM', value: JSON.stringify(obj) },
                { name: 'PAGE_NUM', value: this.pageIndex },
                { name: 'PAGE_ROW_NUM', value: this.pageSize },
            ])
            .subscribe((data) => {
                this.listGiao = data.data || [];
            });
    }
    lichsu(item){
        this._router.navigate(
            ['/nghiepvu/detainhiemvu/lstdetaicuatoi/'+item.maDeTai],
            { queryParams: { type: 'LICHSU', title:'LỊCH SỬ PHÊ DUYỆT, CẬP NHẬP ĐỊNH HƯỚNG ĐĂNG KÝ' } }
          );
       }
}
