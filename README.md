# WeatherTunes PWA

Um aplicativo de previsão do tempo com música ambiente personalizada, desenvolvido como PWA (Progressive Web App) e preparado para conversão em aplicativo Android usando Bubblewrap (Trusted Web Activity).

## 🚀 Recursos

- **PWA Completo**: Funciona offline, instalável, com service worker
- **Previsão do Tempo**: API OpenWeatherMap com dados precisos
- **Música Ambiente**: Playlists baseadas no clima atual
- **Geolocalização**: Detecção automática da localização
- **Responsivo**: Funciona em desktop e mobile
- **TWA Ready**: Preparado para conversão em app Android

## 📱 Configuração PWA + Bubblewrap

### Pré-requisitos

1. **Node.js** (versão 16+)
2. **Android Studio** com SDK
3. **Java JDK** (versão 8+)
4. **Bubblewrap CLI**:
   ```bash
   npm install -g @bubblewrap/cli
   ```

### Passos para criar o aplicativo Android

1. **Build do projeto**:
   ```bash
   npm run build
   ```

2. **Deploy em um servidor HTTPS** (obrigatório para TWA)

3. **Configurar o twa-manifest.json**:
   - Edite `/public/twa-manifest.json`
   - Altere `"url": "your-domain.com"` para seu domínio
   - Configure o `packageId` desejado

4. **Configurar Asset Links**:
   - Gere o fingerprint do seu app:
     ```bash
     bubblewrap fingerprint
     ```
   - Atualize `/public/.well-known/assetlinks.json` com o fingerprint

5. **Inicializar o projeto TWA**:
   ```bash
   bubblewrap init --manifest=https://seu-dominio.com/twa-manifest.json
   ```

6. **Build do APK**:
   ```bash
   bubblewrap build
   ```

### Estrutura de arquivos PWA

```
public/
├── manifest.json              # Manifest PWA principal
├── twa-manifest.json         # Configuração Bubblewrap
├── assetlinks.json           # Asset Links (raiz)
├── .well-known/
│   └── assetlinks.json       # Asset Links (well-known)
├── icon-192.png              # Ícone 192x192
├── icon-512.png              # Ícone 512x512
├── icon-maskable-192.png     # Ícone maskable 192x192
├── icon-maskable-512.png     # Ícone maskable 512x512
├── screenshot-mobile.png     # Screenshot mobile
└── screenshot-desktop.png    # Screenshot desktop
```

## 🔧 Configurações importantes

### Service Worker
- Cache de API do tempo (24h)
- Cache de imagens (30 dias)
- Funcionalidade offline básica

### Manifest PWA
- Display: standalone
- Orientação: portrait
- Shortcuts para ações rápidas
- Screenshots para app stores

### Asset Links
- Verificação de domínio para TWA
- Necessário para funcionamento correto no Android

## 🌐 Deploy

1. **Netlify/Vercel**: Deploy automático do build
2. **Domínio HTTPS**: Obrigatório para PWA e TWA
3. **Asset Links**: Configurar no servidor web

## 📋 Checklist TWA

- [ ] PWA funcionando em HTTPS
- [ ] Manifest.json válido
- [ ] Service Worker ativo
- [ ] Asset Links configurados
- [ ] Ícones em todos os tamanhos
- [ ] Screenshots adicionados
- [ ] twa-manifest.json configurado
- [ ] Domínio verificado

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` com:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_api_aqui
```

## 🚀 Comandos

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## 📱 Recursos PWA

- ✅ Instalável na tela inicial
- ✅ Funciona offline (básico)
- ✅ Service Worker com cache
- ✅ Manifest completo
- ✅ Ícones adaptativos
- ✅ Splash screen
- ✅ Shortcuts de app
- ✅ Screenshots para stores

## 🔗 Links úteis

- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Asset Links Generator](https://developers.google.com/digital-asset-links/tools/generator)