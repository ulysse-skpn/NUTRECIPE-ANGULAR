import { IIngredientOut } from "../interfaces/IIngredient";
import { IRecipeOut } from "../interfaces/IRecipe";

export const mockIngredient:IIngredientOut = 
{
    id: 0,
    product_name: "",
    ingredient_text: "",
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    salt: 0,
    calories: 0,
    nova_group: 2,
    categories: "",
    serving_size: "",
    image: "",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const mockIngredientList:IIngredientOut[] = 
[
    {
        id: 0,
        product_name: "",
        ingredient_text: "",
        carbohydrates: 0,
        proteins: 0,
        fats: 0,
        salt: 0,
        calories: 0,
        nova_group: 2,
        categories: "",
        serving_size: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const mockRecipe:IRecipeOut = 
{
    id: 0,
    title: "",
    prep_time: "",
    cooking_time: "",
    rest_time: "",
    categories: "",
    ingredients_list: "",
    serving_size: "",
    instructions: "",
    image: "",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const mockRecipeList:IRecipeOut[] = 
[
    {
        id: 0,
        title: "",
        prep_time: "",
        cooking_time: "",
        rest_time: "",
        categories: "",
        ingredients_list: "",
        serving_size: "",
        instructions: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]