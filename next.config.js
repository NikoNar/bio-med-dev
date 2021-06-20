const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate({
        future: {
            webpack5: true,
        },
        env: {
            HOST: process.env.NEXT_PUBLIC_HOST,
            SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
            GOOGLE_API: process.env.NEXT_PUBLIC_GOOGLE_API
          },
    }),
}





