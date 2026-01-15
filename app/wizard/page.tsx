'use client'

import { useState } from 'react'
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

  const [currentStep, setCurrentStep] = useState<Step>('location')
  const [data, setData] = useState<WizardData>({
    zipCode: '',
    householdSize: 1,
    monthlyIncome: 0,
    housingStatus: '',
    insuranceStatus: '',
    populations: [],
    categoriesNeeded: []
  })

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
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-[hsl(var(--color-border))]">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-500 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm text-gray-500 font-medium">
          {t.step} {stepIndex + 1} {t.of} {STEPS.length}
        </span>
        <LanguageToggle />
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-8 fade-in">
        {currentStep === 'location' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.locationTitle}</h2>
            <p className="text-gray-500 mb-8">{t.locationSubtitle}</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="06511"
              value={data.zipCode}
              onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/\D/g, '') })}
              className="input text-3xl text-center font-semibold tracking-widest"
            />
            {data.zipCode.length === 5 && !NEW_HAVEN_ZIPS.includes(data.zipCode) && (
              <p className="mt-4 text-amber-600 text-sm bg-amber-50 p-3 rounded-lg">
                {t.locationWarning}
              </p>
            )}
          </div>
        )}

        {currentStep === 'household' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.householdTitle}</h2>
            <p className="text-gray-500 mb-8">{t.householdSubtitle}</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setData({ ...data, householdSize: Math.max(1, data.householdSize - 1) })}
                className="w-14 h-14 rounded-full bg-[hsl(var(--color-border))] text-2xl font-bold hover:bg-gray-200 transition-colors"
              >
                −
              </button>
              <span className="text-6xl font-bold w-20 text-center">{data.householdSize}</span>
              <button
                onClick={() => setData({ ...data, householdSize: data.householdSize + 1 })}
                className="w-14 h-14 rounded-full bg-[hsl(var(--color-border))] text-2xl font-bold hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        )}

        {currentStep === 'income' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.incomeTitle}</h2>
            <p className="text-gray-500 mb-8">{t.incomeSubtitle}</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-gray-400 font-semibold">$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={data.monthlyIncome || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  setData({ ...data, monthlyIncome: parseInt(val) || 0 })
                }}
                className="input text-3xl pl-12 font-semibold"
              />
            </div>
            <p className="mt-4 text-gray-500 text-center">
              ${(data.monthlyIncome * 12).toLocaleString()}{t.perYear}
            </p>
          </div>
        )}

        {currentStep === 'housing' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.housingTitle}</h2>
            <p className="text-gray-500 mb-8">{t.housingSubtitle}</p>
            <div className="space-y-3">
              {t.housingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setData({ ...data, housingStatus: option.value })}
                  className={`selection-btn ${data.housingStatus === option.value ? 'selected' : ''}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {data.housingStatus === option.value && (
                      <svg className="w-5 h-5 text-[hsl(var(--color-primary))]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'insurance' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.insuranceTitle}</h2>
            <p className="text-gray-500 mb-8">{t.insuranceSubtitle}</p>
            <div className="space-y-3">
              {t.insuranceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setData({ ...data, insuranceStatus: option.value })}
                  className={`selection-btn ${data.insuranceStatus === option.value ? 'selected' : ''}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {data.insuranceStatus === option.value && (
                      <svg className="w-5 h-5 text-[hsl(var(--color-primary))]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'situations' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.situationsTitle}</h2>
            <p className="text-gray-500 mb-8">{t.situationsSubtitle}</p>
            <div className="space-y-3">
              {t.situationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayValue('populations', option.value)}
                  className={`selection-btn ${data.populations.includes(option.value) ? 'selected' : ''}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {data.populations.includes(option.value) && (
                      <svg className="w-5 h-5 text-[hsl(var(--color-primary))]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'needs' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.needsTitle}</h2>
            <p className="text-gray-500 mb-8">{t.needsSubtitle}</p>
            <div className="grid grid-cols-2 gap-3">
              {t.needsOptions.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => toggleArrayValue('categoriesNeeded', cat.slug)}
                  className={`selection-btn text-center ${data.categoriesNeeded.includes(cat.slug) ? 'selected' : ''}`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="font-medium text-sm">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-5 py-4 border-t border-[hsl(var(--color-border))] bg-white">
        <button
          onClick={goNext}
          disabled={!canProceed()}
          className="btn-primary w-full"
        >
          {stepIndex === STEPS.length - 1 ? t.seeResults : t.continue}
        </button>
        {currentStep === 'situations' && (
          <button onClick={goNext} className="w-full mt-3 text-gray-500 py-2 text-sm font-medium hover:text-gray-700">
            {t.skip}
          </button>
        )}
      </footer>
    </div>
  )
}
