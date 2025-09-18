export interface Category {
  id: string;
  name: string;
  nameEn: string;
}

export const categories: Category[] = [
  { id: 'all', name: '전체', nameEn: 'All' },
  { id: 'coffee', name: '커피', nameEn: 'Coffee' },
  { id: 'tea', name: '차', nameEn: 'Tea' },
  { id: 'juice', name: '주스', nameEn: 'Juice' },
  { id: 'ade', name: '에이드', nameEn: 'Ade' },
  { id: 'dessert', name: '디저트', nameEn: 'Dessert' }
];

