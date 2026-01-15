import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const churchResources = [
  // ===== CHURCHES WITH FOOD MINISTRIES =====
  {
    name: 'Loaves and Fishes - St. Paul & St. James Church',
    organization: 'St. Paul and St. James Episcopal Church',
    description: 'Food pantry and clothing closet ministry since 1982. Provides food, clothing, and personal care items to anyone in need.',
    categories: ['food'],
    address: '57 Olive Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-3101',
    website: 'https://stpaulstjames.org/loaves-and-fishes-food-pantry--clothing-closet.html',
    hours: 'Donations accepted Thu-Sat 9-11am',
    howToApply: 'Walk in during distribution hours.',
    source: 'manual'
  },
  {
    name: 'Immanuel Baptist Church Clothes Closet',
    organization: 'Immanuel Baptist Church',
    description: 'Free clothing closet open to the community. Donations also accepted.',
    categories: ['food'],
    address: '475 Lyme Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-4089',
    website: 'https://immanuelbaptistnewhaven.org',
    hours: 'Pick-ups: Tuesdays 10:30am-2:45pm. Donations: Thursdays 10:30am-1pm',
    howToApply: 'Walk in during hours.',
    source: 'manual'
  },
  {
    name: 'Bethel AME Church Food Pantry',
    organization: 'Bethel AME Church',
    description: 'Church-based food pantry serving the Dixwell/Newhallville community. Part of the historic AME mission to serve the needy.',
    categories: ['food'],
    address: '255 Goffe Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 787-3052',
    website: 'https://bethelamenewhaven.com',
    hours: '3rd Saturday 10am-12pm, 4th Wednesday 12pm-2pm',
    howToApply: 'Walk in during distribution hours.',
    source: 'manual'
  },
  {
    name: 'Moved With Compassion Ministry',
    organization: 'MWCM',
    description: 'Nonprofit providing food, water, clothing, and winter coats to homeless individuals. Also provides educational and spiritual assistance.',
    categories: ['food'],
    city: 'New Haven',
    state: 'CT',
    website: 'https://mwcmglobal.org',
    howToApply: 'Contact through website for distribution schedule.',
    source: 'manual'
  },
  {
    name: 'Mount Hope Temple Food Pantry',
    organization: 'Mount Hope Temple',
    description: 'Church-based food pantry serving the Dixwell Avenue community.',
    categories: ['food'],
    address: '567 Dixwell Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    howToApply: 'Call for hours and requirements.',
    source: 'manual'
  },
  {
    name: 'Pitts Chapel Baptist Church Food Pantry',
    organization: 'Pitts Chapel Baptist Church',
    description: 'Church food pantry serving the New Haven community.',
    categories: ['food'],
    address: '64 Brewster Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-2685',
    howToApply: 'Call for distribution schedule.',
    source: 'manual'
  },
  {
    name: "St. Luke's Services Food Pantry",
    organization: "St. Luke's Episcopal Church",
    description: 'Food pantry and community services on Whalley Avenue.',
    categories: ['food'],
    address: '111 Whalley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    howToApply: 'Call for hours.',
    source: 'manual'
  },
  {
    name: "St. Matthew's Unison Freewill Baptist Food Pantry",
    organization: "St. Matthew's Unison Freewill Baptist Church",
    description: 'Church-based food pantry on Dixwell Avenue.',
    categories: ['food'],
    address: '400 Dixwell Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 865-9692',
    howToApply: 'Call for distribution schedule.',
    source: 'manual'
  },
  {
    name: 'Omega SDA Church Community Service',
    organization: 'Omega Seventh-Day Adventist Church',
    description: 'Monthly food distribution serving the New Haven community.',
    categories: ['food'],
    address: '278 Winthrop Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 865-3500',
    hours: '1st & 3rd Sunday, 10am-11:30am',
    howToApply: 'Walk in during distribution hours.',
    source: 'manual'
  },

  // ===== FAITH-BASED COMPREHENSIVE SERVICES =====
  {
    name: 'Christian Community Action',
    organization: 'CCA',
    description: 'Faith-based nonprofit since 1967 providing food pantry, housing assistance, and case management. NEW HOPE housing program offers furnished apartments for up to 36 months.',
    categories: ['food', 'housing', 'cash'],
    address: '168 Davenport Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 777-7848',
    website: 'https://ccahelping.org',
    eligibility: { housingStatus: ['homeless', 'at_risk'] },
    howToApply: 'Call or visit for intake.',
    source: 'manual'
  },
  {
    name: 'Beulah Heights Social Integration Program',
    organization: 'Beulah Heights Church',
    description: 'Comprehensive services for homeless individuals and those returning from incarceration. Warming center, meals, resource center, and van transportation.',
    categories: ['food', 'housing'],
    address: '750 George Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 745-3589',
    website: 'https://bhcsip.org',
    hours: 'Saturday 7:30am-1pm (warming center with breakfast/lunch)',
    eligibility: { housingStatus: ['homeless'], populations: ['formerly_incarcerated'] },
    howToApply: 'Walk in on Saturday or call for other services.',
    source: 'manual'
  },
  {
    name: 'Dixwell Avenue Congregational UCC',
    organization: 'Dixwell Avenue Congregational United Church of Christ',
    description: "Oldest African American Congregational Church in the world (founded 1820). Community outreach and historic connection to Dixwell/Newhallville neighborhoods.",
    categories: ['mental-health'],
    address: '217 Dixwell Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 787-3012',
    website: 'https://dixwellucc.org',
    howToApply: 'Call for information on community programs.',
    source: 'manual'
  },
  {
    name: 'Chapel on the Green',
    organization: 'Trinity Church on the Green',
    description: 'Outdoor worship service and free meal for homeless and vulnerable community members. Drumming circle, Eucharist, healing prayers, and fellowship.',
    categories: ['food', 'mental-health'],
    address: '230 Temple Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 624-3101',
    website: 'https://trinitynewhaven.org/outreach-justice-home',
    hours: 'Sundays at 2pm (worship + meal)',
    howToApply: 'Walk in. All are welcome.',
    source: 'manual'
  },
  {
    name: 'The Spiritual Fellowship',
    organization: 'Trinity Church on the Green',
    description: 'Supportive community for people struggling with addiction, mental illness, and homelessness. Includes meal and fellowship.',
    categories: ['mental-health', 'harm-reduction'],
    address: '230 Temple Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 624-3101',
    website: 'https://trinitynewhaven.org',
    hours: 'Tuesdays 12pm-2:30pm',
    howToApply: 'Walk in. All are welcome.',
    source: 'manual'
  },
  {
    name: 'Trinity Community Grants Program',
    organization: 'Trinity Church on the Green',
    description: 'Grant funding for human service programs addressing health, hunger, shelter, and education in New Haven.',
    categories: ['cash'],
    address: '230 Temple Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 624-3101',
    website: 'https://trinitynewhaven.org',
    howToApply: 'Contact church for grant application process.',
    source: 'manual'
  },
  {
    name: 'First Calvary Baptist Church',
    organization: 'First Calvary Baptist Church',
    description: 'Historic Black church in Newhallville providing community outreach and support services.',
    categories: ['mental-health'],
    address: '609 Dixwell Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-6053',
    howToApply: 'Call for information on community programs.',
    source: 'manual'
  },

  // ===== CATHOLIC SERVICES =====
  {
    name: 'St. Vincent de Paul Society - New Haven',
    organization: 'Society of St. Vincent de Paul',
    description: 'Catholic charity providing emergency financial assistance for rent, utilities, food, and other basic needs through home visits.',
    categories: ['cash', 'utilities', 'food'],
    phone: '(203) 777-7781',
    website: 'https://ssvpusa.org',
    howToApply: 'Contact local Catholic parish for referral to your neighborhood conference.',
    source: 'manual'
  },
  {
    name: 'St. Rose of Lima Church - Food Pantry',
    organization: 'St. Rose of Lima Church',
    description: 'Catholic church food pantry serving the Fair Haven community.',
    categories: ['food'],
    address: '369 Blatchley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 562-8184',
    howToApply: 'Call for distribution schedule.',
    source: 'manual'
  },
  {
    name: 'St. Francis Church & St. Rose of Lima - ESL Classes',
    organization: 'Catholic Charities',
    description: 'Free English as a Second Language classes for immigrants and refugees.',
    categories: ['immigration'],
    address: '369 Blatchley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 562-8184',
    howToApply: 'Call to register for classes.',
    source: 'manual'
  },

  // ===== OTHER FAITH-BASED =====
  {
    name: 'Jewish Family Service of Greater New Haven',
    organization: 'Jewish Family Service',
    description: 'Counseling, senior services, refugee resettlement, and emergency assistance. Serves all faiths.',
    categories: ['mental-health', 'immigration', 'cash'],
    address: '1440 Whalley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06515',
    phone: '(203) 389-5599',
    website: 'https://jfsnh.org',
    howToApply: 'Call for intake.',
    source: 'manual'
  },
  {
    name: 'Masjid Al-Islam Food Pantry',
    organization: 'Masjid Al-Islam',
    description: 'Islamic community center providing food assistance to families in need.',
    categories: ['food'],
    address: '127 Fulton Terrace',
    city: 'New Haven',
    state: 'CT',
    zip: '06512',
    phone: '(203) 469-9913',
    howToApply: 'Call for distribution schedule.',
    source: 'manual'
  },
  {
    name: 'Mercy Center',
    organization: 'Sisters of Mercy',
    description: 'Spiritual retreat center welcoming all faiths. Offers programs for personal renewal, counseling referrals, and community support.',
    categories: ['mental-health'],
    address: '167 Neck Road',
    city: 'Madison',
    state: 'CT',
    zip: '06443',
    phone: '(203) 245-0401',
    website: 'https://mercybythesea.org',
    howToApply: 'Call or visit website for program schedule.',
    source: 'manual'
  },
]

async function main() {
  console.log('Adding church and faith-based resources...')

  let added = 0
  for (const resource of churchResources) {
    const existing = await prisma.resource.findFirst({
      where: { name: resource.name }
    })

    if (!existing) {
      await prisma.resource.create({
        data: {
          ...resource,
          verifiedAt: new Date(),
        }
      })
      added++
      console.log(`Added: ${resource.name}`)
    } else {
      console.log(`Skipped (exists): ${resource.name}`)
    }
  }

  console.log(`\nAdded ${added} new faith-based resources`)
  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
