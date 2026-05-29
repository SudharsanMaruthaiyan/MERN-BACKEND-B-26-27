const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      product_title: "iPhone 15 Pro",
      product_description: "Apple flagship smartphone with A17 Pro chip.",
      product_price: "129999",
      product_discountPercentage: "10",
      product_rating: "4.8",
      product_brand: "Apple",
      product_thumbnail:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      product_tags: ["smartphone", "apple", "electronics"],
      product_images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      ],
    },
    {
      product_title: "Samsung Galaxy S24",
      product_description: "Premium Android smartphone with AI features.",
      product_price: "89999",
      product_discountPercentage: "12",
      product_rating: "4.7",
      product_brand: "Samsung",
      product_thumbnail:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      product_tags: ["smartphone", "samsung", "android"],
      product_images: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      ],
    },
    {
      product_title: "MacBook Air M3",
      product_description: "Lightweight laptop powered by Apple M3 chip.",
      product_price: "114999",
      product_discountPercentage: "8",
      product_rating: "4.9",
      product_brand: "Apple",
      product_thumbnail:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      product_tags: ["laptop", "apple", "macbook"],
      product_images: [
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      ],
    },
    {
      product_title: "Dell XPS 13",
      product_description: "Compact ultrabook for professionals.",
      product_price: "94999",
      product_discountPercentage: "15",
      product_rating: "4.6",
      product_brand: "Dell",
      product_thumbnail:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      product_tags: ["laptop", "dell", "ultrabook"],
      product_images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      ],
    },
    {
      product_title: "Sony WH-1000XM5",
      product_description: "Industry-leading noise cancelling headphones.",
      product_price: "29999",
      product_discountPercentage: "18",
      product_rating: "4.8",
      product_brand: "Sony",
      product_thumbnail:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      product_tags: ["headphones", "sony", "audio"],
      product_images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      ],
    },
    {
      product_title: "Apple Watch Series 9",
      product_description: "Advanced smartwatch with health tracking.",
      product_price: "45999",
      product_discountPercentage: "10",
      product_rating: "4.7",
      product_brand: "Apple",
      product_thumbnail:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
      product_tags: ["watch", "smartwatch", "apple"],
      product_images: [
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
      ],
    },
    {
      product_title: "Nike Air Max",
      product_description: "Comfortable running shoes with air cushioning.",
      product_price: "7999",
      product_discountPercentage: "20",
      product_rating: "4.5",
      product_brand: "Nike",
      product_thumbnail:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      product_tags: ["shoes", "nike", "sports"],
      product_images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      ],
    },
    {
      product_title: "Canon EOS R50",
      product_description: "Mirrorless camera for creators and vloggers.",
      product_price: "67999",
      product_discountPercentage: "7",
      product_rating: "4.6",
      product_brand: "Canon",
      product_thumbnail:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      product_tags: ["camera", "canon", "photography"],
      product_images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      ],
    },
    {
      product_title: "JBL Flip 6",
      product_description: "Portable Bluetooth speaker with powerful sound.",
      product_price: "9999",
      product_discountPercentage: "25",
      product_rating: "4.4",
      product_brand: "JBL",
      product_thumbnail:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      product_tags: ["speaker", "jbl", "audio"],
      product_images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      ],
    },
    {
      product_title: "Logitech MX Master 3S",
      product_description: "Premium wireless productivity mouse.",
      product_price: "8999",
      product_discountPercentage: "14",
      product_rating: "4.9",
      product_brand: "Logitech",
      product_thumbnail:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
      product_tags: ["mouse", "logitech", "accessories"],
      product_images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
      ],
    },
  ];

  await prisma.products.createMany({
    data: products,
  });

  console.log("✅ 10 Products Seeded Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
