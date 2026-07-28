import React, { useState } from 'react'
import { Mail, Eye, EyeOff } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'

type TabKey = 'general' | 'notifications' | 'accessibility' | 'privacy' | 'support'

interface Tab {
    key: TabKey
    label: string
}

const tabs: Tab[] = [
    { key: 'general', label: 'General' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'privacy', label: 'Privacy' },
    { key: 'support', label: 'Support' },
]

interface GeneralFormState {
    timeZone: string
    dateFormat: string
    email: string
    password: string
    twoFactorEnabled: boolean
}


const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('general')
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState<GeneralFormState>({
        timeZone: '(GMT +01:00) West Africa Time',
        dateFormat: 'DD/MM/YYYY',
        email: 'ritaokoro@gmail.com',
        password: 'Rita#45',
        twoFactorEnabled: true,
    })

    const handleChange =
        (field: keyof Omit<GeneralFormState, 'twoFactorEnabled'>) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
            }

    const toggleTwoFactor = () => {
        setForm((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
    }



    return (
        <DashboardLayout title="Settings" subtitle="Manage your account and preference.">
            <div className="min-h-screen bg-white py-5 px-4 sm:px-8">
                <div className="space-y-8">
                    {/* Tabs */}
                    <div className="flex items-center gap-10 border-b border-gray-200 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === tab.key
                                    ? 'text-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.key && (
                                    <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-primary" />
                                )}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            {/* Time zone */}
                            <div>
                                <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Time zone
                                </label>
                                <input
                                    id="timeZone"
                                    type="text"
                                    value={form.timeZone}
                                    onChange={handleChange('timeZone')}
                                    className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Date format */}
                            <div>
                                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Date format
                                </label>
                                <input
                                    id="dateFormat"
                                    type="text"
                                    value={form.dateFormat}
                                    onChange={handleChange('dateFormat')}
                                    className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Email address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email address
                                </label>
                                <div className="relative max-w-sm">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange('email')}
                                        className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <div className="relative max-w-sm">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={form.password}
                                        onChange={handleChange('password')}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="flex items-center justify-between max-w-sm pt-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Enable for more security</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={form.twoFactorEnabled}
                                    onClick={toggleTwoFactor}
                                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${form.twoFactorEnabled ? 'bg-primary' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'general' && (
                        <div className="py-16 text-center text-sm text-gray-400">
                            {tabs.find((t) => t.key === activeTab)?.label} content goes here.
                        </div>
                    )}
                </div>
            </div>

        </DashboardLayout>
    )
}

export default Settings
