/*
  Warnings:

  - A unique constraint covering the columns `[userId,missionId]` on the table `UserMission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserMission_userId_missionId_key` ON `UserMission`(`userId`, `missionId`);
