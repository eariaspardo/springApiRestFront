import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
//import {CLIENTES} from './clientes.json'
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes : Cliente[];
  constructor(private clienteService : ClienteService) { }

  ngOnInit(){
    // this.clientes = CLIENTES; // ================ lista de clientes por herencia de una constante
    //this.clientes = this.clienteService.getClientes(); //================ lista de clientes por inyeccion de dependencias
    this.clienteService.getClientes().subscribe(
      // ===== Opcion 1 simplificacion de funcion ===
      clientes => this.clientes = clientes

      // ===== Opcion 2 por funcion ===
      /*function (clientes){
        this.clientes = clientes
      }*/
    );
  }

  delete(cliente : Cliente): void{
    const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Estas Seguro?',
  text: "Seguro que desea eliminarlo a ${cliente.nombre} ${cliente.apellido}",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, Eliminar!',
  cancelButtonText: 'No, cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.clienteService.delete(cliente.id).subscribe(
      response =>{
        this.clientes = this.clientes.filter(cli => cli !== cliente)
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'el Registro ha sido eliminado',
          'success'
        )
      }
    )
  }
})
  }

}
