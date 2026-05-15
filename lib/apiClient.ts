import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
});

export type PromoPost = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

export async function getPromoPosts(): Promise<PromoPost[]> {
  const response = await apiClient.get('/posts');

  return response.data.slice(0, 5).map((item: any, index: number) => ({
    id: item.id.toString(),
    title: [
      '20% off cleaning services',
      'Free inspection for plumbing',
      'Electrical repair discount',
      'Weekend maintenance offer',
      'Special home repair deal',
    ][index],
    description: [
      'Book a cleaning worker today and get a special discount.',
      'Get your plumbing issue checked before starting the repair.',
      'Save money on electrical maintenance and quick fixes.',
      'Available workers are ready for weekend home services.',
      'Choose a nearby worker and enjoy a limited repair offer.',
    ][index],
    tag: 'Promo',
  }));
}