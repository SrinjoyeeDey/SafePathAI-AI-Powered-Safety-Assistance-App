import React from 'react';

interface WorkflowStepCardProps {
  step: number;
  title: string;
  description: string;
}

/**
 * A card component designed to display a single step in a workflow or process.
 * It features a prominent step number and a description of the step.
 *
 * @param {WorkflowStepCardProps} props - The props for the component.
 * @param {number} props.step - The number of the workflow step.
 * @param {string} props.title - The title of the workflow step.
 * @param {string} props.description - A brief description of what the step entails.
 * @returns {React.ReactElement} The rendered WorkflowStepCard component.
 */
const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step, title, description }) => {
  return (
    <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-secondary/20 hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700">
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