import { learningItems } from '../data/learning';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function Learning() {
  const validItems = learningItems.filter(i => i.title !== '[TO BE PROVIDED]' && i.verified);
  
  if (validItems.length === 0) return null;

  return (
    <section id="certificates" className="section-padding relative z-10">
      <div className="container">
        <div className="flex items-center gap-3 mb-16 justify-center">
          <span className="text-accent text-meta font-medium tracking-widest uppercase">04</span>
          <h2 className="text-h3 font-medium">Continuous Learning</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Swiper Card Carousel */}
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full max-w-sm"
          >
            <Swiper
              effect="cards"
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="h-[420px] w-[300px]"
              modules={[EffectCards, Autoplay]}
            >
              {validItems.map((item) => (
                <SwiperSlide key={item.id} className="rounded-2xl overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={item.image}
                    alt={`${item.title} Certificate`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* List */}
          <div className="flex-1 w-full">
            <ul className="flex flex-col">
              {validItems.map((item, i) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-[var(--color-line)] group ${i === 0 ? 'border-t' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1">
                    <h3 className="text-lead font-medium text-[var(--color-ink)] group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    {item.issuer !== '[TO BE PROVIDED]' && (
                      <span className="text-meta text-[var(--color-muted)]">{item.issuer}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    {item.date !== '[TO BE PROVIDED]' && (
                      <span className="text-meta font-mono text-[var(--color-muted)]">{item.date}</span>
                    )}
                    
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12" /></svg>
                      Verified
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
