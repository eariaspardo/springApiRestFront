import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente : Cliente = new Cliente();
  public validar : Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(private clienteService : ClienteService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  // ========= create sin el sweetalert2
  /*public create():void{
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    );
  }*/

  public create():void{
    console.log(this.cliente);
    this.clienteService.getCliente(this.cliente.id).subscribe((cliente) => this.validar = cliente)
    //console.log(this.validar)
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo Cliente creado con exito', 'success')
    });
    /*if (Object.keys(this.validar).length === 0){
    }else{
      swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ya existe'
          })
    }*/


  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      console.log('Este es el id :' + id)
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado con exito', 'success')
    });
  }


}
