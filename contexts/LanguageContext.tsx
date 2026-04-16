import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

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
    brandName: 'FixTime',
    home: 'Home',
    workers: 'Workers',
    promotions: 'Promotions',
    notifications: 'Notifications',
    orders: 'Orders',
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
    placeOrder: 'Place Order',
    placeOrderComingSoon: 'This page is ready and waiting for us to build it next.',
    placeOrderSubtitle:
      'Choose a service, add your location, and send the request in a few steps.',
    placeOrderValidation:
      'Please choose a category and add an address before confirming.',
    placeOrderAddressValidation: 'Please add an address before confirming.',
    placeOrderSuccessTitle: 'Order sent',
    placeOrderSuccessMessage: 'Your order has been saved successfully.',
    placeOrderErrorMessage: 'Something went wrong while saving your order.',
    placeOrderAddAddress: 'Add your address',
    placeOrderAddDetails: 'Add order details',
    placeOrderEditDetails: 'Edit order details',
    placeOrderAddPhoto: 'Add a photo',
    placeOrderEditPhoto: 'Change photo',
    placeOrderConfirm: 'Confirm order',
    placeOrderLocationTitle: 'Order location',
    placeOrderLocationPlaceholder: 'Search or write your address',
    placeOrderNoLocationResults:
      'Type at least 3 letters to search, or save the written address.',
    placeOrderDetailsTitle: 'Order details',
    placeOrderDetailsPlaceholder:
      'Describe what you need, the issue, or any notes for the worker.',
    placeOrderCameraPermission: 'Camera permission is required to take a photo.',
    placeOrderChooseGallery: 'Choose from gallery',
    placeOrderTakePhoto: 'Take a photo',
    placeOrderMapHelper:
      'Real map centered on Nablus, Palestine. Tap the map to choose the exact order location.',
    placeOrderMapSelected: 'Selected location',
    placeOrderMapResolving: 'Resolving the selected map point...',
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
    active: 'Active',
    completed: 'Completed',
    trackOrders: 'Track your current and completed requests.',
    noOrders: 'No orders found',
    ordersAppearHere: 'Your requests will appear here.',
    inProgress: 'In Progress',
    confirmed: 'Confirmed',
    orderHomeDeepCleaning: 'Home deep cleaning',
    orderHomeDeepCleaningSubtitle: 'Scheduled with a cleaner for today',
    orderKitchenPlumbingRepair: 'Kitchen plumbing repair',
    orderKitchenPlumbingRepairSubtitle: 'Worker is on the way to your location',
    orderAcMaintenance: 'AC maintenance',
    orderAcMaintenanceSubtitle: 'Service completed and payment received',
    orderTimeToday: 'Today, 2:30 PM',
    orderTimeTomorrow: 'Tomorrow, 11:00 AM',
    orderTimeCompleted: 'Apr 10, 4:15 PM',
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
    category: 'Category',
    chooseCategory: 'Choose category',
    noCategorySelected: 'No category selected yet',
    save: 'Save',
    done: 'Done',
    errorTitle: 'Error',
    searching: 'Searching...',
  },
  ar: {
    brandName: 'فيكس تايم',
    home: 'الرئيسية',
    workers: 'العمال',
    promotions: 'العروض',
    notifications: 'الإشعارات',
    orders: 'الطلبات',
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
    placeOrder: 'إضافة طلب',
    placeOrderComingSoon: 'هذه الصفحة جاهزة وموجودة لنكمل العمل عليها لاحقًا.',
    placeOrderSubtitle: 'اختر الخدمة، أضف الموقع، وأرسل الطلب بخطوات بسيطة.',
    placeOrderValidation: 'يرجى اختيار تصنيف وإضافة عنوان قبل تأكيد الطلب.',
    placeOrderAddressValidation: 'يرجى إضافة عنوان قبل تأكيد الطلب.',
    placeOrderSuccessTitle: 'تم إرسال الطلب',
    placeOrderSuccessMessage: 'تم حفظ طلبك بنجاح.',
    placeOrderErrorMessage: 'حدث خطأ أثناء حفظ الطلب.',
    placeOrderAddAddress: 'أضف عنوانك',
    placeOrderAddDetails: 'أضف تفاصيل الطلب',
    placeOrderEditDetails: 'تعديل تفاصيل الطلب',
    placeOrderAddPhoto: 'أضف صورة',
    placeOrderEditPhoto: 'تغيير الصورة',
    placeOrderConfirm: 'تأكيد الطلب',
    placeOrderLocationTitle: 'موقع الطلب',
    placeOrderLocationPlaceholder: 'ابحث أو اكتب عنوانك',
    placeOrderNoLocationResults:
      'اكتب 3 أحرف على الأقل للبحث، أو احفظ العنوان المكتوب.',
    placeOrderDetailsTitle: 'تفاصيل الطلب',
    placeOrderDetailsPlaceholder:
      'اكتب ما تحتاجه، أو شرحًا للمشكلة، أو أي ملاحظات للعامل.',
    placeOrderCameraPermission: 'نحتاج إذن الكاميرا لالتقاط صورة.',
    placeOrderChooseGallery: 'اختر من المعرض',
    placeOrderTakePhoto: 'التقط صورة',
    placeOrderMapHelper:
      'خريطة حقيقية متمركزة على نابلس، فلسطين. اضغط على الخريطة لتحديد موقع الطلب بدقة.',
    placeOrderMapSelected: 'الموقع المحدد',
    placeOrderMapResolving: 'جارٍ تحديد عنوان النقطة المختارة...',
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
    active: 'النشطة',
    completed: 'المكتملة',
    trackOrders: 'تابع طلباتك الحالية والمكتملة.',
    noOrders: 'لا توجد طلبات',
    ordersAppearHere: 'ستظهر طلباتك هنا.',
    inProgress: 'قيد التنفيذ',
    confirmed: 'مؤكد',
    orderHomeDeepCleaning: 'تنظيف منزلي عميق',
    orderHomeDeepCleaningSubtitle: 'تم جدولة عامل تنظيف لهذا اليوم',
    orderKitchenPlumbingRepair: 'إصلاح سباكة المطبخ',
    orderKitchenPlumbingRepairSubtitle: 'العامل في الطريق إلى موقعك',
    orderAcMaintenance: 'صيانة المكيف',
    orderAcMaintenanceSubtitle: 'اكتملت الخدمة وتم استلام الدفع',
    orderTimeToday: 'اليوم، 2:30 م',
    orderTimeTomorrow: 'غدًا، 11:00 ص',
    orderTimeCompleted: '10 أبريل، 4:15 م',
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
    category: 'التصنيف',
    chooseCategory: 'اختر التصنيف',
    noCategorySelected: 'لم يتم اختيار تصنيف بعد',
    save: 'حفظ',
    done: 'تم',
    errorTitle: 'خطأ',
    searching: 'جاري البحث...',
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

    void loadLanguage();
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
