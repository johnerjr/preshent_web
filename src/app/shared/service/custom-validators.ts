import { AbstractControl } from '@angular/forms';
export class CustomValidation {

    static isValidEmail(AC: AbstractControl) {
       let email = AC.get('email').value;
       const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (validEmailRegEx.test(email)) {
            return null;
        } else {
            AC.get('email').setErrors( {isValidEmail: true} )
        }
    }

    static isValidWebsite(AC: AbstractControl) {
       let websiteUrl = AC.get('websiteUrl').value; 
       const validWebRegEx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
       if (validWebRegEx.test(websiteUrl)) {
            return null;
        } else {
            AC.get('websiteUrl').setErrors( {isValidWebsite: true} )
        }
    }
}