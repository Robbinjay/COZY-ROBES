import { Product, Collection, StoreConfig, FAQItem, BlogPost } from './types';

export const MINIMUM_ORDER_AMOUNT = 69.99;

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  announcementBar: {
    enabled: true,
    text: 'FREE UK DELIVERY ON ORDERS OVER £100 • 30-DAY COZY GUARANTEE',
    linkText: 'Shop Now',
    linkUrl: '/shop',
  },
  brand: {
    name: 'CozyCorobes',
    domain: 'https://cozyrobe.co.uk',
    tagline: 'Warmth You Can Wear.',
    supportEmail: 'support@cozyrobe.co.uk',
    supportHours: 'Monday – Friday, 9:00 AM – 5:00 PM GMT',
    address: 'CozyCorobes UK, 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom',
  },
  shipping: {
    freeShippingThreshold: 100,
    standardShippingRate: 3.99,
    expressShippingRate: 6.99,
    processingTime: '1 to 2 business days',
    deliveryTime: '2 to 4 business days via Royal Mail / DPD',
  },
  returns: {
    returnWindowDays: 30,
    policySummary: 'Enjoy 30 days to try your CozyCorobes item at home across the UK. Clean, unwashed items in original condition qualify for a full refund or free exchange.',
  },
  socialLinks: {
    instagram: 'https://instagram.com/cozycorobes',
    pinterest: 'https://pinterest.com/cozycorobes',
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-cozyco-pillow',
    slug: 'cozyco-pillow',
    name: 'CozyCo Cloud Pillow',
    subtitle: 'Cooling Memory Foam Pillow | Ergonomic Cervical Spine Support',
    tagline: 'Engineered with cooling memory foam to deliver perfect cervical spine support and all-night pressure relief.',
    price: 19.99,
    compareAtPrice: 39.99,
    rating: 4.8,
    reviewCount: 324,
    category: 'cozy-accessories',
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    images: [
      '/images/cozyco_cloud_pillow.png',
    ],
    description: 'The CozyCo Cloud Pillow is an ergonomic cooling memory foam pillow designed for side, back, and stomach sleepers. Featuring breathable heat-dissipating airflow channels and a silky hypoallergenic bamboo blend cover, it cradles your neck to eliminate morning stiffness and keep you pleasantly cool from bedtime to dawn.',
    features: [
      '🛌 Ergonomic Cervical Spine Alignment: Relieves pressure on neck, shoulders, and upper back',
      '❄️ Advanced Cooling Airflow Channels: Regulates temperature to prevent overheating and night sweats',
      '🌙 Supports All Sleep Positions: Optimal contours for side sleepers, back sleepers, and stomach sleepers',
      '☁️ High-Density Adaptive Memory Foam: Retains structural shape night after night without sagging',
      '🌿 Hypoallergenic Bamboo Washable Cover: Naturally dust-mite resistant, breathable, and machine washable'
    ],
    specs: [
      { label: 'Material', value: 'High-Density Adaptive Cooling Memory Foam Core' },
      { label: 'Cover Fabric', value: 'Hypoallergenic Bamboo-Viscose Breathable Blend' },
      { label: 'Dimensions', value: '60 cm x 40 cm x 12 cm (Standard / Queen)' },
      { label: 'Care Instructions', value: 'Machine wash outer cover cold; spot clean memory foam core' },
      { label: 'Firmness Level', value: 'Medium-Plush Adaptive Support' },
    ],
    howItWorks: [
      'Unbox your pillow and allow 24 hours for the compressed memory foam to fully expand.',
      'Slip on the included cooling bamboo cover and rest your head in the gentle cervical contour.',
      'Enjoy restorative spinal alignment and cool, uninterrupted sleep.',
    ],
    careInstructions: [
      'Unzip and remove the bamboo outer cover for cold machine washing.',
      'Do not machine wash or soak the internal memory foam core.',
      'Spot clean memory foam with a damp cloth and mild soap if needed; air dry away from direct sunlight.'
    ],
    colors: [
      { name: 'Pure Cloud White', hex: '#FFFFFF', inStock: true }
    ],
    sizes: ['Standard / Queen'],
    variants: [
      { id: 'ccp-white-std', name: 'Pure Cloud White / Standard', colorName: 'Pure Cloud White', colorHex: '#FFFFFF', size: 'Standard / Queen', inStock: true, sku: 'CCP-WHT-STD' }
    ],
    inStock: true,
    shippingNote: 'In stock in our UK warehouse. Dispatches via Royal Mail Tracked within 24 hours.',
    reviews: [
      {
        id: 'rev-p1',
        author: 'Charlotte D.',
        location: 'Bristol, England',
        rating: 5,
        date: '12 February 2026',
        title: 'Finally wake up without neck stiffness',
        comment: 'I was skeptical about cervical contour pillows, but this has stopped my morning shoulder pain completely. The cooling channels keep it from getting warm during the night.',
        verifiedPurchase: true,
      },
      {
        id: 'rev-p2',
        author: 'George T.',
        location: 'Oxford, England',
        rating: 5,
        date: '20 January 2026',
        title: 'Premium memory foam density',
        comment: 'Very supportive yet delightfully soft. The bamboo cover is silky and washes easily.',
        verifiedPurchase: true,
      }
    ],
  },
  {
    id: 'prod-cozy-co-robes',
    slug: 'cozy-co-robes',
    name: 'The Cozy Co. Robe',
    subtitle: 'Oversized 50" x 70" Heated Wearable Blanket with 7 Heat Settings',
    tagline: 'The UK’s premier electric heated robe and oversized wearable blanket with 7 heat levels and deep cloud sherpa warmth.',
    price: 69.99,
    compareAtPrice: 119.00,
    rating: 4.9,
    reviewCount: 50,
    category: 'heated-robes',
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    images: [
      '/images/products/cozy-co-robe/img_1.png',
      '/images/products/cozy-co-robe/img_2.png',
      '/images/products/cozy-co-robe/img_3.png',
      '/images/products/cozy-co-robe/img_4.png',
      '/images/products/cozy-co-robe/img_5.png',
      '/images/products/cozy-co-robe/img_6.png',
      '/images/products/cozy-co-robe/img_7.png',
      '/images/products/cozy-co-robe/img_8.png',
      '/images/products/cozy-co-robe/img_9.png',
      '/images/products/cozy-co-robe/img_10.png',
      '/images/products/cozy-co-robe/img_11.png',
      '/images/products/cozy-co-robe/img_12.png',
    ],
    description:
      'Experience true cold-weather sanctuary with The Cozy Co. Robe — the UK’s favorite electric heated robe and wearable heated blanket. Generously cut in an oversized 50” x 70” (127 cm x 178 cm) silhouette, this ultra-plush wearable throw wraps you from shoulders to ankles in deep cloud sherpa and velvety 320 GSM micro-fleece. Powered by safe low-voltage carbon-fiber micro-conductors across the chest, shoulders, lower lumbar, and dual deep front pockets, it delivers 7 customizable heat settings at the touch of a button. Machine washable, whisper-quiet, and energy-efficient for working from home or evening unwinding.',
    features: [
      '🔥 7 Precision Heat Settings: Fine-tune your temperature from gentle ambient comfort (Level 1 / 35°C) to restorative deep heat (Level 7 / 55°C)',
      '🛋️ Oversized 50" x 70" (127 cm x 178 cm) Full-Body Coverage: Comfortably drapes heights 5’0” to 6’4” (XS to 3XL) with complete ankle coverage when seated',
      '☁️ 320 GSM Velvet Fleece & High-Loft Sherpa: Traps radiant body heat naturally even when powered down',
      '⚡ Low-Voltage DC Carbon-Fiber Elements: Flexible, undetectable heating micro-wires with low EMF and UKCA & CE electrical compliance',
      '🧤 Multi-Zone Warmth: Simultaneous heating across shoulders, upper back, lower lumbar, and dual heated front pockets',
      '🎛️ Backlit LED Remote Controller: Ergonomic handheld control with selectable 2, 4, or 8-hour auto safety shut-off timer',
      '🧼 100% Machine Washable: Detachable quick-release magnetic power harness with waterproof silicone safety cap',
      '🇬🇧 UK 3-Pin Fused Low-Voltage Power: 9.5-foot power cord provides total lounging freedom around your living room or home office',
    ],
    specs: [
      { label: 'Dimensions', value: '50 inches x 70 inches (127 cm x 178 cm) Oversized Wrap Cut' },
      { label: 'Fit Range', value: 'Unisex One Size Fits Most (Heights 5’0” to 6’4”, Sizes XS to 3XL)' },
      { label: 'Heat Settings', value: '7 Digital Temperature Levels (35°C / 95°F to 55°C / 131°F)' },
      { label: 'Shell Material', value: '320 GSM High-Density Micro-Plush Velvet Fleece' },
      { label: 'Lining Material', value: '280 GSM Deep-Loft Cloud Sherpa Fleece' },
      { label: 'Heating Elements', value: 'Ultra-thin flexible carbon-fiber micro-conductors (Low EMF)' },
      { label: 'Power Supply', value: 'UK 3-Pin Fused Wall Plug (220–240V AC converted to safe 12V DC)' },
      { label: 'Cord Length', value: '9.5 ft (2.9 m) with magnetic quick-breakaway safety coupling' },
      { label: 'Safety Timer', value: 'Selectable 2-hour, 4-hour, or 8-hour automatic shut-off protection' },
      { label: 'Care & Washing', value: 'Machine wash cold on delicate cycle; line dry or tumble dry low' },
      { label: 'Certifications', value: 'UKCA, CE, RoHS certified for household electrical safety' },
      { label: 'Warranty', value: '1-Year CozyCorobes UK Safety & Quality Warranty' },
    ],
    howItWorks: [
      'Slip into the oversized wearable blanket robe and drape the generous hood or plush collar comfortably around your neck.',
      'Connect the quick-release magnetic power lead into the discreet interior waist port and plug the UK adapter into the wall.',
      'Press the power button on the backlit LED controller to choose between 7 customized temperature levels.',
      'Feel enveloping, radiant warmth surround your chest, back, and hands in under 60 seconds.',
    ],
    careInstructions: [
      'Always disconnect the power controller cord from the robe port before laundering.',
      'Snap the integrated waterproof silicone garment cap firmly over the internal socket.',
      'Machine wash on gentle or delicate cold cycle (max 30°C) with mild liquid detergent.',
      'Do not use bleach, do not use fabric softeners, and never dry clean or iron.',
      'Line dry flat or tumble dry on low delicate heat. Ensure the connector port is 100% dry before reconnecting power.',
    ],
    colors: [
      { name: 'Charcoal', hex: '#3E424B', inStock: true },
      { name: 'Blush Pink', hex: '#E0A899', inStock: true },
      { name: 'Cardinal', hex: '#8C2D35', inStock: true },
    ],
    sizes: ['One Size Fits Most (50" x 70")'],
    variants: [
      { id: 'ccr-chr-os', name: 'Charcoal / One Size (50" x 70")', colorName: 'Charcoal', colorHex: '#3E424B', size: 'One Size Fits Most (50" x 70")', inStock: true, sku: 'CCR-COZY-CHR' },
      { id: 'ccr-blu-os', name: 'Blush Pink / One Size (50" x 70")', colorName: 'Blush Pink', colorHex: '#E0A899', size: 'One Size Fits Most (50" x 70")', inStock: true, sku: 'CCR-COZY-BLU' },
      { id: 'ccr-car-os', name: 'Cardinal / One Size (50" x 70")', colorName: 'Cardinal', colorHex: '#8C2D35', size: 'One Size Fits Most (50" x 70")', inStock: true, sku: 'CCR-COZY-CAR' },
    ],
    inStock: true,
    shippingNote: 'In stock in our UK facility. Dispatches via Royal Mail Tracked within 24 hours with free UK delivery.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Fiona M.',
        location: 'Edinburgh, Scotland',
        rating: 5,
        date: '14 January 2026',
        title: 'Has completely transformed winter working from home',
        comment: 'I live in a drafty stone flat in Edinburgh where keeping the central heating on all day costs a fortune. The Cozy Co. Robe heats up almost instantly and level 3 keeps me perfectly warm through my 8-hour workday. The fabric is wonderfully thick and plush even before you turn the heat on. Couldn’t be happier!',
        verifiedPurchase: true,
        colorPurchased: 'Charcoal',
      },
      {
        id: 'rev-2',
        author: 'David & Gemma K.',
        location: 'Harrogate, North Yorkshire',
        rating: 5,
        date: '28 December 2025',
        title: 'Best Christmas gift by a mile',
        comment: 'Bought this for my wife who suffers from chilly hands and aching shoulders during winter. She lives in it! The heating elements across the shoulders and lower back are like a warm hug, and the pockets getting warm is genius. Royal Mail delivery arrived in 2 days as promised.',
        verifiedPurchase: true,
        colorPurchased: 'Blush Pink',
      },
      {
        id: 'rev-3',
        author: 'Marcus L.',
        location: 'Bath, Somerset',
        rating: 5,
        date: '03 February 2026',
        title: 'Generous 50x70 size is truly full coverage',
        comment: 'I am 6 foot 2 and most wearable blankets leave my shins freezing. This 50" x 70" wrap completely covers me from neck to feet when curled up in my armchair. The digital control is backlit and super easy to operate, and the magnetic breakaway plug is very clever if the dog walks past the cord.',
        verifiedPurchase: true,
        colorPurchased: 'Charcoal',
      },
      {
        id: 'rev-4',
        author: 'Eleanor H.',
        location: 'St Albans, Hertfordshire',
        rating: 5,
        date: '19 February 2026',
        title: 'Washes like a dream on delicate cycle',
        comment: 'I was honestly nervous about machine-washing an electric garment, but following the silicone cap instructions it was so simple. Did a 30-degree gentle cycle, line dried it, and it fluffed right back up with the heating working flawlessly. Very well built.',
        verifiedPurchase: true,
        colorPurchased: 'Cardinal',
      },
      {
        id: 'rev-5',
        author: 'Hannah P.',
        location: 'Chester, Cheshire',
        rating: 4,
        date: '08 March 2026',
        title: 'Unbelievably soft and cozy warmth',
        comment: 'Extremely soft cloud sherpa lining and gorgeous deep burgundy/cardinal color. It gets hot enough that I usually stick to level 2 or 3, which is plenty. The cord is nice and long (nearly 10ft), giving plenty of room to move around.',
        verifiedPurchase: true,
        colorPurchased: 'Cardinal',
      },
    ],
  },
  {
    id: 'prod-cozy-glove',
    slug: 'cozy-glove',
    name: 'Cozy Glove',
    subtitle: 'Ultra-Soft Sherpa Fleece Lounge Gloves for Cold Hands',
    tagline: 'Keep cold hands toasty while typing, reading, or relaxing with our plush sherpa fleece lounge gloves.',
    price: 7.99,
    compareAtPrice: 14.99,
    rating: 4.8,
    reviewCount: 124,
    category: 'cozy-accessories',
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    images: [
      '/images/cozy_glove.png',
    ],
    description: 'The Cozy Glove offers the same cloud-soft sherpa lining as our signature heated robes, tailored specifically to soothe cold hands during chilly mornings and remote work sessions. Breathable, stretchy, and luxuriously plush without restricting finger dexterity.',
    features: [
      '🧤 High-Density Cloud Sherpa Lining: Traps natural body heat to warm cold fingers fast',
      '💻 Work From Home Friendly: Flexible ergonomic fit allows effortless keyboard typing and tablet use',
      '🌬️ Draft-Blocking Elastic Cuffs: Seals in warmth around wrists without tight constriction',
      '🧺 Machine Washable: Easy care on gentle cold wash cycle',
    ],
    specs: [
      { label: 'Material', value: 'Plush Sherpa & Thermal Micro-Fleece' },
      { label: 'Size', value: 'Unisex Stretch One Size Fits Most' },
      { label: 'Care Instructions', value: 'Machine wash cold delicate, air dry flat' },
    ],
    howItWorks: [
      'Slip on the gloves whenever chilly room drafts or cold keyboards make your hands stiff.',
      'Enjoy instant soothing thermal retention from the dual-layer fleece lining.',
    ],
    careInstructions: [
      'Machine wash on gentle cold cycle with similar colors.',
      'Tumble dry on low delicate heat or air dry flat.',
    ],
    colors: [
      { name: 'Classic Sherpa Cream', hex: '#EBE4D8', inStock: true }
    ],
    sizes: ['One Size'],
    variants: [
      { id: 'cg-os', name: 'Classic Sherpa Cream / One Size', colorName: 'Classic Sherpa Cream', colorHex: '#EBE4D8', size: 'One Size', inStock: true, sku: 'CG-SHERPA-OS' }
    ],
    inStock: true,
    shippingNote: 'In stock. Dispatches via Royal Mail Tracked within 24 hours.',
    reviews: [
      {
        id: 'rev-g1',
        author: 'Rebecca S.',
        location: 'Leeds, England',
        rating: 5,
        date: '04 February 2026',
        title: 'Perfect for working on the laptop in winter',
        comment: 'My hands get painfully cold when typing. These are soft, light, and allow me to type freely while keeping my fingers warm.',
        verifiedPurchase: true,
      }
    ],
  },
  {
    id: 'prod-cozyco-foot-warmer',
    slug: 'cozyco-foot-warmer',
    name: 'CozyCo Foot Warmer',
    subtitle: 'Electric Heated Foot Warmer Pouch for Under Desk & Sofa',
    tagline: 'Say goodbye to cold feet while working or lounging with this soothing, dual-foot electric heated pouch.',
    price: 12.99,
    compareAtPrice: 19.99,
    rating: 4.9,
    reviewCount: 215,
    category: 'cozy-accessories',
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    images: [
      '/images/cozyco_foot_warmer.avif',
    ],
    description: 'The CozyCo Foot Warmer is an electric heated foot warming pouch engineered to relieve ice-cold feet under your home office desk or on the couch. Featuring a spacious dual-foot sherpa pocket, fast 60-second warm-up, and safe low-voltage warmth, it delivers constant comforting heat so you can work and unwind in total comfort.',
    features: [
      '🔥 Fast Soothing Radiant Warmth: Rapid heating elements warm cold toes in under 60 seconds',
      '👣 Spacious Dual-Foot Pocket: Roomy design accommodates up to UK Men’s Shoe Size 13',
      '🛋️ Perfect Under Desk & Sofa Companion: Low profile fits neatly under work desks and coffee tables',
      '☁️ Ultra-Plush Sherpa Interior: Soft, deep pile fleece provides cozy insulation even when powered off',
      '🛡️ Overheat Protection & Auto Shut-Off: Built-in safety thermostat for complete peace of mind',
    ],
    specs: [
      { label: 'Power Source', value: 'UK Fused Low-Voltage Electric Cord (Safe 12V DC)' },
      { label: 'Interior Material', value: 'High-Loft Cloud Sherpa Fleece' },
      { label: 'Exterior Fabric', value: 'High-Density Micro-Plush Velvet' },
      { label: 'Dimensions', value: '38 cm x 35 cm x 20 cm' },
      { label: 'Safety Feature', value: 'Automatic Safety Shut-Off Overheat Protection' },
    ],
    howItWorks: [
      'Place the foot warmer under your desk or in front of your sofa.',
      'Plug into any standard UK wall outlet and switch on.',
      'Slip both feet into the plush sherpa pouch and enjoy immediate soothing heat.',
    ],
    careInstructions: [
      'Unplug from power outlet before cleaning.',
      'Removable inner fleece liner is machine washable on delicate cold cycle.',
      'Spot clean outer shell with a slightly damp cloth.',
    ],
    colors: [
      { name: 'Slate Charcoal', hex: '#3E424B', inStock: true }
    ],
    sizes: ['One Size Fits All (Up to UK 13)'],
    variants: [
      { id: 'cfw-os', name: 'Slate Charcoal / One Size', colorName: 'Slate Charcoal', colorHex: '#3E424B', size: 'One Size', inStock: true, sku: 'CFW-CHAR-OS' }
    ],
    inStock: true,
    shippingNote: 'In stock in our UK facility. Dispatches via Royal Mail Tracked within 24 hours.',
    reviews: [
      {
        id: 'rev-fw1',
        author: 'Simon R.',
        location: 'Newcastle, England',
        rating: 5,
        date: '18 January 2026',
        title: 'An absolute lifesaver under my home desk',
        comment: 'My home office has wood flooring that gets freezing in January. This pouch heats up in 60 seconds and fits both feet with plenty of wiggle room. Super quiet and safe.',
        verifiedPurchase: true,
      },
      {
        id: 'rev-fw2',
        author: 'Bethany C.',
        location: 'Norwich, England',
        rating: 5,
        date: '25 February 2026',
        title: 'Heavenly for cold toes on the sofa',
        comment: 'So cozy and soft inside. Keeps my feet warm while watching TV in the evening. Very low electricity usage too!',
        verifiedPurchase: true,
      }
    ],
  }
];

