module.exports = {
    images: {
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