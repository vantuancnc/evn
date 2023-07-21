import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MessageService } from 'app/shared/message.services';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'app/shared/commons/conmon.types';
import { FunctionService } from 'app/core/function/function.service';
import { lstdetaicuatoiService } from '../lstdetaicuatoi.service';
import { LstdetaicuatoiComponent } from '../lstdetaicuatoi.component';
import { ServiceService } from 'app/shared/service/service.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupFileComponent } from 'app/shared/component/popup-file/popup-filecomponent';

@Component({
    selector: 'component-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class LstdetaicuatoiListComponent implements OnInit, OnDestroy {

    public selectedYear: number;
    public actionClick: string = null;
    public getYearSubscription: Subscription;
    public getGiaoSubcription: Subscription;
    public listYears = [];
    public txtSeach;
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
            this.actionClick = params?.type
          }else{
            this.actionClick = null
          }
          console.log(this.actionClick);
          
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

   detail(item){
    this._router.navigate(
        ['/nghiepvu/detainhiemvu/lstdetaicuatoi'],
        { queryParams: { type: 'CHITIET' } }
      );
   }

   lichsu(item){
    this._router.navigate(
        ['/nghiepvu/detainhiemvu/lstdetaicuatoi'],
        { queryParams: { type: 'LICHSU' } }
      );
   }

   editer(item){
    this._router.navigate(
        ['/nghiepvu/detainhiemvu/lstdetaicuatoi'],
        { queryParams: { type: 'CHINHSUA' } }
      );
   }
   TimKiem(){

   }
   
}
