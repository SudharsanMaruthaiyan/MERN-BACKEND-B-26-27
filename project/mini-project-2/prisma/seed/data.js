const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.restaurants.createMany({
    data: [
      {
        name: "Spicy Village",
        location: "Chennai",
        image_url:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        offer: "20% OFF on all orders",
      },
      {
        name: "Burger Hub",
        location: "Coimbatore",
        image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
        offer: "Buy 1 Get 1 Free",
      },
      {
        name: "Pizza Point",
        location: "Trichy",
        image_url:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        offer: "Free Coke with Pizza",
      },
      {
        name: "Arabian Nights",
        location: "Madurai",
        image_url:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        offer: "15% OFF on Biryani",
      },
      {
        name: "Tandoori Flame",
        location: "Salem",
        image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        offer: "Flat ₹100 OFF",
      },
      {
        name: "Ocean Grill",
        location: "Pondicherry",
        image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
        offer: "Seafood Combo Offer",
      },
      {
        name: "Dosa Corner",
        location: "Erode",
        image_url:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
        offer: "Unlimited Breakfast",
      },
      {
        name: "BBQ Nation",
        location: "Bangalore",
        image_url:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        offer: "Weekend Buffet Offer",
      },
      {
        name: "Cafe Mocha",
        location: "Hyderabad",
        image_url:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        offer: "Free Coffee on Orders Above ₹500",
      },
      {
        name: "Food Paradise",
        location: "Mumbai",
        image_url:
          "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
        offer: "25% OFF for New Users",
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
