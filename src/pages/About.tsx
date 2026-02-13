import React from 'react';
import { Newspaper, Rss, Shield, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-[var(--text)] mb-4">About AiUnlocked</h1>
      <p className="text-lg text-[var(--muted)] mb-12 leading-relaxed">
        AiUnlocked is your go-to source for curated AI news from the world's top publications and research labs.
        We aggregate, categorize, and summarize the most important stories so you can stay informed without the noise.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          { icon: Rss, title: 'Aggregated Sources', desc: 'We pull from TechCrunch, ArXiv, OpenAI, Anthropic, Google AI, and more.' },
          { icon: Newspaper, title: 'Curated Categories', desc: 'Articles are organized into LLMs, Robotics, Research, Tools, Policy, and more.' },
          { icon: Zap, title: 'Real-time Updates', desc: 'Our feeds refresh regularly so you never miss a breaking story.' },
          { icon: Shield, title: 'No Noise', desc: 'We filter out low-quality content and surface what matters most.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:shadow-md transition-shadow duration-200">
            <Icon className="text-[var(--accent)] mb-3" size={24} />
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{title}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <section className="border-t border-[var(--border)] pt-10">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Our Mission</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          AI is moving fast. Our mission is to make it easy for developers, researchers, and enthusiasts to keep up
          with the latest breakthroughs, tools, and policy changes — all in one place. AiUnlocked is built for
          the AI community, by the AI community.
        </p>
      </section>
    </div>
  );
};
