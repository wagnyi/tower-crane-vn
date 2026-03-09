'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                TC
              </div>
              <span>Tower Crane VN</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.quick_links')}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                {t('nav.home')}
              </Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                {t('nav.products')}
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                {t('nav.about')}
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.contact_info')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>{t('footer.address')}:</strong> Hà Nội, Việt Nam</p>
              <p><strong>{t('footer.phone')}:</strong> +84 123 456 789</p>
              <p><strong>{t('footer.email')}:</strong> info@towerranevn.com</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.working_hours')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Thứ 2 - Thứ 6: 8:00 - 17:30</p>
              <p>Thứ 7: 8:00 - 12:00</p>
              <p>Chủ nhật: Nghỉ</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tower Crane VN. {t('footer.all_rights')}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
