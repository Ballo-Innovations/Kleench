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
      { path: "learning", element: <Learning /> },
      { path: "learning/:id", element: <LearningDetail /> },
      { path: "discover", element: <Discover /> },
      { path: "socials", element: <Socials /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/:username", element: <Profile /> },
      { path: "creator/:username", element: <CreatorProfile /> },
      { path: "friends", element: <Friends /> },
      { path: "videos", element: <Videos /> },
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
