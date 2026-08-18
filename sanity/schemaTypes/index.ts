import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import influencer from './influencer'
import { review } from './review'
import { banner } from './banner'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, influencer, review, banner, settings],
}