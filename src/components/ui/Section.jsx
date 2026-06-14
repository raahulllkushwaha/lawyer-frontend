import { useReveal } from '../../hooks/useReveal.js';

export default function Section({ id, eyebrow, title, subtitle, children, className = '', center = false }) {
  const ref = useReveal();
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page" ref={ref}>
        {(eyebrow || title || subtitle) && (
          <div className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
            {eyebrow && <span className="eyebrow" data-reveal>{eyebrow}</span>}
            {title && (
              <h2 className="heading-serif mt-3 text-3xl sm:text-4xl lg:text-5xl" data-reveal>
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-navy-700/80" data-reveal>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
