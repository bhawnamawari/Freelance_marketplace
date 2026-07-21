/**
 * AI-Assisted Matching Engine
 * ----------------------------
 * A weighted scoring algorithm that ranks freelancers against a task
 * (or ranks tasks against a freelancer). This is intentionally NOT a
 * black-box ML model — it's an explainable, tunable scoring function,
 * which is what most real matching systems use in production anyway.
 *
 * Score components (weights sum to 100):
 *   - Skill overlap (Jaccard-style match)   : 40 pts
 *   - Rating average                        : 20 pts
 *   - Verified skill badges relevant to task: 15 pts
 *   - Task completion history               : 10 pts
 *   - Availability                          : 10 pts
 *   - Recency / activity                    : 5 pts
 */

const WEIGHTS = {
  skillOverlap: 40,
  rating: 20,
  verifiedBadges: 15,
  completionHistory: 10,
  availability: 10,
  recency: 5,
};

function normalize(str) {
  return str.trim().toLowerCase();
}

function skillOverlapScore(taskSkills = [], freelancerSkills = []) {
  if (!taskSkills.length) return 0;
  const taskSet = new Set(taskSkills.map(normalize));
  const freelancerSet = new Set(freelancerSkills.map(normalize));
  let matches = 0;
  taskSet.forEach((s) => {
    if (freelancerSet.has(s)) matches += 1;
  });
  return matches / taskSet.size; // 0 to 1
}

function ratingScore(ratingAvg = 0) {
  return ratingAvg / 5; // 0 to 1
}

function verifiedBadgeScore(taskSkills = [], verifiedSkills = []) {
  if (!taskSkills.length || !verifiedSkills.length) return 0;
  const taskSet = new Set(taskSkills.map(normalize));
  const levelWeight = { basic: 0.5, intermediate: 0.75, expert: 1 };
  let best = 0;
  verifiedSkills.forEach((v) => {
    if (taskSet.has(normalize(v.skill))) {
      best = Math.max(best, levelWeight[v.badgeLevel] || 0.5);
    }
  });
  return best; // 0 to 1
}

function completionHistoryScore(completedTasks = 0) {
  // logarithmic-ish curve so it saturates instead of favoring only veterans
  return Math.min(completedTasks / 20, 1); // 20+ completed tasks = max score
}

function availabilityScore(availability) {
  if (availability === 'available') return 1;
  if (availability === 'busy') return 0.4;
  return 0; // unavailable
}

function recencyScore(lastActiveAt) {
  if (!lastActiveAt) return 0;
  const daysSinceActive = (Date.now() - new Date(lastActiveAt).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceActive <= 1) return 1;
  if (daysSinceActive <= 7) return 0.6;
  if (daysSinceActive <= 30) return 0.3;
  return 0;
}

/**
 * Computes a match score (0-100) between a task and a single freelancer.
 * Returns the score plus a breakdown for transparency in the API response.
 */
function scoreFreelancerForTask(task, freelancer) {
  const skillComp = skillOverlapScore(task.requiredSkills, freelancer.skills) * WEIGHTS.skillOverlap;
  const ratingComp = ratingScore(freelancer.ratingAvg) * WEIGHTS.rating;
  const badgeComp =
    verifiedBadgeScore(task.requiredSkills, freelancer.verifiedSkills) * WEIGHTS.verifiedBadges;
  const historyComp = completionHistoryScore(freelancer.completedTasks) * WEIGHTS.completionHistory;
  const availComp = availabilityScore(freelancer.availability) * WEIGHTS.availability;
  const recencyComp = recencyScore(freelancer.lastActiveAt) * WEIGHTS.recency;

  const total = skillComp + ratingComp + badgeComp + historyComp + availComp + recencyComp;

  return {
    freelancerId: freelancer._id,
    score: Math.round(total * 100) / 100,
    breakdown: {
      skillOverlap: Math.round(skillComp * 100) / 100,
      rating: Math.round(ratingComp * 100) / 100,
      verifiedBadges: Math.round(badgeComp * 100) / 100,
      completionHistory: Math.round(historyComp * 100) / 100,
      availability: Math.round(availComp * 100) / 100,
      recency: Math.round(recencyComp * 100) / 100,
    },
  };
}

/**
 * Ranks a list of candidate freelancers against a task, best match first.
 */
function rankFreelancersForTask(task, freelancers) {
  return freelancers
    .map((f) => ({ freelancer: f, ...scoreFreelancerForTask(task, f) }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Ranks a list of open tasks against a freelancer's profile, best match first.
 * Reuses the same scoring function symmetrically.
 */
function rankTasksForFreelancer(freelancer, tasks) {
  return tasks
    .map((t) => ({ task: t, ...scoreFreelancerForTask(t, freelancer) }))
    .sort((a, b) => b.score - a.score);
}

module.exports = {
  scoreFreelancerForTask,
  rankFreelancersForTask,
  rankTasksForFreelancer,
  WEIGHTS,
};
