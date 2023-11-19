module.exports = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'topingnow.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
    i18n: {
        locales: ['en-US', 'fr', 'nl-NL'],
        defaultLocale: 'en-US',
    },
}