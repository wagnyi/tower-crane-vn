'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

// 地点多语言映射
const locationTranslations: Record<string, { vi: string; en: string; zh: string }> = {
  'Hà Nội': { vi: 'Hà Nội', en: 'Hanoi', zh: '河内' },
  'TP. Hồ Chí Minh': { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City', zh: '胡志明市' },
  'Đà Nẵng': { vi: 'Đà Nẵng', en: 'Da Nang', zh: '岘港' },
};

export function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();

  const conditionColors = {
    excellent: 'bg-green-500',
    good: 'bg-blue-500',
    fair: 'bg-yellow-500',
  };

  const formatPrice = (price: number, currency: string, lang: string) => {
    if (lang === 'vi') {
      return `${(price / 1000000).toFixed(0)} triệu VND`;
    } else if (lang === 'en') {
      const usdPrice = Math.round(price / 24000); // 大概汇率
      return `$${usdPrice.toLocaleString()}`;
    } else {
      const cnyPrice = Math.round(price / 3300); // 大概汇率
      return `¥${cnyPrice.toLocaleString()}`;
    }
  };

  // 获取翻译后的地点
  const getLocation = (location: string, lang: string) => {
    const translations = locationTranslations[location];
    if (translations) {
      return translations[lang as keyof typeof translations] || location;
    }
    return location;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image - 可点击跳转到详情页 */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer">
          <img
            src={product.images[0]}
            alt={product.model}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=450&fit=crop&auto=format';
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={conditionColors[product.condition]}>
              {t(`condition.${product.condition}` as any)}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary">{product.year}</Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">
            {product.brand} {product.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getLocation(product.location, language)}
          </p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{t('products.capacity')}:</span>
            <span className="font-medium">{product.capacity} {t('common.ton')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{t('products.height')}:</span>
            <span className="font-medium">{product.height} {t('common.meter')}</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t">
          <div className="text-xl font-bold text-primary">
            {formatPrice(product.price, product.currency, language)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            {t('products.details')}
          </Button>
        </Link>
        <Link href={`/contact?product=${product.id}`} className="flex-1">
          <Button className="w-full">
            {t('products.inquire')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
