export const mockUsers = [
  {
    id: "user-1",
    name: "Priya Sharma",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "Food researcher & Ayurveda enthusiast. Sharing traditional food wisdom.",
    role: "USER",
    followers: 2340,
    following: 180,
  },
  {
    id: "user-2",
    name: "Dr. Rajesh Kumar",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    bio: "Nutritionist | Lab analyst | Debunking food myths with science",
    role: "USER",
    followers: 8920,
    following: 450,
  },
  {
    id: "user-3",
    name: "Anita Desai",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    bio: "Organic farmer from Karnataka. Growing food the way nature intended.",
    role: "USER",
    followers: 5610,
    following: 320,
  },
  {
    id: "user-4",
    name: "LocalBite Admin",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    bio: "Official LocalBite account. Curating the best local food content.",
    role: "ADMIN",
    followers: 15200,
    following: 50,
  },
  {
    id: "user-5",
    name: "Vikram Patel",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    bio: "Chef | Food blogger | Rediscovering forgotten Indian superfoods",
    role: "USER",
    followers: 12100,
    following: 890,
  },
];

export type PostType = "text" | "image" | "video" | "pdf" | "carousel" | "infographic";

export type TemplateName =
  | "food-benefit"
  | "lab-report"
  | "recipe"
  | "where-to-find"
  | "comparison"
  | "video-story"
  | "custom";

export interface MockComment {
  id: string;
  user: (typeof mockUsers)[0];
  text: string;
  time: string;
  likes: number;
  status: "approved" | "pending" | "rejected";
}

export interface NearbyStore {
  id: string;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  phone?: string;
  rating: number;
  available: boolean;
}

export interface GalleryImage {
  url: string;
  caption?: string;
  credit?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  youtubeId?: string;
  image?: string;
}

export interface RecipeStep {
  text: string;
  image?: string;
  tip?: string;
}

export interface MockPost {
  id: string;
  author: (typeof mockUsers)[0];
  type: PostType;
  template: TemplateName;
  title: string;
  subtitle?: string;
  content: string;
  media?: {
    type: "image" | "video" | "pdf";
    url: string;
    thumbnail?: string;
  }[];
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked: boolean;
  liked: boolean;
  createdAt: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  templateData?: {
    // Food benefit
    benefits?: string[];
    nutritionFacts?: { label: string; value: string; percent?: number }[];
    source?: string;
    // Lab report
    labName?: string;
    testDate?: string;
    findings?: { label: string; localValue: string; commercialValue: string; localNum?: number; commercialNum?: number; unit?: string; winner: "local" | "commercial" }[];
    verdict?: string;
    pdfUrl?: string;
    labImages?: string[];
    // Recipe
    ingredients?: string[];
    steps?: (string | RecipeStep)[];
    prepTime?: string;
    cookTime?: string;
    servings?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
    recipeVideoId?: string;
    // Where-to-find
    location?: { name: string; address: string; lat: number; lng: number };
    price?: string;
    availability?: string;
    season?: string;
    // Comparison
    itemA?: { name: string; points: string[] };
    itemB?: { name: string; points: string[] };
    comparisonVerdict?: string;
    // Nearby stores
    nearbyStores?: NearbyStore[];
    // Rich media (any template)
    gallery?: GalleryImage[];
    testimonials?: Testimonial[];
    heroVideoId?: string;
  };
}

