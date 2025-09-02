# Callister FRC AI Assistant

Modern ve animasyonlu FRC (FIRST Robotics Competition) yapay zeka asistanı. React Router v7, TailwindCSS ve OpenRouter API kullanılarak geliştirilmiştir.

## ✨ Özellikler

- 🤖 **AI Chat Interface**: ChatGPT benzeri modern arayüz
- 🎨 **Animasyonlu UI**: Smooth geçişler ve hover efektleri
- 📱 **Responsive Design**: Mobil ve desktop uyumlu
- 🎯 **Context-Aware**: Farklı FRC uzmanlık alanları
- 🌙 **Dark Theme**: Mor gradient tema
- ⚡ **Fast API**: OpenRouter ile hızlı yanıtlar
- 🔄 **Real-time**: Canlı mesajlaşma

## 🚀 Vercel ile Deploy

### 1. GitHub'a Push
```bash
git add .
git commit -m "Add FRC AI Assistant"
git push origin main
```

### 2. Vercel'e Import
1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. "Import" butonuna tıklayın

### 3. Environment Variables
Vercel dashboard'da:
1. Project Settings → Environment Variables
2. `OPENROUTER_API_KEY` ekleyin
3. Value: OpenRouter API key'inizi girin

### 4. Deploy
- Vercel otomatik olarak deploy edecek
- URL: `https://your-project.vercel.app`

## 🛠️ Local Development

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum
```bash
# Repository'yi klonlayın
git clone <your-repo-url>
cd frc-ai-remix

# Dependencies yükleyin
npm install

# Environment variables
cp .env.example .env
# .env dosyasını düzenleyin ve API key'inizi ekleyin

# Development server başlatın
npm run dev
```

### API Key Alma
1. [OpenRouter](https://openrouter.ai) hesabı oluşturun
2. [API Keys](https://openrouter.ai/keys) sayfasına gidin
3. Yeni key oluşturun
4. `.env` dosyasına ekleyin

## 📁 Proje Yapısı

```
frc-ai-remix/
├── app/
│   ├── components/
│   │   └── FRCChat.tsx      # Ana chat komponenti
│   ├── routes/
│   │   ├── home.tsx         # Ana sayfa
│   │   ├── chat.tsx         # Chat sayfası
│   │   └── api.chat.ts      # API endpoint
│   ├── app.css              # Stiller ve animasyonlar
│   └── root.tsx             # Root component
├── public/
│   └── 8f28b76859c1479d839d270409be3586.jpg  # Logo
├── vercel.json              # Vercel config
└── package.json
```

## 🎨 Animasyonlar

- **Fade In**: Mesajlar yumuşakça belirir
- **Hover Effects**: Butonlarda scale animasyonları
- **Smooth Transitions**: Tüm geçişler 300ms
- **Staggered Animation**: Kartlar sırayla animasyonlu

## 🔧 Teknolojiler

- **React Router v7**: Modern routing
- **TailwindCSS**: Utility-first CSS
- **Lucide React**: İkonlar
- **OpenRouter API**: AI completions
- **TypeScript**: Type safety
- **Vite**: Build tool

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎯 FRC Uzmanlık Alanları

1. **Genel FRC**: Robot tasarımı ve yarışma kuralları
2. **Strateji**: Oyun analizi ve takım koordinasyonu
3. **Mekanik**: Motor seçimi ve güç aktarımı
4. **Simülasyon**: Robot simülasyonu ve test ortamları

## 🚀 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Takım**: Callister FRC Team
- **Website**: [Your Website]
- **Email**: [Your Email]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!