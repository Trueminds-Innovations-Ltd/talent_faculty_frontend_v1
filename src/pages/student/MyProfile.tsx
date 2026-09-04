"use client";

import { useState, useEffect } from "react";
import {
    Mail,
    Eye,
    EyeOff,
    Laptop,
    Smartphone,
    LogOut,
    Phone,
    Lock,
    ChevronRight,
    X,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";



type TabId = "personal" | "security";

type ModalId =
    | null
    | "success"
    | "logoutAll"
    | "recoveryEmail"
    | "recoveryPhone"
    | "securityQuestion";

interface Device {
    id: string;
    label: string;
    os: string;
    browser: string;
    location: string;
    timestamp: string;
    current: boolean;
    icon: React.ReactNode;
}


const DEVICES: Device[] = [
    {
        id: "1",
        label: "Windows",
        os: "Windows",
        browser: "Chrome",
        location: "Lagos, Nigeria",
        timestamp: "25th February, 2026 at 10:00AM",
        current: true,
        icon: <Laptop size={18} />,
    },
    {
        id: "2",
        label: "MacOS",
        os: "MacOS",
        browser: "Chrome",
        location: "Lagos, Nigeria",
        timestamp: "25th February, 2026 at 10:00AM",
        current: false,
        icon: <Laptop size={18} />,
    },
    {
        id: "3",
        label: "Iphone",
        os: "Iphone",
        browser: "Safari",
        location: "Lagos, Nigeria",
        timestamp: "25th February, 2026 at 10:00AM",
        current: false,
        icon: <Smartphone size={18} />,
    },
];

const SECURITY_QUESTIONS = [
    "Mother's Maiden Name",
    "First Pet's Name",
    "City You Were Born In",
    "Favorite Teacher's Name",
];


function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>
            {children}
        </div>
    );
}

function TextInput({
    value,
    onChange,
    placeholder,
    icon,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="relative">
            {icon && (
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl border border-gray-200 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${icon ? "pl-11 pr-4" : "px-4"
                    }`}
            />
        </div>
    );
}

function PasswordInput({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={visible ? "Hide password" : "Show password"}
            >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}

function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${checked ? "bg-primary" : "bg-gray-200"
                }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"
                    }`}
            />s
        </button>
    );
}

function ModalShell({
    onClose,
    children,
}: {
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
                {children}
            </div>
        </div>
    );
}

function ModalButtons({
    onCancel,
    onConfirm,
    confirmLabel,
}: {
    onCancel: () => void;
    onConfirm: () => void;
    confirmLabel: string;
}) {
    return (
        <div className="mt-6 flex gap-3">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onConfirm}
                className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary"
            >
                {confirmLabel}
            </button>
        </div>
    );
}


function PersonalInformationTab({
    user,
    onSave,
}: {
    user: any;
    onSave: (updated: any) => void;
}) {
    const fullName = user
        ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || ''
        : 'Rita Okoro';
    const [name, setName] = useState(fullName);
    const [phone, setPhone] = useState(user?.phone || user?.phone_number || '+234 708 464 4072');
    const [password, setPassword] = useState('••••••••••••');
    const email = user?.email || 'ritaokoro@gmail.com';
    const [bio, setBio] = useState('Passionate about learning, design, and building real solutions.');

    useEffect(() => {
        if (user) {
            const currentName = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || '';
            if (currentName) setName(currentName);
            if (user.phone || user.phone_number) setPhone(user.phone || user.phone_number);
        }
    }, [user]);

    const handleSave = () => {
        const parts = name.trim().split(' ');
        const first_name = parts[0] || '';
        const last_name = parts.slice(1).join(' ') || '';
        onSave({ first_name, last_name, phone });
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
                <Field label="Name">
                    <TextInput value={name} onChange={setName} placeholder="Your Full Name" />
                </Field>
                <Field label="Email address">
                    <TextInput value={email} onChange={() => { }} icon={<Mail size={16} />} />
                </Field>

                <Field label="Phone number">
                    <TextInput value={phone} onChange={setPhone} placeholder="+234 708 464 4072" />
                </Field>
                <Field label="Bio">
                    <TextInput value={bio} onChange={setBio} />
                </Field>

                <Field label="Password">
                    <PasswordInput value={password} onChange={setPassword} />
                </Field>
            </div>

            <button
                type="button"
                onClick={handleSave}
                className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
            >
                Save Changes
            </button>
        </div>
    );
}



