import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablePlansComponent } from './component/table-plans/table-plans.component';
import { PopupFileComponent } from './component/popup-file/popup-filecomponent';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        NgSelectModule
    ],

    declarations: [
        TablePlansComponent,
        PopupFileComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TablePlansComponent,
        PopupFileComponent
    ]
})
export class SharedModule
{
}
