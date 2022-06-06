import { IIngredientBookmarkOut, IRecipeBookmarkOut } from "../interfaces/IBookmark";
import { IIngredientOut } from "../interfaces/IIngredient";
import { IRecipeOut } from "../interfaces/IRecipe";

enum NOVA_GROUP
{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}

const ingredient1:IIngredientOut = 
{
    id: 1,
    product_name: "",
    ingredient_text: "",
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    salt: 0,
    calories: 0,
    nova_group: NOVA_GROUP.ONE,
    categories: "",
    serving_size: "",
    image: "",
    createdAt: undefined,
    updatedAt: undefined
}

const ingredient2:IIngredientOut = 
{
    id: 2,
    product_name: "",
    ingredient_text: "",
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    salt: 0,
    calories: 0,
    nova_group: NOVA_GROUP.TWO,
    categories: "",
    serving_size: "",
    image: "",
    createdAt: undefined,
    updatedAt: undefined
}

const recipe1: IRecipeOut = 
{
    id: 1,
    title: "",
    prep_time: "",
    cooking_time: "",
    rest_time: "",
    categories: "",
    ingredients_list: "",
    serving_size: "",
    instructions: "",
    image: "",
    createdAt: undefined,
    updatedAt: undefined
}

const recipe2: IRecipeOut = 
{
    id: 2,
    title: "",
    prep_time: "",
    cooking_time: "",
    rest_time: "",
    categories: "",
    ingredients_list: "",
    serving_size: "",
    instructions: "",
    image: "",
    createdAt: undefined,
    updatedAt: undefined
}

export const mockIngredientBookmarkList: IIngredientBookmarkOut[] = 
[
    {
        ingredient: ingredient1,
        ingredientId: 1,
        userId: 1,
        saved: true
    },
    {
        ingredient: ingredient2,
        ingredientId: 2,
        userId: 1,
        saved: true
    }
]

export const mockRecipeBookmarkList: IRecipeBookmarkOut[] = 
[
    {
        recipe: recipe1,
        recipeId: 1,
        userId: 1,
        saved: true
    },
    {
        recipe: recipe2,
        recipeId: 2,
        userId: 1,
        saved: true
    }
]