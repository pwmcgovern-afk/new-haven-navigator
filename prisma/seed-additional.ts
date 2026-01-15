import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const additionalResources = [
  // ===== FOOD - Churches & Pantries =====
  {
    name: 'Community Soup Kitchen of New Haven',
    organization: 'CSK New Haven',
    description: 'Free meals served since 1977. Lunch 5 days/week, Saturday breakfast. No qualifications required - open to all.',
    categories: ['food'],
    address: '84 Broadway',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-4594',
    website: 'https://csknewhaven.org',
    hours: 'Lunch: Mon-Fri 11:30am-12:30pm, Breakfast: Sat 8-9am',
    howToApply: 'Walk in during meal times. No ID or registration required.',
    source: 'manual'
  },
  {
    name: 'Christian Community Action Food Pantry',
    organization: 'Christian Community Action',
    description: 'Food pantry providing groceries to families in need. Serves New Haven residents.',
    categories: ['food'],
    address: '168 Davenport Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 777-7848',
    hours: 'Tue-Fri 9:30am-11:45am and 2pm-3:45pm',
    howToApply: 'Bring ID and proof of New Haven address.',
    source: 'manual'
  },
  {
    name: 'Varick AME Zion Church Food Pantry',
    organization: 'Varick AME Zion Church',
    description: 'Food pantry and soup kitchen serving the Dixwell community. Also provides clothing assistance.',
    categories: ['food'],
    address: '242 Dixwell Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-9742',
    hours: 'Food pantry: 4th Tuesday 3pm. Soup kitchen: Monday 5:30-6:30pm',
    howToApply: 'Bring photo ID with proof of address.',
    source: 'manual'
  },
  {
    name: 'Salvation Army New Haven Food Pantry',
    organization: 'Salvation Army',
    description: 'Food pantry and emergency assistance for families in crisis.',
    categories: ['food', 'cash'],
    address: '450 George Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-9891',
    hours: 'Mon, Wed, Fri 9am-11:30am',
    howToApply: 'Walk in during hours with ID.',
    source: 'manual'
  },
  {
    name: 'St. Ann Food Pantry & Soup Kitchen',
    organization: 'St. Ann Church',
    description: 'Food pantry and soup kitchen serving the Greater New Haven area.',
    categories: ['food'],
    address: '930 Dixwell Avenue',
    city: 'Hamden',
    state: 'CT',
    zip: '06514',
    phone: '(203) 624-6153',
    howToApply: 'Call for hours and requirements.',
    source: 'manual'
  },
  {
    name: 'Macedonia Church Food Pantry',
    organization: 'Macedonia Church of God in Christ',
    description: 'Church-based food pantry serving the Newhallville community.',
    categories: ['food'],
    address: '151 Newhall Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-5765',
    howToApply: 'Call for hours and requirements.',
    source: 'manual'
  },
  {
    name: 'Community Baptist Church Mobile Food Pantry',
    organization: 'Community Baptist Church',
    description: 'Monthly mobile food pantry distribution.',
    categories: ['food'],
    address: '143 Shelton Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    hours: '1st Wednesday of month, 10am-11am',
    howToApply: 'Show up during distribution time.',
    source: 'manual'
  },

  // ===== HOUSING - Shelters & Transitional =====
  {
    name: 'Youth Continuum - Youth Shelter',
    organization: 'Youth Continuum',
    description: 'Shelter, housing, and support services for homeless youth ages 14-24. Includes warming center in winter.',
    categories: ['housing'],
    address: '85 Willow Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 777-8445',
    website: 'https://youthcontinuum.org',
    eligibility: { ageMax: 24 },
    howToApply: 'Call or walk in. Youth warming center opened January 2025.',
    source: 'manual'
  },
  {
    name: 'Life Haven - Women & Children Shelter',
    organization: 'Life Haven',
    description: 'Emergency shelter for single women with children and pregnant women in their last trimester.',
    categories: ['housing'],
    address: '547 Elm Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 773-1892',
    eligibility: { populations: ['pregnant', 'children'] },
    howToApply: 'Call 211 for referral or call directly.',
    source: 'manual'
  },
  {
    name: 'Hillside Family Shelter',
    organization: 'Columbus House',
    description: 'Emergency temporary housing for families with at least one adult and one child. 30-60 day stays.',
    categories: ['housing'],
    phone: '(203) 401-4400',
    website: 'https://columbushouse.org',
    eligibility: { populations: ['children'], housingStatus: ['homeless'] },
    howToApply: 'Call 211 for referral to Coordinated Access Network.',
    source: 'manual'
  },
  {
    name: 'Continuum of Care Emergency Housing',
    organization: 'Continuum of Care Inc',
    description: 'Emergency housing serving 100+ homeless individuals daily. Provides food, shelter, and support services.',
    categories: ['housing', 'food'],
    address: '109 Legion Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 562-2264',
    website: 'https://continuumct.org',
    eligibility: { housingStatus: ['homeless'] },
    howToApply: 'Walk in or call. Most stays are a couple months while finding housing.',
    source: 'manual'
  },
  {
    name: 'New Reach - CareWays Shelter',
    organization: 'New Reach',
    description: 'Emergency shelter for families with female head of household.',
    categories: ['housing'],
    phone: '(203) 492-1077',
    website: 'https://newreach.org',
    eligibility: { housingStatus: ['homeless'], populations: ['children'] },
    howToApply: 'Call 211 for intake screening.',
    source: 'manual'
  },

  // ===== HEALTHCARE - Free Clinics =====
  {
    name: 'HAVEN Free Clinic',
    organization: 'Yale University / HAVEN',
    description: 'Student-run free primary care clinic for uninsured New Haven residents. Comprehensive care at no cost.',
    categories: ['healthcare'],
    address: '374 Grand Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 745-0934',
    website: 'https://havenfreeclinic.com',
    hours: 'Saturdays 8:30am-12pm',
    eligibility: { insuranceRequired: false },
    howToApply: 'Must be uninsured and live in New Haven. Walk in Saturday mornings.',
    source: 'manual'
  },
  {
    name: 'New Haven Health Department - Health Center',
    organization: 'City of New Haven',
    description: 'Affordable healthcare services. $20 fee but no one turned away for inability to pay.',
    categories: ['healthcare'],
    address: '424 Chapel Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 946-8181',
    website: 'https://nhvhealth.org',
    hours: 'Mon-Fri 8:30am-4:30pm',
    howToApply: 'Call to make appointment. Interpreter services available.',
    source: 'manual'
  },
  {
    name: 'Project Access New Haven',
    organization: 'Project Access New Haven',
    description: 'Connects uninsured patients with volunteer physicians for specialty care. Also helps with insurance enrollment.',
    categories: ['healthcare'],
    address: '129 Church Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 503-3460',
    website: 'https://pa-nh.org',
    eligibility: { insuranceRequired: false, incomeLimitPctFpl: 300 },
    howToApply: 'Referral from primary care provider required.',
    source: 'manual'
  },

  // ===== HARM REDUCTION / ADDICTION =====
  {
    name: 'MCCA New Haven Outpatient',
    organization: 'Midwestern CT Council on Alcoholism',
    description: 'Full range of outpatient addiction treatment - individual, group, and intensive outpatient (IOP).',
    categories: ['harm-reduction', 'mental-health'],
    address: '93 Park Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 785-8700',
    website: 'https://mccaonline.com',
    howToApply: 'Call for intake assessment.',
    source: 'manual'
  },
  {
    name: 'SATU - Yale Addiction Treatment',
    organization: 'Connecticut Mental Health Center / Yale',
    description: 'Substance use and Addiction Treatment Unit offering comprehensive addiction services including MAT.',
    categories: ['harm-reduction', 'mental-health'],
    address: '34 Park Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 974-7077',
    website: 'https://medicine.yale.edu/psychiatry/care/cmhc/clinics/satu',
    howToApply: 'Call for intake appointment.',
    source: 'manual'
  },
  {
    name: 'CASA Inc - MAAS Day Treatment',
    organization: 'CASA Inc',
    description: 'Intensive outpatient program for adults with substance use disorders. Services in English and Spanish.',
    categories: ['harm-reduction'],
    address: '3 State Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-6093',
    website: 'https://casaincct.org',
    hours: 'Mon, Wed, Fri 9am-12pm',
    howToApply: 'Call for intake.',
    source: 'manual'
  },
  {
    name: 'Grant Street Partnership',
    organization: 'Grant Street Partnership',
    description: 'Substance abuse treatment for men and women. Temporary housing for homeless men in treatment. Meals and transportation provided.',
    categories: ['harm-reduction', 'housing'],
    address: '178 Grant Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 789-0283',
    eligibility: { housingStatus: ['homeless'] },
    howToApply: 'Call for intake.',
    source: 'manual'
  },
  {
    name: 'Crossroads Recovery Center',
    organization: 'Crossroads',
    description: 'Safe, nurturing recovery environment for addiction and mental health disorders. Culturally competent care.',
    categories: ['harm-reduction', 'mental-health'],
    address: '54 East Ramsdell Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 865-3104',
    howToApply: 'Call for intake assessment.',
    source: 'manual'
  },

  // ===== EMPLOYMENT =====
  {
    name: 'Workforce Alliance',
    organization: 'Workforce Alliance',
    description: 'Job search assistance, resume help, career coaching, and job training. Free manufacturing training in 5 weeks.',
    categories: ['employment'],
    address: '560 Ella Grasso Boulevard',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 624-1493',
    website: 'https://workforcealliance.biz',
    hours: 'Mon-Fri 8am-4:30pm',
    howToApply: 'Walk in or register online.',
    source: 'manual'
  },
  {
    name: 'American Job Center - New Haven',
    organization: 'CT Department of Labor',
    description: 'Career coaching, job search resources, training info, and employer connections. One-stop career center.',
    categories: ['employment'],
    address: '370 James Street, Suite 404',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 624-1493',
    website: 'https://ajcswct.com',
    howToApply: 'Walk in or call.',
    source: 'manual'
  },
  {
    name: 'ConnCAT Job Training',
    organization: 'ConnCAT',
    description: 'Free job training and youth programs for Connecticut residents. High-quality educational programs at no cost.',
    categories: ['employment'],
    address: '4 Science Park',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 823-0333',
    website: 'https://conncat.org',
    howToApply: 'Apply online or call.',
    source: 'manual'
  },
  {
    name: 'New Haven Works',
    organization: 'New Haven Works',
    description: 'Connects New Haven residents to good jobs. Provides job training and placement services.',
    categories: ['employment'],
    address: '560 Ella Grasso Boulevard',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 285-8210',
    howToApply: 'Call or visit to register.',
    source: 'manual'
  },
  {
    name: 'EMERGE CT - Reentry Employment',
    organization: 'EMERGE CT',
    description: 'Paid part-time employment and training in construction, landscaping, and property management for people returning from incarceration.',
    categories: ['employment'],
    phone: '(203) 495-6084',
    website: 'https://emergect.org',
    eligibility: { populations: ['formerly_incarcerated'] },
    howToApply: 'Call for intake. Must be on parole, probation, or work release.',
    source: 'manual'
  },

  // ===== IMMIGRATION =====
  {
    name: 'Connecticut Institute for Refugees and Immigrants',
    organization: 'CIRI',
    description: 'Affordable immigration legal services, citizenship prep, and support for refugees and immigrants since 1918.',
    categories: ['immigration', 'legal'],
    address: '67 Whitney Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 781-5523',
    website: 'https://cirict.org',
    howToApply: 'Email immigration@cirict.org or call for appointment.',
    source: 'manual'
  },
  {
    name: 'Yale Law School - Immigrant Rights Clinic',
    organization: 'Yale Law School / NHLAA',
    description: 'Free immigration legal services for low-income immigrants. Removal defense, asylum, VAWA, U-Visas.',
    categories: ['immigration', 'legal'],
    address: '426 State Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 946-4811',
    website: 'https://law.yale.edu/studying-law-yale/clinical-and-experiential-learning/our-clinics/legal-assistance-immigrant-rights-clinic',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Call NHLAA for intake screening.',
    source: 'manual'
  },

  // ===== UTILITIES =====
  {
    name: 'Connecticut Energy Assistance Program (CEAP)',
    organization: 'CAANH',
    description: 'Heating assistance for low-income households. Pays for oil, gas, electric, propane, kerosene, coal, wood.',
    categories: ['utilities'],
    address: '419 Whalley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 786-6222',
    website: 'https://caanh.net/energy-assistance',
    eligibility: { incomeLimitPctFpl: 60 },
    howToApply: 'Apply online, email energyapplications@caanh.net, or drop off at 419 Whalley Ave.',
    source: 'manual'
  },
  {
    name: 'Winter Utility Shut-Off Protection',
    organization: 'CT PURA',
    description: 'Utility shut-off protection from Nov 1 - May 1 for residential customers. Know your rights.',
    categories: ['utilities'],
    phone: '(800) 382-4586',
    howToApply: 'If threatened with shut-off during winter, call PURA or 211.',
    source: 'manual'
  },

  // ===== DOMESTIC VIOLENCE =====
  {
    name: 'Umbrella Center for Domestic Violence Services',
    organization: 'BHcare',
    description: '24/7 crisis support for domestic violence survivors. Emergency shelter, counseling, safety planning, restraining orders.',
    categories: ['housing', 'legal', 'mental-health'],
    phone: '(203) 736-9944',
    website: 'https://bhcare.org/services/domestic-violence-victim-advocacy/umbrella-center-for-domestic-violence-services',
    hours: '24/7 hotline',
    eligibility: { populations: ['domestic_violence'] },
    howToApply: 'Call 24/7 crisis hotline. All services free and confidential.',
    source: 'manual'
  },
  {
    name: 'CT Safe Connect',
    organization: 'CT Coalition Against Domestic Violence',
    description: 'Statewide 24/7 hotline for domestic violence support. Call, text, or chat. All languages supported.',
    categories: ['mental-health'],
    phone: '(888) 774-2900',
    website: 'https://ctsafeconnect.org',
    hours: '24/7',
    eligibility: { populations: ['domestic_violence'] },
    howToApply: 'Call or text (888) 774-2900 or visit CTSafeConnect.org',
    source: 'manual'
  },

  // ===== ADDITIONAL MENTAL HEALTH =====
  {
    name: 'The Connection - Mental Health Services',
    organization: 'The Connection Inc',
    description: 'Community mental health services, recovery support, and housing for adults with mental illness.',
    categories: ['mental-health', 'housing'],
    address: '100 South Main Street',
    city: 'Middletown',
    state: 'CT',
    zip: '06457',
    phone: '(860) 343-5500',
    website: 'https://theconnectioninc.org',
    howToApply: 'Call for intake.',
    source: 'manual'
  },

  // ===== CHILDCARE =====
  {
    name: 'LEAP - Leadership Education Athletics Partnership',
    organization: 'LEAP',
    description: 'Free summer and after-school programs for New Haven youth. Academic enrichment, sports, and leadership.',
    categories: ['childcare'],
    address: '31 Jefferson Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 773-0770',
    website: 'https://leapforkids.org',
    eligibility: { populations: ['children'] },
    howToApply: 'Apply online for summer or after-school programs.',
    source: 'manual'
  },

  // ===== LEGAL =====
  {
    name: 'CT Legal Services - New Haven',
    organization: 'Connecticut Legal Services',
    description: 'Free civil legal help for low-income residents. Housing, family, benefits, immigration for DV survivors.',
    categories: ['legal'],
    address: '85 Central Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(860) 344-8096',
    website: 'https://ctlegal.org',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Call for intake screening.',
    source: 'manual'
  },
]

async function main() {
  console.log('Adding additional resources...')

  let added = 0
  for (const resource of additionalResources) {
    // Check if resource already exists by name
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

  console.log(`\nAdded ${added} new resources`)
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
