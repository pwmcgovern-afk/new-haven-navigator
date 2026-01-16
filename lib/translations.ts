export type Language = 'en' | 'es'

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    allResources: 'All Resources',
    search: 'Search',
    back: 'Back',

    // Home page
    welcomeTitle: 'New Haven Navigator',
    welcomeSubtitle: 'Find resources and services in New Haven',
    startWizard: 'Find Help Now',
    browseAll: 'Browse All Resources',

    // Wizard
    wizardTitle: 'Find Resources',
    wizardSubtitle: 'Answer a few questions to find the right help for you',
    next: 'Next',
    previous: 'Previous',
    seeResults: 'See Results',
    step: 'Step',
    of: 'of',

    // Questions
    q_location: 'What is your zip code?',
    q_household: 'How many people are in your household?',
    q_income: 'What is your monthly household income?',
    q_housing: 'What is your current housing situation?',
    q_insurance: 'What type of health insurance do you have?',
    q_situations: 'Do any of these situations apply to you?',
    q_needs: 'What type of help do you need?',

    // Housing options
    housed: 'I have stable housing',
    at_risk: 'At risk of losing housing',
    homeless: 'Currently homeless or in shelter',

    // Insurance options
    uninsured: 'No insurance',
    medicaid: 'Medicaid/HUSKY',
    medicare: 'Medicare',
    private: 'Private insurance',

    // Situations
    veteran: 'Veteran',
    formerly_incarcerated: 'Recently released from incarceration',
    pregnant: 'Pregnant',
    children: 'Have children under 18',
    senior: 'Senior (60+)',
    disabled: 'Have a disability',
    domestic_violence: 'Experiencing domestic violence',

    // Categories
    housing: 'Housing',
    food: 'Food',
    cash: 'Cash Assistance',
    'harm-reduction': 'Harm Reduction',
    healthcare: 'Healthcare',
    'mental-health': 'Mental Health',
    employment: 'Employment',
    childcare: 'Childcare',
    legal: 'Legal Aid',
    transportation: 'Transportation',
    utilities: 'Utilities',
    immigration: 'Immigration',

    // Results
    resultsTitle: 'Resources for You',
    resultsSubtitle: 'Based on your answers, here are resources that may help',
    noResults: 'No resources found matching your criteria',
    tryBrowsing: 'Try browsing all resources',

    // Resource detail
    aboutResource: 'About This Resource',
    howToGetHelp: 'How to Get Help',
    whoCanGetHelp: 'Who Can Get Help',
    tipsForHelp: 'Tips for This Resource',
    location: 'Location',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    website: 'Website',
    call: 'Call',
    directions: 'Directions',
    share: 'Share',
    lastVerified: 'Last verified',
    source: 'Source',

    // Footer
    madeFor: 'Made for the New Haven community',

    // Language toggle
    language: 'Language',
    english: 'English',
    spanish: 'Español',

    // Tracker
    myTracker: 'My Tracker',
    trackerEmpty: 'No tracked resources yet',
    trackerEmptySubtitle: 'Use the Track button on any resource to start tracking your outreach',
    trackResource: 'Track',
    updateTracking: 'Update',
    editTracking: 'Edit Tracking',
    contactPerson: 'Contact Person',
    dateContacted: 'Date Contacted',
    status: 'Status',
    notes: 'Notes / Next Steps',
    saveTracking: 'Save',
    cancelTracking: 'Cancel',
    deleteTracking: 'Delete',
    deleteConfirm: 'Delete this tracking entry?',
    selectStatus: 'Select status',
    optional: 'Optional',
    viewTracker: 'View Tracker',
    tracked: 'Tracked',

    // Open Now
    openNow: 'Open Now',
  },

  es: {
    // Navigation
    home: 'Inicio',
    allResources: 'Todos los Recursos',
    search: 'Buscar',
    back: 'Atrás',

    // Home page
    welcomeTitle: 'Navegador de New Haven',
    welcomeSubtitle: 'Encuentre recursos y servicios en New Haven',
    startWizard: 'Buscar Ayuda',
    browseAll: 'Ver Todos los Recursos',

    // Wizard
    wizardTitle: 'Encontrar Recursos',
    wizardSubtitle: 'Responda algunas preguntas para encontrar la ayuda adecuada',
    next: 'Siguiente',
    previous: 'Anterior',
    seeResults: 'Ver Resultados',
    step: 'Paso',
    of: 'de',

    // Questions
    q_location: '¿Cuál es su código postal?',
    q_household: '¿Cuántas personas viven en su hogar?',
    q_income: '¿Cuál es el ingreso mensual de su hogar?',
    q_housing: '¿Cuál es su situación de vivienda actual?',
    q_insurance: '¿Qué tipo de seguro médico tiene?',
    q_situations: '¿Alguna de estas situaciones le aplica?',
    q_needs: '¿Qué tipo de ayuda necesita?',

    // Housing options
    housed: 'Tengo vivienda estable',
    at_risk: 'En riesgo de perder vivienda',
    homeless: 'Sin hogar o en refugio',

    // Insurance options
    uninsured: 'Sin seguro',
    medicaid: 'Medicaid/HUSKY',
    medicare: 'Medicare',
    private: 'Seguro privado',

    // Situations
    veteran: 'Veterano',
    formerly_incarcerated: 'Recientemente liberado de la cárcel',
    pregnant: 'Embarazada',
    children: 'Tiene hijos menores de 18',
    senior: 'Persona mayor (60+)',
    disabled: 'Tiene una discapacidad',
    domestic_violence: 'Experiencia de violencia doméstica',

    // Categories
    housing: 'Vivienda',
    food: 'Comida',
    cash: 'Asistencia en Efectivo',
    'harm-reduction': 'Reducción de Daños',
    healthcare: 'Salud',
    'mental-health': 'Salud Mental',
    employment: 'Empleo',
    childcare: 'Cuidado de Niños',
    legal: 'Ayuda Legal',
    transportation: 'Transporte',
    utilities: 'Servicios Públicos',
    immigration: 'Inmigración',

    // Results
    resultsTitle: 'Recursos para Usted',
    resultsSubtitle: 'Basado en sus respuestas, aquí hay recursos que pueden ayudar',
    noResults: 'No se encontraron recursos que coincidan',
    tryBrowsing: 'Intente ver todos los recursos',

    // Resource detail
    aboutResource: 'Sobre Este Recurso',
    howToGetHelp: 'Cómo Obtener Ayuda',
    whoCanGetHelp: 'Quién Puede Obtener Ayuda',
    tipsForHelp: 'Consejos para Este Recurso',
    location: 'Ubicación',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    hours: 'Horario',
    website: 'Sitio Web',
    call: 'Llamar',
    directions: 'Direcciones',
    share: 'Compartir',
    lastVerified: 'Última verificación',
    source: 'Fuente',

    // Footer
    madeFor: 'Hecho para la comunidad de New Haven',

    // Language toggle
    language: 'Idioma',
    english: 'English',
    spanish: 'Español',

    // Tracker
    myTracker: 'Mi Seguimiento',
    trackerEmpty: 'No hay recursos rastreados',
    trackerEmptySubtitle: 'Use el botón Rastrear en cualquier recurso para comenzar',
    trackResource: 'Rastrear',
    updateTracking: 'Actualizar',
    editTracking: 'Editar Seguimiento',
    contactPerson: 'Persona de Contacto',
    dateContacted: 'Fecha de Contacto',
    status: 'Estado',
    notes: 'Notas / Próximos Pasos',
    saveTracking: 'Guardar',
    cancelTracking: 'Cancelar',
    deleteTracking: 'Eliminar',
    deleteConfirm: '¿Eliminar esta entrada?',
    selectStatus: 'Seleccionar estado',
    optional: 'Opcional',
    viewTracker: 'Ver Seguimiento',
    tracked: 'Rastreado',

    // Open Now
    openNow: 'Abierto Ahora',
  }
}

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || translations.en[key] || key
}
