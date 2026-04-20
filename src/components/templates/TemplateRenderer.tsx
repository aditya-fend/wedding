import React, { Suspense } from 'react';
import { InvitationContent } from '@/types/invitation';

// Lazy load templates for performance
const JawaRoyalKeraton = React.lazy(() => import('./JawaRoyalKeraton'));
const SundaAnggunPriangan = React.lazy(() => import('./SundaAnggunPriangan'));
const MinangMaharaja = React.lazy(() => import('./MinangMaharaja'));

const templateRegistry: Record<string, React.ComponentType<{ data: InvitationContent }>> = {
  'jawa-royal-keraton': JawaRoyalKeraton,
  'sunda-anggun-priangan': SundaAnggunPriangan,
  'minang-maharaja': MinangMaharaja,
  // Add other templates here as they are generated
};

interface TemplateRendererProps {
  templateId: string;
  data: InvitationContent;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
  const TemplateComponent = templateRegistry[templateId];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
          <p>The template "{templateId}" is currently under development or does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
          <p className="text-white tracking-widest uppercase text-sm">Loading Premium Experience...</p>
        </div>
      </div>
    }>
      <TemplateComponent data={data} />
    </Suspense>
  );
}
