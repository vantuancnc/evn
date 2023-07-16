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
import { PageEvent } from '@angular/material/paginator';
import { ListdinhhuongService } from '../../dinhhuong/listdinhhuong.service';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ApiPheduyetdinhhuongListComponent implements OnInit {

    public selectedYear: [number];
    public selectedStatus: string;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getStatusSubscription: Subscription;
    public getPheDuyetSubcription: Subscription;
    public listYears = [];
    public listStatus = [];
    public listPheDuyet = [];
    public checked;
    public getDinhHuongSubcription: Subscription;
    public listDinhHuong = [];
    public selectedGrid:String;
    /**
     * Constructor
     */
    constructor(
        public _nguonDuLieuComponent: ApiPheDuyetDinhHuongComponent,
        private _nguonDuLieuService: ListdinhhuongService,
        private _messageService: MessageService,
        private _userService: UserService,
        public _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _functionService: FunctionService,
        private _serviceApi: ServiceService,
        private _listdinhhuongService: ListdinhhuongService,
        private el: ElementRef
    ) {
    }

    ngOnInit() {

        this.actionClick = null;
        this._listdinhhuongService.getValueYear().subscribe((values: any) => {
            if (values){
                this.listYears = values;
                this.listYears.push({"NAME":2024,"ID":2024});
                this.listYears.push({"NAME":2025,"ID":2025})
            }
               
        })
        // this.getStatusSubscription = this._listdinhhuongService.getValueStatus().subscribe((values: any) => {
        //     if (values)
        //         this.listStatus = values;
        // })
        this.listStatus =[{"MA_TRANG_THAI":"","TEN_TRANG_THAI":"Tất cả"},
            {"MA_TRANG_THAI":"Y_CAU_HIEU_CHINH","TEN_TRANG_THAI":"Yêu cầu hiệu chỉnh"},
        {"MA_TRANG_THAI":"CHO_PHE_DUYET","TEN_TRANG_THAI":"Chờ phê duyệt"},
        {"MA_TRANG_THAI":"DA_PHE_DUYET","TEN_TRANG_THAI":"Đã duyệt"}]
        this.selectedYear =[((new Date()).getFullYear())];
        this.selectedStatus='';
        this.timKiem();
    }


    onApiSelected(object: any): void {

    }

    addNew(): void {
        this.actionClick = 'THEMMOI';
    }

    tonghop(status){
        this.addNew();
        this.selectedGrid="355B4604-D23D-4A64-8E24-B96085F0B0E4";
        this._router.navigateByUrl('nghiepvu/kehoach/pheduyetdinhhuong/'+this.selectedGrid+"?type="+status);
    }


    // getListDinhHuong() {
    //     this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":""},{"name":"NAM","value":(new Date()).getFullYear()},{"name":"ORGID","value":"115"}]).subscribe((data) => {
    //        console.log(data);
    //         this.listDinhHuong = data.data || [];
    //     })
    // }

    timKiem(){
        let nam ="";
         if(this.selectedYear != null && this.selectedYear.length >0 ){
            nam = this.selectedYear.join(',');
         }
        
         this.selectedYear 
        this.getDinhHuongSubcription = this._serviceApi.execServiceLogin("F217F0FD-B9AA-4ADC-9EDE-75717D8484FD", [{"name":"MA_TRANG_THAI","value":this.selectedStatus},{"name":"MA_TRANG_THAI_LIST","value":"CHO_PHE_DUYET,Y_CAU_HIEU_CHINH,DA_PHE_DUYET"},{"name":"NAM_LIST","value":nam},{"name":"NAM","value":""},{"name":"ORGID","value":"115"},{"name":"PAGE_NUM","value":this.pageIndex},{"name":"PAGE_ROW_NUM","value":this.pageSize}]).subscribe((data) => {
            this.listDinhHuong = data.data || [];
             if(data.data != null && data.data.length >0){
                this.length = data.data[0].TotalPage;
             }
             
         })
    }


    ngOnDestroy() {
        this.getDinhHuongSubcription.unsubscribe()
        //this.getYearSubscription.unsubscribe()
        this.getStatusSubscription.unsubscribe()
    }

     //phân trang
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

}
