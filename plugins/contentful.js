const contentful = require('contentful')
const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN,
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN
}

module.exports = {
  createClient (config = defaultConfig) {
    // preview environment
    // using the Content Preview API
    const options = {
      host: 'preview.contentful.com',
      space: config.CTF_SPACE_ID,
      accessToken: config.CTF_CPA_TOKEN
    }

    // production environment
    // using the Content Delivery API
    if (process.env.NODE_ENV === 'production') {
      options.host = 'cdn.contentful.com'
      options.accessToken = config.CTF_CDA_TOKEN
    }

    return contentful.createClient(options)
  }
}
