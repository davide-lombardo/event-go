import { PrismaClient } from '@prisma/client';
// const cron = require('node-cron');

const prisma = new PrismaClient();

// Function to clean up old events
// const deleteOldEvents = async () => {
//   try {
//     // Backup deleted records
//     const oldEvents = await prisma.event.findMany({
//       where: {
//         eventDate: { lt: new Date() },
//       },
//     });

//     if (oldEvents.length > 0) {
//       const deleted = await prisma.event.deleteMany({
//         where: {
//           eventDate: { lt: new Date() },
//         },
//       });

//       console.log(`Deleted ${deleted.count} old events.`);
//     } else {
//       console.log('No old events to delete. Stopping cron job.');
//       cron.stop();
//     }
//   } catch (err) {
//     console.error('Error cleaning up events:', err);
//   }
// };

// // Schedule the cron job to run at midnight on the first day of each month
// cron.schedule('0 0 1 * *', () => {
//   console.log('Running monthly cleanup...');
//   deleteOldEvents();
// });

// console.log(
//   'Cron job scheduled: Runs on the 1st day of each month at midnight.'
// );

export default prisma;
