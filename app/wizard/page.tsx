'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CATEGORIES,
  HOUSING_STATUSES,
  INSURANCE_STATUSES,
  SPECIAL_POPULATIONS,
  NEW_HAVEN_ZIPS
} from '@/lib/constants'

interface WizardData {
  zipCode: string
  householdSize: number
  monthlyIncome: number
  housingStatus: string
  insuranceStatus: string
  populations: string[]
  categoriesNeeded: string[]
}

const STEPS = [
  'location',
  'household',
  'income',
  'housing',
  'insurance',
  'situations',
  'needs'
] as const

type Step = typeof STEPS[number]

export default function WizardPage() {
  const router = useRouter()
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
      // Submit and redirect to results
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
      case 'location':
        return data.zipCode.length === 5
      case 'household':
        return data.householdSize >= 1
      case 'income':
        return true // 0 is valid
      case 'housing':
        return data.housingStatus !== ''
      case 'insurance':
        return data.insuranceStatus !== ''
      case 'situations':
        return true // Optional
      case 'needs':
        return data.categoriesNeeded.length > 0
      default:
        return false
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
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <button onClick={goBack} className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        {currentStep === 'location' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What's your zip code?</h2>
            <p className="text-gray-600 mb-6">We'll show resources near you</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="06511"
              value={data.zipCode}
              onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/\D/g, '') })}
              className="input text-2xl text-center"
            />
            {data.zipCode.length === 5 && !NEW_HAVEN_ZIPS.includes(data.zipCode) && (
              <p className="mt-3 text-amber-600 text-sm">
                This zip code is outside the New Haven area. Some resources may not apply.
              </p>
            )}
          </div>
        )}

        {currentStep === 'household' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">How many people in your household?</h2>
            <p className="text-gray-600 mb-6">Include yourself, spouse, and dependents</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setData({ ...data, householdSize: Math.max(1, data.householdSize - 1) })}
                className="w-14 h-14 rounded-full bg-gray-200 text-2xl font-bold hover:bg-gray-300"
              >
                −
              </button>
              <span className="text-5xl font-bold w-16 text-center">{data.householdSize}</span>
              <button
                onClick={() => setData({ ...data, householdSize: data.householdSize + 1 })}
                className="w-14 h-14 rounded-full bg-gray-200 text-2xl font-bold hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        )}

        {currentStep === 'income' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What's your monthly household income?</h2>
            <p className="text-gray-600 mb-6">Before taxes, include all sources</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={data.monthlyIncome || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  setData({ ...data, monthlyIncome: parseInt(val) || 0 })
                }}
                className="input text-2xl pl-10"
              />
            </div>
            <p className="mt-3 text-gray-500 text-sm">
              ${(data.monthlyIncome * 12).toLocaleString()}/year
            </p>
          </div>
        )}

        {currentStep === 'housing' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What's your housing situation?</h2>
            <p className="text-gray-600 mb-6">This helps us find the right resources</p>
            <div className="space-y-3">
              {HOUSING_STATUSES.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setData({ ...data, housingStatus: status.value })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.housingStatus === status.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'insurance' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">What health insurance do you have?</h2>
            <p className="text-gray-600 mb-6">Select your primary coverage</p>
            <div className="space-y-3">
              {INSURANCE_STATUSES.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setData({ ...data, insuranceStatus: status.value })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.insuranceStatus === status.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'situations' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Do any of these apply to you?</h2>
            <p className="text-gray-600 mb-6">Select all that apply (optional)</p>
            <div className="space-y-3">
              {SPECIAL_POPULATIONS.map((pop) => (
                <button
                  key={pop.value}
                  onClick={() => toggleArrayValue('populations', pop.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.populations.includes(pop.value)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {pop.label}
                    {data.populations.includes(pop.value) && (
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
            <h2 className="text-xl font-semibold mb-2">What kind of help do you need?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => toggleArrayValue('categoriesNeeded', cat.slug)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    data.categoriesNeeded.includes(cat.slug)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="font-medium text-sm">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={goNext}
          disabled={!canProceed()}
          className="btn-primary w-full"
        >
          {stepIndex === STEPS.length - 1 ? 'See My Resources' : 'Continue'}
        </button>
        {currentStep === 'situations' && (
          <button
            onClick={goNext}
            className="w-full mt-2 text-gray-600 py-2"
          >
            Skip this step
          </button>
        )}
      </div>
    </div>
  )
}
