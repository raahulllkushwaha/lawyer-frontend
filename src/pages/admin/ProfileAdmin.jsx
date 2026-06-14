import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import Loader from '../../components/ui/Loader.jsx';

const toArr = (s) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);
const toStr = (a) => (Array.isArray(a) ? a.join(', ') : a || '');

export default function ProfileAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-profile'], queryFn: adminApi.profile.get });
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (data) reset({ ...data, languagesKnown: toStr(data.languagesKnown), courtMemberships: toStr(data.courtMemberships) });
  }, [data, reset]);

  const onSubmit = async (values) => {
    try {
      await adminApi.profile.update({
        ...values,
        enrollmentYear: values.enrollmentYear ? Number(values.enrollmentYear) : null,
        casesWon: values.casesWon ? Number(values.casesWon) : null,
        totalClients: values.totalClients ? Number(values.totalClients) : null,
        courtsPracticed: values.courtsPracticed ? Number(values.courtsPracticed) : null,
        languagesKnown: toArr(values.languagesKnown),
        courtMemberships: toArr(values.courtMemberships),
      });
      toast.success('Profile updated');
      refetch();
    } catch (err) { toast.error(err.message); }
  };

  if (isLoading) return <Loader />;
  const F = ({ name, label, type = 'text', full, textarea }) => (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="field-label">{label}</label>
      {textarea ? <textarea rows={3} className="field-input" {...register(name)} /> : <input type={type} className="field-input" {...register(name)} />}
    </div>
  );

  return (
    <>
      <PageHeader title="Profile" subtitle="Your public identity, contact details and stats" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="rounded-xl bg-white p-6 shadow-soft">
          <h3 className="mb-4 font-semibold text-navy-900">Identity</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <F name="name" label="Name" />
            <F name="tagline" label="Tagline" />
            <F name="experienceYears" label="Experience (e.g. 15+ Years)" />
            <F name="profileImageUrl" label="Profile Image URL" />
            <F name="heroDescription" label="Hero Description" full textarea />
            <F name="biography" label="Biography" full textarea />
            <F name="mission" label="Mission" full textarea />
            <F name="vision" label="Vision" full textarea />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-soft">
          <h3 className="mb-4 font-semibold text-navy-900">Bar & Practice</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <F name="barCouncilNumber" label="Bar Council Number" />
            <F name="barCouncilState" label="Bar Council State" />
            <F name="enrollmentYear" label="Enrollment Year" type="number" />
            <F name="languagesKnown" label="Languages (comma separated)" full />
            <F name="courtMemberships" label="Court Memberships (comma separated)" full />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-soft">
          <h3 className="mb-4 font-semibold text-navy-900">Contact</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <F name="email" label="Email" type="email" />
            <F name="phone" label="Phone" />
            <F name="whatsappNumber" label="WhatsApp" />
            <F name="officeAddress" label="Office Address" full textarea />
            <F name="city" label="City" />
            <F name="state" label="State" />
            <F name="pincode" label="Pincode" />
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-soft">
          <h3 className="mb-4 font-semibold text-navy-900">Social & Stats</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <F name="linkedinUrl" label="LinkedIn URL" />
            <F name="twitterUrl" label="Twitter URL" />
            <F name="facebookUrl" label="Facebook URL" />
            <F name="instagramUrl" label="Instagram URL" />
            <F name="websiteUrl" label="Website URL" />
            <F name="casesWon" label="Cases Won" type="number" />
            <F name="totalClients" label="Total Clients" type="number" />
            <F name="courtsPracticed" label="Courts Practiced" type="number" />
          </div>
        </section>

        <button disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Saving…' : 'Save Profile'}</button>
      </form>
    </>
  );
}
