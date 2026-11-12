/** Solo lectura. No guardar la salida (contiene cifras privadas).
 * CF_ANALYTICS_TOKEN, CF_ANALYTICS_ACCOUNT_ID y CF_ANALYTICS_SITE_TAG en el entorno.
 * npx tsx scripts/admin/check-referrals.ts
 */
import { fetchReport, settings, windows } from '../../src/lib/admin/audience';
const env = process.env;
if (!env.CF_ANALYTICS_TOKEN || !env.CF_ANALYTICS_ACCOUNT_ID || !env.CF_ANALYTICS_SITE_TAG) throw Error('Falta configuración de lectura.');
const now = new Date();
console.log({ settings: await settings(env) });
for (const days of [7, 30]) {
  const window = windows(days, now).current;
  const report = await fetchReport(env, window);
  console.log({ days, ...window, totalVisits: report.visits,
    refererHostSum: report.referrals.returnedSum,
    measuredOthers: report.referrals.tail,
    difference: report.referrals.difference,
    differencePercent: report.referrals.differencePercent,
    sampleInterval: report.sampleInterval });
}
