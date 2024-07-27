import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  searchTerm: string = '';
  characters: any[] = []; 
  backgroundUrl: string = ''; 

  constructor(private http: HttpClient, private router: Router) { } // Añade Router al constructor

  ngOnInit() {
    this.searchCharacters();
  }

  searchCharacters() {
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${this.searchTerm}`;
    this.http.get<any>(apiUrl).subscribe(data => {
      this.characters = data.results.slice(0,30); 
      this.characters.forEach(character => character.editMode = false); 
    });
  }

  onSearchChange() {
    this.searchCharacters();
  }

  refreshCharacters() {
    this.searchTerm = '';
    this.searchCharacters();
  }

  editCharacter(character: any) {
    character.editMode = true;
  }

  updateCharacter(character: any) {
    character.editMode = false;
    console.log('Updated character:', character);
  }

  deleteCharacter(characterId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
      this.characters = this.characters.filter(character => character.id !== characterId);
      console.log('Deleted character with ID:', characterId);
    }
  }

  goBack() {
    this.router.navigate(['/menu']); // Navega al menú cuando se hace clic en el botón "Back"
  }
}
