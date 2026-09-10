import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../components/layout/instruct/AuthLayout'
import Input from '../../../components/common/Input'
import PasswordInput from '../../../components/common/PasswordInput'
import PhoneInput from '../../../components/common/PhoneInput'
import TextArea from '../../../components/common/TextArea'
import FileUpload from '../../../components/common/FileUpload'
import Button from '../../../components/common/Button'
import Checkbox from '../../../components/common/Checkbox'

const SignupInstructorDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
        username: '',
        phoneNumber: '',
        subject: '',
        yearsOfExperience: '',
        highestQualification: '',
        portfolio: '',
        shortBio: '',
        cvFile: null as File | null,
        agreeToTerms: false,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.username.trim()) newErrors.username = 'Username is required'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
        if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = 'Years of experience is required'
        if (!formData.highestQualification.trim()) newErrors.highestQualification = 'Highest qualification is required'
        if (!formData.shortBio.trim()) newErrors.shortBio = 'Short bio is required'
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            console.log('Tutor registration submitted:', formData)
        }, 1500)
    }

    const leftPanelContent = (
        <div className="text-white">
            <p className="text-secondary text-xs font-medium tracking-widest uppercase mb-4">
                TEACH ON TALENTFACULTY
            </p>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
                Teaching is its own craft. Bring yours here.
            </h1>
            <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-sm">
                Set up your profile, your expertise and background.
            </p>
        </div>
    )

    return (
        <AuthLayout leftPanelContent={leftPanelContent} activeToggle="signup">
            <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
                    Create your tutor profile
                </h2>
                <p className="text-neutral-400 text-sm mb-8">
                    One page, all essentials.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Password */}
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                        helperText="use 8+ characters with a number and a symbol"
                    />

                    <hr className="auth-divider" />

                    {/* Personal Details */}
                    <h3 className="auth-section-title">Personal details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="First name"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            error={errors.firstName}
                        />
                        <Input
                            label="Last name"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            error={errors.lastName}
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
                        placeholder="Enter your username name"
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
                        error={errors.phoneNumber}
                    />

                    <hr className="auth-divider" />

                    {/* Teaching Profile */}
                    <h3 className="auth-section-title">Teaching profile</h3>

                    <Input
                        label="Subject/ area of expertise"
                        placeholder="E.g. UI/UX design, Data analysis"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        error={errors.subject}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Years of experience"
                            type="number"
                            placeholder=""
                            value={formData.yearsOfExperience}
                            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                            error={errors.yearsOfExperience}
                        />
                        <Input
                            label="Highest qualification"
                            placeholder=""
                            value={formData.highestQualification}
                            onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                            error={errors.highestQualification}
                        />
                    </div>

                    <Input
                        label={
                            <span>
                                Portfolio or LinkedIn <span className="text-neutral-400">(optional)</span>
                            </span>
                        }
                        placeholder=""
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    />

                    <TextArea
                        label="Short bio"
                        placeholder="Tell learners about your background and teaching style"
                        rows={4}
                        value={formData.shortBio}
                        onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                        error={errors.shortBio}
                    />

                    <FileUpload
                        label="CV"
                        onFileSelect={(file) => setFormData({ ...formData, cvFile: file })}
                    />

                    <Checkbox
                        label={
                            <span>
                                I agree to the{' '}
                                <Link to="#" className="text-primary hover:text-primary-dark font-medium">
                                    terms of service
                                </Link>{' '}
                                and{' '}
                                <Link to="#" className="text-primary hover:text-primary-dark font-medium">
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
                        className="mt-2"
                    >
                        Continue
                    </Button>
                </form>

                <p className="text-center text-sm text-neutral-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/instructor/signin" className="text-primary hover:text-primary-dark font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default SignupInstructorDetails
