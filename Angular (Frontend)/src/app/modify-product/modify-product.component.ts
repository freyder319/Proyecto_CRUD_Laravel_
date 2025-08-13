import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit, OnChanges {
  @Input() producto: any;
  @Output() productoActualizado = new EventEmitter<void>();
  productForm!: FormGroup;
  selectedFile: File | null = null;

  imagenActual: string = '';
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      NOMBRE_PRODUCTO: ['', Validators.required],
      CODIGO_PRODUCTO: ['', Validators.required],
      STOCK_PRODUCTO: [0, Validators.required],
      PRECIO_UNITARIO: [0, Validators.required],
      PRECIO_COMERCIAL: [0, Validators.required],
      ID_CATEGORIA: ['', Validators.required],
      DESCRIPCION_PRODUCTO: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.setFormValues();
    }
  }

  setFormValues(): void {
    if (!this.productForm) return;
    this.productForm.patchValue({
      NOMBRE_PRODUCTO: this.producto.NOMBRE_PRODUCTO,
      CODIGO_PRODUCTO: this.producto.CODIGO_PRODUCTO,
      STOCK_PRODUCTO: this.producto.STOCK_PRODUCTO,
      PRECIO_UNITARIO: this.producto.PRECIO_UNITARIO,
      PRECIO_COMERCIAL: this.producto.PRECIO_COMERCIAL,
      ID_CATEGORIA: this.producto.ID_CATEGORIA,
      DESCRIPCION_PRODUCTO: this.producto.DESCRIPCION_PRODUCTO
    });
    this.imagenActual = this.producto.IMG_URL 
    ? this.producto.IMG_URL
    : `http://localhost:8000/storage/${this.producto.IMG_PRODUCTO}`;
  }

  eliminarProducto(): void {
  const confirmar = confirm(`¿Estás seguro de que quieres eliminar el producto "${this.producto.NOMBRE_PRODUCTO}"?`);
  if (!confirmar) return;

  this.http.delete(`http://localhost:8000/api/productos/${this.producto.CODIGO_PRODUCTO}`)
    .subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar el producto', err);
        alert('Hubo un error al eliminar el producto');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (this.selectedFile) {
      formData.append('IMG_PRODUCTO', this.selectedFile);
    }
    formData.append('_method', 'PUT');

    const codigo = this.producto?.CODIGO_PRODUCTO;
    if (!codigo) {
      console.error('No se encontró CODIGO_PRODUCTO para actualizar');
      return;
    }

    this.http.post(`http://localhost:8000/api/productos/${codigo}`, formData)
      .subscribe({
    next: (response) => {
      console.log('Producto actualizado exitosamente', response);
      this.productoActualizado.emit(); 
    },
    error: (err) => {
      console.error('Error al actualizar el producto', err);
    }
      });
  }
}
