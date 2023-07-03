import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'table-plans',
    templateUrl: './table-plans.component.html',
    styleUrls: ['./table-plans.component.css'],
})
export class TablePlansComponent {
    @Input() form: FormGroup;
    constructor(private _formBuilder: FormBuilder,) {
    }

    ngOnInit() {
        this.addFormtoParent();
        console.log(this.form);

    }


    addFormtoParent() {
        this.form.addControl('listNhiemVu', this._formBuilder.array([this.newNhiemvu()]))
    }


    newNhiemvu(): FormGroup {
        return this._formBuilder.group({
            content: 'Nhiệm vụ cấp 1',
            listNhiemVu_cap2: this._formBuilder.array([this.newNhiemvu_cap2()]),
        })
    }

    newNhiemvu_cap2(): FormGroup {
        return this._formBuilder.group({
            content: 'Nhiệm vụ cấp 2',
            listNhiemVu_cap3: this._formBuilder.array([this.newItemNhiemvu()]),
        })
    }

    newItemNhiemvu(): FormGroup {
        return this._formBuilder.group({
            content: 'Nhiệm vụ cấp 2-1',
            source: '',
            estimates: '',
            unit: '',
            missionLeader: '',
            activeContent: '',
            thoiGianDuKien: null,
            opinion: ''
        })
    }
    addCap2(items) {
        let arr = items.get('listNhiemVu_cap3') as FormArray;
        console.log(arr);

    }
}
