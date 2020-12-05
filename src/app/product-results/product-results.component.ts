import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AppServices } from '../shared/service/app-services';

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.scss']
})
export class ProductResultsComponent implements OnInit {
  items: any = [];
  mainIteams: any = [];
  viewType = 'row';
  slectedQueAns: any = [];
  selectedFlow = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: AppServices,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.ngxService.start();
    const flowId = this.route.snapshot.params['id'];
    this.getProducts(flowId);

    this.slectedQueAns = JSON.parse(localStorage.getItem('selectedQuestions'));
    this.selectedFlow = JSON.parse(localStorage.getItem('selectedFlow'));

    // console.log(this.slectedQueAns, " this.slectedQueAns result ");
  }

  getProducts(flowId) {
    this.apiService
      .get(`/api/flow_builder/getFlowsCategoryByID?flow_id=${flowId}`, '')
      .subscribe((res: any) => {
        // const categories = res.data;
        const categories = { data: res.data };
        // const categories = {
        //   "data":[
        //     {"id":6,"flow_id":15,"category":1,"subCategory":1,"minorCategory":"1"},
        //     {"id":7,"flow_id":15,"category":1,"subCategory":1,"minorCategory":"6"},
        //     {"id":8,"flow_id":15,"category":1,"subCategory":7,"minorCategory":null},
        //     {"id":9,"flow_id":15,"category":2,"subCategory":2,"minorCategory":null},
        //     {"id":10,"flow_id":15,"category":2,"subCategory":3,"minorCategory":null},
        //     {"id":11,"flow_id":15,"category":3,"subCategory":null,"minorCategory":null}
        //   ]
        // };
        this.apiService
          .post(`/api/flow_builder/aimlPostCategory`, categories)
          .subscribe((resp: any) => {
            if (resp.data && resp.data.result && resp.data.result[0].length) {
              // const prodItem = resp.data.result[0];
              this.mainIteams = resp.data.result[0];
              this.mainIteams.forEach(element => {
                if(element.image) {
                  const newS3Img = JSON.parse(element.image);
                  element.image = newS3Img;
                } else {
                  const newS3Img = null;
                  element.image = newS3Img;

                }
              });
              this.items = this.mainIteams.slice(0, 10);
              this.ngxService.stop();
            }
          });
      });
  }

  showRow() {
    this.viewType = 'row';
  }
  showList() {
    this.viewType = 'list';
  }

  paginate(event) {
    // event.first = Index of the first record
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages
    // console.log(event);
    if (this.items) {
      this.items = this.mainIteams.slice(event.first, event.first + event.rows);
    }
  }
}
