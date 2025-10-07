import { useState, useEffect } from 'react';
import type { TeamMemberData } from '../types/Team';
import type { StoryData } from '../types/Story';
import type { ImpactData } from '../types/Impact';
import type { TimelineItemData } from '../types/Timeline';
import type { WhyChooseUsData } from '../types/WhyChooseUs';
import type { WorkflowStepData } from '../types/Workflow';

interface AboutUsData {
  teamData: TeamMemberData[];
  stories: StoryData[];
  impactData: ImpactData[];
  timelineData: TimelineItemData[];
  whyChooseUsData: WhyChooseUsData[];
  workflowData: WorkflowStepData[];
}

export const useAboutUsData = () => {
  const [data, setData] = useState<AboutUsData>({
    teamData: [],
    stories: [],
    impactData: [],
    timelineData: [],
    whyChooseUsData: [],
    workflowData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('/data/team.json'),
          fetch('/data/stories.json'),
          fetch('/data/impact.json'),
          fetch('/data/timeline.json'),
          fetch('/data/whychooseus.json'),
          fetch('/data/workflow.json'),
        ]);

        const [team, storyData, impact, timeline, why, workflow] = await Promise.all(responses.map(res => res.json()));
        setData({ teamData: team, stories: storyData, impactData: impact, timelineData: timeline, whyChooseUsData: why, workflowData: workflow });
      } catch (err) {
        console.error("Failed to fetch page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading };
};