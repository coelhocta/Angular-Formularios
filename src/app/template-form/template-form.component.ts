import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Andre',
    email: 'coelhocta@gmail.com'
    }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form);
    console.log(this.usuario)
  }

}
