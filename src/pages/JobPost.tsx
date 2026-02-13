import React from 'react';
import { Briefcase, FileText, CheckCircle, CreditCard } from 'lucide-react';
import { JobSubmissionForm } from '../components/jobs/JobSubmissionForm';

const steps = [
  { icon: FileText, title: 'Submit', description: 'Fill out the form with your job details' },
  { icon: CreditCard, title: 'Pay $99', description: 'We\'ll send payment instructions to your email' },
  { icon: CheckCircle, title: 'Go Live', description: 'Your listing goes live for 30 days after approval' },
];

export const JobPost: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--accent)]/10 rounded-2xl mb-4">
            <Briefcase size={32} className="text-[var(--accent)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            Post an AI Job
          </h1>
          <p className="text-lg text-[var(--muted)]">
            Reach thousands of AI professionals. $99 per listing, 30 days.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-[var(--text)] text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-4">
                  <step.icon size={24} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <JobSubmissionForm />
          </div>
        </div>
      </section>
    </div>
  );
};
