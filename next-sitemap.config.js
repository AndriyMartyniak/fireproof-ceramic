/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://termokeramika.com.ua',
    generateRobotsTxt: true, // Генерує robots.txt
    sitemapSize: 7000,
    exclude: ['/api/*'], // Виключити API-шляхи
  };