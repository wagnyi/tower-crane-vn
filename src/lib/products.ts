import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    model: 'QTZ63',
    brand: 'Zoomlion',
    capacity: 6,
    height: 40,
    year: 2019,
    condition: 'excellent',
    price: 1850000000,
    currency: 'VND',
    location: 'Hà Nội',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 50,
      maxLoad: 6,
      tipLoad: 1.0,
      jibLength: 50,
      mastHeight: 40,
    },
    description: {
      vi: 'Cần trục tháp Zoomlion QTZ63, tình trạng xuất sắc, đã bảo dưỡng đầy đủ. Phù hợp cho các công trình xây dựng tầm trung.',
      en: 'Zoomlion QTZ63 tower crane in excellent condition, fully maintained. Suitable for medium-scale construction projects.',
      zh: '中联重科QTZ63塔吊，状态优秀，保养完善。适用于中型建筑工程项目。',
    },
    features: [
      'Biến tần điều khiển',
      'Hệ thống an toàn hiện đại',
      'Khởi động mềm',
      'Cân bằng tự động',
    ],
  },
  {
    id: '2',
    model: 'TC6013',
    brand: 'XCMG',
    capacity: 6,
    height: 45,
    year: 2018,
    condition: 'good',
    price: 1650000000,
    currency: 'VND',
    location: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 60,
      maxLoad: 6,
      tipLoad: 1.3,
      jibLength: 60,
      mastHeight: 45,
    },
    description: {
      vi: 'Cần trục tháp XCMG TC6013, tình trạng tốt, hoạt động ổn định. Đã kiểm định an toàn đầy đủ.',
      en: 'XCMG TC6013 tower crane in good condition, stable operation. Fully safety inspected.',
      zh: '徐工TC6013塔吊，状态良好，运行稳定。安全检测完善。',
    },
    features: [
      'Thanh chống cánh tay',
      'Hệ thống chống va đập',
      'Điều khiển từ xa',
      'Khóa an toàn',
    ],
  },
  {
    id: '3',
    model: 'QTZ80',
    brand: 'SANY',
    capacity: 8,
    height: 50,
    year: 2020,
    condition: 'excellent',
    price: 2200000000,
    currency: 'VND',
    location: 'Hà Nội',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 55,
      maxLoad: 8,
      tipLoad: 1.5,
      jibLength: 55,
      mastHeight: 50,
    },
    description: {
      vi: 'Cần trục tháp SANY QTZ80, đời mới nhất, tình trạng xuất sắc. Phù hợp cho các công trình cao tầng.',
      en: 'SANY QTZ80 tower crane, latest model in excellent condition. Suitable for high-rise construction.',
      zh: '三一重工QTZ80塔吊，最新型号，状态优秀。适用于高层建筑工程。',
    },
    features: [
      'Công nghệ kiểm soát thông minh',
      'Hệ thống giám sát tải trọng',
      'Chống gió tự động',
      'Màn hình cảm ứng',
    ],
  },
  {
    id: '4',
    model: 'QTZ40',
    brand: 'Zoomlion',
    capacity: 4,
    height: 35,
    year: 2017,
    condition: 'fair',
    price: 1200000000,
    currency: 'VND',
    location: 'Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 45,
      maxLoad: 4,
      tipLoad: 0.8,
      jibLength: 45,
      mastHeight: 35,
    },
    description: {
      vi: 'Cần trục tháp Zoomlion QTZ40, tình trạng khá, giá thành hợp lý. Phù hợp cho công trình nhỏ.',
      en: 'Zoomlion QTZ40 tower crane in fair condition, reasonable price. Suitable for small projects.',
      zh: '中联重科QTZ40塔吊，状态一般，价格合理。适用于小型工程项目。',
    },
    features: [
      'Khởi động trực tiếp',
      'Hệ thống an toàn tiêu chuẩn',
      'Dễ vận hành',
      'Tiết kiệm năng lượng',
    ],
  },
  {
    id: '5',
    model: 'TC5610',
    brand: 'XCMG',
    capacity: 6,
    height: 42,
    year: 2019,
    condition: 'good',
    price: 1750000000,
    currency: 'VND',
    location: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 56,
      maxLoad: 6,
      tipLoad: 1.0,
      jibLength: 56,
      mastHeight: 42,
    },
    description: {
      vi: 'Cần trục tháp XCMG TC5610, tình trạng tốt, hiệu suất cao. Đã bảo trì định kỳ.',
      en: 'XCMG TC5610 tower crane in good condition with high performance. Regularly maintained.',
      zh: '徐工TC5610塔吊，状态良好，性能优异。定期保养。',
    },
    features: [
      'Biến tần tiết kiệm điện',
      'Hệ thống giới hạn mô-men xoắn',
      'Cảnh báo quá tải',
      'Điều khiển tinh vi',
    ],
  },
  {
    id: '6',
    model: 'QTZ125',
    brand: 'SANY',
    capacity: 10,
    height: 55,
    year: 2021,
    condition: 'excellent',
    price: 2800000000,
    currency: 'VND',
    location: 'Hà Nội',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    ],
    specifications: {
      maxRadius: 60,
      maxLoad: 10,
      tipLoad: 2.0,
      jibLength: 60,
      mastHeight: 55,
    },
    description: {
      vi: 'Cần trục tháp SANY QTZ125, công suất lớn, tình trạng xuất sắc. Dành cho các công trình lớn.',
      en: 'SANY QTZ125 tower crane with large capacity in excellent condition. For large-scale projects.',
      zh: '三一重工QTZ125塔吊，大功率，状态优秀。适用于大型工程项目。',
    },
    features: [
      'Công nghệ kiểm soát thông minh',
      'Hệ thống giám sát tải trọng',
      'Chống vặn cánh tay',
      'An toàn tối đa',
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCondition(condition: Product['condition']): Product[] {
  return products.filter((p) => p.condition === condition);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}
