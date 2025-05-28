import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export async function POST(request) {
  try {
    console.log('Form verisi alınıyor...');
    const formData = await request.formData();
    const file = formData.get('cvFile');

    console.log('Form verileri:', {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      message: formData.get('message'),
      fileName: file?.name
    });

    if (!file) {
      return NextResponse.json(
        { error: 'CV dosyası gereklidir' },
        { status: 400 }
      );
    }

    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      message: formData.get('message')
    };

    // Manual validation
    if (!data.fullName || data.fullName.length < 2) {
      return NextResponse.json({ error: 'Geçerli bir tam ad giriniz.' }, { status: 400 });
    }
    if (!data.email || !data.email.includes('@') || !data.email.includes('.')) {
       return NextResponse.json({ error: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
    }
     if (!data.phone || data.phone.length < 10) {
      return NextResponse.json({ error: 'Geçerli bir telefon numarası giriniz.' }, { status: 400 });
    }
    if (!data.position) {
      return NextResponse.json({ error: 'Başvurulan pozisyonu belirtiniz.' }, { status: 400 });
    }
    if (!data.message) {
      return NextResponse.json({ error: 'Bir mesaj giriniz.' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Mail içeriğini oluştur
    const emailContent = `Content-Type: multipart/mixed; boundary="boundary"\nMIME-Version: 1.0\nFrom: ${process.env.EMAIL_FROM}\nTo: ${process.env.RECIPIENT_EMAIL}\nSubject: =?utf-8?B?${Buffer.from(`Yeni İş Başvurusu: ${data.position}`).toString('base64')}?=\n\n--boundary\nContent-Type: text/html; charset=utf-8\n\n<h2>Yeni İş Başvurusu</h2>\n<p><strong>İsim:</strong> ${data.fullName}</p>\n<p><strong>E-posta:</strong> ${data.email}</p>\n<p><strong>Telefon:</strong> ${data.phone}</p>\n<p><strong>Pozisyon:</strong> ${data.position}</p>\n<p><strong>Mesaj:</strong> ${data.message}</p>\n\n--boundary\nContent-Type: application/octet-stream\nContent-Transfer-Encoding: base64\nContent-Disposition: attachment; filename="${file.name}"\n\n${buffer.toString('base64')}\n--boundary--`;

    // Base64 encode the email
    const encodedEmail = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log('Gmail API ile mail gönderiliyor...');
    
    try {
      // Gmail API ile mail göndermeyi deneyelim
      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedEmail,
        },
      });
      console.log('Gmail API yanıtı:', result);
    } catch (gmailError) {
      console.error('Gmail API hatası:', {
        message: gmailError.message,
        code: gmailError.code,
        details: gmailError.response?.data
      });
      throw gmailError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Başvuru hatası detayları:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error
    });

    return NextResponse.json(
      { 
        error: 'Başvuru gönderilirken bir hata oluştu',
        details: error.message,
        name: error.name
      },
      { status: 500 }
    );
  }
}
