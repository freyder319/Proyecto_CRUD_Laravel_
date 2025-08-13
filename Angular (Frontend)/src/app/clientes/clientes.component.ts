import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from "../admin_navbar/admin_navbar.component";
import { AddClientesComponent } from '../add_clientes/add_clientes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModifyClientesComponent } from '../modify-clientes/modify-clientes.component';

declare var bootstrap: any;

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, AddClientesComponent, ModifyClientesComponent, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'] 
})
export class ClientesComponent implements OnInit {
  clienteSeleccionado: any = null;
  clientes: any[] = [];
  mensajeExito = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.http.get<any[]>('http://localhost:8000/api/clientes')
      .subscribe({
        next: (data) => {
          this.clientes = data;
        },
        error: (err) => {
          console.error('Error al cargar clientes', err);
        }
      });
  }

  openModal(id: string) {
    this.http.get<any>(`http://localhost:8000/api/clientes/${id}`)
      .subscribe({
        next: (data) => {
          this.clienteSeleccionado = data;
          setTimeout(() => {
            const element = document.getElementById('offcanvasModificarCliente');
            if (element) {
              const bsOffcanvas = new bootstrap.Offcanvas(element);
              bsOffcanvas.show();
            }
          }, 0);
        },
        error: (err) => {
          console.error('Error al cargar cliente', err);
        }
      });
  }

  eliminarCliente(cliente: any): void {
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar el Cliente "${cliente.NOMBRE_CLIENTE}"?`);
    if (!confirmar) return;

    this.http.delete(`http://localhost:8000/api/clientes/${cliente.ID_CLIENTE}`)
      .subscribe({
        next: () => {
          alert('Cliente eliminado correctamente');
          this.cargarClientes();
        },
        error: (err) => {
          console.error('Error al eliminar el Cliente', err);
          alert('Hubo un error al eliminar el Cliente');
        }
      });
  }

  onClienteCreado() {
    // Cierra el offcanvas usando Bootstrap JS
    const offcanvas = document.getElementById('offcanvasAgregarCliente');
    if (offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
      bsOffcanvas.hide();
    }

    // Recarga la lista de clientes
    this.cargarClientes();

    // Muestra el mensaje de éxito
    this.mensajeExito = 'Cliente creado con éxito';

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  onClienteActualizado() {
    // Cierra el offcanvas usando Bootstrap JS
    const offcanvas = document.getElementById('offcanvasModificarCliente');
    if (offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
      bsOffcanvas.hide();
    }

    // Recarga la lista de clientes
    this.cargarClientes();

    // Muestra el mensaje de éxito
    this.mensajeExito = 'Cliente Modificado Exitosamente';

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }
}
