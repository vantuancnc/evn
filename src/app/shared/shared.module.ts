import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablePlansComponent } from './component/table-plans/table-plans.component';
import { PopupFileComponent } from './component/popup-file/popup-filecomponent';
import { PopupConfirmComponent } from './component/popup-confirm/popup-confirmcomponent';
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
        PopupFileComponent,
        PopupConfirmComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TablePlansComponent,
        PopupFileComponent,
        PopupConfirmComponent
    ]
})
export class SharedModule
{
}
