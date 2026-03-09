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
      title: 'Giao hàng toàn quốc',
      description: 'Hỗ trợ vận chuyển đến mọi tỉnh thành Việt Nam',
    },
    {
      icon: Shield,
      title: 'Bảo hành 12 tháng',
      description: 'Cam kết bảo hành và hỗ trợ kỹ thuật sau bán hàng',
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ khách hàng',
    },
    {
      icon: Award,
      title: 'Chất lượng đảm bảo',
      description: 'Tất cả sản phẩm đều được kiểm định chất lượng',
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
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                Cần trục tháp chất lượng cao từ các thương hiệu hàng đầu
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
            Cần tư vấn về sản phẩm?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              Liên hệ ngay
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
