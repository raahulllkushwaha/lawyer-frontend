import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import api from '../../lib/api.js';
import { ENDPOINTS } from '../../lib/endpoints.js';

const PHONE_RE = /^[6-9]\d{9}$/;
const today = new Date().toISOString().split('T')[0];

export default function Appointment() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await api.post(ENDPOINTS.appointments, values);
      toast.success('Appointment request received. We will confirm shortly.');
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Seo title="Book Consultation" />
      <Section eyebrow="Consultation" title="Book an Appointment" subtitle="Pick a date and we will confirm your slot." className="bg-cream pt-32">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid max-w-2xl gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Name</label>
              <input className="field-input" {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>
            <div>
              <label className="field-label">Phone</label>
              <input className="field-input" {...register('phone', { required: 'Phone is required', pattern: { value: PHONE_RE, message: 'Valid 10-digit Indian mobile' } })} />
              {errors.phone && <p className="field-error">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <label className="field-label">Email (optional)</label>
            <input type="email" className="field-input" {...register('email')} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Preferred Date</label>
              <input type="date" min={today} className="field-input" {...register('appointmentDate', { required: 'Date is required' })} />
              {errors.appointmentDate && <p className="field-error">{errors.appointmentDate.message}</p>}
            </div>
            <div>
              <label className="field-label">Preferred Time</label>
              <input type="time" className="field-input" {...register('appointmentTime')} />
            </div>
          </div>
          <div>
            <label className="field-label">Case Type (optional)</label>
            <input className="field-input" {...register('caseType')} />
          </div>
          <div>
            <label className="field-label">Message (optional)</label>
            <textarea rows={4} className="field-input" {...register('message')} />
          </div>
          <button disabled={isSubmitting} className="btn-gold justify-self-start">{isSubmitting ? 'Submitting…' : 'Request Appointment'}</button>
        </form>
      </Section>
    </>
  );
}
