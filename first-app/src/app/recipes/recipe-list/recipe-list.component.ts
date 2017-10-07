import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://c1.staticflickr.com/9/8575/15775087589_a725c0b077_b.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://c1.staticflickr.com/9/8575/15775087589_a725c0b077_b.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
