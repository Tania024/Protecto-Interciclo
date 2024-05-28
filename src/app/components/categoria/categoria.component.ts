import { Component } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../domain/libro';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  libroId?: string;
  libro: Libro = {
    id: '',
    titulo: '',
    autor: '',
    descripcion: '',
    precio: 0,
    categoriaUid: '',
    imageUrl: '',
    disponible: true
  };

  constructor(private route: ActivatedRoute, private router: Router, private libroService: LibroService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.libroId = id;
      this.libroService.getLibro(this.libroId).subscribe(libro => {
        this.libro = libro;
      }, error => {
        console.error('Error fetching libro:', error);
        this.router.navigate(['/lista-libros']); 
      });
    } else {
      console.error('No se encontró el ID del libro en la URL.');
      this.router.navigate(['/lista-libros']); 
    }
  }

  guardarCambios(): void {
    if (this.libroId) {
      this.libroService.updateLibro(this.libroId, this.libro)
        .then(() => {
          console.log("Libro actualizado correctamente.");
          this.router.navigate(['/lista-libros']); 
        })
        .catch(error => {
          console.error("Error al actualizar el libro: ", error);
        });
    } else {
      console.error('No se puede actualizar el libro sin un ID.');
    }
  }
}
