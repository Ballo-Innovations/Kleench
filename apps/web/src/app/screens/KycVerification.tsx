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
      />
      
      {/* ── Body ── */}
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
          isUpdate={localStorage.getItem("kleench_financial_kyc") === "true"}
        />
      </div>
    </div>
  );
}
