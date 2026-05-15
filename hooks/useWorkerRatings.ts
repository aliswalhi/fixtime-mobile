import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type RatingsMap = Record<string, number>;

const STORAGE_KEY = 'worker_ratings';

export function useWorkerRatings() {
  const [ratings, setRatings] = useState<RatingsMap>({});

  useEffect(() => {
    const loadRatings = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        setRatings(JSON.parse(saved));
      }
    };

    loadRatings();
  }, []);

  const rateWorker = async (workerId: string, rating: number) => {
    const updatedRatings = {
      ...ratings,
      [workerId]: rating,
    };

    setRatings(updatedRatings);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));
  };

  return { ratings, rateWorker };
}