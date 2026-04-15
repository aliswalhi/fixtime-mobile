import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: typeof translations.en;
  isRTL: boolean;
};

const LANGUAGE_KEY = 'app_language';

const translations = {
  en: {
    home: 'Home',
    workers: 'Workers',
    promotions: 'Promotions',
    notifications: 'Notifications',
    menu: 'Menu',
    workerList: 'Worker List',
    findNearbyWorkers: 'Find nearby trusted service providers',
    searchWorker: 'Search worker or service...',
    searchHire: 'I want to hire a...',
    services: 'Services',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    myProfile: 'My Profile',
    contactUs: 'Contact Us',
    becomeWorker: 'Become a Worker',
    logout: 'Logout',
    moreInfo: 'More Info',
    available: 'Available',
    busy: 'Busy',
    rateWorker: 'Rate this worker:',
    yourRating: 'Your rating:',
    noWorkers: 'No workers found',
    tryAnother: 'Try another search or category',
    service: 'Service',
    workingHours: 'Working Hours',
    phone: 'Phone',
    email: 'Email',
    description: 'Description',
    notAvailable: 'Not available',
    noDescription: 'No description',
    chooseLanguage: 'Choose Language',
    electricalRepair: 'Electrical repair expert',
    all: 'All',
    electrician: 'Electrician',
    plumber: 'Plumber',
    mechanic: 'Mechanic',
    carpenter: 'Carpenter',
    cleaning: 'Cleaning',
    plumbing: 'Plumbing',
    repairing: 'Repairing',
    painting: 'Painting',
    acRepair: 'AC Repair',
    moreServices: 'More Services',
    notificationAccepted: 'Order Accepted',
    notificationConfirmed: 'Confirm Order',
    notificationAssigned: 'Order Assigned',
    notificationCompleted: 'Order Completed',
    notificationCancelled: 'Order Cancelled',
    messageAccepted: 'Your order has been accepted',
    messageConfirmed: 'Your order is now confirmed',
    messageAssigned: 'A worker has been assigned to your request',
    messageCompleted: 'Your service has been completed successfully',
    messageCancelled: 'Your order has been cancelled',
  },
  ar: {
    home: 'الرئيسية',
    workers: 'العمال',
    promotions: 'العروض',
    notifications: 'الإشعارات',
    menu: 'القائمة',
    workerList: 'قائمة العمال',
    findNearbyWorkers: 'ابحث عن عمّال موثوقين قريبين منك',
    searchWorker: 'ابحث عن عامل أو خدمة...',
    searchHire: 'ما الخدمة التي تريدها؟',
    services: 'الخدمات',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    myProfile: 'ملفي الشخصي',
    contactUs: 'اتصل بنا',
    becomeWorker: 'سجل كعامل',
    logout: 'تسجيل الخروج',
    moreInfo: 'معلومات أكثر',
    available: 'متاح',
    busy: 'مشغول',
    rateWorker: 'قيّم هذا العامل:',
    yourRating: 'تقييمك:',
    noWorkers: 'لا يوجد عمال',
    tryAnother: 'جرّب بحثًا أو تصنيفًا آخر',
    service: 'الخدمة',
    workingHours: 'ساعات العمل',
    phone: 'الهاتف',
    email: 'البريد',
    description: 'الوصف',
    notAvailable: 'غير متوفر',
    noDescription: 'لا يوجد وصف',
    chooseLanguage: 'اختر اللغة',
    electricalRepair: 'خبير في الصيانة الكهربائية',
    all: 'الكل',
    electrician: 'كهربائي',
    plumber: 'سباك',
    mechanic: 'ميكانيكي',
    carpenter: 'نجّار',
    cleaning: 'تنظيف',
    plumbing: 'سباكة',
    repairing: 'تصليح',
    painting: 'دهان',
    acRepair: 'تصليح التكييف',
    moreServices: 'خدمات أكثر',
    notificationAccepted: 'تم قبول الطلب',
    notificationConfirmed: 'تأكيد الطلب',
    notificationAssigned: 'تم تعيين عامل',
    notificationCompleted: 'اكتمل الطلب',
    notificationCancelled: 'تم إلغاء الطلب',
    messageAccepted: 'تم قبول طلبك',
    messageConfirmed: 'تم تأكيد طلبك',
    messageAssigned: 'تم تعيين عامل لطلبك',
    messageCompleted: 'تم إكمال الخدمة بنجاح',
    messageCancelled: 'تم إلغاء طلبك',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved === 'en' || saved === 'ar') {
        setLanguageState(saved);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      isRTL: language === 'ar',
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}