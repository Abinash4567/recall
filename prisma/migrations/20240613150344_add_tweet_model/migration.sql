-- CreateTable
CREATE TABLE "GitHubUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "GitHubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "avatarImage" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "tweet" TEXT NOT NULL,
    "tweetImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitHubUser_email_key" ON "GitHubUser"("email");

-- CreateIndex
CREATE INDEX "username_handle_index" ON "Tweet"("username", "handle");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "GitHubUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
