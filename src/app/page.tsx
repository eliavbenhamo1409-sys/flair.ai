"use client";

import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";

// Language Context
type Language = "he" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

// Translations
const translations: Record<Language, Record<string, string>> = {
  he: {
    // Navigation
    "nav.howItWorks": "איך זה עובד",
    "nav.features": "מה בפנים",
    "nav.about": "הסיפור שלנו",
    "nav.faq": "שאלות ותשובות",
    "nav.download": "הורידו עכשיו",
    
    // Hero
    "hero.badge": "אפליקציית האופנה המתקדמת בעולם",
    "hero.title1": "הארון שלך.",
    "hero.title2": "הסטייליסט שלנו.",
    "hero.description": "סוף סוף לראות את כל מה שיש לך, ולדעת בדיוק מה ללבוש.",
    "hero.descriptionHighlight": "הארון הדיגיטלי שיעשה לך סדר.",
    "hero.downloadFree": "הורדה חינם",
    "hero.appStore": "App Store",
    "hero.googlePlay": "Google Play",
    "hero.downloads": "+10K הורדות",
    "hero.rating": "דירוג",
    "hero.lookReady": "לוק מוכן",
    "hero.seconds": "3 שניות",
    
    // Features
    "features.subtitle": "הכל במקום אחד",
    "features.title": "שלושה כלים. אפס התלבטויות.",
    "features.closet.title": "הארון הדיגיטלי",
    "features.closet.description": "מצלמים פעם אחת, רואים הכל לנצח. כל בגד מקבל מקום, תיוג וארגון. הארון שלך - נגיש מכל מקום, מסודר, תמיד איתך.",
    "features.model.title": "המודל שלך",
    "features.model.description": "חמש תמונות ויש לך מודל דיגיטלי. רואים כל לוק על הגוף שלך לפני שלבשת. כמו חדר מדידה אישי, בכל שעה.",
    "features.ai.title": "הסטייליסט שלך",
    "features.ai.description": "כותבים ״פגישה עם לקוח״ או ״יום בבית״ - ומקבלים לוקים מהארון שלך, מותאמים למזג האוויר, לאירוע ולמצב הרוח.",
    "features.screen.closet": "הארון שלך",
    "features.screen.selection": "בחירת פריטים",
    "features.screen.look": "יצירת לוק",
    "features.screen.result": "התוצאה",
    
    // How it works
    "how.subtitle": "פשוט לגמרי",
    "how.title": "מארון עמוס ללוק מושלם",
    "how.step1.title": "מצלמים את הארון",
    "how.step1.description": "תמונה אחת לכל בגד. האפליקציה מזהה, מסירה רקע, מתייגת ומארגנת. פעם אחת ונגמר.",
    "how.step1.time": "15 דקות",
    "how.step2.title": "בוחרים פריטים",
    "how.step2.description": "בוחרים בגדים מהארון או נותנים לאפליקציה לבחור. אפשר לערבב, להתאים ולנסות שילובים חדשים.",
    "how.step2.time": "30 שניות",
    "how.step3.title": "רואים את הלוק עליכם",
    "how.step3.description": "האפליקציה מרכיבה לוק ומראה אותו על המודל שלכם. לא מתאים? מחליפים פריט בלחיצה. מושלם? שומרים ויוצאים.",
    "how.step3.time": "20 שניות",
    
    // About
    "about.subtitle": "למה בנינו את זה",
    "about.title": "יצרנו את מה שתמיד חלמנו שיהיה",
    "about.p1": "כולנו מכירים את זה: ארון מלא בבגדים, אבל כלום לא מרגיש נכון. עוד בוקר של להוציא הכל החוצה, לנסות, להתייאש, ולחזור לאותה חולצה משעממת. קניות אונליין שמגיעות ומאכזבות. בגדים עם תווית שאף פעם לא הורדנו.",
    "about.p2": "אז החלטנו לעשות משהו אחר. לא עוד אפליקציה שדוחפת לקנות עוד ועוד, אלא כזו שעוזרת לראות מה כבר יש - ואיך להפוך את זה ללוקים שגורמים להרגיש מדהים.",
    "about.p3": "המטרה שלנו פשוטה:",
    "about.p3.highlight": " שתצאו מהבית כל יום עם חיוך, בידיעה שאתם נראים בדיוק כמו שרציתם.",
    
    // Target Audience
    "target.subtitle": "נשמע מוכר?",
    "target.title": "FLAIR נבנתה בשבילך אם...",
    "target.1.title": "הזמן קצר",
    "target.1.desc": "20 דקות של התלבטות? אין את הזמן הזה.",
    "target.2.title": "הארון מלא אבל...",
    "target.2.desc": "תמיד מרגישים שאין מה ללבוש. יש, פשוט צריך לראות.",
    "target.3.title": "תקועים באותם בגדים",
    "target.3.desc": "אותם 5 פריטים, שוב ושוב. הגיע הזמן לגיוון.",
    "target.4.title": "רוצים סטייליסט",
    "target.4.desc": "אבל 500 שקל לשעה זה לא בתקציב.",
    "target.5.title": "אוהבים אופנה",
    "target.5.desc": "ורוצים להפיק את המקסימום מכל פריט בארון.",
    
    // FAQ
    "faq.subtitle": "שאלות נפוצות",
    "faq.title": "הנה התשובות",
    "faq.1.q": "מה בדיוק FLAIR עושה?",
    "faq.1.a": "בקצרה: מצלמים את הבגדים, יוצרים מודל דיגיטלי, ומקבלים לוקים מותאמים אישית תוך שניות. בלי לקנות כלום חדש.",
    "faq.2.q": "כמה זמן לוקח להעלות את כל הארון?",
    "faq.2.a": "ארון ממוצע - בערך 15 דקות. ולא חייבים בבת אחת. אפשר להתחיל עם הפריטים האהובים ולהוסיף עם הזמן. האפליקציה עובדת גם עם 10 פריטים בלבד.",
    "faq.3.q": "המודל באמת דומה לי?",
    "faq.3.a": "מאוד. חמש תמונות מספיקות ליצירת מודל שמשקף את הגוף, הפרופורציות והגובה. לא מושלם פיקסל-פיקסל, אבל מספיק כדי לראות איך לוק ייראה עליכם.",
    "faq.4.q": "מה עם הפרטיות?",
    "faq.4.a": "התמונות מוצפנות ומאוחסנות בצורה מאובטחת. אנחנו לא מוכרים מידע, לא משתפים עם צד שלישי, ולא משתמשים בתמונות לשום דבר מלבד האפליקציה.",
    "faq.5.q": "האפליקציה מבינה עברית?",
    "faq.5.a": "לגמרי. כותבים ״משהו נוח לעבודה מהבית״ או ״לוק לערב בחוץ״ והיא תבין בדיוק מה צריך. עברית טבעית, בלי תרגומים.",
    "faq.6.q": "ומה עם Android?",
    "faq.6.a": "עובדים על זה. כרגע iOS בלבד. השאירו מייל ונעדכן ברגע שנשיק.",
    
    // CTA
    "cta.subtitle": "מוכנים לשינוי?",
    "cta.title": "מחר בבוקר תדעו בדיוק מה ללבוש",
    "cta.description": "7 ימים בחינם. בלי כרטיס אשראי. בלי התחייבות. רק אתם, הארון שלכם, והסטייליסט האישי.",
    "cta.free": "7 ימים חינם",
    "cta.noCard": "ללא כרטיס אשראי",
    "cta.cancel": "ביטול בכל עת",
    
    // Footer
    "footer.tagline": "הסטייליסט האישי שלך.",
    "footer.tagline2": "לבחור מה ללבוש - בשניות.",
    "footer.app": "האפליקציה",
    "footer.company": "חברה",
    "footer.contact": "צרו קשר",
    "footer.terms": "תנאי שימוש",
    "footer.privacy": "מדיניות פרטיות",
    "footer.rights": "2026 FLAIR. כל הזכויות שמורות.",
  },
  en: {
    // Navigation
    "nav.howItWorks": "How It Works",
    "nav.features": "Features",
    "nav.about": "Our Story",
    "nav.faq": "FAQ",
    "nav.download": "Download Now",
    
    // Hero
    "hero.badge": "The World's Most Advanced Fashion App",
    "hero.title1": "Your Closet.",
    "hero.title2": "Our Stylist.",
    "hero.description": "Finally see everything you own, and know exactly what to wear.",
    "hero.descriptionHighlight": "The digital closet that brings order to your wardrobe.",
    "hero.downloadFree": "Download Free",
    "hero.appStore": "App Store",
    "hero.googlePlay": "Google Play",
    "hero.downloads": "+10K Downloads",
    "hero.rating": "Rating",
    "hero.lookReady": "Look Ready",
    "hero.seconds": "3 seconds",
    
    // Features
    "features.subtitle": "Everything in One Place",
    "features.title": "Three Tools. Zero Indecision.",
    "features.closet.title": "Digital Closet",
    "features.closet.description": "Snap once, see forever. Every item gets organized, tagged, and stored. Your closet - accessible anywhere, organized, always with you.",
    "features.model.title": "Your Model",
    "features.model.description": "Five photos and you have your digital model. See every look on your body before wearing it. Like a personal fitting room, anytime.",
    "features.ai.title": "Your Stylist",
    "features.ai.description": "Type \"meeting with client\" or \"day at home\" - get looks from your closet, matched to weather, event, and mood.",
    "features.screen.closet": "Your Closet",
    "features.screen.selection": "Item Selection",
    "features.screen.look": "Create a Look",
    "features.screen.result": "The Result",
    
    // How it works
    "how.subtitle": "Super Simple",
    "how.title": "From Packed Closet to Perfect Look",
    "how.step1.title": "Photograph Your Closet",
    "how.step1.description": "One photo per item. The app identifies, removes background, tags and organizes. Once and done.",
    "how.step1.time": "15 min",
    "how.step2.title": "Select Your Items",
    "how.step2.description": "Choose clothes from your closet or let the app choose for you. Mix, match, try new combinations.",
    "how.step2.time": "30 seconds",
    "how.step3.title": "See the Look on You",
    "how.step3.description": "The app creates a look and shows it on your model. Doesn't fit? Change an item with a tap. Perfect? Save and go.",
    "how.step3.time": "20 seconds",
    
    // About
    "about.subtitle": "Why We Built This",
    "about.title": "We built what we always wished existed",
    "about.p1": "We all know the feeling: a closet full of clothes, but nothing feels right. Another morning of pulling everything out, trying things on, giving up, and going back to that same boring shirt. Online shopping that arrives and disappoints. Clothes with tags we never took off.",
    "about.p2": "So we decided to do something different. Not another app pushing you to buy more and more. But one that helps you see what you already own - and how to turn it into looks that make you feel amazing.",
    "about.p3": "Our goal is simple:",
    "about.p3.highlight": " That you leave home every day with a smile, knowing you look exactly how you wanted.",
    
    // Target Audience
    "target.subtitle": "Sound Familiar?",
    "target.title": "FLAIR Was Built For You If...",
    "target.1.title": "Time is Short",
    "target.1.desc": "20 minutes of indecision? You don't have that kind of time.",
    "target.2.title": "Full Closet But...",
    "target.2.desc": "Always feel like there's nothing to wear. There is, you just need to see it.",
    "target.3.title": "Stuck in Same Outfits",
    "target.3.desc": "Same 5 items, over and over. Time for variety.",
    "target.4.title": "Want a Stylist",
    "target.4.desc": "But $150 an hour isn't in the budget.",
    "target.5.title": "Love Fashion",
    "target.5.desc": "And want to maximize every item in your closet.",
    
    // FAQ
    "faq.subtitle": "Common Questions",
    "faq.title": "Here Are The Answers",
    "faq.1.q": "What exactly does FLAIR do?",
    "faq.1.a": "In short: photograph your clothes, create a digital model of yourself, and get personalized looks in seconds. Without buying anything new.",
    "faq.2.q": "How long does it take to upload the whole closet?",
    "faq.2.a": "Average closet - about 15 minutes. And you don't have to do it all at once. Start with your favorite items, add over time. The app works with just 10 items.",
    "faq.3.q": "Does the model really look like me?",
    "faq.3.a": "Very much. Five photos are enough to create a model reflecting your body, proportions and height. Not pixel-perfect, but enough to see how a look will appear on you.",
    "faq.4.q": "What about privacy?",
    "faq.4.a": "Your photos are encrypted and stored securely. We don't sell data, don't share with third parties, and don't use your photos for anything except the app.",
    "faq.5.q": "Does the app understand English?",
    "faq.5.a": "Absolutely. Type \"something comfortable for work from home\" or \"look for a dinner date\" - it will understand exactly what you need. Natural language.",
    "faq.6.q": "What about Android?",
    "faq.6.a": "Working on it. Currently iOS only. Leave your email and we'll update you when we launch.",
    
    // CTA
    "cta.subtitle": "Ready For A Change?",
    "cta.title": "Tomorrow Morning You'll Know Exactly What To Wear",
    "cta.description": "7 days free. No credit card. No commitment. Just you, your closet, and your personal stylist.",
    "cta.free": "7 days free",
    "cta.noCard": "No credit card",
    "cta.cancel": "Cancel anytime",
    
    // Footer
    "footer.tagline": "Your Personal Stylist.",
    "footer.tagline2": "Decide what to wear - in seconds.",
    "footer.app": "The App",
    "footer.company": "Company",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "2026 FLAIR. All rights reserved.",
  },
};

