// components/seo/JsonLd.tsx
// INVISIBLE AEO — Renders only <script type="application/ld+json"> in <head>
// Zero visual impact on UI

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    // ── 1. SoftwareApplication ──────────────────────────────
    {
      "@type": "SoftwareApplication",
      "name": "SajiJanji",
      "alternateName": ["SajiJanji Undangan Digital", "SajiJanji Wedding Invitation Platform", "SajiJanji Indonesia"],
      "url": "https://sajijanji.online",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web Browser (Chrome, Safari, Firefox, Edge)",
      "description": "SajiJanji adalah platform SaaS undangan pernikahan digital premium buatan Indonesia. Platform ini menyediakan 11+ template eksklusif dari berbagai budaya Nusantara seperti Jawa Royal Keraton, Bali Sacred Luxury, Sunda Anggun Priangan, Minang Maharaja, Batak Heritage, Bugis Golden Silk, dan Gen Z Pastel. Fitur unggulan meliputi: live preview real-time di emulator mobile sebelum publish, sistem RSVP online otomatis, amplop digital (kado online) via transfer bank, love story timeline interaktif, galeri foto prewedding dengan layout masonry, countdown timer otomatis menuju hari H, musik latar pilihan dari library, dan link undangan unik yang bisa dibagikan ke WhatsApp dan media sosial. Sistem pembayaran menggunakan token — setiap undangan membutuhkan 10 token. Harga mulai dari Rp49.900 untuk paket Basic, Rp99.900 untuk paket Standard, dan Rp199.000 untuk paket Premium. Semua paket berlaku selamanya tanpa biaya langganan bulanan. Cocok untuk calon pengantin milenial dan Gen Z di Indonesia yang menginginkan undangan digital modern, estetik, dan praktis.",
      "featureList": [
        "11+ template premium eksklusif budaya Nusantara",
        "Live preview real-time di emulator mobile",
        "RSVP online otomatis dengan dashboard",
        "Amplop digital / kado online via transfer bank",
        "Love story timeline interaktif dengan foto",
        "Galeri foto prewedding layout masonry",
        "Countdown timer otomatis menuju hari H",
        "Musik latar dari library pilihan",
        "Link undangan unik untuk WhatsApp & sosial media",
        "Editor drag-and-drop mudah tanpa coding",
        "Ucapan & doa tamu secara online",
        "Informasi jadwal acara akad & resepsi",
        "Peta lokasi interaktif Google Maps",
        "Dress code & info tambahan",
        "Cover animasi opening envelope",
        "Aktif selamanya tanpa langganan bulanan"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IDR",
        "lowPrice": "49900",
        "highPrice": "199000",
        "offerCount": "3",
        "offers": [
          {
            "@type": "Offer",
            "name": "Paket Basic",
            "price": "49900",
            "priceCurrency": "IDR",
            "description": "10 Token / 1 Template, Galeri 10 foto, Custom nama & tanggal, Link unik & Musik latar, RSVP standar",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Paket Standard",
            "price": "99900",
            "priceCurrency": "IDR",
            "description": "Semua fitur Basic, Galeri hingga 20 foto, RSVP + Pesan tamu, Masa aktif selamanya, Prioritas dukungan",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Paket Premium",
            "price": "199000",
            "priceCurrency": "IDR",
            "description": "Semua fitur Standard, Video & Wedding Story, Galeri foto tanpa batas, Desain custom khusus, Dukungan prioritas 24/7",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2147",
        "bestRating": "5",
        "worstRating": "1"
      },
      "screenshot": "https://sajijanji.online/og-image.jpg",
      "inLanguage": "id",
      "isAccessibleForFree": false,
      "creator": { "@type": "Organization", "name": "SajiJanji Indonesia" }
    },

    // ── 2. Organization ─────────────────────────────────────
    {
      "@type": "Organization",
      "name": "SajiJanji Indonesia",
      "alternateName": "SajiJanji",
      "url": "https://sajijanji.online",
      "logo": "https://sajijanji.online/favicon.ico",
      "description": "SajiJanji adalah perusahaan teknologi pernikahan (wedding-tech) asal Indonesia yang menyediakan platform SaaS untuk pembuatan undangan pernikahan digital premium. Didirikan untuk membantu calon pengantin milenial dan Gen Z Indonesia membuat undangan nikah online yang modern, estetik, dan terjangkau dengan sentuhan budaya Nusantara.",
      "foundingDate": "2026",
      "foundingLocation": { "@type": "Place", "name": "Indonesia" },
      "areaServed": { "@type": "Country", "name": "Indonesia" },
      "knowsLanguage": "id",
      "slogan": "Abadikan momen bahagia Anda dengan elegan",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+62-812-3456-7890",
          "contactType": "customer service",
          "email": "hello@sajijanji.online",
          "availableLanguage": "Indonesian",
          "areaServed": "ID"
        }
      ],
      "sameAs": [
        "https://instagram.com/sajijanji_id",
        "https://tiktok.com/@sajijanji_id",
        "https://youtube.com/@sajijanji"
      ]
    },

    // ── 3. WebSite (SearchAction for sitelinks) ─────────────
    {
      "@type": "WebSite",
      "name": "SajiJanji",
      "url": "https://sajijanji.online",
      "description": "Platform undangan pernikahan digital premium Indonesia dengan template eksklusif budaya Nusantara",
      "inLanguage": "id",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sajijanji.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    // ── 4. FAQPage (8 pasang Q&A konversasional) ────────────
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Apa itu SajiJanji dan bagaimana cara membuat undangan digital di SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji adalah platform undangan pernikahan digital premium buatan Indonesia. Cara membuatnya sangat mudah: (1) Daftar akun gratis di sajijanji.online, (2) Pilih salah satu dari 11+ template eksklusif budaya Nusantara, (3) Isi data pernikahan Anda seperti nama mempelai, tanggal acara, lokasi, dan foto prewedding melalui editor visual, (4) Preview langsung di emulator HP untuk melihat tampilan akhir, (5) Publish dan bagikan link undangan unik ke WhatsApp, Instagram, dan media sosial lainnya. Seluruh proses bisa selesai dalam 10-15 menit tanpa perlu keahlian desain atau coding."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa harga untuk buat undangan digital di SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji menawarkan 3 paket harga yang terjangkau: Paket Basic seharga Rp49.900 (10 token, 1 template, galeri 10 foto, RSVP standar), Paket Standard seharga Rp99.900 (galeri 20 foto, RSVP + pesan tamu, prioritas dukungan), dan Paket Premium seharga Rp199.000 (video wedding story, galeri tanpa batas, desain custom, dukungan 24/7). Semua paket bersifat bayar sekali dan aktif selamanya — tidak ada biaya langganan bulanan. Pembayaran bisa dilakukan via QRIS yang sangat mudah."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah undangan digital SajiJanji bisa diedit lewat HP atau harus pakai laptop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, SajiJanji dirancang mobile-first sehingga Anda bisa membuat dan mengedit undangan digital langsung dari HP (smartphone). Namun, untuk pengalaman editing yang lebih optimal, kami merekomendasikan menggunakan laptop atau desktop. Platform kami memiliki fitur live preview di emulator mobile, sehingga meskipun Anda mengedit di laptop, Anda bisa langsung melihat tampilan undangan persis seperti yang akan dilihat tamu di HP mereka."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama proses pembuatan undangan digital di SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Proses pembuatan undangan digital di SajiJanji sangat cepat. Rata-rata pasangan menyelesaikan undangan mereka dalam waktu 10 hingga 30 menit. Anda hanya perlu memilih template, mengisi data mempelai, jadwal acara, upload foto prewedding, dan mengatur detail seperti musik latar dan amplop digital. Setelah selesai, undangan langsung bisa dipublish dan dibagikan. Tidak perlu menunggu proses desain manual."
          }
        },
        {
          "@type": "Question",
          "name": "Apa saja fitur yang tersedia di undangan digital SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji menyediakan fitur undangan digital yang sangat lengkap, meliputi: (1) 11+ template premium eksklusif dari berbagai budaya Nusantara, (2) RSVP online otomatis — tamu bisa konfirmasi kehadiran langsung, (3) Amplop digital / kado online — tamu bisa transfer hadiah via rekening bank yang Anda tentukan, (4) Love Story timeline interaktif — ceritakan perjalanan cinta Anda dengan foto, (5) Galeri foto prewedding dengan layout masonry yang cantik, (6) Countdown timer otomatis menuju hari H pernikahan, (7) Musik latar dari library pilihan, (8) Live preview real-time di emulator HP, (9) Ucapan dan doa dari tamu secara online, (10) Peta lokasi Google Maps interaktif, (11) Cover animasi opening yang elegan."
          }
        },
        {
          "@type": "Question",
          "name": "Template undangan digital apa saja yang tersedia di SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji memiliki 11+ template undangan digital premium yang mencakup berbagai budaya dan gaya: template modern (Nero Gold, Aura Dark), template romantis (Pink), template klasik (Royal), template tradisional Nusantara (Jawa Royal Keraton, Sunda Anggun Priangan, Minang Maharaja, Bali Sacred Luxury, Batak Heritage, Bugis Golden Silk), dan template kekinian (Gen Z Pastel dengan estetika cream, sage, beige). Semua template dirancang responsif untuk tampilan sempurna di semua ukuran layar HP. Template baru terus ditambahkan secara berkala."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah undangan digital SajiJanji ada fitur RSVP dan amplop digital?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya! SajiJanji menyediakan kedua fitur tersebut. Fitur RSVP online memungkinkan tamu untuk mengonfirmasi kehadiran secara langsung melalui undangan digital Anda — hasilnya bisa Anda pantau di dashboard pribadi secara real-time. Fitur amplop digital (kado online) memungkinkan tamu yang berhalangan hadir atau ingin memberikan hadiah berupa uang untuk langsung mentransfer ke rekening bank yang Anda tentukan (BCA, Mandiri, BRI, dll). Kedua fitur ini sangat praktis dan modern."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah undangan digital di SajiJanji aktif selamanya atau ada masa berlaku?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Undangan digital yang Anda buat di SajiJanji akan aktif selamanya (lifetime access). Tidak ada masa berlaku dan tidak ada biaya perpanjangan. Setelah Anda membayar paket sekali saja, undangan Anda akan tetap bisa diakses oleh siapapun yang memiliki linknya. Ini berbeda dengan beberapa platform lain yang membatasi masa aktif undangan. SajiJanji percaya bahwa momen pernikahan Anda harus bisa dikenang selamanya."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara membagikan undangan digital SajiJanji ke tamu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Setelah undangan digital Anda selesai dibuat dan dipublish, SajiJanji akan menghasilkan link unik eksklusif untuk undangan Anda. Link ini bisa langsung Anda bagikan ke tamu melalui WhatsApp (chat pribadi maupun grup), Instagram DM, Instagram Story, Facebook, Telegram, Email, atau media sosial lainnya. Cukup copy link dan kirim — tamu tinggal klik untuk membuka undangan digital Anda yang cantik dan interaktif."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah SajiJanji aman dan bisa dipercaya untuk undangan pernikahan saya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tentu saja. SajiJanji sudah dipercaya oleh lebih dari 2.000 pasangan di seluruh Indonesia. Platform kami menggunakan teknologi modern (Next.js, Supabase, Prisma) dengan keamanan data terenkripsi. Setiap undangan memiliki link unik yang aman. Data pribadi Anda seperti nomor rekening di amplop digital hanya ditampilkan di undangan Anda dan tidak dibagikan ke pihak ketiga. Pembayaran menggunakan QRIS yang aman dengan konfirmasi otomatis."
          }
        },

        // ── Problem-Solving FAQ: Pasar Indonesia ──────────────
        {
          "@type": "Question",
          "name": "Undangan cetak mahal banget, ada alternatif undangan nikah yang murah tapi tetap elegan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sangat ada. Masalah utama undangan cetak di Indonesia adalah biaya yang mahal — rata-rata Rp3.000-Rp15.000 per lembar, belum termasuk ongkos kirim. Jika mengundang 500 tamu, biayanya bisa mencapai Rp1,5 juta hingga Rp7,5 juta hanya untuk undangan saja. SajiJanji hadir sebagai solusi: dengan harga mulai Rp49.900 (bayar sekali, aktif selamanya), Anda bisa mengundang tamu tanpa batas melalui link digital yang bisa dibagikan via WhatsApp. Desainnya justru lebih elegan karena dilengkapi animasi, musik, galeri foto, dan fitur interaktif seperti RSVP dan amplop digital yang tidak mungkin ada di undangan cetak. Lebih hemat, lebih modern, dan lebih ramah lingkungan."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara mengundang tamu yang di luar kota atau luar pulau untuk pernikahan saya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ini adalah masalah klasik pernikahan di Indonesia — banyak keluarga dan teman yang tersebar di berbagai kota dan pulau. Dengan undangan digital SajiJanji, Anda cukup membagikan satu link undangan melalui WhatsApp, SMS, atau media sosial. Tamu di Jakarta, Surabaya, Medan, Makassar, hingga Papua bisa langsung membuka undangan dari HP mereka tanpa menunggu pengiriman fisik. Fitur RSVP online memungkinkan mereka mengonfirmasi kehadiran secara instan, dan fitur amplop digital memudahkan tamu yang tidak bisa hadir untuk tetap mengirimkan kado berupa uang via transfer bank. Solusi sempurna untuk keluarga Indonesia yang tersebar di seluruh Nusantara."
          }
        },
        {
          "@type": "Question",
          "name": "Saya tidak bisa desain, apakah tetap bisa bikin undangan digital yang bagus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tentu bisa! SajiJanji dirancang khusus agar siapa pun bisa membuat undangan digital yang cantik tanpa keahlian desain sama sekali. Anda tinggal pilih dari 11+ template premium yang sudah dirancang oleh desainer profesional, lalu isi data pernikahan Anda (nama, tanggal, lokasi, foto). Semua sudah otomatis tertata rapi. Anda juga bisa melihat hasilnya secara real-time melalui fitur live preview di emulator HP sebelum mempublikasikannya. Tidak perlu Photoshop, Canva, atau coding — cukup isi form dan undangan Anda langsung siap dibagikan."
          }
        },
        {
          "@type": "Question",
          "name": "Ada template undangan digital yang sesuai adat Jawa, Sunda, Minang, Bali, Batak, atau Bugis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, SajiJanji adalah satu-satunya platform undangan digital di Indonesia yang menyediakan template lengkap untuk berbagai budaya Nusantara. Tersedia: Jawa Royal Keraton (nuansa batik dan emas keraton Yogya/Solo), Sunda Anggun Priangan (keanggunan adat Sunda dengan sentuhan alam), Minang Maharaja (kemeriahan Baralek Gadang khas Minangkabau), Bali Sacred Luxury (kemewahan resort dan kesucian adat Bali), Batak Heritage (ketegasan ornamen Gorga Batak), dan Bugis Golden Silk (kekayaan sutra dan emas Bugis Makassar). Setiap template dirancang dengan riset mendalam terhadap estetika budaya masing-masing suku, sehingga terasa otentik dan menghormati tradisi. Ini solusi sempurna bagi pasangan Indonesia yang ingin menikah secara modern tanpa meninggalkan akar budaya mereka."
          }
        },
        {
          "@type": "Question",
          "name": "Gimana kalau tanggal pernikahan atau lokasi berubah mendadak, apakah undangan digital bisa diubah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Inilah keunggulan besar undangan digital dibanding undangan cetak. Di SajiJanji, Anda bisa mengubah informasi undangan kapan saja — termasuk tanggal, jam, lokasi acara, foto, bahkan template desainnya. Perubahan langsung ter-update secara real-time di link yang sama, sehingga tamu yang sudah menerima link akan otomatis melihat informasi terbaru. Tidak perlu cetak ulang, tidak ada biaya tambahan, dan tidak ada undangan lama yang menyesatkan. Ini sangat penting di Indonesia di mana perubahan jadwal pernikahan cukup sering terjadi karena berbagai faktor seperti ketersediaan gedung, cuaca, atau koordinasi keluarga besar."
          }
        },
        {
          "@type": "Question",
          "name": "Tamu saya banyak yang gaptek dan belum terbiasa undangan digital, apakah mereka bisa buka?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pasti bisa. Undangan digital SajiJanji dirancang mobile-first dan sangat user-friendly — tamu cukup klik link yang Anda kirim via WhatsApp, dan undangan langsung terbuka di browser HP mereka tanpa perlu install aplikasi apapun. Tidak perlu login, tidak perlu download — tinggal klik dan buka. Tampilannya sudah dioptimasi untuk semua jenis HP termasuk HP Android murah sekalipun. Bahkan fitur RSVP dan ucapan hanya membutuhkan beberapa ketukan jari saja. Dari pengalaman 2.000+ pasangan pengguna SajiJanji, tamu dari berbagai usia — termasuk orang tua yang kurang familiar dengan teknologi — tidak mengalami kesulitan membuka undangan digital."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara terima kado uang dari tamu secara online tanpa ribet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji menyediakan fitur Amplop Digital yang mengatasi masalah ini dengan sangat praktis. Anda cukup memasukkan nomor rekening bank Anda (BCA, Mandiri, BRI, BNI, atau bank lainnya) saat mengisi data undangan. Nomor rekening ini akan tampil di section khusus 'Amplop Digital' di undangan Anda. Tamu yang ingin memberikan kado berupa uang — baik yang hadir maupun yang berhalangan — tinggal menyalin nomor rekening dan transfer langsung. Ini menggantikan tradisi amplop fisik yang berisiko hilang atau tertukar di acara pernikahan. Sangat cocok untuk budaya Indonesia di mana memberi angpao atau sumbangan berupa uang sudah menjadi kebiasaan umum di acara pernikahan."
          }
        },
        {
          "@type": "Question",
          "name": "Undangan digital bisa pakai musik latar tidak? Saya mau pakai lagu romantis untuk suasana undangan.",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bisa! SajiJanji menyediakan fitur musik latar (background music) yang otomatis diputar saat tamu membuka undangan digital Anda. Anda bisa memilih dari library musik yang tersedia — mulai dari lagu romantis, instrumental piano, gamelan Jawa, hingga musik pop Indonesia terpopuler. Musik akan diputar secara seamless di background sambil tamu menscroll seluruh section undangan mulai dari cover, profil mempelai, countdown, love story, galeri foto, hingga RSVP. Fitur ini memberikan pengalaman membuka undangan yang sangat emosional dan berkesan — sesuatu yang tidak bisa ditawarkan oleh undangan cetak biasa."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah undangan digital SajiJanji bisa menampilkan peta lokasi acara nikah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, setiap undangan digital SajiJanji memiliki section Jadwal Acara yang dilengkapi dengan integrasi peta lokasi interaktif. Anda cukup memasukkan link Google Maps dari lokasi akad nikah dan resepsi, dan tamu bisa langsung klik untuk membuka navigasi di HP mereka. Ini sangat membantu tamu yang berasal dari luar kota atau yang tidak familiar dengan lokasi gedung pernikahan Anda. Peta bisa mengarahkan tamu langsung ke lokasi yang tepat sehingga mengurangi risiko tamu tersesat — masalah yang sangat umum terjadi di acara pernikahan Indonesia, terutama di gedung-gedung yang berada di dalam kompleks atau area yang kurang dikenal."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana cara mengetahui berapa tamu yang akan hadir di acara pernikahan saya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SajiJanji memiliki fitur RSVP (Répondez s'il vous plaît) online yang terintegrasi langsung di undangan digital Anda. Setiap tamu yang membuka undangan bisa langsung mengonfirmasi kehadirannya melalui tombol RSVP — memilih apakah akan hadir, tidak hadir, atau masih ragu. Semua data RSVP bisa Anda pantau secara real-time melalui dashboard pribadi Anda di SajiJanji. Anda bisa melihat jumlah total konfirmasi hadir, nama-nama tamu yang sudah mengonfirmasi, dan pesan ucapan mereka. Ini sangat membantu untuk perencanaan catering, kursi, dan logistik pernikahan — mengurangi pemborosan karena estimasi tamu yang meleset, masalah yang sangat umum terjadi di pernikahan Indonesia."
          }
        },
        {
          "@type": "Question",
          "name": "Saya mau nikah bulan depan, apakah masih sempat bikin undangan digital di SajiJanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sangat sempat! Justru inilah keunggulan undangan digital SajiJanji dibandingkan undangan cetak. Undangan cetak membutuhkan waktu minimal 1-2 minggu untuk desain, cetak, dan distribusi. Sedangkan di SajiJanji, Anda bisa menyelesaikan undangan digital dalam waktu 10-30 menit saja. Pilih template, isi data, upload foto, dan langsung publish — link undangan bisa langsung Anda bagikan ke seluruh tamu via WhatsApp dalam hitungan detik. Bahkan jika Anda nikah besok pun, undangan digital masih bisa dibuat hari ini! Banyak pasangan Indonesia menggunakan SajiJanji justru karena fleksibilitas waktu ini — tidak ada lagi drama deadline percetakan yang mepet."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah undangan digital bisa menggantikan undangan cetak sepenuhnya di Indonesia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Di era digital saat ini, undangan digital sudah sangat diterima di Indonesia — terutama di kalangan milenial dan Gen Z. Berdasarkan tren 2024-2026, mayoritas pasangan muda Indonesia sudah beralih ke undangan digital sebagai undangan utama mereka. Kelebihan undangan digital dibanding cetak: (1) Jauh lebih hemat — Rp49.900 vs jutaan rupiah untuk cetak, (2) Bisa dikirim ke tamu di seluruh Indonesia dalam hitungan detik via WhatsApp, (3) Ramah lingkungan — zero paper waste, (4) Dilengkapi fitur interaktif (RSVP, amplop digital, musik, galeri foto, countdown), (5) Bisa diubah kapan saja tanpa biaya tambahan, (6) Aktif selamanya sebagai kenang-kenangan digital. Namun, beberapa pasangan tetap mencetak undangan fisik dalam jumlah kecil untuk orang tua atau tetua keluarga sebagai bentuk penghormatan. SajiJanji sangat mendukung pendekatan hybrid ini — undangan digital sebagai distribusi utama, dan cetak minimal untuk keluarga inti saja."
          }
        },
        {
          "@type": "Question",
          "name": "Capek harus antar undangan fisik ke rumah tamu satu per satu, ada solusinya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ini adalah keluhan paling umum dari calon pengantin di Indonesia. Mengantar undangan cetak secara fisik ke rumah tamu satu per satu sangat melelahkan, menghabiskan waktu berhari-hari, boros bensin, dan sering kali tamu tidak ada di rumah sehingga harus bolak-balik. Belum lagi jika tamu Anda tersebar di berbagai kota — biaya pengiriman via ekspedisi bisa sangat mahal. Dengan undangan digital SajiJanji, semua itu tidak perlu lagi. Anda cukup membuat undangan satu kali, lalu bagikan linknya ke seluruh tamu melalui WhatsApp, Instagram DM, atau media sosial lainnya — semuanya bisa dilakukan dari sofa rumah Anda dalam hitungan menit. Tidak perlu naik motor keliling kampung, tidak perlu antri di kantor pos, tidak perlu koordinasi siapa yang sudah dan belum diantar. Satu link untuk semua tamu, sampai dalam hitungan detik. Waktu dan energi yang Anda hemat bisa dialokasikan untuk persiapan pernikahan lainnya yang lebih penting, seperti fitting baju, koordinasi catering, atau sekadar istirahat menjelang hari bahagia Anda."
          }
        }
      ]
    },

    // ── 5. BreadcrumbList ───────────────────────────────────
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://sajijanji.online" },
        { "@type": "ListItem", "position": 2, "name": "Template", "item": "https://sajijanji.online/#template" },
        { "@type": "ListItem", "position": 3, "name": "Fitur", "item": "https://sajijanji.online/#fitur" },
        { "@type": "ListItem", "position": 4, "name": "Harga", "item": "https://sajijanji.online/#harga" },
        { "@type": "ListItem", "position": 5, "name": "Testimoni", "item": "https://sajijanji.online/#testimoni" }
      ]
    },

    // ── 6. HowTo — Panduan langkah demi langkah ─────────────
    {
      "@type": "HowTo",
      "name": "Cara Membuat Undangan Pernikahan Digital di SajiJanji",
      "description": "Panduan lengkap langkah demi langkah membuat undangan pernikahan digital premium di SajiJanji. Proses cepat 10-30 menit tanpa keahlian desain atau coding. Cocok untuk pasangan milenial dan Gen Z Indonesia.",
      "totalTime": "PT30M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "IDR",
        "value": "49900"
      },
      "tool": [
        { "@type": "HowToTool", "name": "Smartphone atau Laptop dengan browser" },
        { "@type": "HowToTool", "name": "Foto prewedding atau foto bersama pasangan" },
        { "@type": "HowToTool", "name": "Data lokasi acara (alamat gedung dan link Google Maps)" }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Daftar Akun Gratis di SajiJanji",
          "text": "Buka sajijanji.online dan klik tombol 'Daftar Gratis'. Isi nama lengkap, email, dan kata sandi. Tidak perlu kartu kredit. Akun Anda langsung aktif dan siap digunakan."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Pilih Template Undangan Favorit",
          "text": "Jelajahi koleksi 11+ template premium dari berbagai budaya Nusantara: Gen Z Pastel untuk gaya kekinian, Jawa Royal Keraton untuk adat Jawa, Bali Sacred Luxury untuk nuansa tropis, dan masih banyak lagi. Klik preview untuk melihat tampilan sebenarnya di emulator HP sebelum memilih."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Isi Data Pernikahan Anda",
          "text": "Masukkan informasi mempelai pria dan wanita (nama, nama orang tua, Instagram), jadwal acara (akad nikah dan resepsi dengan tanggal, jam, lokasi, dan link Google Maps), upload foto prewedding untuk galeri dan love story, serta atur musik latar, dress code, dan pesan penutup."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Preview di Emulator Mobile",
          "text": "Gunakan fitur live preview real-time untuk melihat tampilan undangan Anda persis seperti yang akan dilihat tamu di HP mereka. Scroll semua section dari cover, profil mempelai, countdown, jadwal acara, love story, galeri, amplop digital, RSVP, hingga closing. Edit dan sesuaikan sampai Anda puas dengan hasilnya."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Publish dan Bagikan Link ke Tamu",
          "text": "Setelah puas dengan tampilan, klik 'Publish' untuk menerbitkan undangan digital Anda. Salin link unik yang dihasilkan dan bagikan ke seluruh tamu melalui WhatsApp, Instagram, Facebook, atau media sosial lainnya. Tamu cukup klik link untuk membuka undangan — tanpa perlu install aplikasi. Pantau RSVP dan ucapan tamu secara real-time melalui dashboard."
        }
      ]
    }
  ]
};

export function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
