module.exports = {
  siteMetadata: {
    title: `Luke Harnden`,
    description: `TBD`,
    author: `nickk`,
  },
  // mapping: {
  //   "MarkdownRemark.fields.works": `MarkdownRemark`,
  // },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Luke Harnden`,
    //     short_name: `Luke Harnden`,
    //     start_url: `/`,
    //     background_color: `#001e82`,
    //     theme_color: `#001e82`,
    //     display: `minimal-ui`,
    //     icon: ``, // This path is relative to the root of the site.
    //   },
    // },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-netlify-cms",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/shows`,
        name: `shows`,
      },
    },
  ],
  // pathPrefix: "/full-service",
}
