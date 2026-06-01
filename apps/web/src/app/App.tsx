import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import { Toaster } from "sonner";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { Layout } from "./components/Layout";
import { Home } from "./screens/Home";
import { Wallet } from "./screens/Wallet";
import Messages from "./screens/Messages";
import { Marketplace } from "./screens/Marketplace";
import { ProductDetail } from "./screens/ProductDetail";
import { Profile } from "./screens/Profile";
import { Friends } from "./screens/Friends";
import { Videos } from "./screens/Videos";
import { Learning } from "./screens/Learning";
import { LearningDetail } from "./screens/LearningDetail";
import { Discover } from "./screens/Discover";
import { Socials } from "./screens/Socials";
import { Advert } from "./screens/Advert";
import { Settings } from "./screens/Settings";
import { ChangePin } from "./screens/ChangePin";
import { ChangePassword } from "./screens/ChangePassword";
import { ProfileEdit } from "./screens/ProfileEdit";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Onboarding } from "./screens/Onboarding";
import { OnboardingPage } from "./screens/OnboardingPage";
import { Notifications } from "./screens/Notifications";
import { PostAdvert } from "./screens/PostAdvert";
import { SellProduct } from "./screens/SellProduct";
import { CreatePoll } from "./screens/CreatePoll";
import { SurveysPolls } from "./screens/SurveysPolls";
import { CreateSurvey } from "./screens/CreateSurvey";
import { SurveyViewer } from "./screens/SurveyViewer";
import { PollViewer } from "./screens/PollViewer";
import { Referral } from "./screens/Referral";
import { Offers } from "./screens/Offers";
import { Donate } from "./screens/Donate";
import { Crowdfunding } from "./screens/Crowdfunding";
import { KycVerification } from "./screens/KycVerification";
import { Deposit } from "./screens/Deposit";
import { BalanceOverview } from "./screens/BalanceOverview";
import { Withdraw } from "./screens/Withdraw";
import { Send } from "./screens/Send";
import { Statements } from "./screens/Statements";
import { PayBills } from "./screens/PayBills";
import { ScanPay } from "./screens/ScanPay";
import { GlobalTransaction } from "./screens/GlobalTransaction";
import { Escrow } from "./screens/Escrow";
import { Savings } from "./screens/Savings";
import { TaxAccount } from "./screens/TaxAccount";
import { ContentCalculator } from "./screens/ContentCalculator";
import { NotFound } from "./screens/NotFound";
import { AdvertUpload } from "./screens/AdvertUpload";
import { AgentRegistration } from "./screens/AgentRegistration";
import { GoLive } from "./screens/GoLive";
import { AdvertQuestionnaire } from "./screens/AdvertQuestionnaire";
import { PayToStream } from "./screens/PayToStream";
import { LearnUpload } from "./screens/LearnUpload";
import { AdvertViewAds } from "./screens/AdvertViewAds";
import { LearnViewer } from "./screens/LearnViewer";
import { LearnCategories } from "./screens/LearnCategories";
import { CreatorProfile } from "./screens/CreatorProfile";
import { SurveyAnalytics } from "./screens/SurveyAnalytics";
import { PollAnalytics } from "./screens/PollAnalytics";
import { DonateCreate } from "./screens/DonateCreate";
import { DonateDonors } from "./screens/DonateDonors";
import { DonorTypeSelect } from "./screens/DonorTypeSelect";
import { DonorRegDetails } from "./screens/DonorRegDetails";
import { DonorPreferences } from "./screens/DonorPreferences";
import { DonorReview } from "./screens/DonorReview";
import { DonorSuccess } from "./screens/DonorSuccess";
import { DonateAgentRegister } from "./screens/DonateAgentRegister";
import { DonateAgentDetails } from "./screens/DonateAgentDetails";
import { DonateAgentSuccess } from "./screens/DonateAgentSuccess";
import { DonateDetail } from "./screens/DonateDetail";
import { DonatePayment } from "./screens/DonatePayment";
import { DonateConfirm } from "./screens/DonateConfirm";
import { DonateSuccess } from "./screens/DonateSuccess";
import { CreateInvestment } from "./screens/CreateInvestment";
import { ListedInvestors } from "./screens/ListedInvestors";
import { InvestorTypeSelection } from "./screens/InvestorTypeSelection";
import { InvestorRegistrationDetails } from "./screens/InvestorRegistrationDetails";
import { InvestmentPreferences } from "./screens/InvestmentPreferences";
import { InvestorReviewSubmit } from "./screens/InvestorReviewSubmit";
import { InvestorSuccess } from "./screens/InvestorSuccess";
import { RegisterInvestmentAgent } from "./screens/RegisterInvestmentAgent";
import { InvestmentAgentDetails } from "./screens/InvestmentAgentDetails";
import { InvestmentAgentSuccess } from "./screens/InvestmentAgentSuccess";
import { InvestmentDetails } from "./screens/InvestmentDetails";
import { InvestmentAmount } from "./screens/InvestmentAmount";
import { InvestmentConfirmation } from "./screens/InvestmentConfirmation";
import { InvestmentSuccess } from "./screens/InvestmentSuccess";
// Marketplace Extension — Sell Flows
import { SellHub } from "./screens/SellHub";
import { SellIdentity } from "./screens/SellIdentity";
import { SellProductInfo } from "./screens/SellProductInfo";
import { SellProductBoost } from "./screens/SellProductBoost";
import { SellProductTargeting } from "./screens/SellProductTargeting";
import { SellProductSuccess } from "./screens/SellProductSuccess";
import { SellServiceCategory } from "./screens/SellServiceCategory";
import { SellServiceInfo } from "./screens/SellServiceInfo";
import { SellServicePackages } from "./screens/SellServicePackages";
import { SellServiceAvailability } from "./screens/SellServiceAvailability";
import { SellServiceReview } from "./screens/SellServiceReview";
import { SellServiceSuccess } from "./screens/SellServiceSuccess";
import { SellComplexInfo } from "./screens/SellComplexInfo";
import { SellComplexPricing } from "./screens/SellComplexPricing";
import { SellComplexTerms } from "./screens/SellComplexTerms";
import { SellComplexSuccess } from "./screens/SellComplexSuccess";
// Marketplace Extension — Buyer Flows
import { MarketOrderSummary } from "./screens/MarketOrderSummary";
import { MarketOrderSuccess } from "./screens/MarketOrderSuccess";
import { MarketServiceDetail } from "./screens/MarketServiceDetail";
import { MarketServicePackages } from "./screens/MarketServicePackages";
import { MarketServiceCalendar } from "./screens/MarketServiceCalendar";
import { MarketServiceInquiry } from "./screens/MarketServiceInquiry";
import { MarketServicePayment } from "./screens/MarketServicePayment";
import { MarketAssetOverview } from "./screens/MarketAssetOverview";
import { MarketAssetPrice } from "./screens/MarketAssetPrice";
import { MarketAssetDocuments } from "./screens/MarketAssetDocuments";
import { MarketAssetChat } from "./screens/MarketAssetChat";
import { MarketAssetOrder } from "./screens/MarketAssetOrder";
import { MarketAssetEscrow } from "./screens/MarketAssetEscrow";
import { MarketIntelDetail } from "./screens/MarketIntelDetail";
// Marketplace — List Business Flow
import { ListBizInfo } from "./screens/ListBizInfo";
import { ListBizCategory } from "./screens/ListBizCategory";
import { ListBizDescription } from "./screens/ListBizDescription";
import { ListBizMedia } from "./screens/ListBizMedia";
import { ListBizContact } from "./screens/ListBizContact";
import { ListBizHours } from "./screens/ListBizHours";
import { ListBizSuccess } from "./screens/ListBizSuccess";
// Marketplace — Referral Flow
import { MarketReferral } from "./screens/MarketReferral";
import { MarketReferralInvite } from "./screens/MarketReferralInvite";
import { MarketReferralHistory } from "./screens/MarketReferralHistory";
// Marketplace — Agent Flow
import { AgentLanding } from "./screens/AgentLanding";
import { AgentComplexType } from "./screens/AgentComplexType";
// Marketplace — Entry Screens
import { FeaturedProducts } from "./screens/FeaturedProducts";
import { ServicesMarketplace } from "./screens/ServicesMarketplace";
import { MarketIntelHub } from "./screens/MarketIntelHub";
import { MarketIntelForecast } from "./screens/MarketIntelForecast";
import { MarketIntelOpportunities } from "./screens/MarketIntelOpportunities";
// Insurance Flow
import { InsuranceGrid } from "./screens/InsuranceGrid";
import { InsuranceType } from "./screens/InsuranceType";
import { InsuranceCoverage } from "./screens/InsuranceCoverage";
import { InsurancePlan } from "./screens/InsurancePlan";
import { InsuranceDetails } from "./screens/InsuranceDetails";
import { InsuranceSummary } from "./screens/InsuranceSummary";
import { InsurancePayment } from "./screens/InsurancePayment";
import { InsuranceReceipt } from "./screens/InsuranceReceipt";
// Vendor Registration Flow
import { VendorEntry } from "./screens/VendorEntry";
import { VendorInfo } from "./screens/VendorInfo";
import { VendorBankDetails } from "./screens/VendorBankDetails";
import { VendorServices } from "./screens/VendorServices";
import { VendorUploads } from "./screens/VendorUploads";
import { VendorReview } from "./screens/VendorReview";
import { VendorUnderReview } from "./screens/VendorUnderReview";
import { VendorDashboard } from "./screens/VendorDashboard";
// Road Tax Flow
import { RoadTaxEntry } from "./screens/RoadTaxEntry";
import { RoadTaxDetails } from "./screens/RoadTaxDetails";
import { RoadTaxPeriod } from "./screens/RoadTaxPeriod";
import { RoadTaxPolicy } from "./screens/RoadTaxPolicy";
import { RoadTaxPayment } from "./screens/RoadTaxPayment";
import { RoadTaxReceipt } from "./screens/RoadTaxReceipt";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAtOnboarding = window.location.pathname === "/onboarding";

  if (!hasCompletedOnboarding && !isAtOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

import { useLocation } from "react-router";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Create router outside component
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <ScrollToTop />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <ScrollToTop />
        <Signup />
      </>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <ScrollToTop />
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile-edit",
    element: (
      <ProtectedRoute>
        <ScrollToTop />
        <ProfileEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ScrollToTop />
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "wallet", element: <Wallet /> },
      { path: "messages", element: <Messages /> },
      { path: "advert", element: <Advert /> },
      { path: "videos", element: <Videos /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "product/:id", element: <ProductDetail /> },
      // Marketplace Extension — Sell Flows
      { path: "marketplace/sell", element: <SellHub /> },
      { path: "marketplace/sell/identity", element: <SellIdentity /> },
      { path: "marketplace/sell/product/info", element: <SellProductInfo /> },
      { path: "marketplace/sell/product/boost", element: <SellProductBoost /> },
      { path: "marketplace/sell/product/targeting", element: <SellProductTargeting /> },
      { path: "marketplace/sell/product/success", element: <SellProductSuccess /> },
      { path: "marketplace/sell/service/category", element: <SellServiceCategory /> },
      { path: "marketplace/sell/service/info", element: <SellServiceInfo /> },
      { path: "marketplace/sell/service/packages", element: <SellServicePackages /> },
      { path: "marketplace/sell/service/availability", element: <SellServiceAvailability /> },
      { path: "marketplace/sell/service/review", element: <SellServiceReview /> },
      { path: "marketplace/sell/service/success", element: <SellServiceSuccess /> },
      { path: "marketplace/sell/complex/info", element: <SellComplexInfo /> },
      { path: "marketplace/sell/complex/pricing", element: <SellComplexPricing /> },
      { path: "marketplace/sell/complex/terms", element: <SellComplexTerms /> },
      { path: "marketplace/sell/complex/success", element: <SellComplexSuccess /> },
      // Marketplace Extension — Buyer Flows
      { path: "marketplace/order/summary", element: <MarketOrderSummary /> },
      { path: "marketplace/order/success", element: <MarketOrderSuccess /> },
      { path: "marketplace/service/:id", element: <MarketServiceDetail /> },
      { path: "marketplace/service/:id/packages", element: <MarketServicePackages /> },
      { path: "marketplace/service/:id/availability", element: <MarketServiceCalendar /> },
      { path: "marketplace/service/:id/inquiry", element: <MarketServiceInquiry /> },
      { path: "marketplace/service/:id/payment", element: <MarketServicePayment /> },
      { path: "marketplace/asset/:id", element: <MarketAssetOverview /> },
      { path: "marketplace/asset/:id/price", element: <MarketAssetPrice /> },
      { path: "marketplace/asset/:id/documents", element: <MarketAssetDocuments /> },
      { path: "marketplace/asset/:id/chat", element: <MarketAssetChat /> },
      { path: "marketplace/asset/:id/order", element: <MarketAssetOrder /> },
      { path: "marketplace/asset/:id/escrow", element: <MarketAssetEscrow /> },
      { path: "marketplace/intel/:id", element: <MarketIntelDetail /> },
      // Marketplace — List Business Flow
      { path: "marketplace/list", element: <ListBizInfo /> },
      { path: "marketplace/list/category", element: <ListBizCategory /> },
      { path: "marketplace/list/description", element: <ListBizDescription /> },
      { path: "marketplace/list/media", element: <ListBizMedia /> },
      { path: "marketplace/list/contact", element: <ListBizContact /> },
      { path: "marketplace/list/hours", element: <ListBizHours /> },
      { path: "marketplace/list/success", element: <ListBizSuccess /> },
      // Marketplace — Referral Flow
      { path: "marketplace/refer", element: <MarketReferral /> },
      { path: "marketplace/refer/invite", element: <MarketReferralInvite /> },
      { path: "marketplace/refer/history", element: <MarketReferralHistory /> },
      // Marketplace — Agent Flow
      { path: "marketplace/agent", element: <AgentLanding /> },
      { path: "marketplace/agent/list", element: <AgentComplexType /> },
      // Marketplace — Entry Screens (Featured Products, Services, Market Intelligence)
      { path: "marketplace/featured", element: <FeaturedProducts /> },
      { path: "marketplace/services", element: <ServicesMarketplace /> },
      { path: "marketplace/intelligence", element: <MarketIntelHub /> },
      { path: "marketplace/intel/:id/forecast", element: <MarketIntelForecast /> },
      { path: "marketplace/intel/:id/opportunities", element: <MarketIntelOpportunities /> },
      { path: "learning", element: <Learning /> },
      { path: "learning/:id", element: <LearningDetail /> },
      { path: "discover", element: <Discover /> },
      { path: "socials", element: <Socials /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/:username", element: <Profile /> },
      { path: "creator/:username", element: <CreatorProfile /> },
      { path: "friends", element: <Friends /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/change-pin", element: <ChangePin /> },
      { path: "settings/change-password", element: <ChangePassword /> },
      { path: "offer/:id", element: <Offers /> },
      { path: "notifications", element: <Notifications /> },
      { path: "ads/post", element: <PostAdvert /> },
      { path: "sell", element: <SellProduct /> },
      { path: "poll/create", element: <CreatePoll /> },
      { path: "survey/create", element: <CreateSurvey /> },
      { path: "surveys-polls", element: <SurveysPolls /> },
      { path: "survey/analytics", element: <SurveyAnalytics /> },
      { path: "survey/:id", element: <SurveyViewer /> },
      { path: "poll/analytics", element: <PollAnalytics /> },
      { path: "poll/:id", element: <PollViewer /> },
      { path: "donate", element: <Donate /> },
      { path: "donate/create", element: <DonateCreate /> },
      { path: "donate/listed-donors", element: <DonateDonors /> },
      { path: "donate/register-donor", element: <DonorTypeSelect /> },
      { path: "donate/register-donor/details", element: <DonorRegDetails /> },
      { path: "donate/register-donor/preferences", element: <DonorPreferences /> },
      { path: "donate/register-donor/review", element: <DonorReview /> },
      { path: "donate/register-donor/success", element: <DonorSuccess /> },
      { path: "donate/register-agent", element: <DonateAgentRegister /> },
      { path: "donate/register-agent/details", element: <DonateAgentDetails /> },
      { path: "donate/register-agent/success", element: <DonateAgentSuccess /> },
      { path: "donate/campaign/:campaignId", element: <DonateDetail /> },
      { path: "donate/campaign/:campaignId/amount", element: <DonatePayment /> },
      { path: "donate/campaign/:campaignId/confirm", element: <DonateConfirm /> },
      { path: "donate/campaign/:campaignId/success", element: <DonateSuccess /> },
      { path: "crowdfunding", element: <Crowdfunding /> },
      { path: "crowdfunding/create", element: <CreateInvestment /> },
      { path: "crowdfunding/listed-investors", element: <ListedInvestors /> },
      { path: "crowdfunding/register-investor", element: <InvestorTypeSelection /> },
      { path: "crowdfunding/register-investor/details", element: <InvestorRegistrationDetails /> },
      { path: "crowdfunding/register-investor/preferences", element: <InvestmentPreferences /> },
      { path: "crowdfunding/register-investor/review", element: <InvestorReviewSubmit /> },
      { path: "crowdfunding/register-investor/success", element: <InvestorSuccess /> },
      { path: "crowdfunding/register-agent", element: <RegisterInvestmentAgent /> },
      { path: "crowdfunding/register-agent/details", element: <InvestmentAgentDetails /> },
      { path: "crowdfunding/register-agent/success", element: <InvestmentAgentSuccess /> },
      { path: "crowdfunding/project/:projectId", element: <InvestmentDetails /> },
      { path: "crowdfunding/project/:projectId/amount", element: <InvestmentAmount /> },
      { path: "crowdfunding/project/:projectId/confirm", element: <InvestmentConfirmation /> },
      { path: "crowdfunding/project/:projectId/success", element: <InvestmentSuccess /> },
      { path: "referral", element: <Referral /> },
      { path: "onboarding-page", element: <OnboardingPage /> },
      { path: "offers", element: <Offers /> },
      { path: "kyc-verification", element: <KycVerification /> },
      { path: "deposit", element: <Deposit /> },
      { path: "balance", element: <BalanceOverview /> },
      { path: "withdraw", element: <Withdraw /> },
      { path: "send", element: <Send /> },
      { path: "statements", element: <Statements /> },
      { path: "pay-bills", element: <PayBills /> },
      { path: "scan-pay", element: <ScanPay /> },
      { path: "global-transaction", element: <GlobalTransaction /> },
      { path: "escrow", element: <Escrow /> },
      { path: "savings", element: <Savings /> },
      { path: "content-calculator", element: <ContentCalculator /> },
      { path: "tax-account", element: <TaxAccount /> },
      { path: "advert/upload", element: <AdvertUpload /> },
      { path: "advert/agent-registration", element: <AgentRegistration /> },
      { path: "advert/questionnaire", element: <AdvertQuestionnaire /> },
      { path: "learning/upload", element: <LearnUpload /> },
      { path: "learning/go-live", element: <GoLive /> },
      { path: "learning/pay-to-stream", element: <PayToStream /> },
      { path: "learning/questionnaire", element: <AdvertQuestionnaire /> },
      { path: "advert/view-ads", element: <AdvertViewAds /> },
      { path: "learning/viewer", element: <LearnViewer /> },
      { path: "learning/categories", element: <LearnCategories /> },
      // Insurance Flow
      { path: "insurance", element: <InsuranceGrid /> },
      { path: "insurance/type", element: <InsuranceType /> },
      { path: "insurance/coverage", element: <InsuranceCoverage /> },
      { path: "insurance/plan", element: <InsurancePlan /> },
      { path: "insurance/details", element: <InsuranceDetails /> },
      { path: "insurance/summary", element: <InsuranceSummary /> },
      { path: "insurance/payment", element: <InsurancePayment /> },
      { path: "insurance/receipt", element: <InsuranceReceipt /> },
      // Vendor Registration Flow
      { path: "vendor", element: <VendorEntry /> },
      { path: "vendor/info", element: <VendorInfo /> },
      { path: "vendor/bank", element: <VendorBankDetails /> },
      { path: "vendor/services", element: <VendorServices /> },
      { path: "vendor/uploads", element: <VendorUploads /> },
      { path: "vendor/review", element: <VendorReview /> },
      { path: "vendor/under-review", element: <VendorUnderReview /> },
      { path: "vendor/dashboard", element: <VendorDashboard /> },
      // Road Tax Flow
      { path: "road-tax", element: <RoadTaxEntry /> },
      { path: "road-tax/details", element: <RoadTaxDetails /> },
      { path: "road-tax/period", element: <RoadTaxPeriod /> },
      { path: "road-tax/policy", element: <RoadTaxPolicy /> },
      { path: "road-tax/payment", element: <RoadTaxPayment /> },
      { path: "road-tax/receipt", element: <RoadTaxReceipt /> },
      { id: "notfound", path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <Toaster position="top-center" richColors theme="light" />
      {!showSplash && <RouterProvider router={router} />}
    </>
  );
}
