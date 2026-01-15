export interface Resource {
  id: string
  name: string
  organization: string | null
  description: string
  categories: string[]
  address: string | null
  city: string
  state: string
  zip: string | null
  phone: string | null
  website: string | null
  email: string | null
  hours: string | null
  eligibility: unknown
  howToApply: string | null
  source: string
  sourceId: string | null
  verifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  displayOrder: number
}

// For list views with only needed fields
export interface ResourceListItem {
  id: string
  name: string
  organization: string | null
  description: string
  categories: string[]
  address: string | null
  phone: string | null
}
