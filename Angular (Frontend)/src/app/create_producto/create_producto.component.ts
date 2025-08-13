import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-create-producto',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create_producto.component.html',
  styleUrl: './create_producto.component.scss'
})
export class CreateProductoComponent {
  @Input() idProducto!: number;
  productForm: FormGroup;
  success = '';
  error = '';
selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      CODIGO_PRODUCTO: [''],
      NOMBRE_PRODUCTO: [''],
      PRECIO_UNITARIO: [''],
      PRECIO_COMERCIAL: [''],
      STOCK_PRODUCTO: [''],
      DESCRIPCION_PRODUCTO: [''],
      ID_CATEGORIA: [''],
      IMG_PRODUCTO: [null]
    });
  }
  // Captura del archivo
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.productForm.patchValue({ IMG_PRODUCTO: this.selectedFile });
    }
  }
  onSubmit() {
    const formData = new FormData();
    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });

    this.http.post('http://localhost:8000/api/productos', formData)
      .subscribe({
        next: () => {
          this.success = 'Producto creado correctamente';
          this.error = '';
          this.productForm.reset();
          // Aquí cierras el modal si quieres
        },
        error: () => {
          this.error = 'Error al crear el producto';
          this.success = '';
        }
      });
  }

}
