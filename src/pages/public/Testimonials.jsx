import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import api from '../../lib/api.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { pageContent } from '../../lib/format.js';

function Stars({ n = 5 }) {
  return <div className="text-gold">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</div>;
}

export default function Testimonials() {
  const { data, isLoading, refetch } = useApiQuery(['testimonials', { size: 50 }], ENDPOINTS.testimonials, { params: { size: 50 } });
  const { items } = pageContent(data);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { rating: 5 } });

  const onSubmit = async (values) => {
    try {
      await api.post(ENDPOINTS.submitTestimonial, { ...values, rating: Number(values.rating) });
      toast.success('Thank you! Your testimonial is awaiting approval.');
      reset({ rating: 5 });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Seo title="Testimonials" />
      <Section eyebrow="Client Voices" title="What Clients Say" className="bg-cream pt-32">
        {isLoading ? <Loader /> : !items.length ? <EmptyState message="No testimonials yet." /> : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <figure key={t.id} className="card flex flex-col" data-reveal>
                <Stars n={t.rating} />
                <blockquote className="mt-3 flex-1 text-sm italic text-navy-800">“{t.feedback}”</blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold text-navy-900">{t.clientName}</p>
                  {t.clientDesignation && <p className="text-xs text-navy-700/60">{t.clientDesignation}</p>}
                  {t.caseType && <p className="mt-1 text-xs text-gold-dark">{t.caseType}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      <Section eyebrow="Share Your Experience" title="Leave a Testimonial" className="bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid max-w-2xl gap-5">
          <div>
            <label className="field-label">Your Name</label>
            <input className="field-input" {...register('clientName', { required: 'Name is required', maxLength: 200 })} />
            {errors.clientName && <p className="field-error">{errors.clientName.message}</p>}
          </div>
          <div>
            <label className="field-label">Designation (optional)</label>
            <input className="field-input" {...register('clientDesignation')} />
          </div>
          <div>
            <label className="field-label">Case Type (optional)</label>
            <input className="field-input" {...register('caseType')} />
          </div>
          <div>
            <label className="field-label">Rating</label>
            <select className="field-input" {...register('rating', { required: true })}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Feedback</label>
            <textarea rows={4} className="field-input" {...register('feedback', { required: 'Feedback is required' })} />
            {errors.feedback && <p className="field-error">{errors.feedback.message}</p>}
          </div>
          <button disabled={isSubmitting} className="btn-gold justify-self-start">
            {isSubmitting ? 'Submitting…' : 'Submit Testimonial'}
          </button>
        </form>
      </Section>
    </>
  );
}
