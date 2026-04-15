import React from "react";
import { useNavigate } from "react-router";
import { KycFlow } from "../components/KycFlow";
import { PageHeader } from "../components/PageHeader";

export function KycVerification() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = React.useState<number>(0);

  return (
    <div className="w-full relative min-h-screen bg-transparent flex flex-col overflow-hidden">
      {/* ── FULL BLEED FIXED HEADER (Home Page Behavior) ── */}
      <PageHeader 
        useLogo 
        showBack
        title="KYC"
        subtitle={
          currentStage === 3 ? "Advertising Preferences" : 
          currentStage === 2 ? "Occupation & Professional" :
          currentStage === 1 ? "Bank & Mobile Details" :
          "Zero Paperwork Verification"
        }
        customBalanceHUD={
          <div className="flex gap-2 px-2 w-full mt-1 h-full items-center">
            {["Bio", "Bank", "Job", "Int"].map((stage, idx) => (
              <div key={stage} className="flex-1 flex flex-col items-center">
                <div className={`h-[3px] w-full rounded-full transition-all duration-700 ${idx <= currentStage ? "bg-white shadow-[0_0_10px_white]" : "bg-white/20"}`} />
                <span className={`text-[8px] font-black mt-1.5 uppercase tracking-tighter transition-colors ${idx === currentStage ? "text-white" : "text-white/40"}`}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
        }
      />
      
      <div className="flex-1 overflow-hidden">
        <KycFlow 
          onClose={() => navigate(-1)}
          onComplete={(data) => {
            console.log("KYC Data:", data);
            localStorage.setItem("kleench_financial_kyc", "true");
            localStorage.setItem("userKyc", JSON.stringify(data));
            navigate("/wallet", { replace: true });
          }}
          externalStage={currentStage}
          onStageChange={setCurrentStage}
        />
      </div>
    </div>
  );
}
