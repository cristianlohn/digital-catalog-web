import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Configurações da Loja',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'Número do WhatsApp (Apenas números com DDD)',
      description: 'Exemplo: 554784251082 (Não coloque parênteses ou traços)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramUser',
      title: 'Usuário do Instagram',
      description: 'Exemplo: @tfstore (com o @)',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link Completo do Instagram',
      description: 'Exemplo: https://instagram.com/tfstore',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-mail de Contato',
      description: 'Exemplo: contato@tfstore.com.br',
      type: 'string',
    }),
    defineField({
      name: 'storeAddress',
      title: 'Cidade / Endereço da Loja',
      description: 'Exemplo: Joinville, SC',
      type: 'string',
    }),
    defineField({
      name: 'adminEmails',
      title: 'E-mails dos Administradores',
      description: 'Adicione os e-mails (que fazem login na loja) que terão acesso ao botão do Painel Admin.',
      type: 'array',
      of: [{ type: 'string' }],
    },)
  ],
});