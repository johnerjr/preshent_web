import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServices } from './../shared/service/app-services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    afForm: FormGroup;
    piForm: FormGroup;
    sForm: FormGroup;
    qForm: FormGroup;
    formInput: any = [];
    isLoading: Boolean = false;
    submitted: Boolean = false;
    questionAbout: any = ['Business owner', 'Business partner', 'Business advisor'];
    questionLooking: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan', 'New York'];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private apiService: AppServices
    ) {
        this.createaForm();
        this.createPiForm();
        this.createsForm();
        this.createqForm();
    }

    ngOnInit() {

    }

    createaForm() {
        this.afForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
            email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            password: ['', [Validators.required]],
            cpassword: ['', [Validators.required]]
        }, {
            validator: this.checkPassword
        });
    }
    createPiForm() {
        this.piForm = this.fb.group({
            titles:  ['', [Validators.required]],
            firstname:  ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
            lastname:   ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
            phone:      ['', [Validators.required,
                Validators.minLength(7),
                Validators.pattern(/^[0-9]*$/)
            ]],
            company:    [''],
            street:     [''],
            streetno:   [''],
            city:       [''],
            postal:     ['']
        });
    }
    createsForm() {
        this.sForm = this.fb.group({
            subscription:  ['', [Validators.required]]
        });
    }
    createqForm() {
        this.qForm = this.fb.group({
            about:  [''],
            looking:  ['']
        });
    }

    public get af() {
        return this.afForm.controls;
    }
    public get pi() {
        return this.piForm.controls;
    }
    public get s() {
        return this.sForm.controls;
    }
    public get q() {
        return this.qForm.controls;
    }

    // resetForm() {
    //     this.afForm = this.fb.group({});
    //     this.createaForm();
    // }

    submitForm() {
        if (!this.afForm.valid) {
            this.submitted = true;
        } else {
            this.formInput.email = this.afForm.value.email;
            this.formInput.username = this.afForm.value.username;
            this.formInput.password = this.afForm.value.password;
            this.moveStep2();
        }
    }
    submitPiForm() {
        if (!this.piForm.valid) {
            this.submitted = true;
        } else {
            this.formInput.firstName = this.piForm.value.firstname;
            this.formInput.lastName = this.piForm.value.lastname;
            this.formInput.phone = this.piForm.value.phone;
            this.formInput.company = this.piForm.value.company;
            this.moveStep3();
        }
    }
    submitsForm() {
        if (!this.sForm.valid) {
            this.submitted = true;
        } else {
            this.formInput.subscription = this.sForm.value.subscription;
            this.moveStep4();
        }
    }
    submitqForm() {
        if (!this.qForm.valid) {
            this.submitted = true;
        } else {
            this.formInput.about = this.qForm.value.about;
            this.formInput.looking = this.qForm.value.looking;

            this.apiService.post('/api/v1/register', { ...this.formInput } ).subscribe( (response: any) => {
                if (response.success) {
                    this.toastr.success('You are register successfully.', 'Wellcome');
                    this.router.navigate(['/home']);
                    // this.addCorporateForm.reset();
                } else if (response.code === 400) {
                    this.toastr.error(response.message, response.param);
                } else if (response.code === 401) {
                    this.toastr.error('Username already exists. Please try another username.', 'Username Exists!');
                } else if (response.code === 402) {
                    this.toastr.error('Email already exists. Please try another email.', 'Email Exists!');
                } else {
                    this.toastr.error('Something went wrong please try again later.', 'Oops!');
                }
            }, (errorResult) => {
                this.errorHandling(errorResult);
            });
        }
    }

    checkPassword(group: FormGroup) {
        return group.get('password').value === group.get('cpassword').value ? null : { mismatch: true };
    }

    moveStep1() {
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
    }

    moveStep2() {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
    }

    moveStep3() {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('step4').style.display = 'none';
    }

    moveStep4() {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';
    }

    errorHandling(error) {
        try {
          this.isLoading = false;
          const errorObj = error ? JSON.parse(error) : '';
          this.toastr.error(errorObj.message, 'Error');
        } catch (error) {
          this.toastr.error(error.message, 'Error');
        }
    }
}
