import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import api from '../../lib/api.js';
import { ENDPOINTS } from '../../lib/endpoints.js';

const PHONE_RE = /^[6-9]\d{9}$/;

export default function Contact() {
  const { data: about } = useApiQuery('about-contact', ENDPOINTS.about);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await api.post(ENDPOINTS.contact, values);
      toast.success('Message sent. We will reach out soon.');
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Seo title="Contact" />
      <Section eyebrow="Get In Touch" title="Contact" subtitle="Reach out for a confidential discussion of your matter." className="bg-cream pt-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-navy-800" data-reveal>
            {about?.officeAddress && <p><strong>Office:</strong> {about.officeAddress}</p>}
            {(about?.city || about?.state) && <p>{[about.city, about.state].filter(Boolean).join(', ')}</p>}
            {about?.phone && <p><strong>Phone:</strong> {about.phone}</p>}
            {about?.whatsappNumber && <p><strong>WhatsApp:</strong> {about.whatsappNumber}</p>}
            {about?.email && <p><strong>Email:</strong> {about.email}</p>}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" data-reveal>
            <div>
              <label className="field-label">Name</label>
              <input className="field-input" {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label">Email</label>
                <input className="field-input" type="email" {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className="field-error">{errors.email.message}</p>}
              </div>
              <div>
                <label className="field-label">Phone</label>
                <input className="field-input" {...register('phone', { pattern: { value: PHONE_RE, message: 'Enter a valid 10-digit Indian mobile' } })} />
                {errors.phone && <p className="field-error">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <label className="field-label">Case Type (optional)</label>
              <input className="field-input" {...register('caseType')} />
            </div>
            <div>
              <label className="field-label">Message</label>
              <textarea rows={5} className="field-input" {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'At least 10 characters' } })} />
              {errors.message && <p className="field-error">{errors.message.message}</p>}
            </div>
            <button disabled={isSubmitting} className="btn-gold justify-self-start">{isSubmitting ? 'Sending…' : 'Send Message'}</button>
          </form>
        </div>
      </Section>
    </>
  );
}
