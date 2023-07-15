import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'app/shared/service/service.service';
import { CommonModule } from '@angular/common';
import { String } from 'lodash';

@Component({
    selector: 'table-plans',
    templateUrl: './table-plans.component.html',
    styleUrls: ['./table-plans.component.css'],
})
export class TablePlansComponent {
    public listNguonKinhPhi = [];
    public listNhiemVuMau = [];
    public listDonvi = [];
    @Input() form: FormGroup;
    itemsAdd: FormArray;
    public listKeHoachChiTiet = [];
    
    constructor(private _formBuilder: FormBuilder, private _serviceApi: ServiceService) {
    }

    ngOnInit() {
        
        //this.geListNhomDonVi();
        this.getListKeHoachChiTiet();
        this.geListNguonKinhPhi();
        this.addFormtoParent();
       
    }


    addFormtoParent() {
       this.form.addControl('listNhiemVu', this._formBuilder.array([]))
       this._serviceApi.execServiceLogin("030A9A96-90D5-4AD0-80E4-C596AED63EE7", null).subscribe((data) => {
        this.listDonvi = data.data || [];
        this._serviceApi.execServiceLogin("CE428DEE-1945-495E-8F48-03747076AE6F", [{"name":"ORGID","value":"115"},{"name":"USERID","value":"STR"}]).subscribe((data) => {
            this.listNhiemVuMau =  data.data;
           let listNhiemVu11 = this.listNhiemVuMau.filter(c => c.MA_NHOM_CHA==null);
           let listNhiemVu1 = [];
           for(let i=0; i<listNhiemVu11.length; i++){
            //console.log(listNhiemVu1[i].MA_NHOM); //use i instead of 0
           let arrTemp =  this.form.get('listNhiemVu') as FormArray;
           arrTemp.push(this.newNhiemvu(listNhiemVu11[i]))
          //  listNhiemVu1.push(this.newNhiemvu(listNhiemVu11[i]));
            }
           // this.form.addControl('listNhiemV)u', this._formBuilder.array(listNhiemVu1))
        })
    })
       
    
    }

    getListKeHoachChiTiet(){
        let maKeHoach =  this.form.value.maKeHoach;
       
        if(maKeHoach != undefined && maKeHoach !=''){
            this._serviceApi.execServiceLogin("113E9708-4131-4D52-B2A9-D0972B4F8266", [{"name":"MA_KE_HOACH","value":maKeHoach}]).subscribe((data) => {
                this.listKeHoachChiTiet = data.data;
            })
        }
       
    }


    newNhiemvu(item): FormGroup {
        let listNhiemVu21 = this.listNhiemVuMau.filter(c => c.MA_NHOM_CHA==item.MA_NHOM);
        let listNhiemVu2 =[];
        for(let i=0; i<listNhiemVu21.length; i++){
            //console.log(listNhiemVu1[i].MA_NHOM); //use i instead of 0
            listNhiemVu2.push(this.newNhiemvu_cap2(listNhiemVu21[i]));
            }

        return this._formBuilder.group({
            manhom:item.MA_NHOM,
            NoiDungDangKy: item.TEN_NHOM,
            listNhiemVu_cap2: this._formBuilder.array(listNhiemVu2),
        })
    }

    newNhiemvu_cap2(item): FormGroup {
        let listNhiemVu31 = this.listDonvi;
        let listNhiemVu3 =[];
        if(listNhiemVu31 !=null && listNhiemVu31.length >0){
            for(let i=0; i<listNhiemVu31.length; i++){
                //console.log(listNhiemVu1[i].MA_NHOM); //use i instead of 0
                listNhiemVu3.push(this.newNhiemvu_cap3(listNhiemVu31[i],item));
                }
            return this._formBuilder.group({
                manhom:item.MA_NHOM,
                NoiDungDangKy: item.TEN_NHOM,
                maDonVi:null,
                listNhiemVu_cap3: this._formBuilder.array(listNhiemVu3),
            })
        }else{
                let itemArr = [];
                if(this.listKeHoachChiTiet != null && this.listKeHoachChiTiet.length >0){
                    
                   let itemDataArr = this.listKeHoachChiTiet.filter(c => c.MA_NHOM ==item.MA_NHOM);
                    if(itemDataArr.length >0){
                        for(let i=0;i<itemDataArr.length;i++){
                            itemArr.push(this.newItemNhiemvu(itemDataArr[i]));
                        }      
                    }
                    return this._formBuilder.group({
                        manhom:item.MA_NHOM,
                        maDonVi:null,
                        NoiDungDangKy: item.TEN_NHOM,
                        listNhiemVu_cap3: this._formBuilder.array(itemArr),
                    })
                }else{
                    return this._formBuilder.group({
                        manhom:item.MA_NHOM,
                        maDonVi:null,
                        NoiDungDangKy: item.TEN_NHOM,
                        listNhiemVu_cap3: this._formBuilder.array(itemArr),
                    })
                }

                
          
        }
       
    }

