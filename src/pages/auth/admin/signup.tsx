import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../components/layout/admin/layout/AuthLayout'
import Input from '../../../components/common/Input'
import PasswordInput from '../../../components/common/PasswordInput'
import Button from '../../../components/common/Button'
import Checkbox from '../../../components/common/Checkbox'
const SignupAdminDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        role: '',
        department: '',
        password: '',
        agreeToTerms: false,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.department.trim()) newErrors.department = 'Department is required'
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }
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
            console.log('Student registration submitted:', formData)
        }, 1500)
    }


    const leftPanelContent = (
        <div className="text-white">
            <h1 className="font-display text-3xl lg:text-5xl xl:text-5xl leading-tight mb-6">
                Everything you need
                <br />to run TalentFaculty, in one place
            </h1>
        </div>
    )

    return (
        <AuthLayout leftPanelContent={leftPanelContent}>
            <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
                    Create your admin account
                </h2>
                <p className="text-neutral-400 text-sm mb-8">
                    One page, all the essentials.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Email address"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />
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
                        label="Department"
                        placeholder="Enter your department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        error={errors.department}
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
                                I agree to the admin access policy and handling guidelines{' '}

                            </span>
                        }
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    />
                    {errors.agreeToTerms && (
                        <p className="text-xs text-semantic-error -mt-3">{errors.agreeToTerms}</p>
                    )}


                    <Link to='/admin/dashboard'>
                        <Button
                            type="button"
                            variant="primary"
                            fullWidth
                            isLoading={isLoading}
                            className="mt-2 bg-[#057834]"
                        >
                            Continue admin account
                        </Button>
                    </Link>

                </form>

                <p className="text-center text-sm text-primary mt-6">
                    <Link to="/admin/signin" className="text-primary-dark hover:text-primary-dark font-medium transition-colors">
                        Back to sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default SignupAdminDetails  
