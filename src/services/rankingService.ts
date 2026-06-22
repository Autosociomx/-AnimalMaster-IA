import { Mentor } from '../data/content';

export const calculateMentorScore = (mentor: Mentor): number => {
  const { userRating, resolutionRate, retentionRate, knowledgeUpdate, innovation } = mentor.metrics;
  // Normalizando todo a escala 0-5
  return (userRating * 0.3) + 
         (resolutionRate * 5 * 0.25) + 
         (retentionRate * 5 * 0.2) + 
         (knowledgeUpdate * 5 * 0.15) + 
         (innovation * 5 * 0.1);
};