export const mockPosts: MockPost[] = [
  {
    id: "post-kokum",
    author: mockUsers[3],
    type: "image",
    template: "food-benefit",
    title: "Kokum - The Purple Superfruit of India's Western Ghats",
    subtitle: "A complete guide to the superfruit your grandparents swore by — benefits, lab data, recipes & where to find it",
    content:
      "Kokum (Garcinia indica) is one of India's most underrated superfruits, native to the Western Ghats of Maharashtra, Goa, Karnataka, and Kerala. This vibrant purple fruit has been used for centuries in Konkan and Goan cuisine — and modern science is finally catching up to what our ancestors always knew.\n\nKokum is rich in Garcinol, a powerful antioxidant that fights cancer cells. It contains Hydroxycitric Acid (HCA), proven to suppress appetite and aid weight loss. The fruit is a natural coolant — kokum sherbet (agal) is the traditional summer drink of coastal India.\n\nUnlike commercial soft drinks loaded with sugar and chemicals, kokum juice is naturally low-calorie, packed with Vitamin C, and has anti-ulcer properties. Kokum butter (extracted from seeds) is used in chocolates, cosmetics, and Ayurvedic medicine.\n\nThis is a complete guide: health benefits backed by lab data, a traditional Sol Kadhi recipe, and where to find fresh kokum near you with live maps. Scroll down to explore everything about this incredible fruit!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Garcinia_indica_-_fruits%2C_seeds%2C_pulp_and_rinds.jpg",
      },
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Kokumfruitsdried.jpg",
      },
    ],
    tags: ["kokum", "superfruit", "western-ghats", "konkan", "goa", "ayurveda", "weight-loss", "antioxidant"],
    likes: 3892,
    comments: 234,
    shares: 1245,
    bookmarked: false,
    liked: false,
    createdAt: "2026-05-14T06:00:00Z",
    status: "APPROVED",
    templateData: {
      heroVideoId: "dQw4w9WgXcQ",
      // ---- Gallery ----
      gallery: [
        { url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Garcinia_indica_-_fruits_and_leaves.jpg", caption: "Fresh kokum fruit on the tree with leaves", credit: "Western Ghats, India" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Kokumfruitsdried.jpg", caption: "Dried kokum rinds (amsul) ready for use", credit: "Traditional sun-drying process" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Solkadhi.jpg", caption: "Sol Kadhi — the iconic pink coconut-kokum drink", credit: "Goan Kitchen" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Garcinia_indica_tree.jpg", caption: "Kokum tree (Garcinia indica) in its native habitat", credit: "Western Ghats forest" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Freshly_cut_Sindhudurg_and_Ratnagiri_Kokum_%28Garcinia_indica%29_fruits_with_their_vibrant_red_pulp_exposed_and_sugar_crystals_sprinkled_on_top_for_a_tangy_treat.jpg", caption: "Freshly cut Sindhudurg kokum with vibrant red pulp", credit: "Sindhudurg, Maharashtra" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Garcinia_indica_fruit.jpg", caption: "Kokum fruits being prepared to make syrup", credit: "Konkan region" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Garcinia_indica.jpeg", caption: "Kokum butter — extracted from seeds for cosmetics and chocolate", credit: "Traditional extraction" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Garcinia_indica_rinds_being_dried.jpg", caption: "Kokum rinds being sun-dried on traditional mats", credit: "Devgad, Maharashtra" },
      ],
      // ---- Testimonials ----
      testimonials: [
        { name: "Maria Fernandes", location: "Panjim, Goa", quote: "I've been making Sol Kadhi for 40 years. My grandmother taught me. No Goan meal is complete without it — it cools the body and helps digest the rich fish curry.", youtubeId: "dQw4w9WgXcQ", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" },
        { name: "Ravi Sawant", location: "Ratnagiri, Maharashtra", quote: "We have 200 kokum trees on our ancestral farm. The fruit season is only 2 months but it sustains our family all year. Kokum syrup, amsul, kokum butter — nothing goes to waste.", youtubeId: "dQw4w9WgXcQ", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" },
        { name: "Dr. Sunita Patil", location: "Pune, Maharashtra", quote: "As an Ayurvedic practitioner, I prescribe kokum for digestive issues, acidity, and skin problems. The Garcinol content makes it unique — no other fruit has this compound in such concentration.", youtubeId: "dQw4w9WgXcQ", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita" },
        { name: "Joseph D'Souza", location: "Mangalore, Karnataka", quote: "My hotel serves kokum sherbet as a welcome drink. Tourists love it! It's become our signature drink. Much healthier than commercial soft drinks.", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph" },
      ],
      // ---- Benefits ----
      benefits: [
        "Rich in Garcinol — a potent antioxidant 3x stronger than Vitamin E, shown to inhibit cancer cell growth",
        "Contains HCA (Hydroxycitric Acid) — clinically proven to suppress appetite and block fat production",
        "Natural coolant — reduces body heat, prevents heat stroke, ideal summer drink in tropical India",
        "Anti-ulcer properties — soothes the stomach lining and reduces acidity naturally",
        "Supports heart health — lowers bad cholesterol (LDL) and improves blood circulation",
        "Anti-inflammatory & anti-allergic — helps manage skin conditions, asthma, and joint pain",
        "Rich in Vitamin C, B-complex, manganese, and potassium — boosts immunity all year round",
        "Kokum butter from seeds is an excellent natural moisturizer used in premium skincare and chocolates",
      ],
      nutritionFacts: [
        { label: "Calories", value: "60", percent: 3 },
        { label: "Vitamin C", value: "32%", percent: 32 },
        { label: "HCA", value: "25%", percent: 25 },
        { label: "Garcinol", value: "2.5mg", percent: 85 },
        { label: "Fiber", value: "5.2g", percent: 21 },
        { label: "Potassium", value: "15%", percent: 15 },
        { label: "Manganese", value: "22%", percent: 22 },
        { label: "Iron", value: "8%", percent: 8 },
      ],
      source: "CSIR-National Institute of Oceanography, Goa & Journal of Ethnopharmacology (2024)",
      // ---- Lab Report ----
      labName: "CSIR-National Chemical Laboratory (NCL), Pune",
      testDate: "January 2026",
      labImages: [
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Ncl-pune.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Ncl-pune.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Ncl-pune.jpg",
      ],
      findings: [
        { label: "Antioxidant (ORAC)", localValue: "Kokum: 8,420", commercialValue: "Blueberry: 4,669", localNum: 8420, commercialNum: 4669, unit: "μmol TE/100g", winner: "local" as const },
        { label: "Garcinol", localValue: "2.5 mg/g", commercialValue: "Not present", localNum: 100, commercialNum: 0, unit: "mg/g", winner: "local" as const },
        { label: "HCA Content", localValue: "Kokum: 25%", commercialValue: "G. Cambogia: 50%", localNum: 25, commercialNum: 50, unit: "% of rind", winner: "commercial" as const },
        { label: "Vitamin C", localValue: "Kokum: 48mg", commercialValue: "Orange: 53mg", localNum: 48, commercialNum: 53, unit: "mg/100g", winner: "commercial" as const },
        { label: "Anthocyanins", localValue: "Kokum: 312mg", commercialValue: "Grape: 89mg", localNum: 312, commercialNum: 89, unit: "mg/100g", winner: "local" as const },
        { label: "Anti-inflammatory", localValue: "68% inhibition", commercialValue: "Turmeric: 52%", localNum: 68, commercialNum: 52, unit: "% COX-2 inhib.", winner: "local" as const },
        { label: "Sugar Content", localValue: "3.2g/100ml", commercialValue: "Soda: 10.6g", localNum: 32, commercialNum: 106, unit: "g/L", winner: "local" as const },
      ],
      verdict: "Kokum outperforms most commercial fruits in antioxidant capacity and contains unique compounds like Garcinol (found nowhere else in nature) that show remarkable anti-cancer and anti-inflammatory properties. Fresh kokum from Western Ghats has 80% higher bioactive content than dried/processed forms.",
      pdfUrl: "/reports/kokum-analysis-ncl-2026.pdf",
      // ---- Recipe ----
      recipeVideoId: "dQw4w9WgXcQ",
      ingredients: [
        "10-12 dried kokum rinds (amsul)",
        "1 cup thick coconut milk (first extract)",
        "1 cup thin coconut milk (second extract)",
        "4-5 cloves garlic, crushed",
        "2 green chilies, slit",
        "1 tsp cumin seeds",
        "Salt to taste",
        "Fresh coriander for garnish",
        "1/4 tsp sugar (optional)",
      ],
      steps: [
        { text: "Soak dried kokum rinds in 1 cup warm water for 30 minutes. Squeeze out the deep purple extract and set aside. This is your kokum base — the soul of Sol Kadhi.", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Garcinia_indica_red_drink_prepared_from_dried_rinds.jpg", tip: "The deeper the color, the better the flavor" },
        { text: "In a bowl, combine the thin coconut milk with the kokum extract. Mix well until you get a beautiful pink-purple color.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Garcinia_indica_syrup_making_from_rinds.jpg" },
        { text: "Crush garlic with cumin seeds and green chilies into a coarse paste using a mortar and pestle (not a blender — the texture matters).", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Kundi_Sota_traditional_manual_mortar_and_pestle.jpg", tip: "Stone mortar gives the best flavor" },
        { text: "Add this paste to the kokum-coconut mixture. Add salt and sugar if using. Stir well.", image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Garcinia_indica_leaves%2C_raw_and_ripe_fruits.jpg" },
        { text: "Now add the thick coconut milk and mix gently. The color should be a gorgeous rose-pink.", image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Solkadhi.jpg" },
        { text: "Refrigerate for at least 1 hour. Sol Kadhi is always served chilled — this is non-negotiable!", image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Solkadhi.jpg", tip: "Tastes even better the next day" },
        { text: "Serve in small bowls garnished with fresh coriander. Traditionally served as a digestive drink after meals with rice, or as a cooling summer beverage.", image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Agsol_%2823977801001%29.jpg" },
      ],
      prepTime: "10 mins",
      cookTime: "No cooking!",
      servings: "4 glasses",
      difficulty: "Easy" as const,
      // ---- Where to find ----
      location: {
        name: "Mapusa Friday Market, Goa",
        address: "Mapusa Municipal Market, Mapusa, North Goa, Goa 403507",
        lat: 15.5937,
        lng: 73.8084,
      },
      price: "Rs 200-350/kg (fresh) | Rs 150-250/kg (dried amsul)",
      availability: "Fresh: April-June | Dried: Year-round",
      season: "Summer (April-June) — peak harvest",
      nearbyStores: [
        { id: "ks1", name: "Mapusa Friday Market", address: "Municipal Market, Mapusa, North Goa", distance: "0 km (You are here)", lat: 15.5937, lng: 73.8084, phone: "+91 832 226 2300", rating: 4.8, available: true },
        { id: "ks2", name: "Sahakari Spice Farm", address: "Curti, Ponda, Goa", distance: "30 km", lat: 15.4023, lng: 74.0085, phone: "+91 832 231 2394", rating: 4.7, available: true },
        { id: "ks3", name: "Konkan Specialty Store", address: "Panaji Market, Goa", distance: "11 km", lat: 15.4989, lng: 73.8278, phone: "+91 832 222 5678", rating: 4.5, available: true },
        { id: "ks4", name: "Nature's Basket", address: "Linking Road, Bandra West, Mumbai", distance: "399 km", lat: 19.0544, lng: 72.8339, phone: "+91 22 2640 1234", rating: 4.3, available: true },
        { id: "ks5", name: "Devgad Kokum Farmers Co-op", address: "Devgad, Sindhudurg, Maharashtra", distance: "99 km", lat: 16.3886, lng: 73.3836, phone: "+91 2364 260 345", rating: 4.9, available: true },
        { id: "ks6", name: "Kokum King (Online)", address: "Ships pan-India from Ratnagiri, Maharashtra", distance: "165 km", lat: 16.9944, lng: 73.3002, rating: 4.6, available: true },
      ],
    },
  },
  {
    id: "post-1",
    author: mockUsers[0],
    type: "image",
    template: "food-benefit",
    title: "Turmeric Milk - The Golden Immunity Booster",
    content:
      "Every Indian household knows this remedy! Turmeric milk (Haldi Doodh) is not just a bedtime drink - it's a powerful anti-inflammatory that can fight infections, reduce joint pain, and boost your immunity naturally.\n\nPro tip: Add a pinch of black pepper to increase curcumin absorption by 2000%!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Golden_Milk.jpg",
      },
    ],
    tags: ["turmeric", "immunity", "ayurveda", "traditional"],
    likes: 342,
    comments: 28,
    shares: 56,
    bookmarked: false,
    liked: true,
    createdAt: "2026-05-13T10:30:00Z",
    status: "APPROVED",
    templateData: {
      benefits: [
        "Anti-inflammatory (curcumin reduces chronic inflammation)",
        "Boosts immunity and fights infections naturally",
        "Aids digestion and gut health",
        "Promotes better sleep quality",
        "Rich in antioxidants that fight free radicals",
        "Supports joint health and reduces pain",
      ],
      nutritionFacts: [
        { label: "Curcumin", value: "3.14% per tsp" },
        { label: "Vitamin D (with milk)", value: "15% DV" },
        { label: "Calcium", value: "12% DV" },
        { label: "Iron", value: "16% DV" },
        { label: "Manganese", value: "26% DV" },
      ],
      source: "Traditional Ayurvedic Medicine, confirmed by NCBI research papers",
      nearbyStores: [
        { id: "s1", name: "Nature's Basket", address: "100 Feet Road, Indiranagar, Bangalore", distance: "0.8 km", lat: 12.9784, lng: 77.6408, phone: "+91 80 2525 1234", rating: 4.5, available: true },
        { id: "s2", name: "Organic World", address: "HSR Layout Sector 1, Bangalore", distance: "6.7 km", lat: 12.9116, lng: 77.6389, phone: "+91 80 4141 5678", rating: 4.8, available: true },
        { id: "s3", name: "Farm Fresh Store", address: "Koramangala 5th Block, Bangalore", distance: "4.4 km", lat: 12.9352, lng: 77.6245, rating: 4.2, available: false },
      ],
    },
  },
  {
    id: "post-2",
    author: mockUsers[1],
    type: "carousel",
    template: "lab-report",
    title: "Lab Report: Organic vs Commercial Honey",
    content:
      "We tested 5 popular honey brands vs 3 local organic samples. The results are shocking!\n\nCommercial honey had added sugar syrups, heated processing (kills enzymes), and lower pollen count.\n\nLocal organic honey had natural enzymes intact, rich pollen diversity, higher antioxidant content, and no adulteration.\n\nAlways buy from local beekeepers. Your health matters!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Maltese_honey_comb.jpg",
      },
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Three_French_monofloral_honey_jars.jpg",
      },
    ],
    tags: ["honey", "lab-report", "organic", "food-safety"],
    likes: 891,
    comments: 67,
    shares: 234,
    bookmarked: true,
    liked: false,
    createdAt: "2026-05-12T15:45:00Z",
    status: "APPROVED",
    templateData: {
      labName: "National Food Analysis Lab, Mysore",
      testDate: "April 2026",
      findings: [
        { label: "Sugar Adulteration", localValue: "0%", commercialValue: "32-45%", winner: "local" },
        { label: "Enzyme Activity (Diastase)", localValue: "18.2 DN", commercialValue: "3.1 DN", winner: "local" },
        { label: "Pollen Count", localValue: "High diversity", commercialValue: "Ultra-filtered", winner: "local" },
        { label: "Antioxidant (FRAP)", localValue: "842 umol/100g", commercialValue: "210 umol/100g", winner: "local" },
        { label: "HMF Level", localValue: "8.2 mg/kg", commercialValue: "68 mg/kg", winner: "local" },
      ],
      verdict: "Local organic honey is 4x richer in antioxidants and free from sugar adulteration. Commercial brands tested showed significant processing damage.",
      pdfUrl: "/reports/honey-analysis.pdf",
    },
  },
  {
    id: "post-3",
    author: mockUsers[2],
    type: "video",
    template: "video-story",
    title: "How We Grow Organic Ragi - Farm to Table",
    content:
      "A day in my organic ragi farm! Watch how we grow this ancient superfood without any chemicals. Ragi has 10x more calcium than rice and is the perfect food for strong bones.\n\nFrom sowing to harvest - 4 months of patience and love. No pesticides, no shortcuts.",
    media: [
      {
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Finger_Millet_Field_at_Peddamunagalachedu_Village.jpg",
      },
    ],
    tags: ["ragi", "organic-farming", "calcium", "millet"],
    likes: 1205,
    comments: 89,
    shares: 312,
    bookmarked: false,
    liked: true,
    createdAt: "2026-05-11T08:00:00Z",
    status: "APPROVED",
  },
  {
    id: "post-4",
    author: mockUsers[4],
    type: "infographic",
    template: "comparison",
    title: "5 Forgotten Indian Superfoods You Should Eat Daily",
    content:
      "Modern diets have made us forget these incredible local superfoods that our grandparents ate daily. Start including even one of these in your daily diet!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sonjna_%28Moringa_oleifera%29_leaves_with_flowers_at_Kolkata_W_IMG_2125.jpg",
      },
    ],
    tags: ["superfoods", "indian-food", "nutrition", "health"],
    likes: 2456,
    comments: 156,
    shares: 890,
    bookmarked: true,
    liked: true,
    createdAt: "2026-05-10T12:15:00Z",
    status: "APPROVED",
    templateData: {
      itemA: {
        name: "Indian Superfoods",
        points: [
          "Moringa (Drumstick leaves) - 7x Vitamin C of oranges",
          "Horse Gram (Kulthi) - Best for weight loss",
          "Barnyard Millet (Sanwa) - Lowest glycemic index",
          "Curry Leaves - Iron powerhouse",
          "Raw Coconut - MCTs for brain health",
        ],
      },
      itemB: {
        name: "Imported 'Superfoods'",
        points: [
          "Kale - Good but spinach has same nutrients",
          "Quinoa - Millets are cheaper & equally nutritious",
          "Avocado - Expensive, high carbon footprint",
          "Chia Seeds - Sabja seeds are local alternative",
          "Acai Berry - Amla has more Vitamin C",
        ],
      },
      comparisonVerdict: "Local Indian superfoods are cheaper, fresher, more sustainable, and equally (or more) nutritious than imported alternatives.",
    },
  },
  {
    id: "post-5",
    author: mockUsers[3],
    type: "text",
    template: "comparison",
    title: "Did You Know? Jaggery vs White Sugar",
    content:
      "A quick comparison between Jaggery (Gud) and White Sugar to help you make healthier choices.",
    tags: ["jaggery", "sugar", "comparison", "health-tip"],
    likes: 567,
    comments: 34,
    shares: 123,
    bookmarked: false,
    liked: false,
    createdAt: "2026-05-09T18:30:00Z",
    status: "APPROVED",
    templateData: {
      itemA: {
        name: "Jaggery (Gud)",
        points: [
          "Contains iron, magnesium, potassium",
          "Helps digestion",
          "Purifies blood",
          "Slower sugar release",
          "Traditional processing, no chemicals",
        ],
      },
      itemB: {
        name: "White Sugar",
        points: [
          "Zero minerals (stripped in processing)",
          "Spikes blood sugar instantly",
          "Causes inflammation",
          "Chemical bleaching involved",
          "Empty calories with no nutrition",
        ],
      },
      comparisonVerdict: "Jaggery is the clear winner. While both are sweeteners, jaggery retains minerals and has a lower glycemic impact than refined white sugar.",
    },
  },
  {
    id: "post-6",
    author: mockUsers[0],
    type: "image",
    template: "recipe",
    title: "Amla Murabba - Traditional Vitamin C Preserve",
    content:
      "Fresh amla is available only for 3 months. Here's the traditional recipe for Amla Murabba that preserves its incredible Vitamin C content for year-round benefits.\n\nOne amla = 20 oranges worth of Vitamin C!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Indian_gooseberry_Amla_IMG_3122.jpg",
      },
    ],
    tags: ["amla", "recipe", "vitamin-c", "seasonal", "preservation"],
    likes: 789,
    comments: 45,
    shares: 167,
    bookmarked: false,
    liked: false,
    createdAt: "2026-05-08T09:00:00Z",
    status: "APPROVED",
    templateData: {
      ingredients: [
        "500g fresh Amla (Indian Gooseberry)",
        "500g organic jaggery or sugar",
        "2 cups water",
        "4-5 green cardamom pods",
        "1/4 tsp saffron strands",
        "1 tbsp lemon juice",
      ],
      steps: [
        "Wash amla thoroughly and prick with a fork all over",
        "Boil in water for 5-7 minutes until slightly tender, drain",
        "Prepare sugar syrup - boil sugar with 2 cups water until one-string consistency",
        "Add cardamom and saffron to the syrup",
        "Add boiled amla to the syrup and cook on low heat for 20 minutes",
        "Let it cool completely and store in a glass jar",
        "Allow to soak for 7 days before consuming. Keeps for 6+ months!",
      ],
      prepTime: "20 mins",
      cookTime: "30 mins",
      servings: "15-20 pieces",
      difficulty: "Easy",
    },
  },
  {
    id: "post-7",
    author: mockUsers[1],
    type: "pdf",
    template: "lab-report",
    title: "Complete Nutritional Analysis: Local Millets vs Imported Quinoa",
    content:
      "Our lab just completed a comprehensive study comparing Indian millets with imported quinoa. Spoiler: Our local millets WIN in almost every category!\n\nDownload the full PDF report below.",
    media: [
      {
        type: "pdf",
        url: "/reports/millet-vs-quinoa.pdf",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/ae/MILLET_grains_India.jpg",
      },
    ],
    tags: ["millets", "quinoa", "research", "nutrition"],
    likes: 1567,
    comments: 98,
    shares: 445,
    bookmarked: true,
    liked: true,
    createdAt: "2026-05-07T14:00:00Z",
    status: "APPROVED",
    templateData: {
      labName: "ICAR - Indian Institute of Millets Research, Hyderabad",
      testDate: "March 2026",
      findings: [
        { label: "Calcium (mg/100g)", localValue: "Ragi: 344", commercialValue: "Quinoa: 47", winner: "local" },
        { label: "Iron (mg/100g)", localValue: "Bajra: 8.0", commercialValue: "Quinoa: 4.6", winner: "local" },
        { label: "Protein Quality", localValue: "Jowar: High lysine", commercialValue: "Quinoa: Complete", winner: "commercial" },
        { label: "Fiber (g/100g)", localValue: "Kodo: 9.0", commercialValue: "Quinoa: 7.0", winner: "local" },
        { label: "Cost (per kg)", localValue: "Rs 60-120", commercialValue: "Rs 800-1200", winner: "local" },
        { label: "Carbon Footprint", localValue: "Locally grown", commercialValue: "Imported 8000+ km", winner: "local" },
      ],
      verdict: "Indian millets match or exceed quinoa in most nutritional parameters at 1/10th the cost and zero import carbon footprint. Ragi alone has 7x more calcium than quinoa.",
      pdfUrl: "/reports/millet-vs-quinoa.pdf",
    },
  },
  {
    id: "post-8",
    author: mockUsers[2],
    type: "image",
    template: "where-to-find",
    title: "Fresh Organic Ragi - Direct from Our Farm!",
    content:
      "We harvest organic ragi (finger millet) every season at our farm in Ramanagara, Karnataka. No pesticides, no chemical fertilizers - just pure, traditional farming.\n\nVisit us or order online. We deliver across Bangalore!",
    media: [
      {
        type: "image",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Finger_Millet_Field_at_Peddamunagalachedu_Village.jpg",
      },
    ],
    tags: ["ragi", "organic", "farm-fresh", "bangalore", "karnataka"],
    likes: 432,
    comments: 52,
    shares: 89,
    bookmarked: false,
    liked: false,
    createdAt: "2026-05-06T10:00:00Z",
    status: "APPROVED",
    templateData: {
      location: {
        name: "Desai Organic Farm",
        address: "Ramanagara, Karnataka - 45km from Bangalore",
        lat: 12.7159,
        lng: 77.2814,
      },
      price: "Rs 80/kg (farm gate), Rs 120/kg (delivered in Bangalore)",
      availability: "September - February (Kharif harvest)",
      season: "Rabi & Kharif",
      nearbyStores: [
        { id: "s1", name: "Desai Organic Farm (Direct)", address: "Ramanagara, Karnataka", distance: "45 km", lat: 12.7159, lng: 77.2814, phone: "+91 98765 43210", rating: 4.9, available: true },
        { id: "s2", name: "Sahaja Samrudha Organic Store", address: "JP Nagar 6th Phase, Bangalore", distance: "5.2 km", lat: 12.8923, lng: 77.5839, phone: "+91 80 2658 9012", rating: 4.6, available: true },
        { id: "s3", name: "Millet Amma Store", address: "Jayanagar 4th Block, Bangalore", distance: "6.8 km", lat: 12.9249, lng: 77.5838, rating: 4.4, available: true },
      ],
    },
  },
];

