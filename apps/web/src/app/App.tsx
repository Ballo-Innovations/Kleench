import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { Layout } from "./components/Layout";
import { Home } from "./screens/Home";
import { Wallet } from "./screens/Wallet";
import { Marketplace } from "./screens/Marketplace";
import { ProductDetail } from "./screens/ProductDetail";
import { Profile } from "./screens/Profile";
import { Friends } from "./screens/Friends";
import { Videos } from "./screens/Videos";
import { Learning } from "./screens/Learning";
import { LearningDetail } from "./screens/LearningDetail";
import { Discover } from "./screens/Discover";
import { Sowela } from "./screens/Sowela";
import { Settings } from "./screens/Settings";
import { ChangePin } from "./screens/ChangePin";
import { ChangePassword } from "./screens/ChangePassword";
import { ProfileEdit } from "./screens/ProfileEdit";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { LoginPin } from "./screens/LoginPin";
import { Onboarding } from "./screens/Onboarding";
import { Notifications } from "./screens/Notifications";
import { PostAdvert } from "./screens/PostAdvert";
import { SellProduct } from "./screens/SellProduct";
import { CreatePoll } from "./screens/CreatePoll";
import { Referral } from "./screens/Referral";
import { Offers } from "./screens/Offers";

// Protected Route Wrapper
function ProtectedRoute({ children, allowOnboarding = false }: { children: React.ReactNode; allowOnboarding?: boolean }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompletedOnboarding && !allowOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

// Scroll to top component
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    path: "/login-pin",
    element: (
      <>
        <ScrollToTop />
        <LoginPin />
      </>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute allowOnboarding>
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
      { path: "marketplace", element: <Marketplace /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "learning", element: <Learning /> },
      { path: "learning/:id", element: <LearningDetail /> },
      { path: "discover", element: <Discover /> },
      { path: "sowela", element: <Sowela /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/:username", element: <Profile /> },
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
      { path: "referral", element: <Referral /> },
      { path: "offers", element: <Offers /> },
    ],
  },
]);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL || "http://localhost:5001/kleench-mobile/europe-west1/api",
    }),
  ],
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>
        {!showSplash && <RouterProvider router={router} />}
      </QueryClientProvider>
    </trpc.Provider>
  );
}