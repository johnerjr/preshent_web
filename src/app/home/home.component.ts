import { Component, OnInit } from '@angular/core';
import { AppServices } from '../shared/service/app-services';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    // spinnerType = SPINNER.circle;
    flows: any = [];

    constructor( private apiService: AppServices,
        private router: Router,
        private ngxService: NgxUiLoaderService) { }

    ngOnInit() {
        this.ngxService.start();
        this.getFlowData();
    }

    getFlowData() {
        this.ngxService.start();
        // REMOVE SELECTED FLOW QUESTIONS //
        localStorage.removeItem('selectedQuestions');
        localStorage.removeItem('selectedFlow');

        this.apiService.get('/api/flow_builder/getFlows', '').subscribe( (res: any) => {
            if (res.success === true) {
                this.flows = res.data;
            }
            this.ngxService.stop();
        });
    }

    goToQuestionPage(flow) {
        const flowDetail = {
            flow : flow.id,
            que : flow.flow_questions
        };
        const newFlowDetail = JSON.stringify(flowDetail);
        const question = JSON.parse(flow.flow_questions);
        if (question.length > 0) {
            this.router.navigate(['/questions', flow.id]);
        }
    }


}
