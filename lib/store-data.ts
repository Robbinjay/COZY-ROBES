import { Product, Collection, StoreConfig, FAQItem, BlogPost } from './types';

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
    subtitle: 'All Sleep Positions | Stays Cool All Night | Aligns Your Spine',
    tagline: 'Engineered to deliver perfect head and neck support, keeping you comfortable all night.',
    price: 39.99,
    compareAtPrice: 59.99,
    rating: 4.8,
    reviewCount: 324,
    category: 'cozy-accessories',
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    images: [
      '/images/cozyco_cloud_pillow.png',
    ],
    description: 'The CozyCo Cloud Pillow is designed for all sleep positions, stays cool at night, and perfectly aligns your spine. Wake up feeling refreshed and without neck pain.',
    features: [
      '🛌 Supports All Sleep Positions: Side, back, and stomach sleepers',
      '❄️ Stays Cool at Night: Breathable cooling fabric technology',
      '🦴 Aligns Your Spine: Ergonomic design reduces neck and back pain',
      'Premium Memory Foam: Adapts to your unique shape',
      'Machine Washable Cover: Easy to remove and clean'
    ],
    specs: [
      { label: 'Material', value: 'Premium Cooling Memory Foam' },
      { label: 'Cover', value: 'Hypoallergenic Bamboo Blend' },
      { label: 'Dimensions', value: 'Standard / Queen' },
      { label: 'Care Instructions', value: 'Machine wash cover cold, air dry' }
    ],
    howItWorks: [
      'Unbox your pillow and let it expand for 24 hours.',
      'Place on your bed and enjoy the perfect alignment.',
      'Easily remove the cover for washing when needed.'
    ],
    careInstructions: [
      'Remove outer cover and machine wash on cold.',
      'Do not machine wash the inner memory foam core.',
      'Spot clean memory foam with mild detergent if necessary.'
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF', inStock: true }
    ],
    sizes: ['Standard / Queen'],
    variants: [
      { id: 'ccp-white-std', name: 'White / Standard', colorName: 'White', colorHex: '#FFFFFF', size: 'Standard / Queen', inStock: true, sku: 'CCP-WHT-STD' }
    ],
    inStock: true,
    shippingNote: 'In stock. Dispatches via Royal Mail Tracked within 24 hours.',
  },
  {
    id: 'prod-cozy-co-robes',
    slug: 'cozy-co-robes',
    name: 'The Cozy Co. Robe',
    subtitle: 'Oversized 50" x 70" Heated Wearable Blanket with 7 Heat Settings',
    tagline: 'An oversized wearable cocoon of deep sherpa warmth, 7 precision heat settings, and full-body coverage.',
    price: 89.00,
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
      'Experience true cold-weather sanctuary with The Cozy Co. Robe. Generously cut in an oversized 50” x 70” wearable silhouette, this ultra-plush wearable heated blanket wraps you from shoulders to ankles in deep cloud sherpa and velvety fleece. Powered by advanced carbon-fiber micro-elements across the chest, shoulders, back, and dual front pockets, it delivers 7 customizable warmth levels at the touch of a button. Machine washable, whisper-quiet, and energy-efficient for working from home or relaxing in the evening.',
    features: [
      '7 Adjustable Heat Levels: Fine-tune your warmth from subtle ambient comfort (Level 1 / 35°C) to intense restorative heat (Level 7 / 55°C)',
      'Oversized 50" x 70" (127 cm x 178 cm) Full-Body Coverage: Comfortably fits heights 5’0” to 6’4” (XS to 3XL) with complete ankle coverage when seated',
      'High-Loft Cloud Sherpa Interior: Traps and circulates radiant body heat naturally even when powered off',
      'Targeted Multi-Zone Heat: Flexible carbon micro-wires warm shoulders, upper back, lower lumbar, and dual deep front pockets',
      'Detachable Backlit LED Controller: Ergonomic remote with selectable 2, 4, or 8-hour auto safety shut-off',
      '100% Machine Washable: Simply unplug the quick-release magnetic cord and wash on a gentle cold cycle',
      'UK 3-Pin Fused Low-Voltage Power: Safe 12V DC system with 9.5-foot cord, low EMF, and UKCA & CE electrical safety compliance',
    ],
    specs: [
      { label: 'Dimensions', value: '50 inches x 70 inches (127 cm x 178 cm) Oversized Silhouette' },
      { label: 'Fit Range', value: 'One Size Fits Most (Unisex XS to 3XL, Heights 5’0” to 6’4”)' },
      { label: 'Heat Settings', value: '7 Digital Levels (35°C / 95°F to 55°C / 131°F)' },
      { label: 'Shell Fabric', value: '320 GSM High-Density Micro-Plush Velvet Fleece' },
      { label: 'Lining Fabric', value: '280 GSM Deep-Loft Cloud Sherpa Fleece' },
      { label: 'Heating Elements', value: 'Flexible ultra-thin carbon-fiber micro-conductors (Low EMF)' },
      { label: 'Power Supply', value: 'UK 3-Pin Fused Wall Plug (220–240V AC to 12V DC low voltage)' },
      { label: 'Cord Length', value: '9.5 ft (2.9 m) with quick-disconnect magnetic safety breakaway' },
      { label: 'Auto Shut-Off', value: 'Selectable 2-hour, 4-hour, or 8-hour automatic shut-off timer' },
      { label: 'Care & Wash', value: 'Machine wash cold on gentle cycle; line dry or tumble dry low' },
      { label: 'Warranty', value: '1-Year UK Quality & Safety Warranty' },
    ],
    howItWorks: [
      'Slip into the oversized robe and draw the generous hood or plush collar comfortably around your neck.',
      'Connect the quick-release magnetic cord into the discreet interior waist port and plug the UK adapter into the wall.',
      'Press the power button on the handheld backlit remote to cycle between 7 heat levels.',
      'Feel enveloping, radiant warmth surround your shoulders, back, and hands in under 60 seconds.',
    ],
    careInstructions: [
      'Always disconnect the power controller cord from the robe port before washing.',
      'Ensure the protective waterproof garment cap is snapped over the port.',
      'Machine wash on gentle or delicate cold cycle with mild detergent.',
      'Do not use bleach, do not iron, and do not dry clean.',
      'Line dry flat or tumble dry on low delicate heat. Make sure the connector is completely dry before re-connecting.',
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
  },
  {
    id: 'prod-cozy-glove',
    slug: 'cozy-glove',
    name: 'Cozy Glove',
    subtitle: 'Warm hands, same sherpa feel.',
    tagline: 'Keep your hands perfectly warm while working or relaxing.',
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
    description: 'The Cozy Glove offers the same ultra-soft sherpa feel as our famous robes, tailored specifically to keep your hands warm without restricting movement.',
    features: [
      'Ultra-soft sherpa lining',
      'Flexible fit for all hand sizes',
      'Machine washable'
    ],
    specs: [
      { label: 'Material', value: 'Plush Sherpa Fleece' },
      { label: 'Size', value: 'One Size Fits Most' }
    ],
    howItWorks: [
      'Slip them on whenever your hands feel chilly.',
      'Enjoy the immediate warmth of the sherpa lining.'
    ],
    careInstructions: [
      'Machine wash on gentle cold cycle.',
      'Tumble dry low or air dry.'
    ],
    colors: [
      { name: 'Classic Sherpa', hex: '#EBE4D8', inStock: true }
    ],
    sizes: ['One Size'],
    variants: [
      { id: 'cg-os', name: 'Classic Sherpa / One Size', colorName: 'Classic Sherpa', colorHex: '#EBE4D8', size: 'One Size', inStock: true, sku: 'CG-SHERPA-OS' }
    ],
    inStock: true,
    shippingNote: 'In stock. Dispatches within 24 hours.',
  },
  {
    id: 'prod-cozyco-foot-warmer',
    slug: 'cozyco-foot-warmer',
    name: 'CozyCo Foot Warmer',
    subtitle: 'Heated pouch for under the desk.',
    tagline: 'Say goodbye to cold feet while working or lounging.',
    price: 19.99,
    compareAtPrice: 29.99,
    rating: 4.9,
    reviewCount: 215,
    category: 'cozy-accessories',
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    images: [
      '/images/cozyco_foot_warmer.avif',
    ],
    description: 'The CozyCo Foot Warmer is a heated pouch designed to keep your feet incredibly warm. Perfect for under the desk while working from home or while lounging on the couch.',
    features: [
      'Consistent, soothing heat',
      'Spacious pouch fits both feet comfortably',
      'Ultra-soft interior lining',
      'Perfect for under-desk use'
    ],
    specs: [
      { label: 'Power', value: 'Electric Heated Core' },
      { label: 'Material', value: 'Premium Plush Fleece' }
    ],
    howItWorks: [
      'Plug in the foot warmer and turn it on.',
      'Slip both feet into the spacious pouch.',
      'Enjoy consistent, soothing heat.'
    ],
    careInstructions: [
      'Spot clean only.',
      'Ensure device is unplugged before cleaning.'
    ],
    colors: [
      { name: 'Charcoal', hex: '#3E424B', inStock: true }
    ],
    sizes: ['One Size'],
    variants: [
      { id: 'cfw-os', name: 'Charcoal / One Size', colorName: 'Charcoal', colorHex: '#3E424B', size: 'One Size', inStock: true, sku: 'CFW-CHAR-OS' }
    ],
    inStock: true,
    shippingNote: 'In stock. Dispatches within 24 hours.',
  }
];

