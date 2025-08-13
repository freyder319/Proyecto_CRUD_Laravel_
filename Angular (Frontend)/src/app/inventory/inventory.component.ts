import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from "../admin_navbar/admin_navbar.component";
import { CreateProductoComponent } from "../create_producto/create_producto.component";
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModifyProductComponent } from '../modify-product/modify-product.component';

declare var bootstrap: any;

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, CreateProductoComponent, ModifyProductComponent,HttpClientModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  isModalOpen = false;
  selectedId: string | null = null;
  productoSeleccionado: any = null;
  openModal(id: string) {
      this.http.get<any>(`http://localhost:8000/api/productos/${id}`)
      .subscribe({
        next: (data) => {
          this.productoSeleccionado = data;
        setTimeout(() => {
          const element = document.getElementById('offcanvasEditarProducto');
          if (element) {
            const bsOffcanvas = new bootstrap.Offcanvas(element);
            bsOffcanvas.show();
          }
        }, 0);
        },
        error: (err) => {
          console.error('Error al cargar productos', err);
        }
    });
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedId = null;
  }
  productos: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void { 
    this.http.get<any[]>('http://localhost:8000/api/productos')
      .subscribe({
        next: (data) => {
          this.productos = data;
        },
        error: (err) => {
          console.error('Error al cargar productos', err);
        }
      });
  }



}

