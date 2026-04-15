import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export type Worker = {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  available: boolean;
  pricePerHour: number;
  workingHours: string;
  phone?: string;
  email?: string;
  description?: string;
  country?: string;
};

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  color: string;
};

export type PromotionItem = {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagBg: string;
  tagColor: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  icon: string;
};

export const getWorkers = async (): Promise<Worker[]> => {
  const snapshot = await getDocs(collection(db, 'workers'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.fullName || 'Unknown Worker',
      service: data.workType || 'General Service',
      rating: typeof data.rating === 'number' ? data.rating : 4.5,
      reviewsCount: typeof data.reviewsCount === 'number' ? data.reviewsCount : 0,
      distance: data.country || 'N/A',
      available: typeof data.available === 'boolean' ? data.available : true,
      pricePerHour: typeof data.pricePerHour === 'number' ? data.pricePerHour : 15,
      workingHours:
        data.fromHour && data.toHour
          ? `${data.fromHour} - ${data.toHour}`
          : 'Not specified',
      phone: data.phone || '',
      email: data.email || '',
      description: data.description || '',
      country: data.country || '',
    };
  });
};

export const getNotifications = async (): Promise<AppNotification[]> => {
  const snapshot = await getDocs(collection(db, 'notifications'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || 'Notification',
      message: data.message || '',
      color: data.color || '#3B82F6',
    };
  });
};

export const getPromotions = async (): Promise<PromotionItem[]> => {
  const snapshot = await getDocs(collection(db, 'promotions'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || 'Promotion',
      description: data.description || '',
      tag: data.tag || 'Active',
      tagBg: data.tagBg || '#EAF8EE',
      tagColor: data.tagColor || '#22A45D',
    };
  });
};

export const getServices = async (): Promise<ServiceItem[]> => {
  const snapshot = await getDocs(collection(db, 'services'));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || 'Service',
      icon: data.icon || 'more',
    };
  });
};