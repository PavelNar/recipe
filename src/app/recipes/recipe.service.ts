import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   new Recipe('Polish Goulash(Pork Stew)', 'Full of pork and mushrooms', 'https://www.polonist.com/wp-content/uploads/2021/05/Polish-Goulash-Pork-Stew-1600sq-o.jpg', [
  //     new Ingredient('Pork neck', 2),
  //     new Ingredient('Potatoes', 6),
  //   ]),
  //   new Recipe('Fish and Chips', 'Classic fish and chips', 'https://www.thespruceeats.com/thmb/k8Ejnb3LR7yrhwGirJEC2x6r1sg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-fish-and-chips-recipe-434856-Hero-5b61b89346e0fb00500f2141.jpg', [
  //     new Ingredient('Fish', 1),
  //     new Ingredient('Potatoes', 4),
  //
  //   ]),
  // ]

  private recipes: Recipe[] = []

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
