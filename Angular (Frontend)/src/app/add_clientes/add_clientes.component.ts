import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add_clientes.component.html',
  styleUrls: ['./add_clientes.component.scss']
})
export class AddClientesComponent {
  @Output() close = new EventEmitter<void>();
  clientForm: FormGroup;
  success = '';
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clientForm = this.fb.group({
      NOMBRE_CLIENTE: [''],
      APELLIDO_CLIENTE: [''],
      TELF_CLIENTE: [''],
      CORREO_CLIENTE: [''],
      NUM_DEUDAS: [0],    // <-- Inicializa en 0
      NUM_COMPRAS: [0],   // <-- Inicializa en 0
      ESTADO_CLIENTE: ['Activo']
    });
  }

  setEstado(estado: string) {
    this.clientForm.patchValue({ ESTADO_CLIENTE: estado });
  }

  onSubmit() {
    this.http.post('http://localhost:8000/api/clientes', this.clientForm.value)
      .subscribe({
        next: () => {
          this.success = 'Cliente creado correctamente';
          this.error = '';
          this.clientForm.reset({
            NUM_DEUDAS: 0,
            NUM_COMPRAS: 0,
            ESTADO_CLIENTE: 'Activo'
          });
          this.close.emit();
        },
        error: () => {
          this.error = 'Error al crear el cliente';
          this.success = '';
        }
      });
  }
}