// Mock comments for detail pages
export const mockPostComments: Record<string, MockComment[]> = {
  "post-kokum": [
    { id: "ck1", user: mockUsers[0], text: "This is THE most comprehensive kokum guide I've ever seen! As a Goan, kokum is part of our daily life. Sol Kadhi after every meal is a must in our house.", time: "1h ago", likes: 89, status: "approved" },
    { id: "ck2", user: mockUsers[1], text: "The lab data is fascinating. Garcinol being 3x stronger than Vitamin E as an antioxidant is remarkable. I've been studying HCA for weight management and kokum is a more sustainable source than Garcinia Cambogia imports.", time: "2h ago", likes: 156, status: "approved" },
    { id: "ck3", user: mockUsers[4], text: "Just made the Sol Kadhi recipe — it's PERFECT! The tip about not using a blender for the garlic paste makes such a difference in texture. Served it chilled with fish curry rice. Heaven!", time: "3h ago", likes: 67, status: "approved" },
    { id: "ck4", user: mockUsers[2], text: "We grow kokum trees on our farm in Ratnagiri! The fruit season is so short (April-June) that most people never get to taste fresh kokum. Dried amsul is available year-round though. Happy to ship to anyone interested!", time: "4h ago", likes: 203, status: "approved" },
    { id: "ck5", user: mockUsers[0], text: "Can kokum interact with any medications? I'm on blood pressure medicine and want to be careful.", time: "30m ago", likes: 2, status: "pending" },
    { id: "ck6", user: mockUsers[4], text: "I sell kokum products — DM me for wholesale prices!", time: "15m ago", likes: 0, status: "rejected" },
    { id: "ck7", user: mockUsers[1], text: "For anyone wondering about the anti-cancer claims: the Garcinol studies are in-vitro (lab cells). Promising but not yet proven in human clinical trials. Still, the overall nutrition profile makes kokum excellent for preventive health.", time: "5h ago", likes: 312, status: "approved" },
    { id: "ck8", user: mockUsers[2], text: "Kokum butter is incredible for skin! I make homemade lip balm with it. Way better than petroleum-based products.", time: "6h ago", likes: 94, status: "approved" },
  ],
  "post-1": [
    { id: "c1", user: mockUsers[2], text: "I've been drinking this every night! My joint pain has reduced so much.", time: "2h ago", likes: 12, status: "approved" },
    { id: "c2", user: mockUsers[4], text: "The black pepper tip is gold! Most people don't know this.", time: "3h ago", likes: 24, status: "approved" },
    { id: "c3", user: mockUsers[1], text: "As a nutritionist, I can confirm curcumin absorption increases with piperine (black pepper).", time: "5h ago", likes: 45, status: "approved" },
    { id: "c4", user: mockUsers[0], text: "Can we add ashwagandha to the milk too? Would that work?", time: "1h ago", likes: 0, status: "pending" },
    { id: "c5", user: mockUsers[4], text: "I sell organic turmeric, DM me for prices!", time: "30m ago", likes: 0, status: "rejected" },
  ],
  "post-2": [
    { id: "c1", user: mockUsers[0], text: "This is why I only buy from our local beekeeper now!", time: "1h ago", likes: 8, status: "approved" },
    { id: "c2", user: mockUsers[4], text: "Can you share which brands you tested? Would love to know!", time: "4h ago", likes: 32, status: "approved" },
    { id: "c3", user: mockUsers[2], text: "We keep bees on our organic farm. Happy to supply pure honey to Bangalore folks!", time: "6h ago", likes: 19, status: "approved" },
    { id: "c4", user: mockUsers[0], text: "Where can I get the full lab report PDF?", time: "2h ago", likes: 3, status: "pending" },
  ],
  "post-3": [
    { id: "c1", user: mockUsers[0], text: "Beautiful farm! Ragi dosa is our family breakfast staple.", time: "2h ago", likes: 15, status: "approved" },
    { id: "c2", user: mockUsers[1], text: "Ragi is incredibly underrated. The calcium content rivals dairy.", time: "5h ago", likes: 28, status: "approved" },
    { id: "c3", user: mockUsers[4], text: "How many acres is your farm? Looking to visit!", time: "1h ago", likes: 2, status: "pending" },
  ],
  "post-4": [
    { id: "c1", user: mockUsers[2], text: "Moringa leaves grow wild on our farm. Such a powerhouse!", time: "3h ago", likes: 22, status: "approved" },
    { id: "c2", user: mockUsers[1], text: "Horse gram is amazing for weight loss. Highly recommend.", time: "7h ago", likes: 18, status: "approved" },
  ],
  "post-5": [
    { id: "c1", user: mockUsers[0], text: "Switched to jaggery 2 years ago, never going back!", time: "1h ago", likes: 9, status: "approved" },
    { id: "c2", user: mockUsers[2], text: "But isn't jaggery still sugar at the end of the day?", time: "45m ago", likes: 1, status: "pending" },
  ],
  "post-6": [
    { id: "c1", user: mockUsers[4], text: "Made this last season! The saffron adds such a beautiful color.", time: "4h ago", likes: 14, status: "approved" },
    { id: "c2", user: mockUsers[2], text: "My grandmother used to make this exact recipe every winter.", time: "8h ago", likes: 31, status: "approved" },
  ],
  "post-7": [
    { id: "c1", user: mockUsers[0], text: "Amazing research! Sharing this with everyone I know.", time: "2h ago", likes: 42, status: "approved" },
    { id: "c2", user: mockUsers[4], text: "Ragi has 7x calcium of quinoa?! This needs to be mainstream knowledge.", time: "6h ago", likes: 56, status: "approved" },
    { id: "c3", user: mockUsers[2], text: "Proud millet farmer! Thanks for bringing science to support what we already knew.", time: "10h ago", likes: 38, status: "approved" },
  ],
  "post-8": [
    { id: "c1", user: mockUsers[0], text: "Do you deliver to HSR Layout, Bangalore? Would love to order!", time: "1h ago", likes: 5, status: "approved" },
    { id: "c2", user: mockUsers[4], text: "Visited this farm last month. The ragi quality is outstanding.", time: "3h ago", likes: 11, status: "approved" },
    { id: "c3", user: mockUsers[1], text: "What's the minimum order quantity for delivery?", time: "30m ago", likes: 0, status: "pending" },
  ],
};

