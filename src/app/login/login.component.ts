import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServices } from './../shared/service/app-services';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    mainForm: FormGroup;
    submitted: Boolean = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private apiService: AppServices
    ) {
        this.createForm();
    }

    ngOnInit() {

    }

    createForm() {
        this.mainForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
            password: ['', [Validators.required]]
        });
    }

    public get f() {
        return this.mainForm.controls;
    }

    submitForm() {
        if (!this.mainForm.valid) {
            this.submitted = true;
        } else {
            this.apiService.post('/api/v1/login', this.mainForm.value).subscribe( (response: any) => {
                console.log('resp:::', response);
                if (response.success) {
                    this.toastr.success('Successfully loggedin.', 'Wellcome');
                    this.router.navigate(['/home']);
                } else if (response.code === 400) {
                    this.toastr.error(response.message, response.param);
                } else if (response.code === 401) {
                    this.toastr.error('Username not exists. Please register or try another username.', 'Username Exists!');
                } else if (response.code === 402) {
                    this.toastr.error('Invalid username or password.', 'Login Failed!');
                } else {
                    this.toastr.error('Something went wrong please try again later.', 'Oops!');
                }
            }, (errorResult) => {
                this.errorHandling(errorResult);
            });
        }
    }

    errorHandling(error) {
        try {
          const errorObj = error ? JSON.parse(error) : '';
          this.toastr.error(errorObj.message, 'Error');
        } catch (error) {
          this.toastr.error(error.message, 'Error');
        }
    }
}
