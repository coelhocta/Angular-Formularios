import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      
      endereco: this.formBuilder.group({
      
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      })
    })
  }

  onSubmit(){
  this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(dados =>  dados))
    .subscribe(dados => {
      console.log(dados);
      // this.resetar();
      },
      (error: any) => alert('erro')
      );

  }

  resetar(){
    this.formulario.reset();
  }

  consultaCEP() {
  let cep = this.formulario.get('endereco.cep').value;
    cep = cep.replace(/\D/g, '');
   
     if (cep != null && cep !== '') {

      this.resetaDadosForm();

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => { this.populaDadosForm(dados); });
    }
  }

 populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('André');
  }

resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}