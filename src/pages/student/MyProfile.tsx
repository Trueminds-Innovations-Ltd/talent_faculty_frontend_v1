import React, { useState } from 'react'
import { Mail, Eye, EyeOff } from "lucide-react";
import DashboardLayout from '../../components/layout/DashboardLayout'


type TabId = "personal" | "academic" | "security" | "preferences";

interface Tab {
    id: TabId;
    label: string;
}

const TABS: Tab[] = [
    { id: "personal", label: "Personal Information" },
    { id: "academic", label: "Academic Information" },
    { id: "security", label: "Security" },
    { id: "preferences", label: "Preferences" },
];

interface ProfileFormState {
    name: string;
    email: string;
    phone: string;
    bio: string;
    password: string;
}

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState<TabId>("personal");
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<ProfileFormState>({
        name: "Rita Okoro",
        email: "ritaokoro@gmail.com",
        phone: "+234 708 464 4072",
        bio: "Passionate about design and solving real problems.",
        password: "Rita#45",
    });

    const handleChange =
        (field: keyof ProfileFormState) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving profile:", form);
    };






    return (
        <DashboardLayout title="Profile" subtitle="Manage your personal information.">

            <div className="bg-white px-4">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src="./rita.png"
                            alt="Rita Okoro"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-base font-semibold text-gray-900">Rita Okoro</h1>
                            <p className="text-sm text-gray-500">UI/UX Design Cohort 4</p>
                            <p className="text-sm text-gray-500">ritaokoro@gmail.com</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? "text-primary"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full border border-dashed border-primary" />
                                )}
                            </button>
                        ))}
                    </div>

                    {activeTab === "personal" && (
                        <form onSubmit={handleSave}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange("name")}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange("email")}
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange("phone")}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                {/* Bio */}
                                <div>
                                    <label
                                        htmlFor="bio"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        rows={1}
                                        value={form.bio}
                                        onChange={handleChange("bio")}
                                        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            onChange={handleChange("password")}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/30 transition-colors"
                            >
                                Save changes
                            </button>
                        </form>
                    )}

                    {activeTab !== "personal" && (
                        <div className="py-16 text-center text-sm text-gray-400">
                            {TABS.find((t) => t.id === activeTab)?.label} content goes here.
                        </div>
                    )}
                </div>
            </div>

        </DashboardLayout>
    )
}

