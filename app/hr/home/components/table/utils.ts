import { ICandidate } from "types";

export const filterCandidate = (data: ICandidate[] | undefined) => {
  if (!data) return [];

  const groupedCandidates: { [key: string]: ICandidate[] } = {};

  data.forEach((candidate) => {
    const key = candidate.meeting
      ? candidate.meeting.responsible?.id.toString()
      : "No meeting";
    groupedCandidates[key] = groupedCandidates[key] || [];
    groupedCandidates[key].push(candidate);
  });

  return Object.entries(groupedCandidates).map(([title, data]) => ({
    data,
    responsible: Number(title) !== 0 ? data[0]?.meeting?.responsible : null,
  }));
};
