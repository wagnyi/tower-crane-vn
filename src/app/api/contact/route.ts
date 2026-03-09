import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 创建邮件传输器
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.163.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, productId, productName } = body;

    // 验证必填字段
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 创建邮件传输器
    const transporter = createTransporter();

    // 构建邮件内容
    const mailOptions = {
      from: `"Tower Crane VN" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: productId 
        ? `[网站询价] ${name} 对产品 ${productName} 感兴趣`
        : `[网站留言] ${name} 的咨询`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
            .product-info { background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏗️ Tower Crane VN - 客户咨询</h2>
            </div>
            <div class="content">
              ${productId ? `
                <div class="product-info">
                  <strong>📦 客户感兴趣的产品：</strong><br>
                  产品ID: ${productId}<br>
                  产品名称: ${productName || '未知'}
                </div>
              ` : ''}
              <div class="field">
                <div class="label">👤 客户姓名</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 电子邮箱</div>
                <div class="value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              <div class="field">
                <div class="label">📱 联系电话</div>
                <div class="value">
                  <a href="tel:${phone}">${phone}</a>
                </div>
              </div>
              <div class="field">
                <div class="label">💬 留言内容</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              此邮件来自 vietnamconstructionmachine.com 网站联系表单
            </div>
          </div>
        </body>
        </html>
      `,
      // 纯文本版本（备用）
      text: `
Tower Crane VN - 客户咨询

${productId ? `客户感兴趣的产品: ${productName || productId}` : ''}

客户姓名: ${name}
电子邮箱: ${email}
联系电话: ${phone}
留言内容: ${message}

---
此邮件来自 vietnamconstructionmachine.com 网站联系表单
      `.trim(),
    };

    // 发送邮件
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: '邮件发送成功' 
    });

  } catch (error) {
    console.error('发送邮件失败:', error);
    return NextResponse.json(
      { error: '发送邮件失败，请稍后重试' },
      { status: 500 }
    );
  }
}
