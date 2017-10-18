import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://c1.staticflickr.com/9/8575/15775087589_a725c0b077_b.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://c1.staticflickr.com/9/8575/15775087589_a725c0b077_b.jpg')
  ];

  getRecipes() {
    return this.recipes.slice(); //returns a new array that's an exact copy in this file
  }
}
