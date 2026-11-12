# ARCIS Mimarlık

Kurumsal web sitesi. Yayımlanacak dosyalar `dist/` klasöründedir.

## Yerel ön izleme

`python -m http.server 5185 --directory dist`

## Cloudflare Pages kurulumu

- GitHub deposu: ilyassaryldz/arcismimarlik
- Production branch: main
- Framework preset: None
- Build command: boş bırakın
- Build output directory: dist

GitHub bağlantısı kurulunca main dalına gönderilen değişiklikler otomatik yayınlanır. Henüz bu bağlantı kurulmamıştır. Mevcut alan adı ChatGPT Sites yayınına bağlıdır. Yeni Pages adresi doğrulandıktan sonra özel alan adı bağlantısı ayrıca yapılmalıdır.

## Claude ile düzenleme

Claude masaüstünde kod düzenleme ortamına bu depoyu veya yerel klasörü açın. `dist/` dosyalarını değiştirin, ön izlemede kontrol edin, ardından değişiklikleri commit edip main dalına push edin. Yalnızca dosyaları kaydetmek canlı yayını değiştirmez.

Bu depo yalnızca herkese açık kurumsal siteyi içerir. Ofis uygulaması, müşteri/mali kayıtlar, giriş bilgileri ve yayın anahtarları bu depoya eklenmemelidir.
