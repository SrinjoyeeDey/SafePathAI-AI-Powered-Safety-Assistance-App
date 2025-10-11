import React, { useEffect, useRef, useState } from 'react';

interface WorkflowStepCardProps {
  step: number;
  title: string;
  description: string;
}

const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, (step - 1) * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [step]);

  return (
    <div
      ref={cardRef}
      className={`relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-secondary/20 hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
        {step}
      </div>
      <div className="pt-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default WorkflowStepCard;