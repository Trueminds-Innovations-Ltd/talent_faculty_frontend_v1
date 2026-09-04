import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/common/Input'
import PasswordInput from '../../components/common/PasswordInput'
import PhoneInput from '../../components/common/PhoneInput'
import Button from '../../components/common/Button'
import Checkbox from '../../components/common/Checkbox'
import StepIndicator from '../../components/common/StepIndicator'
import { authService } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import { AlertCircle } from 'lucide-react'

const SignupSubmitDetails: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()

  const stateData = location.state as { email?: string; verified_token?: string } | null
  const email = stateData?.email || ''
  const verified_token = stateData?.verified_token || ''

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    username: '',
    phoneNumber: '',
    password: '',
    countryId: '161',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }
    if (!email) {
      newErrors.general = 'Missing email from verification step. Please restart registration.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    setIsLoading(true)
    try {
      const response = await authService.register({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        middle_name: formData.middleName.trim() || undefined,
        username: formData.username.trim(),
        email: email.trim(),
        password: formData.password,
        phone_number: formData.phoneNumber.trim(),
        country_id: formData.countryId || '161',
        role: 'student',
        verified_token,
      })

      if (response?.data?.user && response?.data?.token) {
        login(response.data.user, response.data.token)
        navigate('/welcome')
      } else if (response?.success) {
        navigate('/welcome')
      } else {
        setServerError(response?.message || 'Registration failed. Please check your information.')
      }
    } catch (err: unknown) {
      const apiErr = err as { message?: string; details?: string; errors?: Record<string, string[] | string> }
      if (apiErr?.errors) {
        const fieldErrors: Record<string, string> = {}
        for (const [key, val] of Object.entries(apiErr.errors)) {
          fieldErrors[key] = Array.isArray(val) ? val[0] : val
        }
        setErrors(fieldErrors)
      }
      setServerError(apiErr?.details || apiErr?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { label: 'Account', status: 'completed' as const },
    { label: 'Verify', status: 'completed' as const },
    { label: 'Details', status: 'current' as const },
  ]

  const leftPanelContent = (
    <div className="text-white">
      <p className="text-secondary text-xs font-medium tracking-widest uppercase mb-4">
        STEP 3 OF 3
      </p>
      <h1 className="font-display text-3xl lg:text-5xl xl:text-5xl leading-tight mb-6">
        Almost there,<br />Make it yours.
      </h1>
      <p className="text-white/70 italic lg:text-lg leading-relaxed max-w-sm mb-12">
        Your name and details help instructors and classmates recognize you.
      </p>
      <StepIndicator steps={steps} />
    </div>
  )

  return (
    <AuthLayout leftPanelContent={leftPanelContent} activeToggle="signup">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
          Finish your profile
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          Step 3 of 3, this is what instructors and classmates will see.
        </p>

        {serverError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm text-red-700 animate-fade-in">
            <AlertCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
            <div className="flex-1">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName || errors.first_name}
            />
            <Input
              label="Last name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName || errors.last_name}
            />
          </div>

          <Input
            label={
              <span>
                Middle name <span className="text-neutral-400">(optional)</span>
              </span>
            }
            placeholder="Enter your middle name"
            value={formData.middleName}
            onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
          />

          <Input
            label="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            error={errors.username}
          />

          <PhoneInput
            label="Phone number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={(phoneNumber) =>
              setFormData({
                ...formData,
                phoneNumber,
              })
            }
            error={errors.phoneNumber || errors.phone_number}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            helperText="use 8+ characters with a number and a symbol"
          />

          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <Link to="#" className="text-primary-dark hover:text-primary-dark font-medium">
                  terms of service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary-dark hover:text-primary-dark font-medium">
                  policy
                </Link>
              </span>
            }
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          />
          {errors.agreeToTerms && (
            <p className="text-xs text-semantic-error -mt-3">{errors.agreeToTerms}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="mt-4 bg-[#057834]"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-dark hover:text-primary-dark font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default SignupSubmitDetails
