'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle2
} from 'lucide-react';

function ContactForm() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const product = productId ? getProductById(productId) : null;
  const { toast } = useToast();

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

  const formatPrice = (price: number, lang: string) => {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: product 
      ? language === 'zh' 
        ? `我对产品 ${product.brand} ${product.model} (${productId}) 感兴趣。请发送详细报价。`
        : language === 'en'
        ? `I am interested in the product ${product.brand} ${product.model} (${productId}). Please send a detailed quotation.`
        : `Tôi quan tâm đến sản phẩm ${product.brand} ${product.model} (${productId}). Vui lòng gửi báo giá chi tiết.`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 调用邮件发送API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          productId: productId || undefined,
          productName: product ? `${product.brand} ${product.model}` : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: t('contact.success'),
          description: t('contact.success_desc'),
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast({
          title: t('contact.error'),
          description: result.error || t('contact.error'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('contact.error'),
        description: t('contact.error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {product && (
        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground mb-2">{t('contact.product_interest')}</div>
            <div className="flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.model}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{product.brand} {product.model}</div>
                <Badge className="mt-1">
                  {formatPrice(product.price, language)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            {t('contact.name')} <span className="text-destructive">*</span>
          </label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={language === 'zh' ? '请输入姓名' : language === 'en' ? 'Enter your name' : 'Nguyễn Văn A'}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            {t('contact.phone')} <span className="text-destructive">*</span>
          </label>
          <Input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+84 123 456 789"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          {t('contact.email')} <span className="text-destructive">*</span>
        </label>
        <Input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          {t('contact.message')} <span className="text-destructive">*</span>
        </label>
        <Textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={language === 'zh' ? '请输入您的留言...' : language === 'en' ? 'Enter your message...' : 'Nhập tin nhắn của bạn...'}
          rows={5}
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {t('contact.sending')}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t('contact.submit')}
          </>
        )}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('footer.address'),
      content: t('contact.address_value'),
    },
    {
      icon: Phone,
      title: t('footer.phone'),
      content: '+84 123 456 789',
    },
    {
      icon: Mail,
      title: t('footer.email'),
      content: 'wzm61788984@163.com',
    },
    {
      icon: Clock,
      title: t('footer.working_hours'),
      content: t('contact.hours_value'),
    },
  ];

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{info.title}</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
