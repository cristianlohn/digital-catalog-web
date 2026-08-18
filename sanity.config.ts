"use client";

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'
import StudioLogo, { StudioIcon } from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'TF Store | Painel Admin',
  icon: StudioIcon, // <-- Substitui o avatar "TS" vermelho pelo quadrado azul customizado!
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool()],

  schema: schema,

  studio: {
    components: {
      logo: StudioLogo,
    },
  },
})