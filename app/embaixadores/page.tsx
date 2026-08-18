import { client } from '@/sanity/lib/client';

export const metadata = {
  title: 'Embaixadores | TF Store',
  description: 'Conheça os influenciadores e parceiros que confiam na TF Store.',
};

async function getInfluencers() {
  const query = `*[_type == "influencer"] {
    _id,
    name,
    instagram,
    testimonial,
    profileUrl,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function EmbaixadoresPage() {
  const influencers = await getInfluencers();

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Embaixadores TF Store
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Conheça as pessoas reais, criadores de conteúdo e parceiros que confiam na nossa qualidade e indicam nossos produtos de olhos fechados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((inf: any) => (
            <a 
              key={inf._id} 
              href={inf.profileUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                {inf.imageUrl ? (
                  <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-1">
                {inf.name}
                <svg className="w-[18px] h-[18px] text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5213 2.62368C11.3147 1.75231 12.6853 1.75231 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2477 11.3147 22.2477 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2477 11.3147 22.2477 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41554 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75231 12.6853 1.75231 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41554C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z" fill="#3B82F6"/>
                  <path d="M10.4638 15.3409C10.2078 15.3409 9.9517 15.2432 9.75635 15.0479L7.31502 12.6065C6.92433 12.2158 6.92433 11.5824 7.31502 11.1917C7.70572 10.801 8.33917 10.801 8.72986 11.1917L10.4638 12.9256L15.2701 8.11933C15.6608 7.72863 16.2943 7.72863 16.685 8.11933C17.0757 8.51002 17.0757 9.14347 16.685 9.53416L11.1713 15.0479C10.9759 15.2432 10.7199 15.3409 10.4638 15.3409Z" fill="white"/>
                </svg>
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-4">
                {inf.instagram}
              </p>

              {inf.testimonial && (
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{inf.testimonial}"
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}