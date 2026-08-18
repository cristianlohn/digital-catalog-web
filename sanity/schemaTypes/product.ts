import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: () => '📱',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Link Amigável (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isPromo',
      title: 'Produto em Promoção? (🔥)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'condition',
      title: 'Condição (Novo / Seminovo)',
      type: 'string',
      options: {
        list: [
          { title: 'Novo', value: 'novo' },
          { title: 'Seminovo', value: 'seminovo' },
        ],
      },
    }),
    defineField({
      name: 'battery',
      title: 'Saúde da Bateria (%)',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Destaque na Home',
      type: 'boolean',
    }),
    defineField({
      name: 'images',
      title: 'Fotos do Produto',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      images: 'images',
    },
    prepare({ title, price, images }) {
      return {
        title: title || 'Sem nome',
        subtitle: price ? `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Sem preço',
        media: images && images.length > 0 ? images[0] : undefined,
      };
    },
  },
});