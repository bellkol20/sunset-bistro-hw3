import 'dotenv/config'
import { connectDB } from './config/db.js'
import { MenuItem } from './models/MenuItem.js'

const menuSections = [
  {
    section: 'Starters',
    name: 'Roasted Tomato Bruschetta',
    price: 9,
    description:
      'Grilled sourdough topped with marinated tomatoes, basil, and balsamic glaze.',
  },
  {
    section: 'Starters',
    name: 'Crispy Calamari',
    price: 12,
    description: 'Lightly fried calamari served with lemon aioli and marinara.',
  },
  {
    section: 'Starters',
    name: 'Seasonal Soup',
    price: 8,
    description: 'Ask your server about today’s chef-inspired creation.',
  },
  {
    section: 'Mains',
    name: 'Seared Salmon',
    price: 22,
    description:
      'Pan-seared salmon with lemon herb butter, roasted potatoes, and asparagus.',
  },
  {
    section: 'Mains',
    name: 'Sunset Pasta',
    price: 18,
    description:
      'Fettuccine with seasonal vegetables, parmesan cream sauce, and fresh herbs.',
  },
  {
    section: 'Mains',
    name: 'Herb-Roasted Chicken',
    price: 20,
    description: 'Free-range chicken with garlic mashed potatoes and grilled broccolini.',
  },
  {
    section: 'Desserts',
    name: 'Classic Crème Brûlée',
    price: 9,
    description: 'Vanilla bean custard with a caramelized sugar crust.',
  },
  {
    section: 'Desserts',
    name: 'Chocolate Lava Cake',
    price: 10,
    description: 'Warm chocolate cake with a molten center and vanilla ice cream.',
  },
  {
    section: 'Desserts',
    name: 'Seasonal Sorbet Trio',
    price: 8,
    description: 'Rotating flavors made with fresh fruit.',
  },
]

async function seed() {
  await connectDB()
  await MenuItem.deleteMany({})
  await MenuItem.insertMany(menuSections)
  console.log(`Seeded ${menuSections.length} menu items`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
