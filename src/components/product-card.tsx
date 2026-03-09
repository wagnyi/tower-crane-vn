'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/context';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();

  const conditionColors = {
    excellent: 'bg-green-500',
    good: 'bg-blue-500',
    fair: 'bg-yellow-500',
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'VND') {
      return `${(price / 1000000).toFixed(0)} triệu VND`;
    } else if (currency === 'USD') {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `¥${(price / 10000).toFixed(0)}万`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.model}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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

      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">
            {product.brand} {product.model}
          </h3>
          <p className="text-sm text-muted-foreground">{product.location}</p>
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
            {formatPrice(product.price, product.currency)}
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
