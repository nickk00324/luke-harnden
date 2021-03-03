module.exports = {
  siteMetadata: {
    title: `Luke Harnden`,
    description: `TBD`,
    author: `nickk`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
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
    "gatsby-transformer-json",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-netlify-cms",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  // pathPrefix: "/full-service",
}
