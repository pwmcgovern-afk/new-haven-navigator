'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { NEW_HAVEN_ZIPS } from '@/lib/constants'

interface WizardData {
  zipCode: string
  householdSize: number
  monthlyIncome: number
  housingStatus: string
  insuranceStatus: string
  populations: string[]
  categoriesNeeded: string[]
}

const STEPS = ['location', 'household', 'income', 'housing', 'insurance', 'situations', 'needs'] as const
type Step = typeof STEPS[number]

const content = {
  en: {
    // Headers
    step: 'Step',
    of: 'of',
    continue: 'Continue',
    seeResults: 'See My Resources',
    skip: 'Skip this step',
    goBack: 'Go back to previous step',
    progressLabel: 'Wizard progress',

    // Location
    locationTitle: "What's your zip code?",
    locationSubtitle: "We'll show resources near you",
    locationWarning: "This zip code is outside New Haven. Some resources may not apply.",

    // Household
    householdTitle: 'How many people in your household?',
    householdSubtitle: 'Include yourself, spouse, and dependents',

    // Income
    incomeTitle: "What's your monthly household income?",
    incomeSubtitle: 'Before taxes, include all sources',
    perYear: '/year',

    // Housing
    housingTitle: "What's your housing situation?",
    housingSubtitle: 'This helps us find the right resources',
    housingOptions: [
      { value: 'housed', label: 'I have stable housing' },
      { value: 'at_risk', label: 'At risk of losing housing' },
      { value: 'homeless', label: 'Currently homeless or in shelter' },
    ],

    // Insurance
    insuranceTitle: 'What health insurance do you have?',
    insuranceSubtitle: 'Select your primary coverage',
    insuranceOptions: [
      { value: 'uninsured', label: 'No insurance' },
      { value: 'medicaid', label: 'Medicaid / HUSKY' },
      { value: 'medicare', label: 'Medicare' },
      { value: 'private', label: 'Private insurance' },
    ],

    // Situations
    situationsTitle: 'Do any of these apply to you?',
    situationsSubtitle: 'Select all that apply (optional)',
    situationOptions: [
      { value: 'veteran', label: 'Veteran' },
      { value: 'formerly_incarcerated', label: 'Recently released from incarceration' },
      { value: 'pregnant', label: 'Pregnant' },
      { value: 'children', label: 'Have children under 18' },
      { value: 'senior', label: 'Senior (60+)' },
      { value: 'disabled', label: 'Have a disability' },
      { value: 'domestic_violence', label: 'Experiencing domestic violence' },
    ],

    // Needs
    needsTitle: 'What kind of help do you need?',
    needsSubtitle: 'Select all that apply',
    needsOptions: [
      { slug: 'housing', name: 'Housing', icon: '🏠' },
      { slug: 'food', name: 'Food', icon: '🍎' },
      { slug: 'cash', name: 'Cash', icon: '💵' },
      { slug: 'harm-reduction', name: 'Harm Reduction', icon: '💊' },
      { slug: 'healthcare', name: 'Healthcare', icon: '🏥' },
      { slug: 'mental-health', name: 'Mental Health', icon: '🧠' },
      { slug: 'employment', name: 'Jobs', icon: '💼' },
      { slug: 'childcare', name: 'Childcare', icon: '👶' },
      { slug: 'legal', name: 'Legal Aid', icon: '⚖️' },
      { slug: 'transportation', name: 'Transportation', icon: '🚌' },
      { slug: 'utilities', name: 'Utilities', icon: '💡' },
      { slug: 'immigration', name: 'Immigration', icon: '📄' },
    ],
  },
  es: {
    // Headers
    step: 'Paso',
    of: 'de',
    continue: 'Continuar',
    seeResults: 'Ver Mis Recursos',
    skip: 'Saltar este paso',
    goBack: 'Volver al paso anterior',
    progressLabel: 'Progreso del asistente',

    // Location
    locationTitle: '¿Cuál es su código postal?',
    locationSubtitle: 'Le mostraremos recursos cerca de usted',
    locationWarning: 'Este código postal está fuera de New Haven. Algunos recursos pueden no aplicar.',

    // Household
    householdTitle: '¿Cuántas personas hay en su hogar?',
    householdSubtitle: 'Inclúyase a usted mismo, cónyuge y dependientes',

    // Income
    incomeTitle: '¿Cuál es el ingreso mensual de su hogar?',
    incomeSubtitle: 'Antes de impuestos, incluya todas las fuentes',
    perYear: '/año',

    // Housing
    housingTitle: '¿Cuál es su situación de vivienda?',
    housingSubtitle: 'Esto nos ayuda a encontrar los recursos correctos',
    housingOptions: [
      { value: 'housed', label: 'Tengo vivienda estable' },
      { value: 'at_risk', label: 'En riesgo de perder vivienda' },
      { value: 'homeless', label: 'Sin hogar o en refugio actualmente' },
    ],

    // Insurance
    insuranceTitle: '¿Qué seguro médico tiene?',
    insuranceSubtitle: 'Seleccione su cobertura principal',
    insuranceOptions: [
      { value: 'uninsured', label: 'Sin seguro' },
      { value: 'medicaid', label: 'Medicaid / HUSKY' },
      { value: 'medicare', label: 'Medicare' },
      { value: 'private', label: 'Seguro privado' },
    ],

    // Situations
    situationsTitle: '¿Alguna de estas situaciones le aplica?',
    situationsSubtitle: 'Seleccione todas las que apliquen (opcional)',
    situationOptions: [
      { value: 'veteran', label: 'Veterano' },
      { value: 'formerly_incarcerated', label: 'Recientemente liberado de la cárcel' },
      { value: 'pregnant', label: 'Embarazada' },
      { value: 'children', label: 'Tiene hijos menores de 18 años' },
      { value: 'senior', label: 'Persona mayor (60+)' },
      { value: 'disabled', label: 'Tiene una discapacidad' },
      { value: 'domestic_violence', label: 'Experiencia de violencia doméstica' },
    ],

    // Needs
    needsTitle: '¿Qué tipo de ayuda necesita?',
    needsSubtitle: 'Seleccione todas las que apliquen',
    needsOptions: [
      { slug: 'housing', name: 'Vivienda', icon: '🏠' },
      { slug: 'food', name: 'Comida', icon: '🍎' },
      { slug: 'cash', name: 'Efectivo', icon: '💵' },
      { slug: 'harm-reduction', name: 'Reducción de Daños', icon: '💊' },
      { slug: 'healthcare', name: 'Salud', icon: '🏥' },
      { slug: 'mental-health', name: 'Salud Mental', icon: '🧠' },
      { slug: 'employment', name: 'Empleo', icon: '💼' },
      { slug: 'childcare', name: 'Cuidado Infantil', icon: '👶' },
      { slug: 'legal', name: 'Ayuda Legal', icon: '⚖️' },
      { slug: 'transportation', name: 'Transporte', icon: '🚌' },
      { slug: 'utilities', name: 'Servicios', icon: '💡' },
      { slug: 'immigration', name: 'Inmigración', icon: '📄' },
    ],
  }
}

