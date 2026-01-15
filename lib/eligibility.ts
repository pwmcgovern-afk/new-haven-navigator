import { calculatePctFPL } from './constants'

export interface UserProfile {
  zipCode: string
  householdSize: number
  monthlyIncome: number
  housingStatus: string
  insuranceStatus: string
  populations: string[]
  categoriesNeeded: string[]
}

export interface EligibilityCriteria {
  incomeLimitPctFpl?: number | null
  housingStatus?: string[]
  populations?: string[]
  insuranceRequired?: boolean | null
  documentsRequired?: string[]
  ageMin?: number | null
  ageMax?: number | null
  residencyRequired?: boolean
  citizenshipRequired?: boolean
}

export interface ResourceWithEligibility {
  id: string
  name: string
  organization?: string | null
  description: string
  categories: string[]
  address?: string | null
  city: string
  phone?: string | null
  website?: string | null
  eligibility?: EligibilityCriteria | null
  howToApply?: string | null
}

/**
 * Check if a user matches a resource's eligibility criteria
 * Returns a score from 0-100 indicating match strength
 */
export function calculateEligibilityScore(
  user: UserProfile,
  resource: ResourceWithEligibility
): number {
  const eligibility = resource.eligibility as EligibilityCriteria | null

  // If no eligibility criteria, assume everyone qualifies
  if (!eligibility) {
    return 100
  }

  let score = 100
  let disqualified = false

  // Check income limit
  if (eligibility.incomeLimitPctFpl) {
    const annualIncome = user.monthlyIncome * 12
    const userPctFpl = calculatePctFPL(annualIncome, user.householdSize)

    if (userPctFpl > eligibility.incomeLimitPctFpl) {
      // Over income limit - might still be close
      const overBy = userPctFpl - eligibility.incomeLimitPctFpl
      if (overBy > 50) {
        disqualified = true
      } else {
        score -= overBy // Reduce score by how much over
      }
    }
  }

  // Check housing status match
  if (eligibility.housingStatus && eligibility.housingStatus.length > 0) {
    if (!eligibility.housingStatus.includes(user.housingStatus)) {
      // Some programs are only for homeless - hard disqualify
      if (eligibility.housingStatus.includes('homeless') &&
          !eligibility.housingStatus.includes('housed')) {
        disqualified = true
      } else {
        score -= 20
      }
    }
  }

  // Check population match - bonus points for matching
  if (eligibility.populations && eligibility.populations.length > 0) {
    const matchingPops = eligibility.populations.filter(p =>
      user.populations.includes(p)
    )

    if (matchingPops.length > 0) {
      score += 10 // Bonus for matching special populations
    }
  }

  // Check category match
  const categoryMatch = resource.categories.some(c =>
    user.categoriesNeeded.includes(c)
  )
  if (!categoryMatch && user.categoriesNeeded.length > 0) {
    score -= 30
  }

  if (disqualified) {
    return 0
  }

  return Math.max(0, Math.min(100, score))
}

/**
 * Filter and rank resources for a user
 */
export function filterAndRankResources(
  user: UserProfile,
  resources: ResourceWithEligibility[]
): Array<ResourceWithEligibility & { score: number }> {
  return resources
    .map(resource => ({
      ...resource,
      score: calculateEligibilityScore(user, resource)
    }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
}