export const mockStories = [
  { id: "s1", user: mockUsers[0], thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/99/Golden_Milk.jpg", viewed: false },
  { id: "s2", user: mockUsers[2], thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Finger_Millet_Field_at_Peddamunagalachedu_Village.jpg", viewed: false },
  { id: "s3", user: mockUsers[4], thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sonjna_%28Moringa_oleifera%29_leaves_with_flowers_at_Kolkata_W_IMG_2125.jpg", viewed: true },
  { id: "s4", user: mockUsers[1], thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Maltese_honey_comb.jpg", viewed: true },
  { id: "s5", user: mockUsers[3], thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/77/Indian_gooseberry_Amla_IMG_3122.jpg", viewed: false },
];

export const mockTemplates = [
  {
    id: "tpl-1",
    name: "Food Benefit Card",
    description: "Share health benefits of a food item with nutrition facts",
    preview: "https://upload.wikimedia.org/wikipedia/commons/7/77/Indian_gooseberry_Amla_IMG_3122.jpg",
    category: "health",
    templateKey: "food-benefit" as TemplateName,
    layout: "card-with-image",
    fields: ["title", "image", "benefits-list", "nutrition-facts", "source"],
    color: "from-green-500 to-emerald-600",
    icon: "Heart",
  },
  {
    id: "tpl-2",
    name: "Lab Report Summary",
    description: "Share lab test results with comparison data",
    preview: "https://upload.wikimedia.org/wikipedia/commons/3/36/Ncl-pune.jpg",
    category: "science",
    templateKey: "lab-report" as TemplateName,
    layout: "data-card",
    fields: ["title", "lab-name", "test-date", "findings-table", "verdict"],
    color: "from-blue-500 to-cyan-600",
    icon: "FlaskConical",
  },
  {
    id: "tpl-3",
    name: "Recipe Card",
    description: "Share a traditional recipe with ingredients and steps",
    preview: "https://upload.wikimedia.org/wikipedia/commons/4/46/Solkadhi.jpg",
    category: "recipe",
    templateKey: "recipe" as TemplateName,
    layout: "step-by-step",
    fields: ["title", "ingredients", "steps", "video", "prep-time", "cook-time", "servings"],
    color: "from-orange-500 to-red-600",
    icon: "ChefHat",
  },
  {
    id: "tpl-4",
    name: "Where to Find",
    description: "Share a local food source with map location",
    preview: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Finger_Millet_Field_at_Peddamunagalachedu_Village.jpg",
    category: "location",
    templateKey: "where-to-find" as TemplateName,
    layout: "map-card",
    fields: ["title", "image", "location", "price", "availability", "season"],
    color: "from-purple-500 to-pink-600",
    icon: "MapPin",
  },
  {
    id: "tpl-5",
    name: "Comparison Post",
    description: "Compare two food items or approaches side by side",
    preview: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sonjna_%28Moringa_oleifera%29_leaves_with_flowers_at_Kolkata_W_IMG_2125.jpg",
    category: "education",
    templateKey: "comparison" as TemplateName,
    layout: "split-comparison",
    fields: ["item-a-name", "item-a-points", "item-b-name", "item-b-points", "verdict"],
    color: "from-amber-500 to-yellow-600",
    icon: "Scale",
  },
  {
    id: "tpl-6",
    name: "Video Story",
    description: "Share a video with description and tags",
    preview: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Garcinia_indica_-_fruits%2C_seeds%2C_pulp_and_rinds.jpg",
    category: "media",
    templateKey: "video-story" as TemplateName,
    layout: "video-post",
    fields: ["title", "video-upload", "description", "tags"],
    color: "from-red-500 to-rose-600",
    icon: "Video",
  },
  {
    id: "tpl-7",
    name: "Custom / Freestyle",
    description: "Create your own layout from scratch",
    preview: "https://upload.wikimedia.org/wikipedia/commons/9/99/Golden_Milk.jpg",
    category: "custom",
    templateKey: "custom" as TemplateName,
    layout: "freeform",
    fields: [],
    color: "from-gray-500 to-slate-600",
    icon: "Palette",
  },
];

export const mockChats = [
  {
    id: "chat-1",
    user: mockUsers[2],
    lastMessage: "Hey! Where can I find organic turmeric in Bangalore?",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "chat-2",
    user: mockUsers[4],
    lastMessage: "Thanks for the ragi recipe! It turned out amazing",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "chat-3",
    user: mockUsers[1],
    lastMessage: "I'll send you the lab report PDF tomorrow",
    time: "3h ago",
    unread: 1,
  },
];

export const trendingTags = [
  { tag: "#OrganicLiving", posts: 1234 },
  { tag: "#MilletRevolution", posts: 892 },
  { tag: "#FarmToTable", posts: 756 },
  { tag: "#AyurvedicFood", posts: 643 },
  { tag: "#LocalHoney", posts: 521 },
  { tag: "#SeasonalEating", posts: 489 },
];

export const suggestedUsers = [
  mockUsers[2],
  mockUsers[4],
  mockUsers[1],
];
