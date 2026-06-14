import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP ScrollTrigger reveal for any container; animates direct children with [data-reveal].
export function useReveal({ y = 40, stagger = 0.12, start = 'top 82%' } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-reveal]');
    if (!targets.length) return;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: el, start },
      });
    }, el);
    return () => ctx.revert();
  }, [y, stagger, start]);
  return ref;
}
