/*
  Warnings:

  - You are about to drop the column `break_interval` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `interval_count` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `work_interval` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `pomodoro_round` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pomodoro_session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."pomodoro_round" DROP CONSTRAINT "pomodoro_round_pomodoro_session_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."pomodoro_session" DROP CONSTRAINT "pomodoro_session_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."task" ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "break_interval",
DROP COLUMN "interval_count",
DROP COLUMN "work_interval";

-- DropTable
DROP TABLE "public"."pomodoro_round";

-- DropTable
DROP TABLE "public"."pomodoro_session";
