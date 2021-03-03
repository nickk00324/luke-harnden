// const path = require(`path`)
// const { createFilePath } = require("gatsby-source-filesystem")

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const workViewTemplate = path.resolve(`src/components/workView.tsx`)
//   // Query for markdown nodes to use in creating pages.
//   // You can query for whatever data you want to create pages for e.g.
//   // products, portfolio items, landing pages, etc.
//   // Variables can be added as the second function parameter
//   return graphql(
//     `
//       query MyQuery {
//         allMarkdownRemark {
//           edges {
//             node {
//               id
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `,
//     { limit: 1000 }
//   ).then(result => {
//     if (result.errors) {
//       throw result.errors
//     }

//     // Create blog post pages.
//     result.data.allMarkdownRemark.edges.forEach(e => {
//       createPage({
//         // Path for this page — required
//         path: `/projects${e.node.fields.slug}`,
//         component: workViewTemplate,
//         context: {
//           id: e.node.id,
//           // Add optional context data to be inserted
//           // as props into the page component..
//           //
//           // The context data can also be used as
//           // arguments to the page GraphQL query.
//           //
//           // The page "path" is always available as a GraphQL
//           // argument.
//         },
//       })
//     })
//   })
// }
