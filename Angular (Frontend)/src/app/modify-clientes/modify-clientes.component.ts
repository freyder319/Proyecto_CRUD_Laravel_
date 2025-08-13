import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './modify-clientes.component.html',
  styleUrls: ['./modify-clientes.component.scss'] 
})
export class ModifyClientesComponent implements OnInit, OnChanges {

  @Input() cliente: any;
  @Output() clienteActualizado = new EventEmitter<void>();
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      NOMBRE_CLIENTE: ['', Validators.required],
      APELLIDO_CLIENTE: ['', Validators.required],
      TELF_CLIENTE: ['', Validators.required],
      CORREO_CLIENTE: ['', Validators.required],
      NUM_DEUDAS: ['', Validators.required],  
      NUM_COMPRAS: ['', Validators.required],  
      ESTADO_CLIENTE: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && this.cliente) {
      this.setFormValues();
    }
  }

  setEstado(estado: string) {
    this.clientForm.patchValue({ ESTADO_CLIENTE: estado });
  }

  setFormValues(): void {
    const data = this.cliente?.client ? this.cliente.client : this.cliente;
    if (!this.clientForm) return;
    this.clientForm.patchValue({
      NOMBRE_CLIENTE: data.NOMBRE_CLIENTE,
      APELLIDO_CLIENTE: data.APELLIDO_CLIENTE,
      TELF_CLIENTE: data.TELF_CLIENTE,
      CORREO_CLIENTE: data.CORREO_CLIENTE,
      NUM_DEUDAS: data.NUM_DEUDAS,
      NUM_COMPRAS: data.NUM_COMPRAS,
      ESTADO_CLIENTE: data.ESTADO_CLIENTE
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const data = this.cliente?.client ? this.cliente.client : this.cliente;
    const codigo = data?.ID_CLIENTE;
    if (!codigo) {
      console.error('No se encontró ID_CLIENTE para actualizar');
      return;
    }

    this.http.put(`http://localhost:8000/api/clientes/${codigo}`, this.clientForm.value)
      .subscribe({
        next: (response) => {
          console.log('Cliente actualizado exitosamente', response);
          this.clienteActualizado.emit();
        },
        error: (err) => {
          console.error('Error al actualizar el cliente', err);
        }
      });
  }
}
