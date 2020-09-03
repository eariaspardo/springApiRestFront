import { Injectable } from '@angular/core';
import {Cliente} from './cliente';
import {CLIENTES} from './clientes.json'
import {of, Observable} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {


  private urlEndpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

// ================ Retornar lista de clientes por Obervable
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES)
    // ============= RES forma #1
    return this.http.get<Cliente[]>(this.urlEndpoint);
    // ============= RES forma #2
    /*return this.http.get(this.urlEndpoint).pipe(
      map ( response => response as Cliente[])
    );*/
  }

  create(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndpoint, cliente,{headers:this.httpHeaders});
  }

  getCliente(id) : Observable<Cliente>{
      return this.http.get<Cliente>(this.urlEndpoint+'/'+id);
      //return this.http.get<Cliente>('${this.urlEndpoint}/${cliente.id}');
  }

  update(cliente : Cliente) : Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndpoint+'/'+cliente.id, cliente,{headers:this.httpHeaders});
  }

  delete(id: number) : Observable<Cliente>{
    return this.http.delete<Cliente>(this.urlEndpoint+'/'+id, {headers:this.httpHeaders});
  }


// ================ Retornar lista de clientes por inyeccion de dependencias
  /*getClientes(): Cliente[]{
    return CLIENTES;
  }*/

}
