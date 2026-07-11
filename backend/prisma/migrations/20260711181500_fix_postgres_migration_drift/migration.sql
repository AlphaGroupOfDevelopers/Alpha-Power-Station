-- Fix migration history drift from when this schema was developed against SQLite:
-- array-typed columns were created as scalar TEXT, and 5 team_members social
-- columns declared in schema.prisma were never migrated at all.

-- AlterTable: convert news_posts.tags from TEXT to TEXT[] without losing data
ALTER TABLE "news_posts" ALTER COLUMN "tags" DROP DEFAULT;
ALTER TABLE "news_posts" ALTER COLUMN "tags" TYPE TEXT[] USING (
  CASE WHEN "tags" IS NULL OR "tags" = '' THEN ARRAY[]::TEXT[] ELSE ARRAY["tags"] END
);
ALTER TABLE "news_posts" ALTER COLUMN "tags" SET NOT NULL;
ALTER TABLE "news_posts" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable: convert projects.gallery from TEXT to TEXT[] without losing data
ALTER TABLE "projects" ALTER COLUMN "gallery" DROP DEFAULT;
ALTER TABLE "projects" ALTER COLUMN "gallery" TYPE TEXT[] USING (
  CASE WHEN "gallery" IS NULL OR "gallery" = '' THEN ARRAY[]::TEXT[] ELSE ARRAY["gallery"] END
);
ALTER TABLE "projects" ALTER COLUMN "gallery" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "gallery" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable: add team_members social columns that schema.prisma always declared
-- but no prior migration ever created
ALTER TABLE "team_members" ADD COLUMN "facebook" TEXT;
ALTER TABLE "team_members" ADD COLUMN "instagram" TEXT;
ALTER TABLE "team_members" ADD COLUMN "twitter" TEXT;
ALTER TABLE "team_members" ADD COLUMN "website" TEXT;
ALTER TABLE "team_members" ADD COLUMN "whatsapp" TEXT;
