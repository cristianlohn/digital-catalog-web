import { defineField, defineType } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banners da Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal (H1)',
      description: 'O título principal que aparece no banner (Muito importante para SEO).',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      description: 'Texto de apoio abaixo do título.',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
      description: 'Ex: "Ver Ofertas", "Comprar Agora"',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link do Botão',
      description: 'Ex: /categoria/seminovos',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Fundo (Desktop)',
      description: 'Imagem principal para visualização no computador.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mobileImage',
      title: 'Imagem de Fundo (Celular)',
      description: 'Imagem quadrada ou vertical para visualização perfeita em celulares (Ajuda na velocidade e SEO mobile!).',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isActive',
      title: 'Banner Ativo?',
      description: 'Desmarque para esconder o banner sem precisar deletar.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});