function SecurityTab({
    onLogoutAll,
    onAddRecoveryEmail,
    onAddRecoveryPhone,
    onSetupSecurityQuestion,
    recoveryEmail,
    recoveryPhone,
}: {
    onLogoutAll: () => void;
    onAddRecoveryEmail: () => void;
    onAddRecoveryPhone: () => void;
    onSetupSecurityQuestion: () => void;
    recoveryEmail: string;
    recoveryPhone: string;
}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [twoFactor, setTwoFactor] = useState(true);

    return (
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                    <p className="mt-1 text-sm text-gray-500">Choose a strong password to keep your account secure</p>

                    <div className="mt-6 space-y-5">
                        <Field label="Current Password">
                            <PasswordInput value={currentPassword} onChange={setCurrentPassword} />
                        </Field>
                        <Field label="New Password">
                            <PasswordInput value={newPassword} onChange={setNewPassword} />
                        </Field>
                        <Field label="Confirm New Password">
                            <PasswordInput value={confirmPassword} onChange={setConfirmPassword} />
                        </Field>
                    </div>

                    <button
                        type="button"
                        className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary"
                    >
                        Update Password
                    </button>
                </div>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication (2FA)</h2>
                    <p className="mt-1 text-sm text-gray-500">Add an extra layer of security to your account</p>

                    <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="mt-0.5 text-sm text-gray-500">Protect your account using a verification code</p>
                        </div>
                        <Toggle checked={twoFactor} onChange={setTwoFactor} />
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Login Activity</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        These are the most recent devices that has accessed your account
                    </p>

                    <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
                        {DEVICES.map((device) => (
                            <div key={device.id} className="flex items-center justify-between gap-4 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                                        {device.icon}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            {device.os} &bull; {device.browser}
                                        </p>
                                        {device.current && (
                                            <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-medium text-primary">
                                                Current Device
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    <p>{device.location}</p>
                                    <p>{device.timestamp}</p>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={onLogoutAll}
                            className="flex w-full items-center gap-2 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50"
                        >
                            <LogOut size={16} />
                            Log out of all other devices
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-900">Account Recovery</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your recovery options in case you lose access to your accounts
                    </p>

                    <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <button
                            type="button"
                            onClick={onAddRecoveryEmail}
                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Recovery Email</p>
                                    <p className="mt-0.5 text-sm text-gray-500">{recoveryEmail || "Add a recovery email"}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400" />
                        </button>

                        <button
                            type="button"
                            onClick={onAddRecoveryPhone}
                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Recovery Phone Number</p>
                                    <p className="mt-0.5 text-sm text-gray-500">{recoveryPhone || "Add a recovery phone number"}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400" />
                        </button>

                        <button
                            type="button"
                            onClick={onSetupSecurityQuestion}
                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <Lock size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Security Questions</p>
                                    <p className="mt-0.5 text-sm text-gray-500">Set up security questions</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



function SuccessModal({ onDone }: { onDone: () => void }) {
    return (
        <ModalShell onClose={onDone}>
            <h2 className="text-2xl font-extrabold text-gray-900">Profile Updated Successfully</h2>
            <p className="mt-3 text-sm text-gray-500">
                Your changes have been saved and will now appear on your profile.
            </p>
            <button
                type="button"
                onClick={onDone}
                className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary"
            >
                Done
            </button>
        </ModalShell>
    );
}

function LogoutAllModal({
    onCancel,
    onConfirm,
}: {
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <ModalShell onClose={onCancel}>
            <h2 className="text-2xl font-extrabold text-gray-900">Log out of all devices?</h2>
            <p className="mt-3 text-sm text-gray-500">
                This will sign you out of Talent Faculty on all devices where your account is currently
                active. You&apos;ll need to log in again on each device.
            </p>
            <ModalButtons onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Log Out of All Devices" />
        </ModalShell>
    );
}

function RecoveryEmailModal({
    initialValue,
    onCancel,
    onConfirm,
}: {
    initialValue: string;
    onCancel: () => void;
    onConfirm: (value: string) => void;
}) {
    const [value, setValue] = useState(initialValue);
    return (
        <ModalShell onClose={onCancel}>
            <h2 className="text-2xl font-extrabold text-gray-900">Add a recovery email</h2>
            <p className="mt-3 text-sm text-gray-500">
                Add a trusted email address to help you recover your account if you lose access or forget
                your password.
            </p>
            <div className="mt-6 text-left">
                <Field label="Email address">
                    <TextInput value={value} onChange={setValue} placeholder="ritaokoro@gmail.com" icon={<Mail size={16} />} />
                </Field>
            </div>
            <ModalButtons onCancel={onCancel} onConfirm={() => onConfirm(value)} confirmLabel="Add Email" />
        </ModalShell>
    );
}

function RecoveryPhoneModal({
    initialValue,
    onCancel,
    onConfirm,
}: {
    initialValue: string;
    onCancel: () => void;
    onConfirm: (value: string) => void;
}) {
    const [value, setValue] = useState(initialValue);
    return (
        <ModalShell onClose={onCancel}>
            <h2 className="text-2xl font-extrabold text-gray-900">Add a recovery phone number</h2>
            <p className="mt-3 text-sm text-gray-500">
                Add a phone number you trust to help verify your identity and recover your account when
                needed.
            </p>
            <div className="mt-6 text-left">
                <Field label="Phone number">
                    <TextInput value={value} onChange={setValue} placeholder="+234 708 464 4072" />
                </Field>
            </div>
            <ModalButtons onCancel={onCancel} onConfirm={() => onConfirm(value)} confirmLabel="Add Phone Number" />
        </ModalShell>
    );
}

function SecurityQuestionModal({
    onCancel,
    onConfirm,
}: {
    onCancel: () => void;
    onConfirm: () => void;
}) {
    const [question, setQuestion] = useState(SECURITY_QUESTIONS[0]);
    const [answer, setAnswer] = useState("");

    return (
        <ModalShell onClose={onCancel}>
            <h2 className="text-2xl font-extrabold text-gray-900">Set up a security question</h2>
            <p className="mt-3 text-sm text-gray-500">
                Choose a security question and provide an answer you&apos;ll remember. This can help
                verify your identity when recovering your account.
            </p>
            <div className="mt-6 space-y-5 text-left">
                <Field label="Security Question">
                    <div className="relative">
                        <select
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            {SECURITY_QUESTIONS.map((q) => (
                                <option key={q} value={q}>
                                    {q}
                                </option>
                            ))}
                        </select>
                        <svg
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </Field>
                <Field label="Security Answer">
                    <TextInput value={answer} onChange={setAnswer} placeholder="Your answer" />
                </Field>
            </div>
            <ModalButtons onCancel={onCancel} onConfirm={onConfirm} confirmLabel="Set up answer" />
        </ModalShell>
    );
}



const TABS: { id: TabId; label: string }[] = [
    { id: "personal", label: "Personal Information" },
    { id: "security", label: "Security" },
];

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState<TabId>("personal");
    const [modal, setModal] = useState<ModalId>(null);

    const displayName = user
        ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || 'Rita Okoro'
        : 'Rita Okoro';
    const displayEmail = user?.email || 'ritaokoro@gmail.com';
    const displayTag = user?.unique_user_id ? `ID: ${user.unique_user_id}` : (user?.role ? `Role: ${user.role}` : 'UI/UX Design Cohort 4');

    const [recoveryEmail, setRecoveryEmail] = useState(displayEmail);
    const [recoveryPhone, setRecoveryPhone] = useState(user?.phone || user?.phone_number || "+234 708 4644 071");

    const handleSavePersonalInfo = (updatedData: { first_name: string; last_name: string; phone: string }) => {
        updateUser(updatedData);
        setModal("success");
    };

    return (
        <DashboardLayout title="Profile" subtitle="Manage your personal information">
            <div className="min-h-screen bg-white">
                <div className="px-2 py-2 sm:px-8">
                    <div className="mt-4 flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            {user?.first_name ? (
                                <span className="text-primary font-bold text-xl uppercase">
                                    {user.first_name[0]}{user.last_name ? user.last_name[0] : ''}
                                </span>
                            ) : (
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces"
                                    alt={displayName}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-900">{displayName}</p>
                            <p className="text-sm text-gray-500">{displayTag}</p>
                            <p className="text-sm text-gray-500">{displayEmail}</p>
                        </div>
                    </div>

                    <nav className="mt-8 flex items-center gap-8 border-b border-gray-200">
                        {TABS.map((tab) => {
                            const active = tab.id === activeTab;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${active ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    {tab.label}
                                    {active && (
                                        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-8">
                        {activeTab === "personal" && <PersonalInformationTab user={user} onSave={handleSavePersonalInfo} />}
                        {activeTab === "security" && (
                            <SecurityTab
                                onLogoutAll={() => setModal("logoutAll")}
                                onAddRecoveryEmail={() => setModal("recoveryEmail")}
                                onAddRecoveryPhone={() => setModal("recoveryPhone")}
                                onSetupSecurityQuestion={() => setModal("securityQuestion")}
                                recoveryEmail={recoveryEmail}
                                recoveryPhone={recoveryPhone}
                            />
                        )}
                    </div>
                </div>


                {modal === "success" && <SuccessModal onDone={() => setModal(null)} />}

                {modal === "logoutAll" && (
                    <LogoutAllModal onCancel={() => setModal(null)} onConfirm={() => setModal(null)} />
                )}

                {modal === "recoveryEmail" && (
                    <RecoveryEmailModal
                        initialValue={recoveryEmail}
                        onCancel={() => setModal(null)}
                        onConfirm={(value) => {
                            setRecoveryEmail(value);
                            setModal(null);
                        }}
                    />
                )}

                {modal === "recoveryPhone" && (
                    <RecoveryPhoneModal
                        initialValue={recoveryPhone}
                        onCancel={() => setModal(null)}
                        onConfirm={(value) => {
                            setRecoveryPhone(value);
                            setModal(null);
                        }}
                    />
                )}

                {modal === "securityQuestion" && (
                    <SecurityQuestionModal onCancel={() => setModal(null)} onConfirm={() => setModal(null)} />
                )}
            </div>
        </DashboardLayout>
    );
}