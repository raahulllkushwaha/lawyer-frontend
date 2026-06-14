import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';

export default function Faq() {
  const { data, isLoading } = useApiQuery('faqs', ENDPOINTS.faqs);
  const [openId, setOpenId] = useState(null);

  return (
    <>
      <Seo title="FAQ" />
      <Section eyebrow="Questions" title="Frequently Asked Questions" className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="mx-auto max-w-3xl divide-y divide-navy/10">
            {data.map((f) => {
              const open = openId === f.id;
              return (
                <div key={f.id} data-reveal>
                  <button onClick={() => setOpenId(open ? null : f.id)} className="flex w-full items-center justify-between py-5 text-left">
                    <span className="font-medium text-navy-900">{f.question}</span>
                    <span className="ml-4 text-gold">{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pb-5 text-sm leading-relaxed text-navy-700/80">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
