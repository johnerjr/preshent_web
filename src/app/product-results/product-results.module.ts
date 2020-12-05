import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductResultsComponent } from './product-results.component';
import {PaginatorModule} from 'primeng/paginator';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        PaginatorModule,
        NgxUiLoaderModule
    ],
    declarations: [ ProductResultsComponent ],
    exports: [ ProductResultsComponent ],
    providers: []
})
export class ProductResultsModule { }
