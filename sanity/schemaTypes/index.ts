import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./product";
import { categorySchema } from "./category";
import { order } from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, order],
};
