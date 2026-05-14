import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@localbite.com" },
    update: {},
    create: {
      email: "admin@localbite.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create test user
  const userPassword = await hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@localbite.com" },
    update: {},
    create: {
      email: "user@localbite.com",
      name: "Test User",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("Created test user:", user.email);

  // Create categories
  const categories = [
    { name: "Fruits", slug: "fruits", description: "Fresh local fruits", icon: "🍎" },
    { name: "Vegetables", slug: "vegetables", description: "Fresh local vegetables", icon: "🥬" },
    { name: "Grains & Cereals", slug: "grains", description: "Traditional grains and millets", icon: "🌾" },
    { name: "Dairy", slug: "dairy", description: "Fresh dairy products", icon: "🥛" },
    { name: "Herbs & Spices", slug: "herbs", description: "Local herbs and spices", icon: "🌿" },
    { name: "Honey & Bee Products", slug: "honey", description: "Natural honey and bee products", icon: "🍯" },
    { name: "Fermented Foods", slug: "fermented", description: "Traditional fermented foods", icon: "🫙" },
    { name: "Cold-pressed Oils", slug: "oils", description: "Natural cold-pressed oils", icon: "🫒" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Created categories");

  // Create food items
  const herbsCategory = await prisma.category.findUnique({ where: { slug: "herbs" } });
  const fruitsCategory = await prisma.category.findUnique({ where: { slug: "fruits" } });
  const grainsCategory = await prisma.category.findUnique({ where: { slug: "grains" } });

  const foodItems = [
    {
      name: "Turmeric",
      slug: "turmeric",
      description: "A golden spice used in traditional medicine for thousands of years. Known for its powerful anti-inflammatory and antioxidant properties.",
      categoryId: herbsCategory?.id,
      season: "All Year",
      region: "South India, Maharashtra",
      benefits: [
        "Powerful anti-inflammatory compound (curcumin)",
        "Strong antioxidant that neutralizes free radicals",
        "Boosts brain-derived neurotrophic factor",
        "Lowers risk of heart disease",
        "May help prevent cancer",
        "Useful in treating arthritis",
        "Helps with depression",
        "May delay aging and fight age-related diseases",
      ],
      nutritionalInfo: {
        "Calories": "354 per 100g",
        "Protein": "7.83g",
        "Fat": "9.88g",
        "Carbohydrates": "64.93g",
        "Fiber": "21.1g",
        "Iron": "41.42mg",
        "Manganese": "7.83mg",
        "Potassium": "2525mg",
      },
    },
    {
      name: "Amla (Indian Gooseberry)",
      slug: "amla",
      description: "One of the richest natural sources of Vitamin C. A staple in Ayurvedic medicine for boosting immunity and overall health.",
      categoryId: fruitsCategory?.id,
      season: "Winter (Oct-Feb)",
      region: "All India",
      benefits: [
        "Extremely high in Vitamin C (20x more than orange)",
        "Boosts immunity and fights infections",
        "Improves digestion and metabolism",
        "Strengthens hair and prevents premature graying",
        "Good for eye health",
        "Helps control diabetes",
        "Anti-aging properties",
        "Improves liver function",
      ],
      nutritionalInfo: {
        "Calories": "44 per 100g",
        "Vitamin C": "600mg",
        "Fiber": "4.3g",
        "Carbohydrates": "10.18g",
        "Calcium": "25mg",
        "Iron": "0.31mg",
      },
    },
    {
      name: "Ragi (Finger Millet)",
      slug: "ragi",
      description: "An ancient grain packed with calcium and essential amino acids. A superfood for bone health and sustained energy.",
      categoryId: grainsCategory?.id,
      season: "All Year",
      region: "Karnataka, Tamil Nadu, Uttarakhand",
      benefits: [
        "Highest calcium content among cereals (344mg/100g)",
        "Excellent for bone health and preventing osteoporosis",
        "Rich in iron - helps prevent anemia",
        "High fiber helps control blood sugar",
        "Gluten-free alternative to wheat",
        "Good for weight management",
        "Helps reduce bad cholesterol",
        "Contains essential amino acids",
      ],
      nutritionalInfo: {
        "Calories": "328 per 100g",
        "Protein": "7.3g",
        "Fat": "1.3g",
        "Carbohydrates": "72g",
        "Fiber": "3.6g",
        "Calcium": "344mg",
        "Iron": "3.9mg",
        "Phosphorus": "283mg",
      },
    },
  ];

  for (const item of foodItems) {
    await prisma.foodItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        categoryId: item.categoryId || null,
        season: item.season,
        region: item.region,
        benefits: item.benefits,
        nutritionalInfo: item.nutritionalInfo,
      },
    });
  }
  console.log("Created food items");

  // Create sample posts
  const turmeric = await prisma.foodItem.findUnique({ where: { slug: "turmeric" } });
  const amla = await prisma.foodItem.findUnique({ where: { slug: "amla" } });

  const posts = [
    {
      title: "Why Turmeric Should Be in Every Kitchen",
      content: `<h2>The Golden Spice of Life</h2><p>Turmeric has been used in Indian households for thousands of years, not just as a spice but as a medicine. The active compound, curcumin, is what gives turmeric its powerful anti-inflammatory and antioxidant properties.</p><h3>Key Benefits:</h3><ul><li>Natural anti-inflammatory that matches some drugs in effectiveness</li><li>Dramatically increases the antioxidant capacity of the body</li><li>Curcumin boosts brain function and lowers risk of brain diseases</li><li>May reduce risk of heart disease</li></ul><p>The best way to consume turmeric is with black pepper (piperine increases absorption by 2000%) and with some fat (it's fat-soluble).</p><h3>Where to find fresh turmeric:</h3><p>Look for fresh turmeric root at local vegetable markets. It's available year-round in most parts of India. For the best quality, look for organically grown turmeric from Erode (Tamil Nadu) or Sangli (Maharashtra).</p>`,
      excerpt: "Turmeric has been used in Indian households for thousands of years. Learn why this golden spice is essential for health.",
      authorId: user.id,
      categoryId: herbsCategory?.id,
      foodItemId: turmeric?.id,
      status: "APPROVED" as const,
    },
    {
      title: "Amla: Nature's Vitamin C Powerhouse",
      content: `<h2>The Indian Gooseberry</h2><p>Amla is one of the most important fruits in Ayurveda. With vitamin C content 20 times that of an orange, it's nature's most potent immunity booster.</p><h3>How to Consume:</h3><ul><li><strong>Raw:</strong> Eat 1-2 fresh amla daily for maximum benefit</li><li><strong>Juice:</strong> Mix with honey for a morning immunity drink</li><li><strong>Powder:</strong> Add to smoothies or warm water</li><li><strong>Pickle:</strong> Traditional amla pickle retains many benefits</li><li><strong>Murabba:</strong> Amla preserved in sugar syrup</li></ul><h3>Seasonal Availability:</h3><p>Fresh amla is available from October to February. Stock up during winter and make preserves for year-round use.</p>`,
      excerpt: "Amla has 20 times more Vitamin C than an orange. Discover how this superfruit can transform your health.",
      authorId: user.id,
      categoryId: fruitsCategory?.id,
      foodItemId: amla?.id,
      status: "APPROVED" as const,
    },
    {
      title: "The Lost Superfood: Ragi and Its Amazing Benefits",
      content: `<h2>Rediscovering Ancient Grains</h2><p>Ragi (Finger Millet) was once the staple food of South India. With modernization, it was replaced by rice and wheat. But nutritional science is now revealing what our ancestors always knew - ragi is a superfood.</p><h3>Why Ragi is Special:</h3><ul><li>Contains 344mg calcium per 100g (highest among all cereals)</li><li>Rich in iron, preventing anemia</li><li>High fiber content controls blood sugar</li><li>Gluten-free - perfect for celiac patients</li></ul><h3>Traditional Preparations:</h3><p>Ragi mudde (balls), ragi dosa, ragi porridge, and ragi malt are traditional ways to include this grain in your diet.</p>`,
      excerpt: "Ragi was the staple food of ancient India. Learn why scientists are calling it a superfood.",
      authorId: admin.id,
      foodItemId: await prisma.foodItem.findUnique({ where: { slug: "ragi" } }).then((r: { id: string } | null) => r?.id),
      categoryId: grainsCategory?.id,
      status: "APPROVED" as const,
    },
    {
      title: "Local Honey vs Commercial Honey: A Comparison",
      content: `<h2>Not All Honey is Equal</h2><p>Local raw honey from nearby beekeepers is vastly different from commercial honey found in supermarkets. Here's why local honey deserves a place in your pantry.</p><h3>Benefits of Local Honey:</h3><ul><li>Contains local pollen that may help with seasonal allergies</li><li>Rich in enzymes and antioxidants (destroyed in commercial processing)</li><li>Supports local beekeepers and biodiversity</li><li>No added sugars or artificial processing</li></ul><p>This post is pending review by our admin team.</p>`,
      excerpt: "Local raw honey offers benefits that commercial honey cannot match. Learn the difference.",
      authorId: user.id,
      status: "PENDING" as const,
    },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findFirst({
      where: { title: post.title },
    });
    if (!existing) {
      await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          images: [],
          authorId: post.authorId,
          categoryId: post.categoryId || null,
          foodItemId: post.foodItemId || null,
          status: post.status,
        },
      });
    }
  }
  console.log("Created sample posts");

  // Create sample food sources
  const foodSources = [
    {
      name: "Green Valley Organic Farm",
      description: "Organic farm growing traditional vegetables and spices",
      address: "NH-44, Devanahalli, Bangalore Rural",
      latitude: 13.2468,
      longitude: 77.7119,
      type: "farm",
      phone: "+91 98765 43210",
    },
    {
      name: "Local Farmers Market",
      description: "Weekly market with fresh produce directly from farmers",
      address: "M.G. Road, Bangalore",
      latitude: 12.9758,
      longitude: 77.6045,
      type: "market",
      phone: "+91 98765 12345",
    },
    {
      name: "Nature's Basket - Organic Store",
      description: "Organic store with verified local produce",
      address: "Indiranagar, Bangalore",
      latitude: 12.9784,
      longitude: 77.6408,
      type: "store",
    },
  ];

  for (const source of foodSources) {
    const existing = await prisma.foodSource.findFirst({
      where: { name: source.name },
    });
    if (!existing) {
      await prisma.foodSource.create({
        data: source,
      });
    }
  }
  console.log("Created food sources");

  console.log("Seeding complete!");
  console.log("\n--- Login Credentials ---");
  console.log("Admin: admin@localbite.com / admin123");
  console.log("User: user@localbite.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