    newNhiemvu_cap3(item,itemParent): FormGroup {
            // return this._formBuilder.group({
            //     manhom:item.ma_NHOM,
            //     NoiDungDangKy: item.ten_NHOM,
            //     listNhiemVu_cap4: this._formBuilder.array([]),
            // })
            let itemArr = [];
            if(this.listKeHoachChiTiet != null && this.listKeHoachChiTiet.length >0){
               let itemDataArr = this.listKeHoachChiTiet.filter(c => c.MA_NHOM ==itemParent.MA_NHOM && c.MA_DON_VI==item.ma_NHOM);
                if(itemDataArr.length >0){
                    for(let i=0;i<itemDataArr.length;i++){
                        itemArr.push(this.newItemNhiemvu(itemDataArr[i]));
                    }      
                }
                return this._formBuilder.group({
                    manhom:itemParent.MA_NHOM,
                    maDonVi:item.ma_NHOM,
                    NoiDungDangKy: item.ten_NHOM,
                    listNhiemVu_cap4: this._formBuilder.array(itemArr),
                })
            }else{
                return this._formBuilder.group({
                    manhom:itemParent.MA_NHOM,
                    maDonVi:item.ma_NHOM,
                    NoiDungDangKy: item.ten_NHOM,
                    listNhiemVu_cap4: this._formBuilder.array(itemArr),
                })
            }
        
       
    }

    newItemNhiemvu(item): FormGroup {
        return this._formBuilder.group({
            maDonVi: item.MA_DON_VI,
            maKeHoachChiTiet:  item.MA_KE_HOACH_CTIET,
            maKeHoach: item.MA_KE_HOACH,
            maNhom: item.MA_NHOM,
            NoiDungDangKy: item.NOI_DUNG_DANG_KY,
            NguonKinhPhi: item.MA_NGUON_KINH_PHI,
            DuDoan: item.DU_TOAN,
            DonViChuTri: item.DON_VI_CHU_TRI,
            ChuNhiemNhiemVu: item.CHU_NHIEM_NHIEM_VU,
            NoiDungHoatDong: item.NOI_DUNG,
            ThoiGianDuKien: item.THOI_GIAN_THUC_HIEN,
            YKienNguoiPheDuyet: item.Y_KIEN_NGUOI_PHE_DUYET,
            opinion: ''
        })
    }

    AddItemNhiemvu(items): FormGroup {      
        return this._formBuilder.group({
            maDonVi: items.value.maDonVi,
            maKeHoachChiTiet: '',
            maKeHoach: '',
            maNhom: items.value.manhom,
            NoiDungDangKy: '',
            NguonKinhPhi: '',
            DuDoan: '',
            DonViChuTri: '',
            ChuNhiemNhiemVu: '',
            NoiDungHoatDong: '',
            ThoiGianDuKien: '',
            YKienNguoiPheDuyet: '',
            opinion: ''
        })
    }
    addCap2(items) {
        this.itemsAdd = items.get('listNhiemVu_cap3') as FormArray;

        this.itemsAdd.push(this.AddItemNhiemvu(items))
    }

    addCap3(items) {
        this.itemsAdd = items.get('listNhiemVu_cap4') as FormArray;

        this.itemsAdd.push(this.AddItemNhiemvu(items))
    }

    removeItem(items, i) {
        // remove address from the list
        const control = items.get('listNhiemVu_cap3');
        control.removeAt(i);
    }

    geListNguonKinhPhi() {
        this._serviceApi.execServiceLogin("CCDB1CBC-F3D2-4893-85FE-F70C47990CF0", null).subscribe((data) => {
            this.listNguonKinhPhi = data.data || [];
        })
    }
}
