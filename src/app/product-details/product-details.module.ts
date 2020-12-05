import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        NgxUiLoaderModule
    ],
    declarations: [ ProductDetailsComponent ],
    exports: [ ProductDetailsComponent ],
    providers: []
})
export class ProductDetailsModule { }
