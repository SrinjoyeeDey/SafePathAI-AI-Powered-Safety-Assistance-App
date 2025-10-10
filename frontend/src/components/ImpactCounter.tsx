import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import type { ImpactCounterProps } from '../types/Impact';


/**
 * A component that displays a statistic with a counting-up animation when it scrolls into view.
 * It uses `react-countup` for the animation and `react-intersection-observer` to trigger it.
 *
 * @param {ImpactCounterProps} props - The props for the component.
 * @param {IconType} props.icon - The icon component to display above the number.
 * @param {number} props.end - The final number for the counter to animate to.
 * @param {string} [props.suffix] - An optional string to append after the number (e.g., '+', 'K').
 * @param {string} props.label - The descriptive label to display below the number.
 * @returns {React.ReactElement} The rendered ImpactCounter component.
 */
const ImpactCounter: React.FC<ImpactCounterProps> = ({ icon: Icon, end, suffix = '', label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.5,    // Trigger when 50% of the element is in view
  });

  return (
    <div ref={ref} className="text-center p-4">
      <Icon className="text-5xl text-primary mx-auto mb-4" />
      <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        {inView ? <CountUp end={end} duration={2.5} /> : '0'}
        {suffix}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">{label}</p>
    </div>
  );
};

export default ImpactCounter;