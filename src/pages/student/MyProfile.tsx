"use client";

import { useState, useRef } from "react";
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
    Camera,
    Trash2,
    Star,
    Users,
    BookOpen,
    CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

type TabId = "personal" | "security" | "cart";

type ModalId =
    | null
    | "success"
    | "logoutAll"
    | "recoveryEmail"
    | "recoveryPhone"
    | "securityQuestion";

interface Device {
    id: string;
    os: string;
    browser: string;
    location: string;
    timestamp: string;
    current: boolean;
    icon: React.ReactNode;
}

interface CartItem {
    id: string;
    title: string;
    description: string;
    image: string;
    reviews: number;
    students: number;
    courses: number;
    price: number;
    originalPrice: number;
    discountPercent: number;
}

const DEVICES: Device[] = [
    {
        id: "1",
        os: "Windows",
        browser: "Chrome",
        location: "Lagos, Nigeria",
        timestamp: "25th February, 2026 at 10:00AM",
        current: true,
        icon: <Laptop size={18} />,
    },
    {
        id: "2",
        os: "MacOS",
        browser: "Chrome",
        location: "Lagos, Nigeria",
        timestamp: "25th February, 2026 at 10:00AM",
        current: false,
        icon: <Laptop size={18} />,
    },
    {
        id: "3",
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

const GENDERS = ["Female", "Male", "Prefer not to say"];
const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "South Africa"];
const STATES: Record<string, string[]> = {
    Nigeria: ["Lagos", "Abuja", "Rivers", "Oyo"],
    Ghana: ["Greater Accra", "Ashanti"],
    Kenya: ["Nairobi", "Mombasa"],
    "South Africa": ["Gauteng", "Western Cape"],
};
const CITIES: Record<string, string[]> = {
    Lagos: ["Ketu", "Ikeja", "Lekki", "Yaba"],
    Abuja: ["Garki", "Wuse"],
    Rivers: ["Port Harcourt"],
    Oyo: ["Ibadan"],
    "Greater Accra": ["Accra"],
    Ashanti: ["Kumasi"],
    Nairobi: ["Nairobi CBD"],
    Mombasa: ["Mombasa Island"],
    Gauteng: ["Johannesburg"],
    "Western Cape": ["Cape Town"],
};

const INITIAL_CART: CartItem[] = [
    {
        id: "graphic-design",
        title: "Graphic Design Fundamentals",
        description: "Turn ideas into impactful visual designs.",
        image: "/profile/cart-graphic-design.png",
        reviews: 765,
        students: 2507,
        courses: 7,
        price: 60000,
        originalPrice: 60000,
        discountPercent: 60,
    },
    {
        id: "uiux-masterclass",
        title: "UI/UX Design Masterclass",
        description: "Create intuitive and engaging digital experiences.",
        image: "/profile/cart-uiux.png",
        reviews: 765,
        students: 2507,
        courses: 7,
        price: 60000,
        originalPrice: 60000,
        discountPercent: 60,
    },
    {
        id: "video-editing",
        title: "Professional Video Editing",
        description: "Transform footage into engaging visual stories.",
        image: "/profile/cart-video-editing.png",
        reviews: 765,
        students: 2507,
        courses: 7,
        price: 60000,
        originalPrice: 60000,
        discountPercent: 60,
    },
    {
        id: "affinity-essentials",
        title: "Affinity Designer Essentials",
        description: "Create professional designs with Affinity tools.",
        image: "/profile/cart-affinity.png",
        reviews: 765,
        students: 2507,
        courses: 7,
        price: 60000,
        originalPrice: 60000,
        discountPercent: 60,
    },
];

function formatNaira(amount: number) {
    return `\u20A6${amount.toLocaleString()}`;
}

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
    disabled = false,
    type = "text",
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: string;
}) {
    return (
        <div className="relative">
            {icon && (
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-xl border py-3 text-sm placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    disabled
                        ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 text-gray-700 focus:border-primary"
                } ${icon ? "pl-11 pr-4" : "px-4"}`}
            />
        </div>
    );
}

function SelectInput({
    value,
    onChange,
    options,
    disabled = false,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
    disabled?: boolean;
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`w-full cursor-pointer appearance-none rounded-xl border py-3 pl-4 pr-10 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    disabled
                        ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 text-gray-700 focus:border-primary"
                }`}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
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
    );
}

function PasswordInput({
    value,
    onChange,
    placeholder,
    disabled = false,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    disabled
                        ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 text-gray-700 focus:border-primary"
                }`}
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                disabled={disabled}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
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
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                checked ? "bg-primary" : "bg-gray-200"
            }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    checked ? "translate-x-5" : "translate-x-0.5"
                }`}
            />
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
                className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
            >
                {confirmLabel}
            </button>
        </div>
    );
}

interface PersonalInfoValues {
    name: string;
    phone: string;
    gender: string;
    password: string;
    email: string;
    bio: string;
    dob: string;
    address: string;
    country: string;
    state: string;
    city: string;
}

function PersonalInformationTab({
    values,
    setValues,
    isEditing,
    onStartEditing,
    onSave,
}: {
    values: PersonalInfoValues;
    setValues: React.Dispatch<React.SetStateAction<PersonalInfoValues>>;
    isEditing: boolean;
    onStartEditing: () => void;
    onSave: () => void;
}) {
    const set = <K extends keyof PersonalInfoValues>(key: K) => (v: string) =>
        setValues((prev) => ({ ...prev, [key]: v }));

    const stateOptions = STATES[values.country] ?? [];
    const cityOptions = CITIES[values.state] ?? [];

    if (!isEditing) {
        return (
            <div>
                <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
                    <Field label="Name">
                        <TextInput value={values.name} onChange={() => {}} disabled />
                    </Field>
                    <Field label="Email address">
                        <TextInput value={values.email} onChange={() => {}} icon={<Mail size={16} />} disabled />
                    </Field>

                    <Field label="Gender">
                        <SelectInput value={values.gender} onChange={() => {}} options={GENDERS} disabled />
                    </Field>
                    <Field label="Date of Birth">
                        <TextInput value={values.dob} onChange={() => {}} placeholder="DD/MM/YYYY" disabled />
                    </Field>

                    <Field label="Country">
                        <SelectInput value={values.country} onChange={() => {}} options={COUNTRIES} disabled />
                    </Field>
                    <Field label="Address">
                        <TextInput value={values.address} onChange={() => {}} placeholder="123 Main Street" disabled />
                    </Field>

                    <Field label="State">
                        <SelectInput value={values.state} onChange={() => {}} options={stateOptions.length ? stateOptions : [values.state]} disabled />
                    </Field>
                    <Field label="City">
                        <SelectInput value={values.city} onChange={() => {}} options={cityOptions.length ? cityOptions : [values.city]} disabled />
                    </Field>

                    <Field label="Phone number">
                        <TextInput value={values.phone} onChange={() => {}} disabled />
                    </Field>
                </div>

                <button
                    type="button"
                    onClick={onStartEditing}
                    className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
                >
                    Update Personal Information
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
                <Field label="Name">
                    <TextInput value={values.name} onChange={set("name")} placeholder="Your Full Name" />
                </Field>
                <Field label="Email address">
                    <TextInput value={values.email} onChange={() => {}} icon={<Mail size={16} />} disabled />
                </Field>

                <Field label="Phone number">
                    <TextInput value={values.phone} onChange={set("phone")} placeholder="+234 708 464 4072" />
                </Field>
                <Field label="Bio">
                    <TextInput value={values.bio} onChange={set("bio")} placeholder="Tell us a little about yourself" />
                </Field>

                <Field label="Gender">
                    <SelectInput value={values.gender} onChange={set("gender")} options={GENDERS} />
                </Field>
                <Field label="Date of Birth">
                    <TextInput value={values.dob} onChange={set("dob")} placeholder="DD/MM/YYYY" type="date" />
                </Field>

                <Field label="Password">
                    <PasswordInput value={values.password} onChange={set("password")} />
                </Field>
                <Field label="Address">
                    <TextInput value={values.address} onChange={set("address")} placeholder="123 Main Street" />
                </Field>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Field label="Country">
                    <SelectInput
                        value={values.country}
                        onChange={(v) => {
                            const nextStates = STATES[v] ?? [];
                            setValues((prev) => ({
                                ...prev,
                                country: v,
                                state: nextStates[0] ?? "",
                                city: CITIES[nextStates[0] ?? ""]?.[0] ?? "",
                            }));
                        }}
                        options={COUNTRIES}
                    />
                </Field>
                <Field label="State">
                    <SelectInput
                        value={values.state}
                        onChange={(v) => {
                            const nextCities = CITIES[v] ?? [];
                            setValues((prev) => ({ ...prev, state: v, city: nextCities[0] ?? "" }));
                        }}
                        options={stateOptions}
                    />
                </Field>
                <Field label="City">
                    <SelectInput value={values.city} onChange={set("city")} options={cityOptions} />
                </Field>
            </div>

            <button
                type="button"
                onClick={onSave}
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
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSaved, setPasswordSaved] = useState(false);

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Fill in all three password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation don't match.");
            return;
        }

        /**
         * Backend Integration
         *
         * await authService.changePassword({ currentPassword, newPassword })
         */

        setPasswordError(null);
        setPasswordSaved(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSaved(false), 3000);
    };

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

                    {passwordError && <p className="mt-3 text-sm text-red-500">{passwordError}</p>}
                    {passwordSaved && (
                        <p className="mt-3 flex items-center gap-1.5 text-sm text-primary">
                            <CheckCircle2 size={15} /> Password updated successfully.
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleUpdatePassword}
                        className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
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

function CartTab({
    items,
    onRemove,
    onCheckout,
}: {
    items: CartItem[];
    onRemove: (id: string) => void;
    onCheckout: () => void;
}) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 py-20 text-center">
                <p className="text-sm text-gray-400">Your cart is empty.</p>
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <div className="space-y-5">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-5 shadow-sm sm:flex-row sm:items-center"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-24 w-full shrink-0 rounded-2xl object-cover sm:w-32"
                        />
                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                                    <p className="mt-0.5 text-sm text-gray-500">{item.description}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemove(item.id)}
                                    className="shrink-0 text-red-400 hover:text-red-500"
                                    aria-label={`Remove ${item.title} from cart`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Star size={14} className="text-primary" /> {item.reviews} reviews
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users size={14} className="text-blue-500" /> {item.students.toLocaleString()} students
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <BookOpen size={14} className="text-amber-500" /> {item.courses} courses
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-base font-bold text-gray-900">{formatNaira(item.price)}</span>
                                <span className="text-sm text-gray-400 line-through">{formatNaira(item.originalPrice)}</span>
                                <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    {item.discountPercent}% OFF
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                    Total: <span className="text-base font-bold text-gray-900">{formatNaira(total)}</span>
                </p>
                <button
                    type="button"
                    onClick={onCheckout}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
                >
                    Checkout Now
                </button>
            </div>
        </div>
    );
}

function SuccessModal({ title, description, onDone }: { title: string; description: string; onDone: () => void }) {
    return (
        <ModalShell onClose={onDone}>
            <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
            <p className="mt-3 text-sm text-gray-500">{description}</p>
            <button
                type="button"
                onClick={onDone}
                className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
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
                    <SelectInput value={question} onChange={setQuestion} options={SECURITY_QUESTIONS} />
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
    { id: "cart", label: "Your Cart" },
];

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState<TabId>("personal");
    const [modal, setModal] = useState<ModalId>(null);
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [avatarSrc, setAvatarSrc] = useState("/profile/avatar.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

    const displayName = user
        ? [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "Rita Okoro"
        : "Rita Okoro";
    const displayEmail = user?.email || "ritaokoro@gmail.com";
    const displayTag = user?.unique_user_id
        ? `ID: ${user.unique_user_id}`
        : user?.role
          ? `Role: ${user.role}`
          : "UI/UX Design Cohort 4";

    const [recoveryEmail, setRecoveryEmail] = useState(displayEmail);
    const [recoveryPhone, setRecoveryPhone] = useState(user?.phone || user?.phone_number || "+234 708 4644 071");

    // Lazy initializer: seeds the form from `user` on first render only. The
    // user object is already hydrated from storage/login before this page is
    // reachable, so there's no later "user arrives" case to sync against —
    // avoiding an effect here sidesteps an unnecessary extra render pass.
    const [personalValues, setPersonalValues] = useState<PersonalInfoValues>(() => ({
        name: displayName,
        phone: user?.phone || user?.phone_number || "+234 708 464 4072",
        gender: user?.gender || "Female",
        password: "",
        email: displayEmail,
        bio: "Passionate about design and solving real problems.",
        dob: user?.dob || "",
        address: user?.address || "123 Main Street",
        country: "Nigeria",
        state: user?.state || "Lagos",
        city: user?.city || "Ketu",
    }));

    const handleSavePersonalInfo = () => {
        const parts = personalValues.name.trim().split(" ");
        const first_name = parts[0] || "";
        const last_name = parts.slice(1).join(" ") || "";

        /**
         * Backend Integration
         *
         * await userService.updateProfile({ ...personalValues, avatar: avatarFile })
         */

        updateUser({
            first_name,
            last_name,
            phone: personalValues.phone,
            gender: personalValues.gender,
            dob: personalValues.dob,
            address: personalValues.address,
            state: personalValues.state,
            city: personalValues.city,
        });
        setModal("success");
    };

    const handleAvatarClick = () => {
        if (isEditingPersonal) fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarSrc(url);
    };

    const handleCheckout = () => {
        /**
         * Backend Integration
         *
         * await cartService.checkout({ items: cartItems })
         */
        setModal("success");
    };

    return (
        <DashboardLayout title="Profile" subtitle="Manage your personal information">
            <div className="min-h-screen bg-white">
                <div className="px-2 py-2 sm:px-8">
                    <div className="mt-4 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleAvatarClick}
                            className={`group relative h-16 w-16 overflow-hidden rounded-full border border-primary/20 bg-primary/10 ${
                                isEditingPersonal ? "cursor-pointer" : "cursor-default"
                            }`}
                            aria-label={isEditingPersonal ? "Change profile photo" : "Profile photo"}
                        >
                            <img src={avatarSrc} alt={displayName} className="h-full w-full object-cover" />
                            {isEditingPersonal && (
                                <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-center text-[10px] font-semibold leading-tight text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    <Camera size={14} className="mr-1" />
                                    Change Photo
                                </span>
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
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
                                    className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${
                                        active ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600"
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
                        {activeTab === "personal" && (
                            <PersonalInformationTab
                                values={personalValues}
                                setValues={setPersonalValues}
                                isEditing={isEditingPersonal}
                                onStartEditing={() => setIsEditingPersonal(true)}
                                onSave={handleSavePersonalInfo}
                            />
                        )}
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
                        {activeTab === "cart" && (
                            <CartTab
                                items={cartItems}
                                onRemove={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
                                onCheckout={handleCheckout}
                            />
                        )}
                    </div>
                </div>

                {modal === "success" && activeTab === "cart" && (
                    <SuccessModal
                        title="Redirecting to Checkout"
                        description="Your order summary is ready. You'll be taken to secure checkout to complete your purchase."
                        onDone={() => setModal(null)}
                    />
                )}

                {modal === "success" && activeTab !== "cart" && (
                    <SuccessModal
                        title="Profile Updated Successfully"
                        description="Your changes have been saved and will now appear on your profile."
                        onDone={() => {
                            setModal(null);
                            setIsEditingPersonal(false);
                        }}
                    />
                )}

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
