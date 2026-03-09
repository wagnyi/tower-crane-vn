'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Package, Shield, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { icon: Package, value: '10+', label: t('about.experience') },
    { icon: Users, value: '500+', label: t('about.customers') },
    { icon: Award, value: '200+', label: t('about.products_sold') },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Chất lượng là trên hết',
      description: 'Tất cả sản phẩm đều được kiểm định chất lượng nghiêm ngặt trước khi giao cho khách hàng.',
    },
    {
      icon: Target,
      title: 'Tận tâm phục vụ',
      description: 'Luôn đặt lợi ích của khách hàng lên hàng đầu, hỗ trợ từ khâu tư vấn đến sau bán hàng.',
    },
    {
      icon: Lightbulb,
      title: 'Không ngừng đổi mới',
      description: 'Liên tục cập nhật kiến thức và công nghệ để cung cấp giải pháp tốt nhất cho khách hàng.',
    },
  ];

  const milestones = [
    { year: '2014', event: 'Thành lập công ty, bắt đầu kinh doanh thiết bị xây dựng' },
    { year: '2016', event: 'Trở thành đối tác chính thức của Zoomlion tại Việt Nam' },
    { year: '2018', event: 'Mở rộng thị trường sang miền Nam, văn phòng tại TP.HCM' },
    { year: '2020', event: 'Đạt chứng nhận ISO 9001:2015 về quản lý chất lượng' },
    { year: '2022', event: 'Ký kết hợp tác với XCMG và SANY, mở rộng danh mục sản phẩm' },
    { year: '2024', event: 'Phục vụ hơn 500 khách hàng, bán hơn 200 cần trục tháp' },
  ];

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {t('about.description')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Tower Crane VN được thành lập vào năm 2014 với tầm nhìn trở thành nhà cung cấp thiết bị xây dựng 
            chất lượng cao hàng đầu tại Việt Nam. Chúng tôi chuyên cung cấp cần trục tháp cũ từ các thương hiệu 
            uy tín như Zoomlion, XCMG, SANY và nhiều thương hiệu khác.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Với đội ngũ kỹ thuật giàu kinh nghiệm và quy trình kiểm định chất lượng nghiêm ngặt, 
            chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng, giá cả hợp lý và 
            dịch vụ hậu mãi tận tâm.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Hành trình phát triển</h2>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {milestone.year}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-16 bg-border my-2" />
                )}
              </div>
              <div className="flex-1 pt-3">
                <p className="text-muted-foreground">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Chứng nhận & Đối tác</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-background p-6 rounded-lg text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-2" />
            <div className="font-semibold">ISO 9001:2015</div>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
            <div className="font-semibold">Đối tác Zoomlion</div>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
            <div className="font-semibold">Đối tác XCMG</div>
          </div>
          <div className="bg-background p-6 rounded-lg text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
            <div className="font-semibold">Đối tác SANY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
