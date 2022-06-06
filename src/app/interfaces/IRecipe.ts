export interface IRecipeIn
{
    title:string
    prep_time:string
    cooking_time:string
    rest_time:string
    categories:string
    ingredients_list:string
    serving_size:string
    instructions:string
    image:string
}

export interface IRecipeOut
{
    id:number
    title:string
    prep_time:string
    cooking_time:string
    rest_time:string
    categories:string
    ingredients_list:string
    serving_size:string
    instructions:string
    image:string
    createdAt:Date
    updatedAt:Date
}