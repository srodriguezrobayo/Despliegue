
import { Component, OnInit } from '@angular/core';
import {  ClienteModel, EmpleadoModel, ServicioModel, lugaryCiudadModel } from '../Tablas/shared/acciones.model';
import { Observable } from 'rxjs';
import { EmpresaModel } from '../Tablas/shared/acciones.model';
import { AccionesService } from '../Tablas/shared/acciones.service';
import { Router,ActivatedRoute, Route} from '@angular/router';
import { ReservacionModel } from '../Tablas/shared/acciones.model';




@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']

})
export class ReservaComponent implements OnInit {

  clientes: Observable<ClienteModel[]> | undefined
  empresa: Observable<EmpresaModel[]> | undefined
  servicio: Observable<ServicioModel[]> | undefined;

  empleado: Observable<EmpleadoModel[]> | undefined;
  dos: Observable<lugaryCiudadModel[]> | undefined;




  reserva = new ReservacionModel("","","","","","","","","","","","","")
  constructor(
    private accionesService: AccionesService,private route:ActivatedRoute, private router: Router 

  ) { }
  urlimagen=this.accionesService.BASE_URL+"/uploads/"
  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  setActiveLink() {

  }


  ngOnInit(): void {
    //ver cliente
    let Correoelectronico_cliente = this.accionesService.obtenerCorreoUsuario()!
    this.clientes = this.accionesService.informacionUsuario(Correoelectronico_cliente)
    console.log (this.clientes)

    //ver empresa especifico
    let Nit_Empresa = this.empresa = this.route.snapshot.params['Nit_Empresa']

    this.empresa = this.accionesService.VerEmpresasEspecifico(Nit_Empresa)
    console.log (this.empresa)

    //ver servicios

    this.servicio = this.accionesService.VerServicio(Correoelectronico_cliente)
    console.log (this.servicio)


    this.empleado = this.accionesService.VerEmpleados(Correoelectronico_cliente)
    console.log (this.empleado)

    this.dos = this.accionesService.VerCiudadylugar(Correoelectronico_cliente)
    console.log (this.dos)




  }


  onSubmit(){
    this.accionesService.agendar(this.reserva).subscribe(data=>  {
      alert("Reserva hecha con exito");
      this.router.navigate(['/pendientes']);
    })
  }
  cerrarsesion() {
    sessionStorage.clear()
    this.router.navigate(['/inicio_sesion']);
  }

}
