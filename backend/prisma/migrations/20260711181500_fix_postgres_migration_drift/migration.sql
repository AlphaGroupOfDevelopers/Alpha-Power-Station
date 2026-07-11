-- Fix migration history drift from when this schema was developed against SQLite:
-- array-typed columns were created as scalar TEXT, and 5 team_members social
-- columns declared in schema.prisma were never migrated at all.

-- AlterTable: convert news_posts.tags from TEXT to TEXT[] without losing data
-- (guarded: some environments already have this column as an array from a
-- db push done outside migration history, so only convert scalar TEXT)
DO $$
BEGIN
  IF (SELECT data_type FROM information_schema.columns WHERE table_name = 'news_posts' AND column_name = 'tags') != 'ARRAY' THEN
    ALTER TABLE "news_posts" ALTER COLUMN "tags" DROP DEFAULT;
    ALTER TABLE "news_posts" ALTER COLUMN "tags" TYPE TEXT[] USING (
      CASE WHEN "tags" IS NULL OR "tags" = '' THEN ARRAY[]::TEXT[] ELSE ARRAY["tags"] END
    );
    ALTER TABLE "news_posts" ALTER COLUMN "tags" SET NOT NULL;
    ALTER TABLE "news_posts" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
  END IF;
END $$;

-- AlterTable: convert projects.gallery from TEXT to TEXT[] without losing data
-- (guarded the same way as news_posts.tags above)
DO $$
BEGIN
  IF (SELECT data_type FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'gallery') != 'ARRAY' THEN
    ALTER TABLE "projects" ALTER COLUMN "gallery" DROP DEFAULT;
    ALTER TABLE "projects" ALTER COLUMN "gallery" TYPE TEXT[] USING (
      CASE WHEN "gallery" IS NULL OR "gallery" = '' THEN ARRAY[]::TEXT[] ELSE ARRAY["gallery"] END
    );
    ALTER TABLE "projects" ALTER COLUMN "gallery" SET NOT NULL;
    ALTER TABLE "projects" ALTER COLUMN "gallery" SET DEFAULT ARRAY[]::TEXT[];
  END IF;
END $$;

-- AlterTable: add team_members social columns that schema.prisma always declared
-- but no prior migration ever created
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "facebook" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "instagram" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "twitter" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "website" TEXT;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "whatsapp" TEXT;
