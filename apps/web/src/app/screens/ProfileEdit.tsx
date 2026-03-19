import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Camera, User, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1722270608841-35d7372a2e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhciUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NzM4NzA0NzB8MA&ixlib=rb-4.1.0&q=80&w=400";

export function ProfileEdit() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePhoto, setProfilePhoto] = useState<string>(
    localStorage.getItem("userProfilePhoto") || DEFAULT_AVATAR
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem("userFullName") || ""
  );
  const [username, setUsername] = useState(
    localStorage.getItem("userUsername") || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [phone, setPhone] = useState(
    localStorage.getItem("userPhone") || ""
  );
  const [location, setLocation] = useState(
    localStorage.getItem("userLocation") || ""
  );
  const [bio, setBio] = useState(
    localStorage.getItem("userBio") || ""
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfilePhoto", profilePhoto);
    localStorage.setItem("userFullName", fullName);
    localStorage.setItem("userUsername", username);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userLocation", location);
    localStorage.setItem("userBio", bio);
    navigate("/settings");
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-5">
        <Link
          to="/settings"
          className="w-10 h-10 rounded-xl bg-white shadow-md border border-black/[0.04] flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-[var(--ink-primary)]" />
        </Link>
        <h1
          className="font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-tight"
          style={{ fontSize: "1.25rem" }}
        >
          Edit Profile
        </h1>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-[var(--trust-blue)] text-white font-[var(--font-body)] font-bold text-sm shadow-md"
        >
          Save
        </motion.button>
      </div>

      <div className="px-4 space-y-6">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <ImageWithFallback
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[var(--trust-blue)] text-white flex items-center justify-center shadow-lg border-4 border-white"
            >
              <Camera size={18} strokeWidth={2} />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <p className="text-xs font-[var(--font-body)] text-[var(--ink-muted)]">
            Tap to change profile photo
          </p>
        </motion.div>

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Full Name
            </label>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <User size={18} className="text-[var(--ink-muted)] shrink-0" strokeWidth={2} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Username
            </label>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <span className="text-[var(--ink-muted)] font-[var(--font-body)] text-sm">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Email
            </label>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <Mail size={18} className="text-[var(--ink-muted)] shrink-0" strokeWidth={2} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <Phone size={18} className="text-[var(--ink-muted)] shrink-0" strokeWidth={2} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+260 XXX XXX XXX"
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Location
            </label>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <MapPin size={18} className="text-[var(--ink-muted)] shrink-0" strokeWidth={2} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-[var(--font-body)] font-bold text-[var(--ink-secondary)] mb-2 ml-1">
              Bio
            </label>
            <div className="bg-white rounded-2xl px-4 py-3.5 border border-black/[0.05] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] resize-none"
              />
              <div className="text-right">
                <span className="text-[10px] font-[var(--font-body)] text-[var(--ink-muted)]">
                  {bio.length}/150
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delete Account Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100"
        >
          <p className="text-xs font-[var(--font-body)] text-red-600 text-center">
            Need to delete your account? Contact support at{" "}
            <span className="font-bold">support@kleench.com</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