export const COLLECTIONS: Collection[] = [
  {
    slug: 'heated-robes',
    title: 'Heated Robes & Wearables',
    subtitle: 'Advanced wearable heating technology tailored for personal comfort at home.',
    description: 'Explore our flagship electric heated robes, wearable heated blankets, and targeted warming garments designed to keep you toasty without heating the entire house.',
    heroImage: '/images/hero_heated_robe.jpg',
    metaTitle: 'Heated Robes UK & Wearable Heated Blankets | CozyCorobes',
    metaDescription: 'Shop premium electric heated robes and wearable heated blankets in the UK. Multi-zone carbon-fiber heat, machine-washable sherpa fleece, and 7 heat settings.',
  },
  {
    slug: 'cozy-accessories',
    title: 'Cozy Accessories',
    subtitle: 'Thoughtful additions for ultimate home relaxation and cold-weather comfort.',
    description: 'Complete your personal comfort sanctuary with electric heated foot warmers, cooling memory foam pillows, and thermal sherpa fleece gloves.',
    heroImage: '/images/bootie_slippers_1.jpg',
    metaTitle: 'Cozy Home Accessories, Heated Foot Warmers & Pillows | CozyCorobes',
    metaDescription: 'Discover electric heated foot warmers, ergonomic cooling memory foam pillows, and plush sherpa lounge accessories crafted for winter relaxation at home.',
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'The latest innovations in personal comfort, soft textures, and everyday warmth.',
    description: 'Browse our newly released winter comfort editions, seasonal colorways, and upgraded low-voltage carbon-fiber heating technology.',
    heroImage: '/images/featured_robe_studio.jpg',
    metaTitle: 'New Heated Loungewear & Comfort Arrivals | CozyCorobes UK',
    metaDescription: 'Check out the latest CozyCorobes collection featuring new colors, oversized wearable blankets, and modern cold-weather comfort essentials.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Products',
    question: 'What is a heated robe?',
    answer: 'A heated robe is a premium plush loungewear garment that incorporates flexible, low-voltage carbon-fiber heating micro-elements safely embedded within the fabric. It provides gentle, even, radiant warmth directly to your body (back, chest, and pockets) so you stay comfortably warm without having to stay trapped under a traditional blanket. Explore our flagship model: The Cozy Co. Robe.',
  },
  {
    category: 'Products',
    question: 'How does the heated robe work?',
    answer: 'The robe is powered by connecting to a standard UK wall outlet via our included 9.5-foot quick-breakaway magnetic power cord (UK 3-pin fused plug). A soft-touch backlit LED remote controller lets you easily cycle between 7 digital temperature settings ranging from 35°C (gentle ambient warmth) to 55°C (deep soothing heat), reaching target temperature in under 60 seconds.',
  },
  {
    category: 'Care Instructions',
    question: 'How do I wash the heated robe?',
    answer: 'It is 100% machine washable! Simply unplug the quick-release magnetic cord, ensure the protective waterproof silicone cap is snapped securely over the garment socket, and wash on a gentle cold cycle (30°C) with mild detergent. Tumble dry on low delicate heat or line dry flat. For detailed instructions, read our complete Washing & Care Guide.',
  },
  {
    category: 'Shipping',
    question: 'How long does UK shipping take?',
    answer: 'All orders are dispatched within 24 hours from our UK fulfillment center. Standard delivery via Royal Mail Tracked 48 typically arrives in 2 to 3 business days and is FREE on all orders over £100. Expedited delivery is also available at checkout. Learn more on our Shipping Policy page.',
  },
  {
    category: 'Products',
    question: 'What sizes are available, and how do I choose the right size?',
    answer: 'Our signature The Cozy Co. Robe features an oversized 50" x 70" (127 cm x 178 cm) unisex wrap cut designed to generously fit heights from 5’0” to 6’4” (XS to 3XL). The spacious drape ensures complete ankle coverage when curled up on the sofa or working at a desk.',
  },
  {
    category: 'Products',
    question: 'What colors are available?',
    answer: 'The Cozy Co. Robe is available in three elegant home-decor tones: Charcoal, Blush Pink, and Cardinal. All fabrics use non-toxic, gentle dyes that preserve their rich hue and soft texture wash after wash.',
  },
  {
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We provide a 30-Day Cozy Trial. If your CozyCorobes item is not the warmest, softest loungewear piece you have ever owned, return it within 30 days of delivery for a full refund or free exchange. Check our Returns & Guarantee page for simple steps.',
  },
  {
    category: 'Orders',
    question: 'How do I contact customer support?',
    answer: 'Please send us a message on our [Contact Form](/contact) — we reply within minutes! Our customer support specialists monitor inquiries continuously during operational hours. You can also reach our administrative email directly at support@cozyrobe.co.uk.',
  },
  {
    category: 'Products',
    question: 'Is the heated robe safe to sleep in?',
    answer: 'Our electric heated robes feature built-in overheat protection and selectable automatic shut-off safety timers (2, 4, or 8 hours) with low EMF DC voltage. While perfectly safe for resting and sofa naps, we advise disconnecting before deep overnight sleep as standard best practice for all electrical heating garments.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'guide-to-choosing-a-heated-robe',
    title: 'The Ultimate Guide to Choosing the Right Heated Robe for Winter in the UK',
    seoTitle: 'How to Choose a Heated Robe: The Ultimate UK Buyer’s Guide | CozyCorobes',
    metaDescription: 'Discover what to look for when buying an electric heated robe: carbon-fiber micro-wires, safety certifications, fabric GSM weight, and zone heating benefits.',
    excerpt: 'With colder months arriving, an electric heated robe is the ultimate home comfort upgrade. Here is everything you need to evaluate before choosing the perfect wearable heated blanket.',
    coverImage: '/images/hero_heated_robe.jpg',
    author: 'Elena Vance, Home Comfort Specialist',
    publishedDate: '2026-01-14',
    updatedDate: '2026-02-10',
    readingTime: '6 min read',
    category: 'Buying Guides',
    content: `
### Why Wearable Warmth is Replacing Traditional Space Heaters
As energy prices fluctuate across the UK and remote work remains part of everyday life, homeowners and renters are rethinking home heating. Instead of turning up the central boiler to heat empty corridors and vacant rooms, personal zone heating focuses gentle radiant warmth directly on your body. 

An [electric heated robe](/collections/heated-robes) like [The Cozy Co. Robe](/products/cozy-co-robes) consumes a fraction of the electricity required by a 2,000W portable fan heater while delivering far superior comfort.

---

### 1. Heating Element Technology: Carbon-Fiber Micro-Wires vs Copper Coils
When comparing heated garments and electric throws, the internal heating element makes all the difference:
- **Carbon-Fiber Micro-Wires:** Modern garments use microscopic carbon-fiber conductors that are supple, lightweight, and completely undetectable through the fleece. They distribute warmth evenly without creating concentrated hot spots.
- **Low-Voltage DC Safety:** Always look for models that convert household 240V mains power into safe, low-voltage 12V DC power. This eliminates high-voltage hazards and ensures near-zero EMF emissions.
- **Auto Shut-Off Safety Timers:** Reliable heated robes come equipped with automatic safety shut-off options (such as 2, 4, or 8 hours) to prevent overheating if you drift off during a cozy evening unwind.

---

### 2. Fabric Weight, GSM, and Lining Textures
Electric heating is only half the equation. A premium robe should feel wonderfully comforting and draft-resistant even before you power it on:
- **High-Density Velvet Fleece (300+ GSM):** Acts as an insulating thermal barrier that retains body heat and shields against cold drafts.
- **Cloud Sherpa Lining:** Traps warm air pockets close to the skin, creating an ultra-soft cocoon.
- **Oversized Silhouette:** A generous 50" x 70" wrap cut ensures complete knee and ankle coverage when sitting on the sofa or working at a desk.

---

### 3. Machine Washability & Easy Care
A robe worn daily during morning coffee and family breakfast must be effortless to clean. Look for:
- Detachable quick-release magnetic power cords.
- Built-in waterproof silicone caps that seal the garment terminal during washing.
- Safe cold delicate machine washing capability. For step-by-step instructions, see our [Guide on How to Wash Heated Robes & Blankets](/blog/how-to-wash-heated-robes-blankets).

---

### 4. Complete Your Winter Comfort Sanctuary
Pairing your heated robe with targeted accessories provides comprehensive warmth:
- Warm chilly toes under your desk with the [CozyCo Foot Warmer](/products/cozyco-foot-warmer).
- Protect cold hands while typing with [Cozy Glove sherpa loungewear gloves](/products/cozy-glove).
- Rest your neck with the ergonomic [CozyCo Cloud Pillow](/products/cozyco-pillow).
- Explore our full range in the [Cozy Accessories collection](/collections/cozy-accessories).

---

### Summary Checklist for Buyers
When selecting your heated robe, ensure it offers:
1. Multi-zone heat coverage (chest, lumbar back, and deep front pockets).
2. At least 5–7 customizable heat settings.
3. UKCA/CE certified UK 3-pin fused plug with low-voltage operation.
4. Generous customer trial terms like our [30-Day Cozy Guarantee](/returns) and [Free UK Tracked Delivery](/shipping).
    `,
    relatedProductSlugs: ['cozy-co-robes', 'cozyco-foot-warmer', 'cozyco-pillow', 'cozy-glove'],
  },
  {
    slug: 'how-to-wash-heated-robes-blankets',
    title: 'How to Safely Wash and Care for Wearable Heated Robes & Blankets',
    seoTitle: 'How to Wash a Heated Robe Safely (Step-by-Step UK Guide) | CozyCorobes',
    metaDescription: 'Step-by-step instructions for machine washing, drying, and spot cleaning your electric heated robe without damaging heating elements or sherpa fleece.',
    excerpt: 'Learn the proper technique for laundering electric heated loungewear to preserve plush sherpa fibers and keep internal carbon heating elements functioning flawlessly.',
    coverImage: '/images/featured_robe_studio.jpg',
    author: 'Markus Lindqvist, Textile Care Director',
    publishedDate: '2026-01-28',
    updatedDate: '2026-02-18',
    readingTime: '5 min read',
    category: 'Care & Maintenance',
    content: `
### Can You Really Machine Wash an Electric Heated Robe?
One of the most common questions our support team receives is: *"Can I safely put an electric heated robe into a washing machine?"*

The answer is an emphatic **yes**! Modern heated garments like [The Cozy Co. Robe](/products/cozy-co-robes) are engineered with waterproof-sealed carbon-fiber elements and detachable electrical cords, making regular machine laundering simple and safe.

---

### Step 1: Disconnect and Store All Power Cords
Before laundering:
1. Locate the quick-disconnect magnetic port inside the robe's interior pocket.
2. Unplug the 9.5-foot power cable and remote controller and store them safely in a dry drawer.
3. Snap the integrated waterproof silicone safety cap securely over the robe's socket. This creates a watertight seal that protects internal contacts during the wash cycle.

---

### Step 2: Use Cold Water and a Gentle Cycle
- **Water Temperature:** Always wash in cold water (maximum 30°C / 86°F). Hot water can degrade internal wire insulation and weaken fleece fibers over time.
- **Detergent:** Use a mild liquid laundry detergent. Avoid powdered detergents that may not fully dissolve.
- **Never Use Fabric Softeners:** Fabric softeners deposit a silicone coating over microfiber fleece, flattening the high-pile sherpa and reducing breathability.
- **No Bleach:** Chlorine bleach will weaken the textile fibers and compromise safety seals.

---

### Step 3: Proper Drying for Maximum Sherpa Loft
- **Tumble Dry Low:** You may place the robe in a tumble dryer on the lowest, delicate heat setting for 15 to 20 minutes to fluff the sherpa fleece.
- **Air Dry Flat:** Lay the garment flat across a clean drying rack or clothes horse until it is 100% dry.
- **Crucial Rule:** Never reconnect the power cable until the garment socket is completely dry to the touch.
- **Never Iron or Dry Clean:** Commercial dry cleaning chemicals and hot irons will melt microfiber velvet and damage internal micro-wires.

---

### Routine Maintenance and Spot Cleaning
For small spills, spot cleaning with a damp microfiber cloth and gentle soap is often all that is needed. When winter ends, store your robe folded in a breathable cotton storage bag alongside your [CozyCo Foot Warmer](/products/cozyco-foot-warmer) and [Cozy Gloves](/products/cozy-glove).

Have questions about warranty coverage or fabric longevity? Check our [Frequently Asked Questions](/faq) or review our [30-Day Happiness Guarantee](/returns).
    `,
    relatedProductSlugs: ['cozy-co-robes', 'cozyco-foot-warmer', 'cozy-glove', 'cozyco-pillow'],
  },
  {
    slug: 'cozy-work-from-home-routine',
    title: 'Creating the Ultimate Cozy Work-From-Home Winter Routine in the UK',
    seoTitle: 'Cozy Work From Home Winter Routine: Stay Warm & Save on Energy Bills | CozyCorobes',
    metaDescription: 'Learn how to stay warm, focused, and productive while working from home during cold winter days using personal zone heating and ergonomic comfort essentials.',
    excerpt: 'Cold drafts, chilly fingers, and high heating bills can derail your remote work productivity. Here is our design-led guide to staying warm and energized all winter.',
    coverImage: '/images/blog_winter_warmth.jpg',
    author: 'Elena Vance, Home Comfort Specialist',
    publishedDate: '2026-02-04',
    updatedDate: '2026-02-22',
    readingTime: '5 min read',
    category: 'Lifestyle',
    content: `
### The Challenge of Winter Remote Working
Working from home during British winter comes with a unique set of comfort challenges. When sitting at a desk for extended periods, your body's metabolic circulation slows down. Floors feel icy against feet, shoulders tighten against drafty windows, and stiff hands make typing cumbersome.

Instead of running central heating all day to warm an entire house, adopting a targeted personal heating strategy keeps you comfortably productive while keeping utility bills in check.

---

### 1. Master Personal Zone Heating
Central heating warms air volume, which quickly dissipates through drafty windows and uninsulated ceilings. In contrast, radiant zone heating warms your body directly:
- Slip into [The Cozy Co. Robe](/products/cozy-co-robes) and set it to Level 2 or 3 for consistent, gentle lumbar and shoulder warmth throughout morning video calls.
- By keeping your personal body temperature regulated, you can keep the household thermostat at an economical 18°C without feeling cold.
- Discover all wearable options in our [Heated Robes collection](/collections/heated-robes).

---

### 2. Protect Your Extremities: Feet and Hands First
Physiologically, blood flow to hands and feet is the first thing reduced when ambient temperatures drop:
- Place the [CozyCo Foot Warmer](/products/cozyco-foot-warmer) under your desk. Its dual-foot heated pouch keeps toes pleasantly toasty even on cold hardwood or tile floors.
- Slip on lightweight [Cozy Glove sherpa lounge gloves](/products/cozy-glove) to warm stiff fingers without hindering keyboard typing speed.
- Browse more warming essentials in our [Cozy Accessories catalog](/collections/cozy-accessories).

---

### 3. Ergonomic Posture & Restorative Breaks
Cold muscles are more susceptible to strain. Support your cervical spine and posture during long work hours:
- Use the [CozyCo Cloud Pillow](/products/cozyco-pillow) for lumbar support during the afternoon or for neck relief when taking a 15-minute screen rest.
- Take scheduled hydration breaks: hot ginger tea, peppermint, or warm lemon water stimulate blood circulation.
- Step away from your desk every 90 minutes to stretch your hamstrings and shoulders.

---

### Summary: Your Winter Home Office Toolkit
A warm, well-supported home workspace transforms cold winter mornings into cozy, highly productive workdays. Explore our [Full Catalog](/shop), check [UK delivery times](/shipping), and see why hundreds of remote professionals trust CozyCorobes for winter comfort.
    `,
    relatedProductSlugs: ['cozyco-foot-warmer', 'cozy-co-robes', 'cozy-glove', 'cozyco-pillow'],
  },
];
