import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  contactForm: any;
  data: any;
  alert: any;
  displayAlert = false;
  constructor(private appService: AppService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.createFormControl();
  }

  createFormControl() {
    this.contactForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.minLength(3), Validators.required]),
      email: new FormControl(this.data.email, [Validators.minLength(7)]),
      phone: new FormControl(this.data.phone, [Validators.minLength(9)]),
      state: new FormControl(this.data.state),
      message: new FormControl(this.data.message),
      assignedTo: new FormControl(this.data.assignedTo),
      pushToHelpDesk: new FormControl(this.data.pushToHelpDesk),
      notes: new FormControl(this.data.message)
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.spinner.show();
      this.appService.update(
        {data: this.contactForm.value}, this.data.id).subscribe((response) => {
        this.spinner.hide();
        this.close();
        this.appService.sendMessage({
          refresh: true
        });
      }, (err) => {
        console.log(err);
        this.spinner.hide();
        this.appService.sendMessage({
          refresh: false
        });
      })
    }
  }

  close() {
    this.modalService.hide(1);
  }
}
