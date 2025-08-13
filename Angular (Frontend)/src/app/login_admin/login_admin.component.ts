import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ este es para [(ngModel)]
@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [HttpClientModule, FormsModule], // Asegúrate de tener FormsModule
  templateUrl: './login_admin.component.html',
})
export class LoginAdminComponent {
  correo: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login(): void {
    const data = {
      email: this.correo,
      password: this.password
    };

    this.http.post('http://localhost:8000/api/login', data)
      .subscribe(
        res => {
          console.log('✅ Login exitoso', res);
          alert('Bienvenido');
        },
        err => {
          console.error('❌ Error en login', err);
          alert('Correo o contraseña incorrectos');
        }
      );
  }
}