// Language Provider Component
const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("he");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "he";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.style.fontFamily = isRTL 
      ? "'Heebo', -apple-system, BlinkMacSystemFont, sans-serif"
      : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Toggle Component
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "he" ? "en" : "he")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E4DF] text-sm font-medium text-[#1A1A1A] hover:bg-gray-50 transition-all duration-300"
      aria-label="Toggle language"
    >
      <span className={`transition-opacity ${language === "he" ? "opacity-100" : "opacity-40"}`}>עב</span>
      <span className="text-[#9C8270]">/</span>
      <span className={`transition-opacity ${language === "en" ? "opacity-100" : "opacity-40"}`}>EN</span>
    </button>
  );
};

// Scroll animation hook
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Animated section wrapper
const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-right" | "slide-left" | "scale-in";
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-solid" : "nav-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="FLAIR"
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link text-[15px] font-medium text-gray-700 hover:text-[#9C8270] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side: Language Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <a
              href="#download"
              className="flex items-center gap-2 bg-[#9C8270] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#7D6A5C] transition-all duration-300 hover:shadow-lg"
            >
              {t("nav.download")}
            </a>
          </div>

          {/* Mobile: Language Toggle + menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              className="p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-[#9C8270] transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#download"
            className="block w-full text-center bg-[#9C8270] text-white px-6 py-3 rounded-full font-medium mt-4"
          >
            {t("nav.download")}
          </a>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className={`flex-1 text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}>
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 bg-[#9C8270]/10 text-[#9C8270] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-[#9C8270] rounded-full"></span>
                {t("hero.badge")}
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1A1A] mb-6 leading-tight heading-font">
                {t("hero.title1")}
                <br />
                <span className="text-[#9C8270]">{t("hero.title2")}</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <p className={`text-lg lg:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed ${isRTL ? "mx-auto lg:mx-0" : "mx-auto lg:mx-0"}`}>
                {t("hero.description")}
                <span className="block mt-2 text-[#1A1A1A] font-medium">{t("hero.descriptionHighlight")}</span>
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={300}>
              <div className={`flex flex-col items-center gap-5 justify-center ${isRTL ? "lg:items-start" : "lg:items-start"}`}>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#download"
                    className="store-btn store-btn-dark"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <div className="text-[10px] opacity-70 leading-tight">{t("hero.downloadFree")}</div>
                      <div className="text-sm font-semibold leading-tight">{t("hero.appStore")}</div>
                    </div>
                  </a>
                  <a
                    href="#download"
                    className="store-btn store-btn-dark"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.11L13.69,12L3.84,21.89C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <div className="text-[10px] opacity-70 leading-tight">{t("hero.downloadFree")}</div>
                      <div className="text-sm font-semibold leading-tight">{t("hero.googlePlay")}</div>
                    </div>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="scale-in" delay={200} className="flex-1 flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              {/* Main Phone */}
              <div className="w-56 sm:w-64 lg:w-72 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-1.5 sm:p-2 phone-shadow">
                <div className="bg-[#1A1A1A] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-5 sm:h-7 bg-black rounded-b-xl sm:rounded-b-2xl z-10"></div>
                  {/* Screen Content - App Screenshot */}
                  <img 
                    src="/screen-result.jpeg" 
                    alt="FLAIR"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection = () => {
  const { t } = useLanguage();
  const [activeReview, setActiveReview] = useState(0);
  
  const reviews = [
    { text: t("reviews.1"), author: t("reviews.1.author"), image: "/user1.jpg" },
    { text: t("reviews.2"), author: t("reviews.2.author"), image: "/user2.jpg" },
    { text: t("reviews.3"), author: t("reviews.3.author"), image: "/user3.jpg" },
    { text: t("reviews.4"), author: t("reviews.4.author"), image: "/user4.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="py-20 bg-[#9C8270]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection animation="fade-up">
          <div className="flex gap-1 justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          
          <p className="text-2xl lg:text-3xl text-white/95 mb-6 leading-relaxed heading-font">
            &ldquo;{reviews[activeReview].text}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src={reviews[activeReview].image}
              alt={reviews[activeReview].author}
              className="w-12 h-12 rounded-full border-2 border-white/30 object-cover shadow-lg"
            />
            <p className="text-white/70 font-medium">{reviews[activeReview].author}</p>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeReview ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      title: t("features.closet.title"),
      description: t("features.closet.description"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      title: t("features.model.title"),
      description: t("features.model.description"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
      title: t("features.ai.title"),
      description: t("features.ai.description"),
    },
  ];

  const screens = [
    { src: "/screen-closet.jpeg", label: t("features.screen.closet") },
    { src: "/screen-selection.jpeg", label: t("features.screen.selection") },
    { src: "/screen-look.jpeg", label: t("features.screen.look") },
    { src: "/screen-result.jpeg", label: t("features.screen.result") },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <p className="text-[#9C8270] font-semibold text-sm mb-3 tracking-wide">{t("features.subtitle")}</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-[#1A1A1A] heading-font">
            {t("features.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="feature-card bg-white rounded-3xl p-8 h-full border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-[#9C8270]/10 flex items-center justify-center text-[#9C8270] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* App Screenshots Row */}
        <AnimatedSection animation="fade-up" delay={400} className="mt-16">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {screens.map((screen, index) => (
              <div key={index} className="text-center">
                <div className="w-32 lg:w-40 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-1.5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="rounded-xl overflow-hidden aspect-[9/19]">
                    <img 
                      src={screen.src} 
                      alt={screen.label}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3 font-medium">{screen.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const { t, isRTL } = useLanguage();
  
  const steps = [
    {
      number: "01",
      title: t("how.step1.title"),
      description: t("how.step1.description"),
      time: t("how.step1.time"),
      image: "/screen-closet.jpeg",
    },
    {
      number: "02",
      title: t("how.step2.title"),
      description: t("how.step2.description"),
      time: t("how.step2.time"),
      image: "/screen-selection.jpeg",
    },
    {
      number: "03",
      title: t("how.step3.title"),
      description: t("how.step3.description"),
      time: t("how.step3.time"),
      image: "/screen-result.jpeg",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <p className="text-[#9C8270] font-semibold text-sm mb-3 tracking-wide">{t("how.subtitle")}</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-[#1A1A1A] heading-font">
            {t("how.title")}
          </h2>
        </AnimatedSection>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <AnimatedSection
              key={step.number}
              animation={index % 2 === 0 ? "slide-right" : "slide-left"}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-light text-[#9C8270]/50 heading-font">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#1A1A1A]">{step.title}</h3>
                      <span className="text-sm text-[#9C8270] font-medium">{step.time}</span>
                    </div>
                  </div>
                  <p className={`text-gray-600 text-lg leading-relaxed ${isRTL ? "lg:pr-12" : "lg:pl-12"}`}>{step.description}</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-56 lg:w-64 rounded-[2.5rem] bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-2 shadow-2xl">
                    <div className="rounded-[2rem] overflow-hidden aspect-[9/19.5] relative bg-[#1A1A1A]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10"></div>
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection animation="fade-up">
          <p className="text-[#9C8270] font-semibold text-sm mb-3 tracking-wide">{t("about.subtitle")}</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-[#1A1A1A] mb-8 heading-font">
            {t("about.title")}
          </h2>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={100}>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {t("about.p1")}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {t("about.p2")}
          </p>
          <p className="text-xl text-[#1A1A1A] font-medium leading-relaxed">
            {t("about.p3")}
            <span className="text-[#9C8270]">{t("about.p3.highlight")}</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Target Audience Section
const TargetAudienceSection = () => {
  const { t } = useLanguage();
  
  const audiences = [
    { emoji: "01", title: t("target.1.title"), desc: t("target.1.desc") },
    { emoji: "02", title: t("target.2.title"), desc: t("target.2.desc") },
    { emoji: "03", title: t("target.3.title"), desc: t("target.3.desc") },
    { emoji: "04", title: t("target.4.title"), desc: t("target.4.desc") },
    { emoji: "05", title: t("target.5.title"), desc: t("target.5.desc") },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <p className="text-[#9C8270] font-semibold text-sm mb-3 tracking-wide">{t("target.subtitle")}</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-[#1A1A1A] heading-font">
            {t("target.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {audiences.map((item, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 80}>
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <span className="text-3xl font-light text-[#9C8270]/30 mb-3 block heading-font">{item.emoji}</span>
                <h4 className="font-semibold text-[#1A1A1A] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    { question: t("faq.1.q"), answer: t("faq.1.a") },
    { question: t("faq.2.q"), answer: t("faq.2.a") },
    { question: t("faq.3.q"), answer: t("faq.3.a") },
    { question: t("faq.4.q"), answer: t("faq.4.a") },
    { question: t("faq.5.q"), answer: t("faq.5.a") },
    { question: t("faq.6.q"), answer: t("faq.6.a") },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <p className="text-[#9C8270] font-semibold text-sm mb-3 tracking-wide">{t("faq.subtitle")}</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-[#1A1A1A] heading-font">
            {t("faq.title")}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <div className="bg-white rounded-3xl overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#1A1A1A]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#9C8270] transition-transform duration-300 flex-shrink-0 mx-4 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-8 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section id="download" className="py-24 bg-[#9C8270]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection animation="fade-up">
          <p className="text-white/70 text-sm font-medium mb-4 tracking-wide">{t("cta.subtitle")}</p>
          <h2 className="text-3xl lg:text-5xl font-medium text-white mb-6 heading-font">
            {t("cta.title")}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <a
              href="#"
              className="store-btn store-btn-light"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-[10px] opacity-50 leading-tight">{t("hero.downloadFree")}</div>
                <div className="text-sm font-semibold leading-tight">{t("hero.appStore")}</div>
              </div>
            </a>
            <a
              href="#"
              className="store-btn store-btn-light"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.11L13.69,12L3.84,21.89C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-[10px] opacity-50 leading-tight">{t("hero.downloadFree")}</div>
                <div className="text-sm font-semibold leading-tight">{t("hero.googlePlay")}</div>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm flex-wrap">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {t("cta.free")}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {t("cta.noCard")}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {t("cta.cancel")}
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <img
              src="/logo.jpg"
              alt="FLAIR"
              className="h-14 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              {t("footer.tagline")}
              <br />
              {t("footer.tagline2")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.app")}</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("nav.features")}</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("nav.howItWorks")}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("nav.faq")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("nav.about")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("footer.terms")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">{t("footer.privacy")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hello@flairapp.com" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">hello@flairapp.com</a></li>
              <li><a href="mailto:support@flairapp.com" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">support@flairapp.com</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#9C8270] transition-colors text-sm">@flair.app</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">{t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AboutSection />
        <TargetAudienceSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
