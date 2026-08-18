import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Avaliações dos Clientes',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Produto Avaliado',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Qual produto o cliente está avaliando?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'userName',
      title: 'Nome do Cliente',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Nota (Estrelas)',
      type: 'number',
      description: 'Nota de 1 a 5',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comentário',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status de Aprovação',
      type: 'string',
      options: {
        list: [
          { title: 'Pendente (Aguardando Moderação)', value: 'pending' },
          { title: 'Aprovado (Exibir no site)', value: 'approved' },
          { title: 'Rejeitado', value: 'rejected' }
        ],
        layout: 'radio'
      },
      initialValue: 'approved', 
      description: 'Você pode mudar para pendente se quiser aprovar manualmente cada comentário antes de ir pro site.'
    }),
  ],
  preview: {
    select: {
      title: 'userName',
      subtitle: 'product.title',
      rating: 'rating'
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection;
      return {
        title: `${title} - ${rating} Estrelas ⭐`,
        subtitle: `Produto: ${subtitle}`,
      };
    },
  },
});