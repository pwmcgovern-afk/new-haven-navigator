import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resources = [
  // ===== HOUSING =====
  {
    name: 'Columbus House Emergency Shelter',
    organization: 'Columbus House',
    description: 'Emergency shelter and housing services for individuals experiencing homelessness. Provides meals, case management, and connections to permanent housing.',
    categories: ['housing'],
    address: '586 Ella T Grasso Blvd',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 401-4400',
    website: 'https://columbushouse.org',
    hours: '24/7 for shelter; Office: Mon-Fri 9am-5pm',
    eligibility: { housingStatus: ['homeless'], populations: [] },
    howToApply: 'Walk in to the shelter or call for intake assessment.',
    source: 'manual'
  },
  {
    name: 'New Haven Housing Authority (Elm City Communities)',
    organization: 'Elm City Communities',
    description: 'Public housing and Section 8 Housing Choice Vouchers for low-income families, elderly, and disabled individuals.',
    categories: ['housing'],
    address: '360 Orange Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 498-8800',
    website: 'https://www.elmcitycommunities.org',
    hours: 'Mon-Fri 8:30am-4:30pm',
    eligibility: { incomeLimitPctFpl: 80, housingStatus: ['homeless', 'at_risk', 'housed'] },
    howToApply: 'Apply online or visit the office. Waitlist may be several years.',
    source: 'manual'
  },
  {
    name: 'Liberty Community Services - Rapid Rehousing',
    organization: 'Liberty Community Services',
    description: 'Rapid rehousing program helping families and individuals quickly exit homelessness through rental assistance and case management.',
    categories: ['housing'],
    address: '129 Church Street Suite 901',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 495-7680',
    website: 'https://libertycs.org',
    eligibility: { housingStatus: ['homeless'], incomeLimitPctFpl: 50 },
    howToApply: 'Referral through Coordinated Access Network (CAN). Call 211.',
    source: 'manual'
  },
  {
    name: 'Neighborhood Housing Services of New Haven',
    organization: 'NHS of New Haven',
    description: 'Homebuyer education, foreclosure prevention, and down payment assistance for first-time homebuyers.',
    categories: ['housing'],
    address: '333 Sherman Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-0598',
    website: 'https://nhsofnewhaven.org',
    eligibility: { incomeLimitPctFpl: 120 },
    howToApply: 'Call to schedule a counseling appointment.',
    source: 'manual'
  },
  {
    name: 'HOPWA Housing Assistance',
    organization: 'City of New Haven',
    description: 'Housing Opportunities for Persons With AIDS (HOPWA) provides rental assistance, utility assistance, and supportive services for people living with HIV/AIDS.',
    categories: ['housing'],
    address: '165 Church Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 946-8151',
    eligibility: { populations: ['hiv_positive'], incomeLimitPctFpl: 80 },
    howToApply: 'Contact the City of New Haven Housing Authority.',
    source: 'manual'
  },

  // ===== FOOD =====
  {
    name: 'Connecticut Food Bank - New Haven',
    organization: 'Connecticut Food Bank',
    description: 'Large-scale food distribution serving partner agencies and mobile food pantries throughout Greater New Haven.',
    categories: ['food'],
    address: '2 Research Parkway',
    city: 'Wallingford',
    state: 'CT',
    zip: '06492',
    phone: '(203) 469-5000',
    website: 'https://ctfoodbank.org',
    howToApply: 'Visit ctfoodbank.org/find-food to locate a pantry near you.',
    source: 'manual'
  },
  {
    name: 'New Haven Food Policy Council - Community Fridges',
    organization: 'New Haven Food Policy Council',
    description: 'Network of community refrigerators throughout New Haven providing free food 24/7, no questions asked.',
    categories: ['food'],
    city: 'New Haven',
    state: 'CT',
    website: 'https://nhfoodpolicycouncil.org',
    howToApply: 'Visit any community fridge location. Take what you need, leave what you can.',
    source: 'manual'
  },
  {
    name: 'Downtown Evening Soup Kitchen (DESK)',
    organization: 'DESK',
    description: 'Free hot dinner served every evening, plus case management, social services, and connections to housing.',
    categories: ['food', 'housing'],
    address: '311 Temple Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-6468',
    website: 'https://deskct.org',
    hours: 'Dinner served 5pm-6pm daily',
    howToApply: 'Walk in during dinner hours. No ID or registration required.',
    source: 'manual'
  },
  {
    name: 'Loaves & Fishes Food Pantry',
    organization: 'St. Thomas More Chapel',
    description: 'Weekly food pantry providing groceries to New Haven residents in need.',
    categories: ['food'],
    address: '268 Park Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 777-5537',
    hours: 'Saturdays 9am-12pm',
    howToApply: 'Bring ID showing New Haven address. First come, first served.',
    source: 'manual'
  },
  {
    name: 'SNAP/Food Stamps Enrollment',
    organization: 'CT Department of Social Services',
    description: 'SNAP (Supplemental Nutrition Assistance Program) provides monthly benefits to buy groceries.',
    categories: ['food', 'cash'],
    address: '789 Howard Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(855) 626-6632',
    website: 'https://portal.ct.gov/DSS',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Apply online at ct.gov/dss or call the hotline. Bring ID, proof of income, and residency.',
    source: 'manual'
  },

  // ===== CASH ASSISTANCE =====
  {
    name: 'TANF Cash Assistance',
    organization: 'CT Department of Social Services',
    description: 'Temporary Assistance for Needy Families (TANF) provides monthly cash assistance for families with children.',
    categories: ['cash'],
    address: '789 Howard Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(855) 626-6632',
    website: 'https://portal.ct.gov/DSS',
    eligibility: { incomeLimitPctFpl: 100, populations: ['children'] },
    howToApply: 'Apply at your local DSS office or online.',
    source: 'manual'
  },
  {
    name: 'Community Action Agency of New Haven - Emergency Assistance',
    organization: 'CAANH',
    description: 'Emergency financial assistance for rent, security deposits, and utility bills for income-eligible residents.',
    categories: ['cash', 'housing', 'utilities'],
    address: '419 Whalley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 387-7700',
    website: 'https://caanh.net',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Call for an appointment. Bring proof of income, ID, and documentation of emergency.',
    source: 'manual'
  },
  {
    name: 'State Emergency Assistance (EA)',
    organization: 'CT Department of Social Services',
    description: 'One-time emergency payments for families with children facing eviction or utility shutoff.',
    categories: ['cash', 'utilities'],
    phone: '(855) 626-6632',
    website: 'https://portal.ct.gov/DSS',
    eligibility: { incomeLimitPctFpl: 75, populations: ['children'] },
    howToApply: 'Contact DSS with eviction notice or shutoff notice.',
    source: 'manual'
  },
  {
    name: 'General Assistance',
    organization: 'City of New Haven',
    description: 'Temporary cash assistance for single adults without children who are unable to work.',
    categories: ['cash'],
    address: '200 Orange Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 946-8340',
    eligibility: { incomeLimitPctFpl: 50 },
    howToApply: 'Apply at the New Haven Social Services office.',
    source: 'manual'
  },

  // ===== HARM REDUCTION =====
  {
    name: 'APT Foundation - Syringe Services',
    organization: 'APT Foundation',
    description: 'Free syringe exchange, Narcan distribution, HIV/Hep C testing, and connections to treatment.',
    categories: ['harm-reduction', 'healthcare'],
    address: '1 Long Wharf Drive',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 781-4600',
    website: 'https://aptfoundation.org',
    hours: 'Mon-Fri 7am-7pm, Sat 8am-12pm',
    howToApply: 'Walk in for syringe exchange. No appointment needed.',
    source: 'manual'
  },
  {
    name: 'Cornell Scott-Hill Health Center - MAT Program',
    organization: 'Cornell Scott-Hill Health Center',
    description: 'Medication-Assisted Treatment (MAT) for opioid use disorder including Suboxone and counseling.',
    categories: ['harm-reduction', 'healthcare', 'mental-health'],
    address: '428 Columbus Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 503-3000',
    website: 'https://cornellscott.org',
    howToApply: 'Call to schedule an intake appointment. Same-day starts available.',
    source: 'manual'
  },
  {
    name: 'Free Narcan Distribution',
    organization: 'CT Department of Mental Health and Addiction Services',
    description: 'Free naloxone (Narcan) kits to prevent opioid overdose deaths. Training provided.',
    categories: ['harm-reduction'],
    phone: '(800) 563-4086',
    website: 'https://portal.ct.gov/DMHAS',
    howToApply: 'Call for distribution locations or visit any participating pharmacy.',
    source: 'manual'
  },
  {
    name: 'Yale New Haven Hospital - Emergency Suboxone',
    organization: 'Yale New Haven Hospital',
    description: 'Emergency department can start Suboxone treatment for opioid use disorder with bridge prescription and treatment referral.',
    categories: ['harm-reduction', 'healthcare'],
    address: '20 York Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 688-4242',
    website: 'https://ynhh.org',
    hours: '24/7',
    howToApply: 'Go to the Emergency Department.',
    source: 'manual'
  },

  // ===== HEALTHCARE =====
  {
    name: 'Cornell Scott-Hill Health Center - Primary Care',
    organization: 'Cornell Scott-Hill Health Center',
    description: "Connecticut's first FQHC providing primary care, dental, behavioral health, and pharmacy services on a sliding fee scale.",
    categories: ['healthcare', 'mental-health'],
    address: '428 Columbus Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 503-3000',
    website: 'https://cornellscott.org',
    hours: 'Mon-Fri 8am-5pm',
    eligibility: { incomeLimitPctFpl: 400 },
    howToApply: 'Call to schedule an appointment. Sliding fee for uninsured patients.',
    source: 'manual'
  },
  {
    name: 'Fair Haven Community Health Care',
    organization: 'Fair Haven Community Health Care',
    description: 'FQHC providing comprehensive primary care, dental, OB/GYN, pediatrics, and behavioral health.',
    categories: ['healthcare', 'mental-health'],
    address: '374 Grand Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 777-7411',
    website: 'https://fhchc.org',
    eligibility: { incomeLimitPctFpl: 400 },
    howToApply: 'Call to schedule. Sliding fee available for uninsured.',
    source: 'manual'
  },
  {
    name: 'HUSKY Health (Medicaid) Enrollment',
    organization: 'Access Health CT',
    description: 'Free or low-cost health insurance for children, pregnant women, parents, and adults through Connecticut Medicaid.',
    categories: ['healthcare'],
    phone: '(855) 805-4325',
    website: 'https://accesshealthct.com',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Apply online at accesshealthct.com or call for assistance.',
    source: 'manual'
  },
  {
    name: 'Yale New Haven Hospital - Financial Assistance',
    organization: 'Yale New Haven Hospital',
    description: 'Financial assistance program for uninsured or underinsured patients to reduce hospital bills.',
    categories: ['healthcare'],
    address: '20 York Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 688-2046',
    website: 'https://ynhh.org',
    eligibility: { incomeLimitPctFpl: 400 },
    howToApply: 'Contact Financial Counseling before or after your visit.',
    source: 'manual'
  },
  {
    name: 'Transitions Clinic - Reentry Healthcare',
    organization: 'Cornell Scott-Hill Health Center',
    description: 'Primary care clinic specifically for people recently released from incarceration, with community health workers who have lived experience.',
    categories: ['healthcare'],
    address: '150 Sargent Drive',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 503-3650',
    website: 'https://cornellscott.org',
    eligibility: { populations: ['formerly_incarcerated'] },
    howToApply: 'Call to schedule. Open to anyone released in the past 6 months.',
    source: 'manual'
  },

  // ===== MENTAL HEALTH =====
  {
    name: 'Connecticut Mental Health Center',
    organization: 'CMHC / Yale',
    description: 'Comprehensive mental health services including outpatient therapy, psychiatric care, crisis services, and case management.',
    categories: ['mental-health'],
    address: '34 Park Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 974-7300',
    website: 'https://medicine.yale.edu/cmhc',
    howToApply: 'Call for intake appointment or walk in during crisis hours.',
    source: 'manual'
  },
  {
    name: '988 Suicide & Crisis Lifeline',
    organization: 'SAMHSA',
    description: '24/7 free, confidential support for people in suicidal crisis or emotional distress.',
    categories: ['mental-health'],
    phone: '988',
    website: 'https://988lifeline.org',
    hours: '24/7',
    howToApply: 'Call or text 988 anytime.',
    source: 'manual'
  },
  {
    name: 'Mobile Crisis Team',
    organization: 'United Way of CT',
    description: '24/7 mobile crisis intervention for adults experiencing psychiatric emergencies. Can come to your location.',
    categories: ['mental-health'],
    phone: '(800) 203-1234',
    hours: '24/7',
    howToApply: 'Call the crisis line. A team will be dispatched to your location.',
    source: 'manual'
  },
  {
    name: 'BHcare Counseling',
    organization: 'BHcare',
    description: 'Outpatient mental health and addiction counseling services throughout Greater New Haven.',
    categories: ['mental-health', 'harm-reduction'],
    address: '14 Sycamore Way',
    city: 'Branford',
    state: 'CT',
    zip: '06405',
    phone: '(203) 483-2630',
    website: 'https://bhcare.org',
    howToApply: 'Call for intake appointment.',
    source: 'manual'
  },

  // ===== EMPLOYMENT =====
  {
    name: 'CTWorks New Haven',
    organization: 'CT Department of Labor',
    description: 'Free job search assistance, resume help, interview prep, and job training programs.',
    categories: ['employment'],
    address: '560 Ella T Grasso Blvd',
    city: 'New Haven',
    state: 'CT',
    zip: '06519',
    phone: '(203) 624-1493',
    website: 'https://ctworks.uconn.edu',
    hours: 'Mon-Fri 8am-4:30pm',
    howToApply: 'Walk in or register online.',
    source: 'manual'
  },
  {
    name: 'Career Resources Inc',
    organization: 'Career Resources',
    description: 'Job training, skills development, and employment services for adults and youth.',
    categories: ['employment'],
    address: '1 Long Wharf Drive',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 624-2181',
    website: 'https://careerresources.org',
    howToApply: 'Call or visit to enroll in programs.',
    source: 'manual'
  },
  {
    name: 'Project MORE Reentry Employment',
    organization: 'Project MORE',
    description: 'Employment services specifically for people returning from incarceration, including job placement and retention support.',
    categories: ['employment'],
    address: '29 Howe Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 772-4447',
    eligibility: { populations: ['formerly_incarcerated'] },
    howToApply: 'Call for intake appointment.',
    source: 'manual'
  },

  // ===== CHILDCARE =====
  {
    name: 'Care 4 Kids Childcare Subsidy',
    organization: 'CT Office of Early Childhood',
    description: 'Childcare subsidies for low-income working families to pay for licensed childcare providers.',
    categories: ['childcare'],
    phone: '(888) 214-5437',
    website: 'https://ctcare4kids.com',
    eligibility: { incomeLimitPctFpl: 60, populations: ['children'] },
    howToApply: 'Apply online at ctcare4kids.com',
    source: 'manual'
  },
  {
    name: 'New Haven Head Start',
    organization: 'NHPS / CAANH',
    description: 'Free preschool program for children ages 3-5 from low-income families, including meals and health screenings.',
    categories: ['childcare'],
    phone: '(203) 946-8870',
    eligibility: { incomeLimitPctFpl: 100, populations: ['children'] },
    howToApply: 'Apply through New Haven Public Schools.',
    source: 'manual'
  },
  {
    name: 'All Our Kin Family Childcare',
    organization: 'All Our Kin',
    description: 'Network of licensed family childcare providers in New Haven, many accepting Care 4 Kids subsidies.',
    categories: ['childcare'],
    address: '770 Chapel Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 772-2294',
    website: 'https://allourkin.org',
    howToApply: 'Contact for help finding a family childcare provider.',
    source: 'manual'
  },

  // ===== LEGAL AID =====
  {
    name: 'New Haven Legal Assistance Association',
    organization: 'NHLAA',
    description: 'Free civil legal services for low-income New Haven residents, including housing, benefits, and family law.',
    categories: ['legal'],
    address: '426 State Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 946-4811',
    website: 'https://nhlegal.org',
    eligibility: { incomeLimitPctFpl: 200 },
    howToApply: 'Call for intake screening.',
    source: 'manual'
  },
  {
    name: 'Eviction Defense - Greater New Haven',
    organization: 'Connecticut Fair Housing Center',
    description: 'Legal assistance for tenants facing eviction, including court representation and negotiations with landlords.',
    categories: ['legal', 'housing'],
    phone: '(860) 247-4400',
    website: 'https://ctfairhousing.org',
    eligibility: { housingStatus: ['at_risk'] },
    howToApply: 'Call immediately if you receive an eviction notice.',
    source: 'manual'
  },
  {
    name: 'Clean Slate CT - Record Expungement',
    organization: 'Statewide Legal Services',
    description: 'Help with criminal record expungement and pardons to remove barriers to employment and housing.',
    categories: ['legal'],
    phone: '(860) 453-3320',
    website: 'https://slsct.org',
    eligibility: { populations: ['formerly_incarcerated'] },
    howToApply: 'Call for eligibility screening.',
    source: 'manual'
  },

  // ===== TRANSPORTATION =====
  {
    name: 'CT Transit - Reduced Fare',
    organization: 'CT Transit',
    description: 'Reduced bus fares for seniors, people with disabilities, and Medicare recipients.',
    categories: ['transportation'],
    phone: '(203) 624-0151',
    website: 'https://cttransit.com',
    eligibility: { populations: ['disability', 'elderly'] },
    howToApply: 'Apply for reduced fare ID at CT Transit office with proof of eligibility.',
    source: 'manual'
  },
  {
    name: 'Medical Rides - VEYO',
    organization: 'VEYO / CT Medicaid',
    description: 'Free non-emergency medical transportation for Medicaid members to doctors, pharmacies, and treatment.',
    categories: ['transportation', 'healthcare'],
    phone: '(855) 478-7350',
    eligibility: { insuranceRequired: true },
    howToApply: 'Call at least 3 business days before your appointment.',
    source: 'manual'
  },
  {
    name: 'Greater New Haven Transit District',
    organization: 'GNHTD',
    description: 'Paratransit and demand-response transportation for seniors and people with disabilities.',
    categories: ['transportation'],
    address: '19 Hamilton Street',
    city: 'North Haven',
    state: 'CT',
    zip: '06473',
    phone: '(203) 288-3831',
    website: 'https://gnhtd.org',
    eligibility: { populations: ['disability', 'elderly'] },
    howToApply: 'Call to register and schedule rides.',
    source: 'manual'
  },

  // ===== UTILITIES =====
  {
    name: 'LIHEAP - Heating Assistance',
    organization: 'CAANH',
    description: 'Low Income Home Energy Assistance Program helps pay heating bills for income-eligible households.',
    categories: ['utilities'],
    address: '419 Whalley Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 387-7700',
    website: 'https://caanh.net',
    eligibility: { incomeLimitPctFpl: 60 },
    howToApply: 'Apply through CAANH with proof of income and utility bills.',
    source: 'manual'
  },
  {
    name: 'Operation Fuel',
    organization: 'Operation Fuel',
    description: 'Emergency energy assistance year-round for households not eligible for LIHEAP.',
    categories: ['utilities'],
    phone: '(860) 243-2345',
    website: 'https://operationfuel.org',
    eligibility: { incomeLimitPctFpl: 75 },
    howToApply: 'Apply through a partner agency or call for referral.',
    source: 'manual'
  },
  {
    name: 'UI Matching Payment Program',
    organization: 'United Illuminating',
    description: 'UI matches customer payments dollar-for-dollar to help pay down past-due balances.',
    categories: ['utilities'],
    phone: '(800) 722-5584',
    website: 'https://uinet.com',
    howToApply: 'Call UI customer service to enroll.',
    source: 'manual'
  },

  // ===== IMMIGRATION =====
  {
    name: 'IRIS - Integrated Refugee & Immigrant Services',
    organization: 'IRIS',
    description: 'Legal services, resettlement support, employment, and ESL classes for refugees and immigrants.',
    categories: ['immigration', 'employment', 'legal'],
    address: '235 Nicoll Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06511',
    phone: '(203) 562-2095',
    website: 'https://irisct.org',
    howToApply: 'Call for intake appointment.',
    source: 'manual'
  },
  {
    name: 'Junta for Progressive Action',
    organization: 'Junta',
    description: 'Immigration legal services, community organizing, and advocacy for the Latino community.',
    categories: ['immigration', 'legal'],
    address: '169 Grand Avenue',
    city: 'New Haven',
    state: 'CT',
    zip: '06513',
    phone: '(203) 787-0191',
    website: 'https://juntainc.org',
    howToApply: 'Call for legal services intake.',
    source: 'manual'
  },
  {
    name: 'New Haven Elm City ID',
    organization: 'City of New Haven',
    description: 'Municipal ID card for all New Haven residents regardless of immigration status. Accepted for city services.',
    categories: ['immigration'],
    address: '200 Orange Street',
    city: 'New Haven',
    state: 'CT',
    zip: '06510',
    phone: '(203) 946-8340',
    howToApply: 'Visit City Hall with proof of identity and New Haven residency.',
    source: 'manual'
  },

  // ===== ADDITIONAL RESOURCES =====
  {
    name: '211 Connecticut',
    organization: 'United Way',
    description: 'Free, confidential helpline connecting you to local health and human services 24/7.',
    categories: ['housing', 'food', 'healthcare', 'mental-health', 'utilities'],
    phone: '211',
    website: 'https://211ct.org',
    hours: '24/7',
    howToApply: 'Dial 2-1-1 from any phone.',
    source: 'manual'
  },
  {
    name: 'Domestic Violence Hotline - Safe Haven',
    organization: 'BHcare',
    description: '24-hour hotline and emergency shelter for survivors of domestic violence.',
    categories: ['housing', 'legal'],
    phone: '(203) 736-9944',
    hours: '24/7',
    eligibility: { populations: ['domestic_violence'] },
    howToApply: 'Call the hotline for immediate assistance.',
    source: 'manual'
  },
  {
    name: 'VA Connecticut Healthcare',
    organization: 'US Department of Veterans Affairs',
    description: 'Comprehensive healthcare services for eligible veterans including primary care, mental health, and specialty care.',
    categories: ['healthcare', 'mental-health'],
    address: '950 Campbell Avenue',
    city: 'West Haven',
    state: 'CT',
    zip: '06516',
    phone: '(203) 932-5711',
    website: 'https://va.gov/connecticut-health-care',
    eligibility: { populations: ['veteran'] },
    howToApply: 'Enroll at va.gov or call to verify eligibility.',
    source: 'manual'
  },
]

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.resource.deleteMany()
  await prisma.category.deleteMany()

  // Seed categories
  const categories = [
    { name: 'Housing', slug: 'housing', icon: '🏠', displayOrder: 1 },
    { name: 'Food', slug: 'food', icon: '🍎', displayOrder: 2 },
    { name: 'Cash Assistance', slug: 'cash', icon: '💵', displayOrder: 3 },
    { name: 'Harm Reduction', slug: 'harm-reduction', icon: '💊', displayOrder: 4 },
    { name: 'Healthcare', slug: 'healthcare', icon: '🏥', displayOrder: 5 },
    { name: 'Mental Health', slug: 'mental-health', icon: '🧠', displayOrder: 6 },
    { name: 'Employment', slug: 'employment', icon: '💼', displayOrder: 7 },
    { name: 'Childcare', slug: 'childcare', icon: '👶', displayOrder: 8 },
    { name: 'Legal Aid', slug: 'legal', icon: '⚖️', displayOrder: 9 },
    { name: 'Transportation', slug: 'transportation', icon: '🚌', displayOrder: 10 },
    { name: 'Utilities', slug: 'utilities', icon: '💡', displayOrder: 11 },
    { name: 'Immigration', slug: 'immigration', icon: '📄', displayOrder: 12 },
  ]

  for (const cat of categories) {
    await prisma.category.create({ data: cat })
  }

  console.log(`Created ${categories.length} categories`)

  // Seed resources
  for (const resource of resources) {
    await prisma.resource.create({
      data: {
        ...resource,
        verifiedAt: new Date(),
      }
    })
  }

  console.log(`Created ${resources.length} resources`)
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
