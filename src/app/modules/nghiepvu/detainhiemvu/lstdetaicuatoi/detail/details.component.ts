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
    public listCapQuanLy = [];
    public listDonViChuTri = [];
    public listGioiTinh = [];
    public listHocHam = [];
    public listHocVi = [];
    public listDonViCongTac = [];
    public listNguonKinhPhi = [];
    public listKhoanChi = [];
    public listChucDanh = [];
    
    public actionType: string = null;
    public form: FormGroup;
    public title_lichsu;
    public selectedLinhVucNghienCuu:[];
    public listLinhVucNghienCuu;
    public listFolderFile:[{TEN_LOAI_FILE:"",listFile:[]}];

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
            console.log(params);
            
            if (params?.type) {
                this.actionType = params?.type;
            } else {
                this.actionType = null;
            }
            if (params?.title) {
                 this.title_lichsu = params?.title;
            }
        });
    }

    initForm() {
        this.form = this._formBuilder.group({
            tenDeTai: [null, [Validators.required]],
            canCuThucHien: [null],
            keHoach: [null],
            capQuanLy: [null, [Validators.required]],
            vanBanChiDaoSo: [null],
            linhVucNghienCuu:[],
            //LINHVUCNGHIENCUU: this._formBuilder.array([]),
            donViChuTri: [null, [Validators.required]],
            thoiGianThucHienTu: [null, [Validators.required]],
            thoiGianThucHienDen: [null, [Validators.required]],

            chuNhiemDeTaiInfo:"",
            chuNhiemDeTai: [null, [Validators.required]],
            gioiTinh: [null],
            hocHam: [null],
            hocVi: [null],
            donViCongTac: [null],

            dongChuNhiemDeTaiInfo:"",
            dongChuNhiemDeTai: [null, [Validators.required]],
            gioiTinhDongChuNhiem: [null],
            hocHamDongChuNhiem: [null],
            hocViDongChuNhiem: [null],
            donViCongTacDongChuNhiem: [null],

            thuKyDeTaiInfo:"",
            thuKyDeTai: [null],
            gioiTinhThuKy: [null],
            hocHamThuKy: [null],
            hocViThuKy: [null],
            donViCongTacThuKy: [null],

            danhSachThanhVien: this._formBuilder.array([]),
            danhSachThanhVienHD: this._formBuilder.array([]),

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
            listFolderFile:this._formBuilder.array([]),
            // listFile1: this._formBuilder.array([]),
            // listFile2: this._formBuilder.array([]),
            // listFile3: this._formBuilder.array([]),
            // listFile4: this._formBuilder.array([]),
            // listFile5: this._formBuilder.array([]),
            // listFile6: this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {
        this.getListFolderFile();
        this.getListCapQuanLy();
        this.getListDonViChuTri();
        this.getListHocHam();
        this.getListHocVi();
        this.getListNguonKinhPhi();
        this.getListKhoanChi();
        this.getListLinhVucNghienCuu();
        this.getListGioiTinh();
        this.getListChucDanh();
        this.detail();
       // this._messageService.showSuccessMessage('Thông báo', 'Thành công');
        console.log(this.actionType);
    }

    detail(){
        this._serviceApi
        .execServiceLogin('F360054F-7458-443A-B90E-50DB237B5642', [{"name":"MA_DE_TAI","value":"D52A4F19-1A6F-4B3D-A755-64F34C7AED07"},{"name":"METHOD_BUTTON","value":"CAPNHAT"}])
        .subscribe((data) => {
            console.log(data.data);
            this.form.patchValue(data.data)
           
        })
         }

    geListYears() {
        this.getYearSubscription = this._serviceApi
            .execServiceLogin('E5050E10-799D-4F5F-B4F2-E13AFEA8543B', null)
            .subscribe((data) => {
                this.listYears = data.data || [];
            });
    }

    openAlertDialog(type,item?:any) {
      let data =   this.dialog.open(PopupCbkhComponent, {
            data: {
                type:type,
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

        data.afterClosed().subscribe((data) => {
            if(type=='KEHOACH'){
                console.log('data2', data);
                this.form.get('canCuThucHien').setValue(data.data.name);
                this.form.get('keHoach').setValue(data.data);
            }else if(type=='CHUNHIEM'){
                console.log('data1', data);
                this.form.get('chuNhiemDeTai').setValue(data.data.username);
                this.form.get('chuNhiemDeTaiInfo').setValue(data.data);
                
            }else if(type=='DONGCHUNHIEM'){
                console.log('data1', data);
                this.form.get('dongChuNhiemDeTai').setValue(data.data.username);
                this.form.get('dongChuNhiemDeTaiInfo').setValue(data.data);
                
            }else if(type=='THUKY'){
                console.log('data1', data);
                this.form.get('thuKyDeTai').setValue(data.data.username);
                this.form.get('thuKyDeTaiInfo').setValue(data.data);
                
            }else if(type=='THANHVIEN'){
                console.log('data1', data);
                console.log(item);
                debugger;
               item.get('ten').setValue(data.data.username);
            }
         
           
          });
    }
    


    THEM_THANHVIEN(): FormGroup {
        return this._formBuilder.group({
          ma:"",
          ten: '',
          chucDanh: '',
          soDienThoai: '',
          email:'',
          donViCongTac:''
        });
    }
    addMember(){
        return this._formBuilder.group({
            ma:"",
            ten: '',
            chucDanh: '',
            soDienThoai: '',
            email:'',
            donViCongTac:''
          });
    }
    addThanhVien(){
        let ar =  this.form.get('danhSachThanhVien') as FormArray;
        ar.push(this.addMember());
     
    }

    onSubmit(){
        console.log(this.form.value);
        var token = localStorage.getItem("accessToken");
        this._serviceApi
        .execServiceLogin('8565DAF2-842B-438E-B518-79A47096E2B5', [{"name":"DE_TAI","value":JSON.stringify(this.form.value)},{"name":"TOKEN_LINK","value":token}])
        .subscribe((data) => {
            console.log(data.data);
           
        })

    }
    newFolder(item?:any){
         return this._formBuilder.group({
        maFolder:item?.MA_LOAI_FILE,
        fileName: item?.TEN_LOAI_FILE,
        listFile:this._formBuilder.array(
            [
              //this.addFile2()
            ]
        )
     
         })
    }

    addFile2(){
        return this._formBuilder.group({
       fileName: "",
       base64: "",
       size: 0,
       sovanban: "",
       mafile: "",
       maFolder:"",
       tenFolder:"",
        })
   }

    addFile(item,itemVal,base64){
        return this._formBuilder.group({
       fileName: itemVal.name,
       base64: base64,
       size: itemVal.size,
       sovanban: "",
       mafile: "",
       maFolder:item.MA_LOAI_FILE,
       tenFolder:item.TEN_LOAI_FILE
        })
   }

    getListFolderFile() {
        this._serviceApi
            .execServiceLogin('61808455-D993-4C3A-8117-1978C43F20C9', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listFolderFile = data.data || [];
                let val = this.form.get("listFolderFile") as FormArray;
                for(let i=0;i< this.listFolderFile.length;i++){
                  
                val.push(this.newFolder(this.listFolderFile[i]));
                }
                

            });
    }

    getListCapQuanLy(){
        this._serviceApi
            .execServiceLogin('2977F0EA-A6C6-4A32-A36B-8617898B710D', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listCapQuanLy = data.data || [];
            })
        
    }

    getListDonViChuTri(){
        this._serviceApi
            .execServiceLogin('D3F0F915-DCA5-49D2-9A5B-A36EBF8CA5D1', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listDonViChuTri = data.data || [];
                this.listDonViCongTac= data.data || [];
            })
        
    }

    getListHocHam(){
        this._serviceApi
            .execServiceLogin('1B009679-0ABB-4DBE-BBCF-E70CBE239042', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listHocHam = data.data || [];
            })
        
    }

    getListHocVi(){
        this._serviceApi
            .execServiceLogin('654CB6D4-9DD7-48B7-B3FD-8FDAC07FE950', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listHocVi = data.data || [];
            })
        
    }

    getListNguonKinhPhi(){
        this._serviceApi
            .execServiceLogin('942181CC-FD57-42FE-8010-59B6FF1D26DB', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listNguonKinhPhi = data.data || [];
            })
        
    }

    getListKhoanChi(){
        this._serviceApi
            .execServiceLogin('89191345-88FF-4C2E-B3CF-6FE315D6A631', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listKhoanChi = data.data || [];
            })
        
    }

    getListLinhVucNghienCuu(){
        this._serviceApi
            .execServiceLogin('FF1D2502-E182-4242-A754-BCCC29B70C61', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listLinhVucNghienCuu = data.data || [];
            })
        
    }

    getListGioiTinh(){
        this._serviceApi
            .execServiceLogin('0DBB4D71-326D-4846-9E50-5665E573E8B6', null)
            .subscribe((data) => {
                console.log(data.data);
                this.listGioiTinh = data.data || [];
            })
        
    }

    getListChucDanh(){
        this._serviceApi
            .execServiceLogin('AF87AA00-EC9C-4B1E-9443-CE0D6E88F1C6', null)
            .subscribe((data) => {
                this.listChucDanh = data.data || [];
            })
        
    }

    removeItem(items, i) {
        // remove address from the list
            const control = items.get('danhSachThanhVien');
            control.removeAt(i);

    }
 

    listupload = []
    handleUpload(event,item,index) {
       // let arr =  this.form.get("listFolderFile") as FormArray;
        // if(item.get("listFile").value.length >0){
        //     if(item.get("listFile").value[0].fileName==''){
        //         console.log(item.get("listFile").value);
        //     } 
        // }
        let arr =item.get("listFile") as FormArray;;
        for (var i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            let itemVal = event.target.files[i];
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = () => {        
                arr.push(this.addFile(item,itemVal,reader.result));
            //    arr.at(index).
            //     item.listFile.push({
            //         fileName: itemVal.name,
            //         base64: reader.result,
            //         size: itemVal.size,
            //         sovanban: "",
            //         mafile: "",
            //         maFolder:item.MA_LOAI_FILE,
            //         tenFolder:item.TEN_LOAI_FILE,
            //         index:index
            //     });
                // this.listupload.push({
                //     fileName: itemVal.name,
                //     base64: reader.result,
                //     size: itemVal.size,
                //     sovanban: "",
                //     mafile: "",
                //     maFolder:item.MA_LOAI_FILE,
                //     tenFolder:item.TEN_LOAI_FILE,
                //     index:index
                // });

                
            };
          
        }
          console.log(item);

    }
    deleteItemFile(items,i) {
        const control = items.get('listFile');
        control.removeAt(i);
    }
    downloadTempExcel(userInp, fileName) {
        var mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
       
        const downloadLink = document.createElement('a');

        downloadLink.href = mediaType + userInp;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    downLoadFile(item) {
        if (item.base64 != undefined && item.base64 != '') {
            let link = item.base64.split(',');
            let url = "";
            if (link.length > 1) {
                url = link[1];
            } else {
                url = link[0];
            }
            this.downloadTempExcel(url, item.fileName);
        } else {
            var token = localStorage.getItem("accessToken");
            this._serviceApi.execServiceLogin("2269B72D-1A44-4DBB-8699-AF9EE6878F89", [{ "name": "DUONG_DAN", "value": item.duongdan }, { "name": "TOKEN_LINK", "value": "Bearer " + token }]).subscribe((data) => {
                console.log("downloadFile:" + JSON.stringify(data));
            })
        }

    }
}
