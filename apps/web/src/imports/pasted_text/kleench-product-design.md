This UI & UX Product Design Document outlines the comprehensive architecture for the 
Kleench mobile application, synthesizing its core commercial engines, visual identity, and the 
psychological journey of the user from discovery to transaction. 
1. Product Identity & Visual System 
The visual language is designed to transition the brand from a static web repository to a 
dynamic, mobile-first social commerce ecosystem. 
● Typography Strategy: 
○ Headers & Menu Items: Agrandir. This geometric typeface provides a 
modern, high-tech authority for navigation and primary headings. 
○ Sub-texts & Descriptions: Poppins. This sans-serif font ensures high 
legibility and a friendly tone for informational content and edutech 
descriptions. 
● Color Palette: 
○ Primary (Trust Blue): Derived from the Kleench logo to anchor the Wallet 
and Trust Validation layers. 
○ Accent (Action Gold): Used for high-engagement triggers such as 
Earnings, Rewards, and "Live" indicators to stimulate user activity. 
○ Background (Clean Slate): A minimal white or light-grey canvas to allow 
multi-media content (ads, reels, products) to stand out without visual clutter. 
2. Core Commercial Architecture 
The platform operates through four synchronized engines that turn social interaction into 
commercial transactions. 
● Referral Engine: A network-based system where users propagate products and 
adverts through their personal networks, earning incentives for successful 
conversions . 
● Advertising Engine: A visibility layer allowing businesses to promote sponsored 
products and targeted campaigns directly within the user's feed . 
● Value Creation Engine: A content-led discovery layer utilizing educational videos, 
tutorials, and demonstrations to build trust before a sale is attempted . 
● Direct Marketplace: The transactional infrastructure where users list products, 
browse offerings, and complete secure deals . 
3. The Integrated Customer Journey 
The UX logic is structured as a five-stage progression to maximize conversion rates by 
building confidence at every step . 
1. Discovery: Users encounter opportunities via sponsored ads, referral links, or 
smart-feed algorithms . 
2. Engagement: Users evaluate offers through embedded demonstration videos and 
detailed information panels . 
3. Trust Validation: The UI surfaces credibility indicators such as verified badges, KYC 
status, and seller reputation ratings . 
4. Proof of Value: Users access trial versions or previews of digital content to ensure 
the product meets expectations before payment . 
5. Secure Transaction: The journey concludes in the Wallet, utilizing conditional 
payments or escrow to guarantee safety for both parties . 
4. Detailed Screen Breakdown (Mobile-First) 
A. Home / Landing Page (The Hub) 
● Header: Features the User Profile and Live Wallet Balance ($1,250.75 example) to 
keep financial utility top-of-mind. 
● Top Navigation: Five primary tabs (Home, Friends, Videos, Learning, Wallet) with 
Sowela and notifications in the top-right corner. 
● Quick Actions: A horizontal row of buttons for Earnings, Rewards, and Send 
functions. 
● Main Feed Logic: A large, versatile container that alternates between featured 
adverts and marketplace items, supported by a right-hand sidebar for secondary 
advertisements and "Live" user status. 
● Bottom Action Bar: Persistent triggers for Photo, Video, and Go Live to encourage 
content creation. 
B. Learning Reels Section 
● Layout: A dedicated horizontal scroll section located below the main feed. 
● Content: Specifically features Edutech and learning videos, serving as the "Value 
Creation" entry point. 
● UX Interaction: Short-form videos that can lead directly to marketplace listings or 
service trials. 
C. The Wallet Interface 
● Layout: Accessible via the primary top navigation tab. 
● Features: Includes explicit sections for Deposit, Wallet Balance, and Earnings 
Tracking from the referral engine. 
● Security UI: Displays escrow/conditional payment status and dispute resolution 
triggers to reinforce the "Assurance Layer" . 
5. Interaction Strategy 
● Seamless Flow: The ecosystem is designed to keep the user within the platform 
throughout the entire journey, preventing drop-offs by integrating the wallet and trust 
verification directly into the discovery feed . 
● Network Effects: Every advertisement or product listing includes a "Propagate" 
trigger to activate the Referral Engine, turning every user into a potential distributor. 
Here is the detailed, screen-by-screen UI & UX Product Design Document. The descriptions 
are broken down into highly modular, descriptive sections, perfectly structured to streamline 
the transition from UI design right into a component-based React and Framer development 
architecture. 
1. Screen: The Home / Discovery Hub 
This is the primary landing screen, functioning as a hybrid feed that merges social 
engagement with the Advertising and Value Creation engines. 
● Layout & Structure: A vertical-scroll mobile layout with nested horizontal scrolling 
areas. 
● Colors & Typography: * Background: Clean Slate (light gray/white) to make media 
pop. 
○ Headers & Navigation: Agrandir for a bold, tech-forward structural 
hierarchy. 
○ Data & Descriptions: Poppins for high legibility on usernames, balances, 
and sub-texts. 
● Top Navigation Component: * A top-docked bar featuring five primary tab icons: 
Home, Friends, Videos, Learning, and Wallet. 
○ The top right corner houses the Sowela tab, a notifications bell, and the user 
profile icon. 
● Financial Identity Header: * Top-left alignment of the user's circular avatar. 
○ Immediately adjacent is a bold, live wallet balance (e.g., "$1,250.75") 
rendered in Agrandir to keep financial utility front and center. 
● Quick Action Row: * A horizontal flexbox of pill-shaped buttons: Earnings 
(accented with an Action Gold coin icon), Rewards (red/orange gift icon), Send 
(Trust Blue), and a Favorite/Heart icon. 
● The Main Hybrid Feed: * Primary Feature Card (Left/Center): A large, high-impact 
media container showcasing a Marketplace Listing, Sponsored Advert (e.g., a 
heavy-duty yellow generator), or Featured Content. It includes a subtle 
"Advertisement" overlay tag. 
○ Live Engagement Sidebar (Right): A vertically stacked, sticky column of 
circular user avatars. Active creators feature glowing red "LIVE" badges, while 
others display subtle blue play icons indicating available stories or updates. 
● Learning Reels Component: * Situated below the main feed. The section header 
"Learning Reels" is styled in Agrandir. 
○ A horizontally scrollable carousel of edutech video thumbnails (e.g., 
classroom teaching, coding tutorials, medical demonstrations). 
● Creation Dock (Bottom): * A fixed, bottom-anchored bar housing triggers for Photo 
(camera icon), Video (video camera icon), and Go Live (highlighted with a red play 
icon), along with a camera-flip toggle on the far right. 
2. Screen: The Wallet & Assurance Dashboard 
This screen represents the "Secure Transaction" stage. It is designed to alleviate purchasing 
anxiety and manage platform earnings. 
● Layout & Structure: A clean, high-trust dashboard layout prioritizing financial data 
and transaction security statuses. 
● Colors & Typography: Heavy utilization of Trust Blue for structural elements and 
security badges. Agrandir is used for the massive total balance display, while 
Poppins handles the granular transaction history. 
● Header & Balance: * A large, centered "Available Balance" display. 
○ A secondary "Pending Escrow" balance beneath it, assuring users of funds 
held safely during the Proof of Value stage. 
● Action Grid: * Four prominent, easily tappable buttons: Deposit (to fund the wallet), 
Withdraw, Send (P2P payments), and Earn (linking directly to the Referral Engine 
dashboard). 
● Transaction & Escrow Feed: * A vertical list of recent activities. 
○ Marketplace purchases currently in transit or trial phases are highlighted with 
a Trust Blue "Secure Escrow" badge and a pending delivery status, 
reassuring the buyer that funds are protected. 
● Referral Tracking Section: * A dedicated module showing metrics from the user's 
propagated links, displaying successful conversions and accumulated Action Gold 
rewards. 
3. Screen: Marketplace & Engagement Detail View 
This screen is accessed when a user taps on an advert, learning reel, or product from the 
Home Hub. It moves the user from "Discovery" into "Engagement" and "Proof of Value." 
● Layout & Structure: Media-heavy at the top, transitioning into an information-dense, 
scrollable body, anchored by a persistent call-to-action. 
● Colors & Typography: Clean Slate background. Agrandir for the product/content 
title and pricing. Action Gold for primary conversion buttons. 
● Media Gallery / Demo Area: * A large top container for swipable product images or 
an embedded, auto-playing short demonstration video (Proof of Value). 
● Trust Validation Panel: * Positioned immediately beneath the price/title. 
○ Displays the seller's mini-avatar, a "Verified KYC" badge in Trust Blue, and a 
star-rating aggregate to instantly answer the "Is this legitimate?" question. 
● Information Layer: * A rich-text area using Poppins for deep product explanations, 
terms, and included services. 
● Referral Propagation Trigger: * A prominent, Action Gold "Share & Earn" button 
placed mid-scroll, allowing the user to generate their unique referral link to push the 
product to their own network. 
● Sticky Checkout Bar: * A bottom-fixed area containing a "Purchase with Wallet" 
button. Micro-copy beneath the button explicitly states "Protected by Kleench 
Escrow" to guarantee transaction assurance. 
4. Screen: Creator / Seller Profile 
This screen serves as the ultimate "Credibility Layer," acting as the public face for users who 
sell products or create edutech content. 
● Layout & Structure: A standard profile header layout followed by a segmented tab 
view to separate content types. 
● Colors & Typography: Agrandir for the user's display name and primary stats. 
Poppins for the biography and detailed credentials. 
● Identity & Credibility Header: * A large profile avatar accompanied by a highly 
visible "Verified" checkmark. 
○ Key trust metrics displayed in a three-column grid: "Completed Transactions," 
"Average Rating," and "Successful Referrals." 
● Segmented Content Tabs: * Users can toggle between two main grids: * Learning 
Reels: A grid of the creator's published educational content and tutorials. * 
Marketplace: A grid of active products or services the user is currently selling. 
● Interaction Buttons: * "Follow" (to curate the Home feed), "Message" (for direct 
engagement), and a "View Referral Links" option. 
Comprehensive UI & UX Product Design Document: The Kleench Mobile 
Application 
This document serves as the definitive architectural blueprint for the Kleench mobile 
application, detailing the synthesis of its core commercial strategy, visual system, and 
the psycho-social journey designed to guide a user from initial discovery to secure 
transaction. The platform is conceived as a dynamic social commerce ecosystem, 
moving beyond static product listings to create an integrated loop of education, trust, 
and incentivized referral.-----1. Product Identity, Visual System, and Brand Tone 
The visual language of Kleench is engineered to facilitate the brand's transition from a 
simple web repository into a dynamic, engaging, and trustworthy mobile-first 
environment. The aesthetic is modern, tech-forward, and clean, reflecting the 
product's emphasis on transparency and ease of use.Typography Strategy: 
Authority Meets Legibility 
The application employs a dual-font strategy to clearly differentiate structural navigation 
from consumable content, optimizing for both impact and readability. 
● Headers & Menu Items (Structural Authority): Agrandir. This geometric, assertive 
typeface is reserved for primary headings, crucial navigation labels, and financial 
data displays (e.g., wallet balance). It establishes a modern, high-tech authority, 
guiding the user through the app's architecture. 
● Sub-texts & Descriptions (Informational Readability): Poppins. This highly 
legible, friendly sans-serif font is utilized for all body copy, informational panels, 
product descriptions, edutech narratives, and granular data. Its clean structure 
ensures high legibility, fostering a welcoming tone for educational and transactional 
content. 
Color Palette: The Pillars of Trust and Action 
The color system is not merely decorative; it is functional, signalling psychological and 
transactional states to the user. 
● Primary: Trust Blue (Hex: #0077B6 - Example): Directly derived from the Kleench 
logo, this deep, authoritative blue acts as the anchor for all high-stakes transactional 
layers. It is predominantly used for the Wallet Interface, KYC/Verified Badges, and 
the Trust Validation indicators, instilling confidence in the platform's security. 
● Accent: Action Gold (Hex: #FFC300 - Example): A vibrant, stimulating gold is 
strategically deployed to highlight high-engagement triggers. It is used for elements 
directly tied to user activity and financial reward, such as Earnings Accumulation, 
Rewards Icons, "LIVE" Status Indicators, and primary Call-to-Action (CTA) 
buttons that drive conversion. 
● Background: Clean Slate (Hex: #F8F8F8 - Example): A minimal white or light-grey 
canvas that serves a functional purpose: maximizing the visual prominence of 
user-generated multi-media content (advertisements, product photography, 
short-form reels). This absence of visual clutter ensures content is the focal point. 
2. Core Commercial Architecture: The Four Synchronized Engines 
The Kleench platform is sustained by four interdependent and synchronized engines, 
designed to convert social interaction into predictable commercial transactions and 
revenue streams. 
1. Referral Engine (Network Effect): A sophisticated, incentivized system that turns 
every user into a potential distributor. It provides unique tracking links for products 
and adverts, rewarding the propagating user with immediate, trackable incentives 
(Action Gold) upon successful conversion within their personal network. This engine 
is the primary driver of organic user acquisition and virality. 
2. Advertising Engine (Visibility Layer): A dynamic, self-serve layer allowing 
businesses and high-volume sellers to promote sponsored products and targeted 
campaigns. These campaigns are contextually embedded directly within the user's 
main feed, ensuring high visibility without disrupting the social experience. 
3. Value Creation Engine (Content-Led Discovery): This is the platform's soft-sell 
mechanism. It is a content-first layer utilizing Edutech resources—educational 
videos, product tutorials, demonstrations, and skill-based learning reels. By providing 
value and building foundational knowledge before a sale is attempted, it cultivates 
deep user trust and significantly reduces purchasing friction. 
4. Direct Marketplace (Transactional Infrastructure): The robust e-commerce core 
where users and businesses list products, browse curated offerings, and complete 
secure, escrow-protected deals. It provides the final, secure infrastructure for the 
transaction. 
3. The Integrated Customer Journey: The Five-Stage Conversion Funnel 
The User Experience (UX) logic is meticulously structured as a five-stage progression, 
focused on building user confidence and maximizing the conversion rate at every 
transition point. 
1. Discovery: The initial exposure stage. Users encounter opportunities through a mix 
of sources: algorithmically optimized Smart-Feed Integration, targeted Sponsored 
Ads (Advertising Engine), and personalized Referral Links shared by their network 
(Referral Engine). 
2. Engagement: The evaluation phase. Users move from a simple feed card to an 
Engagement Detail View. Here, they evaluate offers via embedded demonstration 
videos (Proof of Value), detailed product information panels, and interactive feature 
showcases. 
3. Trust Validation: The crucial credibility phase. The UI proactively surfaces essential 
security and credibility indicators: Verified Badges (KYC status), Seller Reputation 
Ratings, and transparent transaction histories, leveraging Trust Blue for visual 
anchoring. 
4. Proof of Value: The risk-mitigation step. For digital content or subscription services, 
users can access Trial Versions or Content Previews to directly verify the product 
meets their expectations. This is the precursor to conditional payment release. 
5. Secure Transaction: The conclusive stage. The user enters the dedicated Wallet 
Interface. The transaction utilizes Conditional Payments or Escrow Services, 
explicitly guaranteeing fund safety for both the buyer (funds held until product/service 
is received) and the seller (assurance of payment upon delivery). 
4. Detailed Screen Breakdown (Mobile-First Architecture) 
The application’s screens are designed as modular components, ensuring a clean handover 
to a React or Framer development architecture.A. Home / Discovery Hub (Screen 1) 
Function: The central landing screen, merging social engagement, marketplace, and 
content discovery. 
Component Area Key Features & UX Logic Visual & Technical Notes 
Financial Identity Header User Profile avatar and a 
live, bold Wallet Balance 
(e.g., "$1,250.75"). 
Uses Agrandir for the 
balance to keep financial 
utility top-of-mind. 
Positioned top-left. 
Top Navigation Bar Five persistent primary tabs: 
Home, Friends, Videos, 
Learning, Wallet. 
Sowela (in-app 
assistant/guide) and 
Notifications housed in the 
top-right corner. 
Quick Action Row Horizontal flexbox of 
high-utility functions: 
Earnings (Action Gold 
icon), Rewards, and Send 
(Trust Blue icon). 
Pill-shaped buttons for 
quick, single-tap access. 
The Main Hybrid Feed A large, vertically scrollable 
container that alternates 
between Marketplace 
Listings and Sponsored 
Adverts. 
Includes a sticky Live 
Engagement Sidebar on 
the right, featuring circular 
user avatars with glowing 
"LIVE" (Action Gold) 
badges. 
Learning Reels 
Component 
Situated immediately below 
the main feed, accessible 
via horizontal scroll. 
Section header styled in 
Agrandir. Features 
Edutech short-form video 
thumbnails, acting as the 
primary entry point for the 
Value Creation Engine. 
Creation Dock Fixed, bottom-anchored bar. Persistent triggers for 
Photo, Video, and Go Live 
(highlighted with an Action 
Gold/Red icon) to 
encourage constant user 
content creation. 
B. The Wallet & Assurance Dashboard (Screen 2) 
 
Function: The transactional and security hub, alleviating purchase anxiety and managing 
platform finances. 
Component Area Key Features & UX Logic Visual & Technical Notes 
Balance Display Large, centered "Available 
Balance" followed by a 
secondary "Pending 
Escrow" balance. 
Heavy use of Trust Blue for 
structural elements. Balance 
in massive Agrandir font. 
Action Grid Four prominent, easily 
tappable buttons: Deposit, 
Withdraw, Send (P2P), and 
Earn (direct link to Referral 
Dashboard). 
Designed for instant 
financial control. 
Transaction & Escrow 
Feed 
Vertical, chronological list of 
recent activities. 
Marketplace purchases 
currently in transit or trial are 
highlighted. 
Features a visible Trust 
Blue "Secure Escrow" 
badge next to protected 
transactions, visually 
reinforcing the Assurance 
Layer. 
Referral Tracking Dedicated module 
displaying accumulated 
Action Gold rewards, 
successful conversions, and 
propagated link metrics. 
Uses Action Gold accents 
for metric readouts. 
C. Marketplace & Engagement Detail View (Screen 3) 
 
Function: Moves the user from Discovery into deep Engagement, Proof of Value, and 
conversion. 
Component Area Key Features & UX Logic Visual & Technical Notes 
Media Gallery / Demo Area Large top container for 
swipable product images or 
an embedded, auto-playing 
short-form demonstration 
video. 
Directly addresses the 
Proof of Value step. 
Trust Validation Panel Positioned immediately 
beneath the product title and 
price. 
Displays the seller's 
mini-avatar, a "Verified 
KYC" badge in Trust Blue, 
and a star-rating aggregate 
to instantly establish 
legitimacy. 
Referral Propagation 
Trigger 
Action Gold "Share & Earn" 
button placed mid-scroll. 
Allows the user to instantly 
generate their unique 
referral link, activating the 
Referral Engine within the 
product view. 
Sticky Checkout Bar Bottom-fixed persistent 
Call-to-Action. 
Contains a "Purchase with 
Wallet" button (Action 
Gold). Micro-copy states: 
"Protected by Kleench 
Escrow" to guarantee 
transaction assurance. 
D. Creator / Seller Profile (Screen 4) 
 
Function: The public face for high-volume sellers and content creators, serving as the 
ultimate Credibility Layer. 
Component Area Key Features & UX Logic Visual & Technical Notes 
Identity & Credibility 
Header Large profile avatar with 
a highly visible 
"Verified" 
checkmark (Trust 
Blue). 
Key trust metrics 
displayed in a 
three-column grid: 
"Completed 
Transactions," 
"Average Rating," 
and "Successful 
Referrals." 
Segmented Content 
Tabs 
Allows users to toggle 
between the 
creator’s published 
content. 
Tab 1: Learning Reels 
(Edutech grid). Tab 
2: Marketplace 
(Active product 
listings grid). 
Interaction Buttons Essential engagement 
triggers. 
Includes "Follow" (to 
curate the Home 
feed), "Message" (for 
direct engagement), 
and a "View Referral 
Links" option. -----5. Interaction Strategy: Seamless Flow and Network Effects 
 
The design ensures a hyper-integrated ecosystem to minimize user drop-off and 
maximize organic propagation. 
● Seamless Flow: The entire user journey is contained within the platform. The Wallet 
and Trust Verification layers are integrated directly into the discovery and product 
engagement feeds, meaning users never need to leave the app to verify security or 
complete a transaction. 
● Network Effects: The principle of turning every user into a distributor is paramount. 
Every single advertisement or product listing includes an easily accessible 
"Propagate" or "Share & Earn" trigger, which instantly activates the Referral 
Engine and pushes the item to the user's network. This fundamental interaction 
ensures continuous, incentivized growth. 