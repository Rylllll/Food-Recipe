export type Recipe = {
  id: string;
  title: string;
  country: string;
  color: string;
  image: string;
  time: string;
  difficulty: string;
  description: string;
  ingredients: string[];
  instructions: string[];
};

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spicy Miso Ramen",
    country: "Japan",
    color: "bg-[#FF5C5C]", // Neo red
    image: "https://images.unsplash.com/photo-1653697469196-89c44bb81a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJhbWVuJTIwYm93bHxlbnwxfHx8fDE3Nzg0NjA0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "45 MIN",
    difficulty: "HARD",
    description: "A rich, complex broth loaded with umami, springy noodles, and a soft-boiled egg. Brutal flavor.",
    ingredients: [
      "4 cups Chicken broth",
      "3 tbsp Red miso paste",
      "1 tbsp Chili oil",
      "2 portions Ramen noodles",
      "2 Soft-boiled eggs",
      "Pork chashu slices",
      "Scallions, chopped"
    ],
    instructions: [
      "Boil the chicken broth in a large pot.",
      "Whisk in the miso paste and chili oil until fully dissolved.",
      "Boil noodles in a separate pot according to package instructions.",
      "Drain noodles and divide into two bowls.",
      "Pour the hot broth over the noodles.",
      "Top with chashu, soft-boiled egg, and scallions. Serve immediately."
    ]
  },
  {
    id: "2",
    title: "Al Pastor Tacos",
    country: "Mexico",
    color: "bg-[#FFBD12]", // Neo yellow
    image: "https://images.unsplash.com/photo-1619301920463-a37f1764eb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwc3RyZWV0JTIwdGFjb3N8ZW58MXx8fHwxNzc4NTY2NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "30 MIN",
    difficulty: "MEDIUM",
    description: "Marinated pork roasted on a spit, served with pineapple and salsa. Street food supremacy.",
    ingredients: [
      "1 lb Pork shoulder, thinly sliced",
      "2 tbsp Achiote paste",
      "1/2 cup Pineapple juice",
      "Corn tortillas",
      "Fresh pineapple chunks",
      "Diced onion and cilantro",
      "Lime wedges"
    ],
    instructions: [
      "Blend achiote paste and pineapple juice to make a marinade.",
      "Coat the pork slices in the marinade and let sit for at least 2 hours.",
      "Grill or pan-fry the pork over high heat until slightly charred.",
      "Warm the corn tortillas on a skillet.",
      "Assemble tacos with pork, pineapple, onion, and cilantro.",
      "Squeeze fresh lime on top."
    ]
  },
  {
    id: "3",
    title: "Classic Carbonara",
    country: "Italy",
    color: "bg-[#00C6AE]", // Neo teal
    image: "https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc3ODQyODc0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "20 MIN",
    difficulty: "MEDIUM",
    description: "No cream. Just eggs, cheese, pork, and pepper. The ultimate unapologetic Roman dish.",
    ingredients: [
      "400g Spaghetti",
      "150g Guanciale or Pancetta",
      "4 Large egg yolks + 1 whole egg",
      "1 cup Pecorino Romano, grated",
      "Black pepper, freshly ground"
    ],
    instructions: [
      "Boil a large pot of salted water and cook spaghetti until al dente.",
      "Crisp the guanciale in a large pan over medium heat.",
      "In a bowl, whisk eggs, grated Pecorino, and plenty of black pepper.",
      "Drain pasta (save 1 cup of pasta water) and add to the guanciale pan off the heat.",
      "Quickly stir in the egg mixture, adding pasta water until a creamy sauce forms.",
      "Serve immediately with extra cheese and pepper."
    ]
  },
  {
    id: "4",
    title: "Chicken Tikka Masala",
    country: "India",
    color: "bg-[#F95A2C]", // Neo orange
    image: "https://images.unsplash.com/photo-1777310823420-db2197ff9004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMGJvd2x8ZW58MXx8fHwxNzc4NTI3OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "60 MIN",
    difficulty: "EASY",
    description: "Roasted chunks of chicken in a spicy, creamy, tomato-based sauce. Maximum comfort.",
    ingredients: [
      "1 lb Chicken breast, cubed",
      "1 cup Plain yogurt",
      "2 tbsp Garam masala",
      "1 large Onion, diced",
      "1 can Crushed tomatoes (14oz)",
      "1/2 cup Heavy cream",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Marinate chicken in yogurt and half the garam masala for 1 hour.",
      "Sauté onions until golden, then add remaining spices.",
      "Add crushed tomatoes and simmer for 15 minutes.",
      "In a separate pan, brown the marinated chicken pieces.",
      "Add chicken to the sauce, stir in heavy cream, and simmer for 10 mins.",
      "Garnish with cilantro and serve with naan."
    ]
  },
  {
    id: "5",
    title: "Authentic Pad Thai",
    country: "Thailand",
    color: "bg-[#1947E5]", // Neo blue
    image: "https://images.unsplash.com/photo-1729708475167-71a6eb3cd741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwcGFkJTIwdGhhaXxlbnwxfHx8fDE3Nzg1NjY1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "25 MIN",
    difficulty: "MEDIUM",
    description: "Sweet, salty, sour, and spicy. A chaotic but perfect harmony of flavors.",
    ingredients: [
      "8 oz Rice noodles",
      "2 tbsp Tamarind paste",
      "2 tbsp Fish sauce",
      "1 tbsp Palm sugar",
      "1/2 lb Shrimp or Tofu",
      "2 Eggs",
      "Bean sprouts, crushed peanuts, lime"
    ],
    instructions: [
      "Soak rice noodles in warm water until pliable.",
      "Mix tamarind, fish sauce, and palm sugar for the sauce.",
      "Stir-fry shrimp or tofu in a wok until cooked, push to one side.",
      "Scramble eggs on the empty side of the wok.",
      "Add noodles and sauce, tossing vigorously until noodles are soft.",
      "Toss in bean sprouts, serve topped with peanuts and a lime wedge."
    ]
  },
  {
    id: "6",
    title: "Smash Burger",
    country: "USA",
    color: "bg-[#FF89BB]", // Neo pink
    image: "https://images.unsplash.com/photo-1771818708882-bd87d9c46297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMHNtYXNoJTIwYnVyZ2VyfGVufDF8fHx8MTc3ODU2NjU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "15 MIN",
    difficulty: "EASY",
    description: "Ultra-thin, crispy edges, dripping with cheese. No thick patties allowed.",
    ingredients: [
      "1 lb Ground beef (80/20)",
      "4 slices American cheese",
      "4 Brioche buns",
      "Salt and pepper",
      "Dill pickles",
      "Secret sauce (mayo, ketchup, relish)"
    ],
    instructions: [
      "Form ground beef into loosely packed 2oz balls.",
      "Heat a cast-iron skillet until smoking hot.",
      "Place balls in skillet and immediately smash flat with a spatula.",
      "Season generously with salt and pepper, cook for 2 mins until crust forms.",
      "Flip, add American cheese, and cook for 1 more minute.",
      "Serve on toasted brioche buns with pickles and secret sauce."
    ]
  }
];