import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Criamos um cliente especial do Sanity que tem permissão para ESCREVER (usando um token secreto)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // Tem que ser false para enviar dados
  token: process.env.SANITY_API_WRITE_TOKEN, // Nossa senha secreta!
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, userName, rating, comment } = body;

    // Verifica se não está faltando nada
    if (!productId || !userName || !rating || !comment) {
      return NextResponse.json({ message: 'Preencha todos os campos!' }, { status: 400 });
    }

    // Salva no banco de dados do Sanity
    const newReview = await writeClient.create({
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      userName,
      rating: Number(rating),
      comment,
      status: 'approved', // Salva como aprovado automaticamente
    });

    return NextResponse.json({ message: 'Avaliação salva com sucesso!', review: newReview }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}