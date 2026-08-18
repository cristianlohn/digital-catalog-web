"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */
import {visionTool} from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import { schema } from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import StudioLogo, { StudioIcon } from './components/StudioLogo'


// --- NOVO: Componente da barra superior com o botão de voltar ---
const CustomNavbar = (props: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        padding: '10px 16px', 
        backgroundColor: '#101112', // Cor escura nativa do Sanity
        borderBottom: '1px solid #2d2d31'
      }}>
        <a 
          href="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#2563eb', // Azul do botão
            color: 'white',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <span>🏠</span> Voltar para a Loja
        </a>
      </div>
      {/* Renderiza o menu original do Sanity logo abaixo */}
      {props.renderDefault(props)}
    </div>
  );
};
// -----------------------------------------------------------------


export default defineConfig({
  name: 'default',
  title: 'TF Store | Painel Admin',
  icon: StudioIcon, // <-- Substitui o avatar "TS" vermelho pelo quadrado azul customizado!
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool()],

  schema: schema,

  // Juntamos a sua logo com a nossa navbar no mesmo bloco!
  studio: {
    components: {
      logo: StudioLogo,
      navbar: CustomNavbar, 
    },
  },
})