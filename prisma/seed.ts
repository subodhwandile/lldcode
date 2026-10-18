import { PROBLEMS } from "../src/lib/problems";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPg } = require("@prisma/adapter-pg");
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  console.log(`Seeding ${PROBLEMS.length} problems...`);

  for (const problem of PROBLEMS) {
    await prisma.problem.upsert({
      where: { slug: problem.slug },
      create: {
        id: problem.id,
        slug: problem.slug,
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        tags: problem.tags,
        description: problem.description,
        constraints: problem.constraints,
        hints: problem.hints,
        starterCode: problem.starterCode,
        solution: problem.solution,
        testCases: problem.testCases,
        order: problem.order,
      },
      update: {
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        tags: problem.tags,
        description: problem.description,
        constraints: problem.constraints,
        hints: problem.hints,
        starterCode: problem.starterCode,
        solution: problem.solution,
        testCases: problem.testCases,
        order: problem.order,
      },
    });
    console.log(`  ✓ ${problem.title}`);
  }

  console.log("Seeding complete.");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
