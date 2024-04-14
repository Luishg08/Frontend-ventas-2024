import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from './public/pagina-maestra/encabezado/encabezado.component'; 
import { PiePaginaComponent } from './public/pagina-maestra/pie-pagina/pie-pagina.component'
import { MenuLateralComponent } from './public/pagina-maestra/menu-lateral/menu-lateral.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PiePaginaComponent, MenuLateralComponent, RouterLink, HttpClientModule, EncabezadoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ventas-2024';
}
