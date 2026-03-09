# WordPress 集成指南 - Tower Crane VN

本文档说明如何将此项目转换为 WordPress 主题并部署到阿里云新加坡服务器。

## 📋 目录

1. [项目概述](#项目概述)
2. [WordPress 主题转换](#wordpress-主题转换)
3. [多语言实现](#多语言实现)
4. [阿里云部署](#阿里云部署)
5. [域名配置](#域名配置)
6. [SEO 优化](#seo-优化)

---

## 项目概述

### 当前技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **UI 组件**: shadcn/ui + Tailwind CSS
- **功能**: 响应式设计、多语言支持、产品展示

### 目标技术栈
- **CMS**: WordPress 6.x
- **主题**: 自定义主题
- **多语言插件**: WPML 或 Polylang
- **托管**: 阿里云新加坡服务器

---

## WordPress 主题转换

### 方案一：创建自定义 WordPress 主题

#### 步骤 1: 创建主题目录结构

```
wordpress/themes/tower-crane/
├── style.css              # 主题样式
├── functions.php          # 主题功能
├── index.php              # 首页模板
├── header.php             # 头部模板
├── footer.php             # 底部模板
├── page-products.php      # 产品页面
├── single-product.php     # 产品详情
├── page-about.php         # 关于我们
├── page-contact.php       # 联系页面
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── inc/
    ├── custom-post-types.php  # 自定义文章类型
    └── theme-functions.php    # 主题函数
```

#### 步骤 2: 注册产品自定义文章类型

```php
<?php
// inc/custom-post-types.php

function register_product_post_type() {
    $labels = array(
        'name'               => 'Products',
        'singular_name'      => 'Product',
        'menu_name'          => 'Products',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Product',
        'edit_item'          => 'Edit Product',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'products'),
        'capability_type'     => 'post',
        'has_archive'         => true,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'supports'            => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'        => true,
    );

    register_post_type('product', $args);
}
add_action('init', 'register_product_post_type');
```

#### 步骤 3: 添加产品自定义字段

```php
<?php
// inc/custom-fields.php

function add_product_meta_boxes() {
    add_meta_box(
        'product_details',
        'Product Details',
        'product_details_callback',
        'product'
    );
}
add_action('add_meta_boxes', 'add_product_meta_boxes');

function product_details_callback($post) {
    wp_nonce_field('product_details_nonce', 'product_details_nonce');
    
    $brand = get_post_meta($post->ID, '_brand', true);
    $capacity = get_post_meta($post->ID, '_capacity', true);
    $height = get_post_meta($post->ID, '_height', true);
    $price = get_post_meta($post->ID, '_price', true);
    $year = get_post_meta($post->ID, '_year', true);
    $condition = get_post_meta($post->ID, '_condition', true);
    $location = get_post_meta($post->ID, '_location', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="brand">Brand</label></th>
            <td><input type="text" id="brand" name="brand" value="<?php echo esc_attr($brand); ?>"></td>
        </tr>
        <tr>
            <th><label for="capacity">Capacity (tons)</label></th>
            <td><input type="number" id="capacity" name="capacity" value="<?php echo esc_attr($capacity); ?>"></td>
        </tr>
        <tr>
            <th><label for="height">Height (meters)</label></th>
            <td><input type="number" id="height" name="height" value="<?php echo esc_attr($height); ?>"></td>
        </tr>
        <tr>
            <th><label for="price">Price (VND)</label></th>
            <td><input type="number" id="price" name="price" value="<?php echo esc_attr($price); ?>"></td>
        </tr>
        <tr>
            <th><label for="year">Year</label></th>
            <td><input type="number" id="year" name="year" value="<?php echo esc_attr($year); ?>"></td>
        </tr>
        <tr>
            <th><label for="condition">Condition</label></th>
            <td>
                <select id="condition" name="condition">
                    <option value="excellent" <?php selected($condition, 'excellent'); ?>>Excellent</option>
                    <option value="good" <?php selected($condition, 'good'); ?>>Good</option>
                    <option value="fair" <?php selected($condition, 'fair'); ?>>Fair</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="location">Location</label></th>
            <td><input type="text" id="location" name="location" value="<?php echo esc_attr($location); ?>"></td>
        </tr>
    </table>
    <?php
}

function save_product_details($post_id) {
    if (!isset($_POST['product_details_nonce']) || 
        !wp_verify_nonce($_POST['product_details_nonce'], 'product_details_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    $fields = array('brand', 'capacity', 'height', 'price', 'year', 'condition', 'location');
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_product', 'save_product_details');
```

#### 步骤 4: 创建产品列表模板

```php
<?php
// page-products.php

get_header();
?>

<div class="container px-4 py-8">
    <h1 class="text-3xl font-bold mb-8"><?php the_title(); ?></h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <?php
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC'
        );
        $products = new WP_Query($args);
        
        if ($products->have_posts()) :
            while ($products->have_posts()) : $products->the_post();
                $brand = get_post_meta(get_the_ID(), '_brand', true);
                $capacity = get_post_meta(get_the_ID(), '_capacity', true);
                $height = get_post_meta(get_the_ID(), '_height', true);
                $price = get_post_meta(get_the_ID(), '_price', true);
                $condition = get_post_meta(get_the_ID(), '_condition', true);
        ?>
            <div class="product-card border rounded-lg overflow-hidden hover:shadow-lg transition">
                <?php if (has_post_thumbnail()) : ?>
                    <div class="aspect-[4/3] relative">
                        <?php the_post_thumbnail('medium_large', ['class' => 'w-full h-full object-cover']); ?>
                        <span class="absolute top-3 left-3 px-3 py-1 bg-<?php echo $condition === 'excellent' ? 'green' : ($condition === 'good' ? 'blue' : 'yellow'); ?>-500 text-white text-sm rounded">
                            <?php echo ucfirst($condition); ?>
                        </span>
                    </div>
                <?php endif; ?>
                
                <div class="p-5">
                    <h3 class="text-lg font-semibold"><?php echo $brand . ' ' . get_the_title(); ?></h3>
                    <div class="text-sm text-gray-600 mt-2">
                        <p>Capacity: <?php echo $capacity; ?> tons</p>
                        <p>Height: <?php echo $height; ?> meters</p>
                    </div>
                    <div class="text-xl font-bold text-primary mt-3">
                        <?php echo number_format($price / 1000000, 0); ?> triệu VND
                    </div>
                    <div class="flex gap-2 mt-4">
                        <a href="<?php the_permalink(); ?>" class="flex-1 btn btn-outline text-center">Details</a>
                        <a href="/contact?product=<?php echo get_the_ID(); ?>" class="flex-1 btn btn-primary text-center">Inquire</a>
                    </div>
                </div>
            </div>
        <?php
            endwhile;
            wp_reset_postdata();
        endif;
        ?>
    </div>
</div>

<?php get_footer(); ?>
```

---

## 多语言实现

### 方案一: WPML (推荐 - 商业项目)

1. **购买并安装 WPML**
   - 购买 WPML 多语言 CMS 版本
   - 在 WordPress 后台上传并激活插件

2. **配置语言**
   - 进入 WPML → Languages
   - 添加语言: 越南语 (vi), 英语 (en), 中文 (zh)
   - 设置默认语言为越南语

3. **翻译产品**
   - 在产品编辑页面,点击 "+" 按钮添加翻译
   - 使用 WPML 高级翻译编辑器进行翻译

4. **语言切换器**
   - WPML → Languages → Language switcher
   - 启用下拉菜单式语言切换器
   - 将其添加到导航菜单

### 方案二: Polylang (免费)

1. **安装 Polylang**
   ```bash
   # 在 WordPress 后台插件页面搜索 "Polylang" 并安装
   ```

2. **配置语言**
   - 进入 Languages → Languages
   - 添加越南语、英语、中文

3. **翻译内容**
   - 在产品列表页面,点击 "+" 图标添加翻译
   - 使用 Lingotek 或手动翻译

---

## 阿里云部署

### 步骤 1: 准备服务器

1. **购买阿里云 ECS 实例**
   - 地域: 新加坡
   - 规格: 2核4GB 或更高
   - 系统: Ubuntu 22.04 LTS

2. **安全组配置**
   - 开放端口: 80 (HTTP), 443 (HTTPS), 22 (SSH)

### 步骤 2: 安装 LAMP 环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Apache
sudo apt install apache2 -y

# 安装 MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# 安装 PHP
sudo apt install php php-mysql php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip -y

# 启用 Apache 模块
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 步骤 3: 安装 WordPress

```bash
# 下载 WordPress
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz

# 移动到 Apache 目录
sudo mv wordpress /var/www/html/towerranevn.com

# 设置权限
sudo chown -R www-data:www-data /var/www/html/towerranevn.com
sudo chmod -R 755 /var/www/html/towerranevn.com
```

### 步骤 4: 创建 MySQL 数据库

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE towerranevn_db;
CREATE USER 'towerranevn_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON towerranevn_db.* TO 'towerranevn_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 步骤 5: 配置 Apache 虚拟主机

```bash
sudo nano /etc/apache2/sites-available/towerranevn.com.conf
```

```apache
<VirtualHost *:80>
    ServerName towerranevn.com
    ServerAlias www.towerranevn.com
    DocumentRoot /var/www/html/towerranevn.com
    
    <Directory /var/www/html/towerranevn.com>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/towerranevn_error.log
    CustomLog ${APACHE_LOG_DIR}/towerranevn_access.log combined
</VirtualHost>
```

```bash
# 启用站点
sudo a2ensite towerranevn.com.conf
sudo systemctl restart apache2
```

### 步骤 6: 安装 SSL 证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-apache -y

# 获取 SSL 证书
sudo certbot --apache -d towerranevn.com -d www.towerranevn.com
```

---

## 域名配置

### 步骤 1: 域名解析

1. 登录域名服务商控制台
2. 添加 A 记录:
   - 主机记录: `@`
   - 记录值: 阿里云 ECS 公网 IP
3. 添加 CNAME 记录:
   - 主机记录: `www`
   - 记录值: `towerranevn.com`

### 步骤 2: 域名备案 (中国内地)

如果目标用户在中国内地,需要进行 ICP 备案:
- 登录阿里云备案系统
- 提交备案申请
- 等待审核 (通常 10-20 个工作日)

**注意**: 新加坡服务器无需备案

---

## SEO 优化

### WordPress SEO 插件

1. **安装 Yoast SEO 或 Rank Math**
   - 在 WordPress 后台 → 插件 → 添加新插件
   - 搜索 "Yoast SEO" 或 "Rank Math"
   - 安装并激活

2. **配置 SEO 设置**
   - 设置网站标题和描述
   - 配置社交媒体元数据
   - 生成站点地图

3. **产品 SEO 优化**
   - 为每个产品设置独特的标题和描述
   - 添加产品结构化数据 (Schema.org)
   - 优化产品图片 alt 标签

### 多语言 SEO

```php
// 在 header.php 中添加 hreflang 标签
<?php if (function_exists('icl_get_languages')): ?>
    <?php foreach (icl_get_languages('skip_missing=0') as $language): ?>
        <link rel="alternate" hreflang="<?php echo $language['language_code']; ?>" href="<?php echo $language['url']; ?>" />
    <?php endforeach; ?>
<?php endif; ?>
```

---

## 性能优化

### 1. 缓存插件

- **WP Super Cache** 或 **W3 Total Cache**
- 配置页面缓存
- 启用浏览器缓存

### 2. 图片优化

- 使用 **Smush** 或 **EWWW Image Optimizer**
- 自动压缩和优化图片
- 启用延迟加载

### 3. CDN 配置

- 使用阿里云 CDN
- 配置全球加速节点
- 启用 HTTPS

---

## 安全建议

1. **定期更新**
   - WordPress 核心
   - 主题和插件

2. **安全插件**
   - Wordfence Security
   - iThemes Security

3. **备份策略**
   - 使用 UpdraftPlus 定期备份
   - 备份到阿里云 OSS

4. **防火墙**
   - 配置阿里云 WAF
   - 限制登录尝试次数

---

## 联系表单集成

### 使用 Contact Form 7

1. 安装 Contact Form 7 插件
2. 创建联系表单
3. 集成邮件服务 (如阿里云邮件推送)

```html
<!-- 联系表单模板 -->
<div class="contact-form">
    [text* name placeholder "Your Name"]
    [email* email placeholder "Your Email"]
    [tel* phone placeholder "Your Phone"]
    [textarea* message placeholder "Your Message"]
    [submit "Send Message"]
</div>
```

---

## 维护计划

### 每日
- 检查网站正常运行
- 查看错误日志

### 每周
- 更新内容和产品信息
- 检查备份状态

### 每月
- WordPress 和插件更新
- 性能检查和优化
- 安全扫描

---

## 技术支持

如需进一步帮助,请联系:
- Email: support@towerranevn.com
- Phone: +84 123 456 789

---

**祝您的塔吊销售业务蒸蒸日上!** 🏗️
