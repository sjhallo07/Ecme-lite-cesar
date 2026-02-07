import 'dotenv/config'

const getBuildProfile = () => {
    return process.env.EAS_BUILD_PROFILE || process.env.NODE_ENV || 'development'
}

module.exports = ({ config }) => {
    const profile = getBuildProfile()
    const isProduction = profile === 'production'

    const apiBaseUrl =
        process.env.API_BASE_URL ||
        config.extra?.API_BASE_URL ||
        'http://localhost:3001/api'

    const webAppUrl =
        process.env.WEB_APP_URL ||
        config.extra?.WEB_APP_URL ||
        'http://localhost:5173'

    return {
        ...config,
        extra: {
            ...(config.extra ?? {}),
            API_BASE_URL: apiBaseUrl,
            WEB_APP_URL: webAppUrl
        },
        android: {
            ...config.android,
            usesCleartextTraffic: !isProduction
        }
    }
}
