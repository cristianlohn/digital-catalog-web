import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'influencer',
  title: 'Influenciadores',
  type: 'document',
  icon: () => '⭐', // Ícone de estrela para destacar no painel
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Influenciador',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instagram',
      title: 'Arroba do Instagram (ex: @tfstore)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto do Perfil',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Frase curta / Depoimento',
      type: 'text',
      description: 'Uma frase curta do influenciador recomendando a loja.',
    }),
    defineField({
      name: 'profileUrl',
      title: 'Link do Perfil (URL completa)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'instagram',
      media: 'image',
    },
  },
});