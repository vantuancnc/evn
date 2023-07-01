import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablePlansComponent } from './component/table-plans/table-plans.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],

    declarations: [
        TablePlansComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TablePlansComponent
    ]
})
export class SharedModule
{
}