export const COLLECTIONS: Collection[] = [
  {
    slug: 'heated-robes',
    title: 'Heated Robes & Wearables',
    subtitle: 'Advanced wearable heating technology tailored for personal comfort at home.',
    description: 'Explore our flagship heated robes, heated poncho throws, and targeted warming garments designed to keep you toasty without heating the entire house.',
    heroImage: '/images/hero_heated_robe.jpg',
    metaTitle: 'Heated Robes & Wearable Heated Blankets | CozyCorobes',
    metaDescription: 'Shop premium electric heated robes and wearable warm blankets. Multi-zone safe carbon fiber heat, plush machine-washable fleece, and ultra-comfortable designs.',
  },
  {
    slug: 'cozy-accessories',
    title: 'Cozy Accessories',
    subtitle: 'Thoughtful additions for ultimate home relaxation and cold-weather comfort.',
    description: 'Complete your personal comfort sanctuary with heated bootie slippers, weighted calming heat wraps, and thermal sherpa socks.',
    heroImage: '/images/bootie_slippers_1.jpg',
    metaTitle: 'Cozy Home Accessories & Warmth Essentials | CozyCorobes',
    metaDescription: 'Discover heated slippers, weighted neck heating pads, and cloud-soft lounge socks crafted for winter relaxation at home.',
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'The latest innovations in personal comfort, soft textures, and everyday warmth.',
    description: 'Browse our newly released winter editions, seasonal colorways, and upgraded low-voltage heating technology.',
    heroImage: '/images/featured_robe_studio.jpg',
    metaTitle: 'New Heated Loungewear & Comfort Arrivals | CozyCorobes',
    metaDescription: 'Check out the latest CozyCorobes collection featuring new colors, ergonomic upgrades, and the newest comfort essentials.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Products',
    question: 'What is a heated robe?',
    answer: 'A heated robe is a premium plush loungewear garment that incorporates flexible, low-voltage carbon fiber heating micro-elements safely embedded within the fabric. It provides gentle, even, radiant warmth directly to your body (back, chest, and pockets) so you stay comfortably warm without having to stay trapped under a traditional blanket.',
  },
  {
    category: 'Products',
    question: 'How does the heated robe work?',
    answer: 'The robe is powered either by connecting to a standard UK wall outlet via our included 9-foot magnetic breakaway power cord (UK 3-pin fused plug) or by connecting to an optional 5V/12V USB power bank in the interior pocket. A soft-touch LED button on the lapel lets you choose between Low (40°C / 104°F), Medium (46°C / 115°F), or High (53°C / 128°F) heat settings with rapid warm-up in under 60 seconds.',
  },
  {
    category: 'Care Instructions',
    question: 'How do I wash the heated robe?',
    answer: 'It is 100% machine washable! Simply unplug and remove the power adapter and cord from the inside zippered pocket, ensure the protective waterproof rubber cap is snapped over the garment cord connector, and wash on gentle/delicate cycle with cold water. Tumble dry on low heat for 15-20 minutes or lay flat to air dry completely before reconnecting power.',
  },
  {
    category: 'Shipping',
    question: 'How long does UK shipping take?',
    answer: 'All orders are dispatched within 1 to 2 business days from our UK fulfillment center. Standard delivery via Royal Mail Tracked 48 typically arrives in 2 to 4 business days (free on orders over £100). Expedited DPD Next Day delivery is also available at checkout for £6.99.',
  },
  {
    category: 'Products',
    question: 'What sizes are available, and how do I choose the right size?',
    answer: 'We offer Small/Medium (S/M), Large/X-Large (L/XL), and a Cloud Oversized unisex fit. Because robes are designed for relaxed loungewear, our sizing is generous. If you prefer a snug fit, select your normal shirt size; if you love wrapping up with plenty of extra fabric, choose one size up or the Cloud Oversized option.',
  },
  {
    category: 'Products',
    question: 'What colors are available?',
    answer: 'The Cozy Heated Robe comes in our signature calming palette: Oatmeal Cream, Slate Charcoal, Heather Rose, and Forest Sage. All colorways use non-toxic, gentle fiber dyes that maintain their rich tone wash after wash.',
  },
  {
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-Day Happiness Guarantee. If your CozyCorobes robe is not the coziest item you have ever worn, you may return it within 30 days of delivery for a full refund or free size/color exchange. Items must be unwashed, clean, and in original packaging with all included cords.',
  },
  {
    category: 'Orders',
    question: 'How do I contact customer support?',
    answer: 'Our customer care team is available Monday through Friday from 9:00 AM to 5:00 PM GMT. Email us directly at support@cozyrobe.co.uk or fill out the form on our Contact page. We answer all inquiries within 24 business hours.',
  },
  {
    category: 'Products',
    question: 'Is the heated robe safe to sleep in?',
    answer: 'Our heated robes include an integrated 2-hour automatic shut-off safety timer to prevent overheating and conserve power. The robe uses safe low-voltage DC technology with zero EMF radiation risk. While safe for lounging and resting, we recommend unplugging before deep overnight sleep as standard best practice for all heated garments.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'guide-to-choosing-a-heated-robe',
    title: 'The Ultimate Guide to Choosing the Right Heated Robe for Winter',
    seoTitle: 'How to Choose a Heated Robe: The Ultimate Buyer’s Guide | CozyCorobes',
    metaDescription: 'Discover what to look for when buying a heated robe: heating zones, safety certifications, fabric weight, cord vs battery, and machine-washability.',
    excerpt: 'With colder months arriving, a heated robe is the ultimate home comfort upgrade. Here is everything you need to evaluate before purchasing your first wearable blanket.',
    coverImage: '/images/hero_heated_robe.jpg',
    author: 'Elena Vance, Home Comfort Specialist',
    publishedDate: '2026-01-14',
    updatedDate: '2026-02-10',
    readingTime: '5 min read',
    category: 'Buying Guides',
    content: `
### Why Wearable Warmth is Replacing Traditional Space Heaters
As energy costs rise and remote work remains a fixture of everyday life, more homeowners and renters are seeking efficient, targeted personal comfort. Instead of raising the central thermostat to heat empty hallways and unoccupied rooms, a heated robe delivers soothing, consistent warmth directly to your body core.

### 1. Heating Element Technology & Safety
When evaluating heated garments, never compromise on safety. Look for:
- **Carbon Fiber Micro-Wires:** Unlike stiff legacy copper wire heating blankets from decades past, modern carbon fiber elements are thin, pliable, and virtually imperceptible to the touch.
- **Low-Voltage DC Operation:** Modern heated robes operate on safe low-voltage (typically 12V or 5V), eliminating high-voltage AC hazards near your body.
- **Automatic Shutoff Timers:** Essential to ensure peace of mind, automatically powering down the heating zones after 2 or 4 hours.

### 2. Fabric Weight and Touch
Electric heating is only half the formula. A robe should feel wonderfully plush even before you tap the power button. Look for high GSM (grams per square meter) fabrics—ideally 300+ GSM fleece or sherpa lining that retains ambient warmth naturally.

### 3. Machine Washability
A robe worn around coffee, morning breakfasts, and living rooms must be easy to clean. Genuine high-quality robes feature detachable cord harnesses with waterproof silicone caps that withstand standard washing machine delicate cycles.

### Summary
If you prioritize maximum versatility, choose a robe with multiple heat levels, deep heated front pockets, and an oversized wrap cut.
    `,
    relatedProductSlugs: ['cozy-co-robes', 'cozyco-pillow', 'cozy-glove', 'cozyco-foot-warmer'],
  },
  {
    slug: 'how-to-wash-heated-robes-blankets',
    title: 'How to Safely Wash and Care for Wearable Heated Robes & Blankets',
    seoTitle: 'How to Wash a Heated Robe Safely (Step-by-Step Guide) | CozyCorobes',
    metaDescription: 'Step-by-step instructions for machine washing, spot-cleaning, and drying your electric heated robe without damaging heating coils or fabric.',
    excerpt: 'Learn the proper technique for laundering electric heated loungewear to preserve plush sherpa fibers and keep internal heating elements functioning flawlessly.',
    coverImage: '/images/featured_robe_studio.jpg',
    author: 'Markus Lindqvist, Textile Care Director',
    publishedDate: '2026-01-28',
    updatedDate: '2026-02-18',
    readingTime: '4 min read',
    category: 'Care & Maintenance',
    content: `
### Yes, You Can Wash Your Heated Robe!
One of the most frequent questions we receive is: *"Can I really put an electric heated garment into my washing machine?"*
The answer is an emphatic **yes**, provided you follow three simple precautions.

### Step 1: Disconnect All Power Cables
Before anything else, unplug the main wall adapter from your robe. Open the zippered inner pocket, disconnect the cord from the robe's female terminal port, and store the power cord safely in a dry drawer. Seal the rubber safety cap over the robe’s terminal.

### Step 2: Use Cold Water and Gentle Cycle
- Always select **Cold Water** (never warm or hot, which can weaken internal wire coatings).
- Use a mild liquid detergent. Never use powdered detergents or fabric softeners, as softeners leave a waxy film on microfiber fleece that reduces breathability and plushness.
- Do not use bleach or bleach alternatives.

### Step 3: Proper Drying
- **Tumble Dry Low:** You may tumble dry on delicate low heat for 15 to 20 minutes to restore loft.
- **Air Dry Flat:** Hang or lay flat across a clean drying rack to let any residual moisture evaporate thoroughly.
- **Never Iron:** Ironing will damage both the micro-fleece fibers and internal elements.

By adhering to these simple steps, your CozyCorobes robe will maintain its cloud-like softness and reliable warmth for years.
    `,
    relatedProductSlugs: ['cozy-co-robes', 'cozyco-pillow', 'cozy-glove', 'cozyco-foot-warmer'],
  },
  {
    slug: 'cozy-work-from-home-routine',
    title: 'Creating the Ultimate Cozy Work-From-Home Winter Routine',
    seoTitle: 'How to Build a Warm & Productive WFH Winter Routine | CozyCorobes',
    metaDescription: 'Tips for staying focused, warm, and comfortable while working from home during cold winter days without spiking your heating bill.',
    excerpt: 'Cold drafts, chilly fingers, and sluggish energy can derail your remote work productivity. Here is our design-led guide to a comfortable home office routine.',
    coverImage: '/images/blog_winter_warmth.jpg',
    author: 'Elena Vance, Home Comfort Specialist',
    publishedDate: '2026-02-04',
    updatedDate: '2026-02-22',
    readingTime: '4 min read',
    category: 'Lifestyle',
    content: `
### The Challenge of Winter Remote Work
When sitting at a desk for six to eight hours, your body’s metabolic rate drops. Feet turn ice-cold against flooring, shoulders tense against drafts, and typing with stiff fingers is uncomfortable.

### 1. Zone Heating Over House Heating
Rather than paying hundreds of pounds on soaring energy bills to heat empty rooms to 22°C all afternoon, zone heating allows you to keep the central thermostat at an economical 18°C while warming yourself personally. Slip on a heated robe on Low (40°C) for continuous, gentle lumbar and shoulder comfort.

### 2. Protect Your Feet
Blood circulation to your extremities is the first thing that slows down when seated. Pairing heated slippers or high-density sherpa lounge socks with a small wooden footstool elevates your legs and keeps your toes toasty.

### 3. Scheduled Hydration Breaks
Pair your warm loungewear with herbal teas—chamomile, ginger, and peppermint promote circulation and provide a comforting sensory ritual every two hours.
    `,
    relatedProductSlugs: ['cozy-co-robes', 'cozyco-pillow', 'cozy-glove', 'cozyco-foot-warmer'],
  },
];