export default function WizardPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = content[language]

  const [currentStep, setCurrentStep] = useState<Step>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('wizardStep')
      if (saved && STEPS.includes(saved as Step)) return saved as Step
    }
    return 'location'
  })
  const [data, setData] = useState<WizardData>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('wizardData')
      if (saved) try { return JSON.parse(saved) } catch {}
    }
    return {
      zipCode: '',
      householdSize: 1,
      monthlyIncome: 0,
      housingStatus: '',
      insuranceStatus: '',
      populations: [],
      categoriesNeeded: []
    }
  })

  useEffect(() => {
    sessionStorage.setItem('wizardData', JSON.stringify(data))
    sessionStorage.setItem('wizardStep', currentStep)
  }, [data, currentStep])

  const stepIndex = STEPS.indexOf(currentStep)
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  const goNext = () => {
    const nextIndex = stepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
    } else {
      const params = new URLSearchParams()
      params.set('zip', data.zipCode)
      params.set('household', data.householdSize.toString())
      params.set('income', data.monthlyIncome.toString())
      params.set('housing', data.housingStatus)
      params.set('insurance', data.insuranceStatus)
      if (data.populations.length) params.set('populations', data.populations.join(','))
      if (data.categoriesNeeded.length) params.set('categories', data.categoriesNeeded.join(','))
      router.push(`/results?${params.toString()}`)
    }
  }

  const goBack = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
    } else {
      router.push('/')
    }
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'location': return data.zipCode.length === 5
      case 'household': return data.householdSize >= 1
      case 'income': return true
      case 'housing': return data.housingStatus !== ''
      case 'insurance': return data.insuranceStatus !== ''
      case 'situations': return true
      case 'needs': return data.categoriesNeeded.length > 0
      default: return false
    }
  }

  const toggleArrayValue = (field: 'populations' | 'categoriesNeeded', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar with accessibility */}
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-label={t.progressLabel}
      >
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        {t.step} {stepIndex + 1} {t.of} {STEPS.length}
      </div>

      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '2px solid var(--color-border)' }} role="banner">
        <button
          onClick={goBack}
          className="p-2 -ml-2 rounded-lg"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label={t.goBack}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {t.step} {stepIndex + 1} {t.of} {STEPS.length}
        </span>
        <LanguageToggle />
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-8 fade-in" role="main" id="main-content">
        {currentStep === 'location' && (
          <section aria-labelledby="location-title">
            <h2 id="location-title" className="text-2xl font-semibold mb-2">{t.locationTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.locationSubtitle}</p>
            <label htmlFor="zip-input" className="sr-only">{t.locationTitle}</label>
            <input
              id="zip-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="06511"
              value={data.zipCode}
              onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/\D/g, '') })}
              className="input text-3xl text-center font-semibold tracking-widest"
              aria-describedby={data.zipCode.length === 5 && !NEW_HAVEN_ZIPS.includes(data.zipCode) ? 'zip-warning' : undefined}
            />
            {data.zipCode.length === 5 && !NEW_HAVEN_ZIPS.includes(data.zipCode) && (
              <div id="zip-warning" className="info-card warning mt-4" role="alert">
                <p className="text-sm">{t.locationWarning}</p>
              </div>
            )}
          </section>
        )}

        {currentStep === 'household' && (
          <section aria-labelledby="household-title">
            <h2 id="household-title" className="text-2xl font-semibold mb-2">{t.householdTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.householdSubtitle}</p>
            <div className="flex items-center justify-center gap-6" role="group" aria-label={t.householdTitle}>
              <button
                onClick={() => setData({ ...data, householdSize: Math.max(1, data.householdSize - 1) })}
                className="w-14 h-14 rounded-full text-2xl font-bold transition-colors"
                style={{ background: 'var(--color-border)' }}
                aria-label={language === 'en' ? 'Decrease household size' : 'Disminuir tamaño del hogar'}
              >
                −
              </button>
              <span
                className="text-6xl font-bold w-20 text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                {data.householdSize}
              </span>
              <button
                onClick={() => setData({ ...data, householdSize: data.householdSize + 1 })}
                className="w-14 h-14 rounded-full text-2xl font-bold transition-colors"
                style={{ background: 'var(--color-border)' }}
                aria-label={language === 'en' ? 'Increase household size' : 'Aumentar tamaño del hogar'}
              >
                +
              </button>
            </div>
          </section>
        )}

        {currentStep === 'income' && (
          <section aria-labelledby="income-title">
            <h2 id="income-title" className="text-2xl font-semibold mb-2">{t.incomeTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.incomeSubtitle}</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-semibold" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">$</span>
              <label htmlFor="income-input" className="sr-only">{t.incomeTitle}</label>
              <input
                id="income-input"
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={data.monthlyIncome || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  setData({ ...data, monthlyIncome: parseInt(val) || 0 })
                }}
                className="input text-3xl pl-12 font-semibold"
                aria-describedby="income-yearly"
              />
            </div>
            <p id="income-yearly" className="mt-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>
              ${(data.monthlyIncome * 12).toLocaleString()}{t.perYear}
            </p>
          </section>
        )}

        {currentStep === 'housing' && (
          <section aria-labelledby="housing-title">
            <h2 id="housing-title" className="text-2xl font-semibold mb-2">{t.housingTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.housingSubtitle}</p>
            <fieldset>
              <legend className="sr-only">{t.housingTitle}</legend>
              <div className="space-y-3" role="radiogroup" aria-label={t.housingTitle}>
                {t.housingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setData({ ...data, housingStatus: option.value })}
                    className={`selection-btn ${data.housingStatus === option.value ? 'selected' : ''}`}
                    role="radio"
                    aria-checked={data.housingStatus === option.value}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        )}

        {currentStep === 'insurance' && (
          <section aria-labelledby="insurance-title">
            <h2 id="insurance-title" className="text-2xl font-semibold mb-2">{t.insuranceTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.insuranceSubtitle}</p>
            <fieldset>
              <legend className="sr-only">{t.insuranceTitle}</legend>
              <div className="space-y-3" role="radiogroup" aria-label={t.insuranceTitle}>
                {t.insuranceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setData({ ...data, insuranceStatus: option.value })}
                    className={`selection-btn ${data.insuranceStatus === option.value ? 'selected' : ''}`}
                    role="radio"
                    aria-checked={data.insuranceStatus === option.value}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        )}

        {currentStep === 'situations' && (
          <section aria-labelledby="situations-title">
            <h2 id="situations-title" className="text-2xl font-semibold mb-2">{t.situationsTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.situationsSubtitle}</p>
            <fieldset>
              <legend className="sr-only">{t.situationsTitle}</legend>
              <div className="space-y-3" role="group" aria-label={t.situationsTitle}>
                {t.situationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleArrayValue('populations', option.value)}
                    className={`selection-btn ${data.populations.includes(option.value) ? 'selected' : ''}`}
                    role="checkbox"
                    aria-checked={data.populations.includes(option.value)}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        )}

        {currentStep === 'needs' && (
          <section aria-labelledby="needs-title">
            <h2 id="needs-title" className="text-2xl font-semibold mb-2">{t.needsTitle}</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t.needsSubtitle}</p>
            <fieldset>
              <legend className="sr-only">{t.needsTitle}</legend>
              <div className="grid grid-cols-2 gap-3" role="group" aria-label={t.needsTitle}>
                {t.needsOptions.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => toggleArrayValue('categoriesNeeded', cat.slug)}
                    className={`selection-btn text-center ${data.categoriesNeeded.includes(cat.slug) ? 'selected' : ''}`}
                    role="checkbox"
                    aria-checked={data.categoriesNeeded.includes(cat.slug)}
                  >
                    <div className="text-2xl mb-1" aria-hidden="true">{cat.icon}</div>
                    <div className="font-medium text-sm">{cat.name}</div>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="px-5 py-4" style={{ borderTop: '2px solid var(--color-border)', background: 'var(--color-surface)' }} role="contentinfo">
        <button
          onClick={goNext}
          disabled={!canProceed()}
          className="btn-primary w-full"
          aria-disabled={!canProceed()}
        >
          {stepIndex === STEPS.length - 1 ? t.seeResults : t.continue}
        </button>
        {currentStep === 'situations' && (
          <button
            onClick={goNext}
            className="w-full mt-3 py-3 text-sm font-medium btn-touch justify-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t.skip}
          </button>
        )}
      </footer>
    </div>
  )
}
