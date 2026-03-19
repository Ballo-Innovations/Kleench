import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Smartphone, Check, Star, Trash2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MM_PROVIDERS = [
  { id: "airtel", name: "Airtel Money", shortName: "Airtel", color: "#E40513", bg: "#FFF1F2", emoji: "🔴" },
  { id: "mtn", name: "MTN Mobile Money", shortName: "MTN", color: "#F5A623", bg: "#FFFBEB", emoji: "🟡" },
  { id: "zamtel", name: "Zamtel Mobile Money", shortName: "Zamtel", color: "#00843D", bg: "#F0FDF4", emoji: "🟢" },
  { id: "zed", name: "Zed Mobile", shortName: "Zed", color: "#0077B6", bg: "#EFF6FF", emoji: "🔵" },
];

interface MMAccount {
  id: string;
  provider: string;
  providerName: string;
  name: string;
  number: string;
  isPrimary: boolean;
  color: string;
  bg: string;
}

type AddStep = "provider" | "details";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }),
};

export function MobileMoneySettings() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<MMAccount[]>([]);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [addStep, setAddStep] = useState<AddStep>("provider");
  const [selectedProv, setSelectedProv] = useState<(typeof MM_PROVIDERS)[0] | null>(null);
  const [holderName, setHolderName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kleench_mobile_money");
    if (saved) {
      try { setAccounts(JSON.parse(saved)); } catch { /* ignore parse errors */ }
    }
  }, []);

  const saveAccounts = (updated: MMAccount[]) => {
    setAccounts(updated);
    localStorage.setItem("kleench_mobile_money", JSON.stringify(updated));
  };

  const setPrimary = (id: string) => {
    saveAccounts(accounts.map((a) => ({ ...a, isPrimary: a.id === id })));
  };

  const deleteAccount = (id: string) => {
    const updated = accounts.filter((a) => a.id !== id);
    // if deleted was primary, set first remaining as primary
    if (updated.length > 0 && !updated.find((a) => a.isPrimary)) {
      updated[0].isPrimary = true;
    }
    saveAccounts(updated);
    setConfirmDelete(null);
  };

  const openAdd = () => {
    setAddStep("provider");
    setSelectedProv(null);
    setHolderName("");
    setPhoneNumber("");
    setFormError("");
    setShowAddSheet(true);
  };

  const handleAddSubmit = () => {
    if (!selectedProv) { setFormError("Please select a provider"); return; }
    if (!holderName.trim()) { setFormError("Please enter your name"); return; }
    if (!phoneNumber.trim() || phoneNumber.length < 9) { setFormError("Please enter a valid phone number"); return; }
    setFormError("");

    const newAcc: MMAccount = {
      id: Date.now().toString(),
      provider: selectedProv.id,
      providerName: selectedProv.name,
      name: holderName.trim(),
      number: phoneNumber.trim(),
      isPrimary: accounts.length === 0,
      color: selectedProv.color,
      bg: selectedProv.bg,
    };
    saveAccounts([...accounts, newAcc]);
    setShowAddSheet(false);
  };

  return (
    <div className="min-h-screen pb-10 relative">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[220px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(0,119,182,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 px-4 pt-4 pb-5 relative z-10">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/settings")}
          className="w-10 h-10 rounded-2xl bg-white shadow-md border border-black/[0.04] flex items-center justify-center">
          <ArrowLeft size={18} className="text-[var(--ink-primary)]" />
        </motion.button>
        <div className="flex-1">
          <p className="font-[var(--font-body)] text-[var(--ink-muted)] uppercase tracking-[0.15em]"
            style={{ fontSize: "9px", fontWeight: 600 }}>Payments</p>
          <h1 className="font-[var(--font-header)] text-[var(--ink-primary)]"
            style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.03em" }}>Mobile Money</h1>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={openAdd}
          className="w-10 h-10 rounded-2xl bg-[var(--trust-blue)] flex items-center justify-center shadow-md">
          <Plus size={18} className="text-white" strokeWidth={2.5} />
        </motion.button>
      </div>

      <div className="px-4 relative z-10">
        {accounts.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 rounded-3xl bg-[var(--trust-blue)]/08 flex items-center justify-center mb-4">
              <Smartphone size={36} className="text-[var(--trust-blue)]" strokeWidth={1.5} />
            </div>
            <h3 className="font-[var(--font-header)] text-[var(--ink-primary)] mb-2"
              style={{ fontSize: "20px", fontWeight: 900 }}>No Accounts Linked</h3>
            <p className="font-[var(--font-body)] text-[var(--ink-muted)] mb-6" style={{ fontSize: "13px", maxWidth: "260px" }}>
              Link your mobile money account to make deposits and withdrawals from your wallet.
            </p>
            <motion.button whileTap={{ scale: 0.96 }} onClick={openAdd}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--trust-blue)] text-white shadow-lg">
              <Plus size={16} strokeWidth={2.5} />
              <span className="font-[var(--font-header)]" style={{ fontSize: "14px", fontWeight: 800 }}>
                Link Account
              </span>
            </motion.button>
          </motion.div>
        ) : (
          /* Account list */
          <div className="space-y-4">
            {/* Info banner */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--trust-blue)]/[0.05] border border-[var(--trust-blue)]/10">
              <AlertCircle size={15} className="text-[var(--trust-blue)] flex-shrink-0" />
              <p className="font-[var(--font-body)] text-[var(--trust-blue)]" style={{ fontSize: "11px", fontWeight: 500 }}>
                Your primary account is used for deposits & withdrawals. Tap a card to set as primary.
              </p>
            </div>

            {accounts.map((acc, i) => {
              const prov = MM_PROVIDERS.find((p) => p.id === acc.provider);
              return (
                <motion.div key={acc.id} custom={i} variants={fadeUp} initial="initial" animate="animate">
                  <div className="bg-white rounded-2xl border border-black/[0.05] shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      {/* Provider icon */}
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: prov?.bg || "#F3F4F6", border: `1.5px solid ${acc.color}20` }}>
                        <span style={{ fontSize: "22px" }}>{prov?.emoji || "📱"}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-[var(--font-header)] text-[var(--ink-primary)]"
                            style={{ fontSize: "14px", fontWeight: 800 }}>{acc.providerName}</p>
                          {acc.isPrimary && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${acc.color}15`, fontSize: "9px" }}>
                              <Star size={8} fill={acc.color} style={{ color: acc.color }} />
                              <span className="font-[var(--font-body)] font-bold uppercase tracking-wider" style={{ color: acc.color, fontSize: "9px" }}>Primary</span>
                            </span>
                          )}
                        </div>
                        <p className="font-[var(--font-body)] text-[var(--ink-muted)]" style={{ fontSize: "12px" }}>
                          +260 {acc.number}
                        </p>
                        <p className="font-[var(--font-body)] text-[var(--ink-muted)]" style={{ fontSize: "11px" }}>
                          {acc.name}
                        </p>
                      </div>

                      {/* Delete */}
                      <motion.button whileTap={{ scale: 0.9 }}
                        onClick={() => setConfirmDelete(acc.id)}
                        className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                        <Trash2 size={14} className="text-red-400" strokeWidth={2} />
                      </motion.button>
                    </div>

                    {!acc.isPrimary && (
                      <div className="border-t border-black/[0.04]">
                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setPrimary(acc.id)}
                          className="w-full py-3 flex items-center justify-center gap-1.5">
                          <Star size={12} className="text-[var(--trust-blue)]" />
                          <span className="font-[var(--font-body)] text-[var(--trust-blue)]"
                            style={{ fontSize: "12px", fontWeight: 600 }}>Set as Primary</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Add another */}
            <motion.button whileTap={{ scale: 0.97 }} onClick={openAdd}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-[var(--trust-blue)]/30 flex items-center justify-center gap-2 bg-[var(--trust-blue)]/[0.02]">
              <Plus size={16} className="text-[var(--trust-blue)]" strokeWidth={2.5} />
              <span className="font-[var(--font-header)] text-[var(--trust-blue)]"
                style={{ fontSize: "13px", fontWeight: 800 }}>Add Another Account</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Delete confirm sheet */}
      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div className="fixed inset-0 z-[80]"
              style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)} />
            <motion.div className="fixed bottom-0 left-0 right-0 z-[90] max-w-md mx-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.2 }}>
              <div className="bg-white rounded-t-3xl px-6 pt-5 pb-10">
                <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-5" />
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3">
                    <Trash2 size={24} className="text-red-500" strokeWidth={2} />
                  </div>
                  <h3 className="font-[var(--font-header)] text-[var(--ink-primary)] mb-1.5"
                    style={{ fontSize: "19px", fontWeight: 900 }}>Remove Account?</h3>
                  <p className="font-[var(--font-body)] text-[var(--ink-muted)]" style={{ fontSize: "13px" }}>
                    This mobile money account will be unlinked from your wallet.
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-4 rounded-2xl bg-[var(--surface-raised)] font-[var(--font-header)] text-[var(--ink-primary)]"
                    style={{ fontSize: "13px", fontWeight: 700 }}>
                    Cancel
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => deleteAccount(confirmDelete)}
                    className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-[var(--font-header)] shadow-md"
                    style={{ fontSize: "13px", fontWeight: 700 }}>
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add account sheet */}
      <AnimatePresence>
        {showAddSheet && (
          <>
            <motion.div className="fixed inset-0 z-[80]"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddSheet(false)} />
            <motion.div className="fixed bottom-0 left-0 right-0 z-[90] max-w-md mx-auto"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}>
              <div className="bg-white rounded-t-3xl overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-5 pb-2">
                  <div className="w-10 h-1 rounded-full bg-black/10 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                  <div className="w-6" />
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowAddSheet(false)}
                    className="w-8 h-8 rounded-full bg-[var(--surface-raised)] flex items-center justify-center ml-auto">
                    <X size={14} className="text-[var(--ink-secondary)]" strokeWidth={2.5} />
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {addStep === "provider" && (
                    <motion.div key="add-provider" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="px-6 pb-10">
                      <div className="mb-5">
                        <h3 className="font-[var(--font-header)] text-[var(--ink-primary)]"
                          style={{ fontSize: "21px", fontWeight: 900 }}>Add Mobile Money</h3>
                        <p className="font-[var(--font-body)] text-[var(--ink-muted)] mt-1" style={{ fontSize: "13px" }}>
                          Choose your mobile network provider
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {MM_PROVIDERS.map((prov) => (
                          <motion.button key={prov.id} whileTap={{ scale: 0.96 }}
                            onClick={() => setSelectedProv(prov)}
                            className="relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all"
                            style={{
                              borderColor: selectedProv?.id === prov.id ? prov.color : "rgba(0,0,0,0.07)",
                              backgroundColor: selectedProv?.id === prov.id ? prov.bg : "white",
                            }}>
                            {selectedProv?.id === prov.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: prov.color }}>
                                <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                            )}
                            <span style={{ fontSize: "26px" }}>{prov.emoji}</span>
                            <p className="font-[var(--font-header)] text-[var(--ink-primary)]"
                              style={{ fontSize: "12px", fontWeight: 800 }}>{prov.shortName}</p>
                          </motion.button>
                        ))}
                      </div>
                      {formError && <p className="text-red-500 text-center mb-3" style={{ fontSize: "12px" }}>{formError}</p>}
                      <motion.button whileTap={{ scale: 0.97 }}
                        onClick={() => selectedProv ? (setAddStep("details"), setFormError("")) : setFormError("Please select a provider")}
                        className="w-full py-4 rounded-2xl text-white font-[var(--font-header)] shadow-lg"
                        style={{ fontSize: "14px", fontWeight: 800, backgroundColor: selectedProv?.color || "var(--trust-blue)" }}>
                        Continue →
                      </motion.button>
                    </motion.div>
                  )}

                  {addStep === "details" && (
                    <motion.div key="add-details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="px-6 pb-10">
                      <button onClick={() => setAddStep("provider")}
                        className="flex items-center gap-1.5 font-[var(--font-body)] text-[var(--trust-blue)] mb-4"
                        style={{ fontSize: "12px", fontWeight: 600 }}>
                        ← Back
                      </button>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: selectedProv?.bg }}>
                          <span style={{ fontSize: "24px" }}>{selectedProv?.emoji}</span>
                        </div>
                        <div>
                          <h3 className="font-[var(--font-header)] text-[var(--ink-primary)]"
                            style={{ fontSize: "17px", fontWeight: 900 }}>{selectedProv?.name}</h3>
                          <p className="font-[var(--font-body)] text-[var(--ink-muted)]" style={{ fontSize: "11px" }}>Enter your account details</p>
                        </div>
                      </div>
                      <div className="space-y-4 mb-5">
                        <div>
                          <label className="font-[var(--font-body)] text-[var(--ink-secondary)] block mb-1.5"
                            style={{ fontSize: "12px", fontWeight: 600 }}>Account Holder Name</label>
                          <input type="text" placeholder="Your full name" value={holderName}
                            onChange={(e) => setHolderName(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] outline-none"
                            style={{ fontSize: "14px" }} />
                        </div>
                        <div>
                          <label className="font-[var(--font-body)] text-[var(--ink-secondary)] block mb-1.5"
                            style={{ fontSize: "12px", fontWeight: 600 }}>Phone Number</label>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06]">
                              <span style={{ fontSize: "13px" }}>🇿🇲</span>
                              <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "13px", fontWeight: 600 }}>+260</span>
                            </div>
                            <input type="tel" placeholder="9X XXX XXXX" value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                              className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] outline-none"
                              style={{ fontSize: "14px" }} />
                          </div>
                        </div>
                      </div>
                      {formError && <p className="text-red-500 text-center mb-3" style={{ fontSize: "12px" }}>{formError}</p>}
                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleAddSubmit}
                        className="w-full py-4 rounded-2xl text-white font-[var(--font-header)] shadow-lg"
                        style={{ fontSize: "14px", fontWeight: 800, backgroundColor: selectedProv?.color || "var(--trust-blue)" }}>
                        Link Account
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
