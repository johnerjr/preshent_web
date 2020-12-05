import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AppServices } from '../shared/service/app-services';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  item: any = [];
  viewType = 'row';
  offers: any = [];
  s3Img: any = [];
  selectedImg = [];

  constructor(
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private apiService: AppServices,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxService.start();
    const productId = this.route.snapshot.params['id'];
    this.getProduct(productId);
  }

  getProduct(productId) {
    this.apiService
      .get(`/api/products/productsById?product_id=${productId}`, '')
      .subscribe((res: any) => {
          this.item = res.data.product[0] ? res.data.product[0] : '' ;

          if (this.item.image) {
            this.s3Img = JSON.parse(this.item.image);
            this.selectedImg[0] = this.s3Img[0];
          } else {
            this.s3Img = [];
            this.selectedImg = null;
          }
          this.offers = res.data.offer;
          this.ngxService.stop();
      });
  }

  goBack() {
    this._location.back();
  }

  selectS3Img(img){
    this.selectedImg[0] = img;
  }

}
