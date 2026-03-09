'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Shield, Award } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-3.5 w-3.5" />
              Chất lượng đảm bảo
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  {t('hero.learn_more')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">{t('about.experience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">{t('about.customers')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">{t('about.products_sold')}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:ml-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Tower Crane"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-background border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Chứng nhận</div>
                  <div className="text-xs text-muted-foreground">ISO 9001:2015</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-background border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Bảo hành</div>
                  <div className="text-xs text-muted-foreground">12 tháng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
