import { z } from "zod";

export const ProductSchema = z.object({
    id:z.string(),
    title:z.string().min(3,{message:'Title must be at least 3 characters'}),
    image:z.string().url({message:'Image is required'}),
    price:z.coerce.number().gt(0,{message:'Price must be greater than 0'}),
    stock:z.coerce.number().gte(0,{message:'Stock must be greater than or equal to 0'})
})

export const NewProductSchema = ProductSchema.omit({id:true})

export const UpdateProductSchema = ProductSchema.omit({id:true,title:true,image:true})

export type IProduct = z.infer<typeof ProductSchema>

// import { z } from "zod";

// export const NewProductSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   image: z.string().url("Invalid image URL"),
//   price: z.number().min(0, "Price must be positive"),
// });

// export const UpdateProductSchema = NewProductSchema.extend({
//   id: z.string(),
// });

// export type IProduct = z.infer<typeof UpdateProductSchema>;
