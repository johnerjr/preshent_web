import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppServices } from '../shared/service/app-services';

import * as $ from 'jquery';

import { from } from 'rxjs';
import {
  TimeInterval,
  timeInterval
} from 'rxjs/internal/operators/timeInterval';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // spinnerType = SPINNER.circle;
  que_id = '';
  flowID = '';
  selectedFlow = '';
  questions: any = [];
  questionPhases = [];
  queAns = [];

  currentQuestion = 0;
  nextButton: boolean = false;
  backButton: boolean = false;
  slectedQueAns: any = [];

  constructor(
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private apiService: AppServices,
    private ngxService: NgxUiLoaderService,
    private myElement: ElementRef
  ) {
    const flowDetail = this.route.snapshot.params['id'];
    this.flowID = flowDetail;
    this.getFlow(this.flowID);
  }

  ngOnInit(): void {
      this.ngxService.start();
  }

  goBack() {
    this._location.back();
  }

  getFlow(flow_id) {
    this.apiService
      .get(`/api/flow_builder/getFlowByID?flow_id=${flow_id}`, '')
      .subscribe((res: any) => {

        const newFlow = res.data[0];
        this.selectedFlow = newFlow.flow_name;

        this.getFlowIdQue(newFlow.flow_questions)
      });
  }

  getFlowIdQue(flowID) {
    const FlowQues = {
      qusetion_ids: flowID
    };
    this.apiService
      .post('/api/flow_builder/getQuestions', FlowQues)
      .subscribe((res: any) => {
        if (res.success === true) {
          const questionsDetail = res.data;
          questionsDetail.map((value, index) => {
            this.apiService.get(`/api/question_answer/getAnswers?question_id=${value.id}`, '')
              .subscribe((res: any) => {
                const answers = res.data;
                if (answers && answers.length > 0) {
                  const newQuestion = {
                    id: value.id,
                    isActivated: value.isActivated,
                    isDeleted: value.isDeleted,
                    question_name: value.question_name,
                    answer: answers
                  };
                  this.questions.push(newQuestion);
                }
              });
          });


          setTimeout(() => {
            this.ngxService.stop();
            if (this.questions.length > 1) {
              document.getElementById('question0').style.display = 'block';
            }
          }, 3000);

        }
      });
  }

  clickCheckbox(question, i, answers) {
    if (this.currentQuestion + 1 !== this.questions.length) {
      const id = `question${this.currentQuestion}`;
      const nextId = `question${this.currentQuestion + 1}`;
      $('#' + id).hide();
      $('#' + nextId).show();
      this.currentQuestion = this.currentQuestion + 1;
    }

    const newQueAns = {
      que: {
        question_name: question.question_name,
        id: question.id
      },
      ans: answers
    };

    const findcatIndex = this.slectedQueAns.findIndex(
      x => x.que.id === question['id']
    );

    if (findcatIndex < 0) {
      this.slectedQueAns.push(newQueAns);
    } else {
      this.slectedQueAns[findcatIndex] = newQueAns;
    }
    if (this.questions.length === this.currentQuestion + 1) {
      this.nextButton = true;
    }
    this.backButton = true;
  }

  back() {
    this.currentQuestion = this.currentQuestion - 1;
    const nextId = `question${this.currentQuestion}`;
    $('.ques').hide();
    $('#' + nextId).show();

    if (this.currentQuestion === 0) {
      this.backButton = false;
    }
    this.nextButton = false;
  }

  getCtegories() {
    this.apiService
      .get(`/api/flow_builder/getFlowsCategoryByID?flow_id=${this.flowID}`, '')
      .subscribe((res: any) => {
        const categories = res.data;
      });
  }

  showProducts() {
    localStorage.setItem('selectedQuestions', JSON.stringify(this.slectedQueAns));
    localStorage.setItem('selectedFlow', JSON.stringify(this.selectedFlow));

    this.router.navigate([`/product-results/${this.flowID}`]);
  }
}
