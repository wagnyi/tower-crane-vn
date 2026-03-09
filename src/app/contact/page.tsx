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
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const product = productId ? getProductById(productId) : null;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: product 
      ? `Tôi quan tâm đến sản phẩm ${product.brand} ${product.model} (${productId}). Vui lòng gửi báo giá chi tiết.`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Thành công!',
      description: t('contact.success'),
    });

    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {product && (
        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground mb-2">Sản phẩm bạn quan tâm:</div>
            <div className="flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.model}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{product.brand} {product.model}</div>
                <Badge className="mt-1">
                  {(product.price / 1000000).toFixed(0)} triệu VND
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
            placeholder="Nguyễn Văn A"
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
          placeholder="Nhập tin nhắn của bạn..."
          rows={5}
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Đang gửi...
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
      content: 'Hà Nội, Việt Nam',
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
      content: 'Thứ 2-6: 8:00-17:30\nThứ 7: 8:00-12:00',
    },
  ];

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
        <p className="text-lg text-muted-foreground">
          Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết
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

          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Map"
                className="object-cover w-full h-full opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Hà Nội, Việt Nam</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Gửi tin nhắn cho chúng tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              q: 'Thủ tục mua cần trục tháp như thế nào?',
              a: 'Quy trình gồm: Tư vấn → Kiểm tra hiện trạng → Đàm phán giá → Ký hợp đồng → Thanh toán → Giao hàng',
            },
            {
              q: 'Có hỗ trợ vận chuyển không?',
              a: 'Có, chúng tôi hỗ trợ vận chuyển đến mọi tỉnh thành Việt Nam với chi phí hợp lý.',
            },
            {
              q: 'Chế độ bảo hành như thế nào?',
              a: 'Tất cả sản phẩm đều được bảo hành 12 tháng, hỗ trợ kỹ thuật trọn đời.',
            },
            {
              q: 'Có hỗ trợ lắp đặt không?',
              a: 'Có, đội ngũ kỹ thuật chuyên nghiệp sẽ hỗ trợ lắp đặt và vận hành thử.',
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-2">{faq.q}</div>
                    <div className="text-sm text-muted-foreground">{faq.a}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
