import { type SchemaTypeDefinition } from 'sanity'
import homeSchema from './schemas/home-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homeSchema],
}
