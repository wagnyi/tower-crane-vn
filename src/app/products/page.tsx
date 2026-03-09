'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');

  const brands = ['all', ...new Set(products.map((p) => p.brand))];
  const conditions = ['all', 'excellent', 'good', 'fair'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesCondition = selectedCondition === 'all' || product.condition === selectedCondition;
    return matchesSearch && matchesBrand && matchesCondition;
  });

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('nav.products')}</h1>
        <p className="text-muted-foreground">
          {t('products.subtitle_full')}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('products.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-4">
          {/* Brand Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('products.brand')}:</span>
            <div className="flex gap-2 flex-wrap">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand === 'all' ? t('products.all') : brand}
                </Button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('products.condition_filter')}:</span>
            <div className="flex gap-2 flex-wrap">
              {conditions.map((condition) => (
                <Button
                  key={condition}
                  variant={selectedCondition === condition ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCondition(condition)}
                >
                  {condition === 'all' ? t('products.all') : t(`condition.${condition}` as any)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {t('products.found')} {filteredProducts.length} {t('products.products_count')}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('products.no_results')}</p>
        </div>
      )}
    </div>
  );
}
