# Tower Crane VN - 二手塔吊销售网站

越南独立站网站，专注于二手塔吊销售业务，支持越南语、英语、中文三种语言。

## 🌟 功能特性

- **多语言支持**: 越南语 (vi)、英语 (en)、中文 (zh)
- **产品展示**: 详细的塔吊产品信息展示
- **询价系统**: 方便的客户询价功能
- **响应式设计**: 完美适配各种设备
- **SEO优化**: 搜索引擎友好的页面结构

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **UI组件**: shadcn/ui + Tailwind CSS
- **图标**: Lucide React

## 📦 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── products/          # 产品页面
│   │   ├── page.tsx       # 产品列表
│   │   └── [id]/page.tsx  # 产品详情
│   ├── about/             # 关于我们
│   └── contact/           # 联系我们
├── components/            # React组件
│   ├── ui/               # shadcn/ui组件
│   ├── navigation.tsx    # 导航栏
│   ├── footer.tsx        # 页脚
│   ├── hero.tsx          # 首页英雄区
│   └── product-card.tsx  # 产品卡片
├── lib/                   # 工具库
│   ├── i18n/             # 国际化配置
│   │   ├── config.ts     # 语言配置
│   │   ├── translations.ts # 翻译文件
│   │   └── context.tsx   # 语言上下文
│   ├── products.ts       # 产品数据
│   └── types.ts          # TypeScript类型
└── hooks/                 # 自定义Hooks
    └── use-toast.ts      # Toast提示

```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000 查看网站

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 🌐 多语言切换

网站右上角提供语言切换功能，支持：
- 🇻🇳 Tiếng Việt (越南语)
- 🇺🇸 English (英语)
- 🇨🇳 中文 (中文)

## 📱 页面说明

### 首页 (/)
- 英雄区域展示
- 核心优势展示
- 精选产品推荐
- 行动号召区域

### 产品列表 (/products)
- 产品搜索功能
- 品牌、状态筛选
- 产品卡片展示
- 响应式网格布局

### 产品详情 (/products/:id)
- 产品图片展示
- 详细技术参数
- 产品特性说明
- 询价按钮

### 关于我们 (/about)
- 公司简介
- 发展历程
- 核心价值观
- 认证与合作伙伴

### 联系我们 (/contact)
- 联系信息展示
- 询价表单
- 常见问题
- 地图位置

## 🎨 设计特点

- **现代简约**: 清爽的设计风格
- **专业商务**: 适合B2B业务场景
- **用户友好**: 直观的导航和交互
- **移动优先**: 完美的移动端体验

## 📋 WordPress 集成

详细的WordPress转换和部署指南请查看 [WORDPRESS-INTEGRATION.md](./WORDPRESS-INTEGRATION.md)

包含：
- WordPress主题转换步骤
- 多语言插件配置
- 阿里云新加坡服务器部署
- 域名配置指南
- SEO优化建议

## 🔧 自定义配置

### 修改语言文本

编辑 `src/lib/i18n/translations.ts` 文件：

```typescript
export const translations = {
  vi: {
    'hero.title': 'Cần trục tháp cũ chất lượng cao',
    // ... 其他翻译
  },
  en: {
    'hero.title': 'High Quality Used Tower Cranes',
    // ... 其他翻译
  },
  zh: {
    'hero.title': '优质二手塔吊销售',
    // ... 其他翻译
  }
}
```

### 添加新产品

编辑 `src/lib/products.ts` 文件：

```typescript
export const products: Product[] = [
  {
    id: '7',
    model: 'QTZ150',
    brand: 'Zoomlion',
    // ... 其他产品信息
  }
]
```

## 📊 产品数据结构

```typescript
interface Product {
  id: string;
  model: string;
  brand: string;
  capacity: number;      // 载重 (吨)
  height: number;        // 高度 (米)
  year: number;          // 生产年份
  condition: 'excellent' | 'good' | 'fair';
  price: number;         // 价格
  currency: 'VND' | 'USD' | 'CNY';
  location: string;      // 所在地
  images: string[];      // 产品图片
  specifications: {      // 技术参数
    maxRadius: number;
    maxLoad: number;
    tipLoad: number;
    jibLength: number;
    mastHeight: number;
  };
  description: {         // 多语言描述
    vi: string;
    en: string;
    zh: string;
  };
  features: string[];    // 产品特性
}
```

## 🚢 部署建议

### 静态导出 (推荐)

```bash
pnpm build
```

将 `out` 目录部署到任何静态文件服务器

### Vercel 部署

```bash
vercel
```

### Docker 部署

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["pnpm", "start"]
```

## 📞 联系方式

- **Email**: info@towerranevn.com
- **Phone**: +84 123 456 789
- **Address**: Hà Nội, Việt Nam

## 📄 许可证

本项目仅供学习和参考使用

---

**祝您的塔吊销售业务蒸蒸日上！** 🏗️
