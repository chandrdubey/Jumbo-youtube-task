export const VIDEO_REPOSITORY = 'VIDEO_REPOSITORY';
export const CRON_YOUTUBE = {
  label: 'CRON_SYNC_YOUTUBE',
  cronTime: process.env.APP_ENV != 'local' ? '0 */2 * * * *' : '0 */2 * * *',
  tz: 'Asia/Kolkata',
  options: {},
};
