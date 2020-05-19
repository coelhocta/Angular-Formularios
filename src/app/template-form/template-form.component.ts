import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
    }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form);
    // console.log(this.usuario)

this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(dados =>  dados))
    .subscribe(dados => {
      console.log(dados);
      form.form.reset();
    
    })
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, ''); //remove qualquer coisa que não seja números

    // if (cep != "") {
    //   var validacep = /^[0-9]{8}$/;

    //   if(validacep.test(cep)) {
    //     this.http.get(`http://viacep.com.br/ws/${cep}/json/`).pipe(map((dados) => dados)).subscribe(dados => console.log(dados));
    //   }

    // }
   
    if (cep !== '') {

      this.resetaDadosForm(form);

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => { this.populaDadosForm(dados,form); });
    }

  }

  populaDadosForm(dados, formulario){
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //     }}
    //   )
  
    //   console.log(formulario);
    // };

  formulario.form.patchValue({
    endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
    }
  });
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
    }
  });
  }
}
