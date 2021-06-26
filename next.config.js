const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate({
        future: {
            webpack5: true,
        },
        env: {
            HOST_1: process.env.NEXT_PUBLIC_HOST_V1,
            HOST_2: process.env.NEXT_PUBLIC_HOST_V2,
            HOST_WP: process.env.NEXT_PUBLIC_HOST_WC,
            HOST_LOGIN: process.env.NEXT_PUBLIC_HOST_LOGIN,
            HOST_MENU: process.env.NEXT_PUBLIC_HOST_MENU,
            SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
            GOOGLE_API: process.env.NEXT_PUBLIC_GOOGLE_API,
            local_host: process.env.NEXT_PUBLIC_LOCAL_HOST,
            CONSUMER_KEY: process.env.NEXT_PUBLIC_CONSUMER_KEY,
            CONSUMER_SECRET: process.env.NEXT_PUBLIC_CONSUMER_SECRET
          },
    }),
}





