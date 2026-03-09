'use client';

import { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const conditionColors = {
    excellent: 'bg-green-500',
    good: 'bg-blue-500',
    fair: 'bg-yellow-500',
  };

  const formatPrice = (price: number, currency: string, lang: string) => {
    if (lang === 'vi') {
      return `${(price / 1000000).toFixed(0)} triệu VND`;
    } else if (lang === 'en') {
      const usdPrice = Math.round(price / 24000);
      return `$${usdPrice.toLocaleString()}`;
    } else {
      const cnyPrice = Math.round(price / 3300);
      return `¥${cnyPrice.toLocaleString()}`;
    }
  };

  // 地点多语言映射
  const locationTranslations: Record<string, { vi: string; en: string; zh: string }> = {
    'Hà Nội': { vi: 'Hà Nội', en: 'Hanoi', zh: '河内' },
    'TP. Hồ Chí Minh': { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City', zh: '胡志明市' },
    'Đà Nẵng': { vi: 'Đà Nẵng', en: 'Da Nang', zh: '岘港' },
  };

  const getLocation = (location: string, lang: string) => {
    const translations = locationTranslations[location];
    if (translations) {
      return translations[lang as keyof typeof translations] || location;
    }
    return location;
  };

  return (
    <div className="container px-4 py-8">
      {/* Back Button */}
      <Link href="/products">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t('product.back')}
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg border">
            <img
              src={product.images[0]}
              alt={product.model}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={conditionColors[product.condition]}>
                {t(`condition.${product.condition}` as any)}
              </Badge>
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg border cursor-pointer hover:border-primary"
              >
                <img
                  src={img}
                  alt={`${product.model} ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product.brand} {product.model}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{getLocation(product.location, language)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{product.year}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-muted/30 p-6 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t('product.price_label')}</div>
            <div className="text-4xl font-bold text-primary">
              {formatPrice(product.price, product.currency, language)}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">{t('product.description')}</h3>
            <p className="text-muted-foreground">
              {product.description[language]}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">{t('product.features')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.features[language].map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link href={`/contact?product=${product.id}`} className="flex-1">
              <Button size="lg" className="w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                {t('products.inquire')}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              {t('product.call_now')}
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('products.specifications')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">{t('product.max_load')}</div>
              <div className="text-xl font-semibold">{product.specifications.maxLoad} {t('common.ton')}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('product.max_radius')}</div>
              <div className="text-xl font-semibold">{product.specifications.maxRadius} {t('common.meter')}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('product.tip_load')}</div>
              <div className="text-xl font-semibold">{product.specifications.tipLoad} {t('common.ton')}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('product.jib_length')}</div>
              <div className="text-xl font-semibold">{product.specifications.jibLength} {t('common.meter')}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t('product.mast_height')}</div>
              <div className="text-xl font-semibold">{product.specifications.mastHeight} {t('common.meter')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
