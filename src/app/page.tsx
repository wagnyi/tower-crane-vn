'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { products } from '@/lib/products';
import { Hero } from '@/components/hero';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Shield, Headphones, Award } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const featuredProducts = products.slice(0, 6);

  const features = [
    {
      icon: Truck,
      titleKey: 'features.delivery.title',
      descKey: 'features.delivery.desc',
    },
    {
      icon: Shield,
      titleKey: 'features.warranty.title',
      descKey: 'features.warranty.desc',
    },
    {
      icon: Headphones,
      titleKey: 'features.support.title',
      descKey: 'features.support.desc',
    },
    {
      icon: Award,
      titleKey: 'features.quality.title',
      descKey: 'features.quality.desc',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t(feature.titleKey as any)}</h3>
                <p className="text-sm text-muted-foreground">{t(feature.descKey as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">{t('products.title')}</h2>
              <p className="text-muted-foreground mt-2">
                {t('products.subtitle')}
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                {t('products.view_all')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              {t('cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
