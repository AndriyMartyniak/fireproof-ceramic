const products = require('./src/data/products.json');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://termokeramika.com.ua',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*', '/checkout'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/checkout'] },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/products') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/products/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    return products.map((product) => ({
      loc: `/products/${product.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
