const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")

let counter = 0
let mdxCount = -1
let resolver
const tryResolve = () => {
  if (mdxCount === 0 || counter === mdxCount) {
    if (resolver) resolver()
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent)
    const collection = parent.sourceInstanceName
    const value = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: "collection",
      value: collection,
    })
    createNodeField({
      node,
      name: "slug",
      value: value,
    })
    counter++
    console.log(`${counter} ${node.internal.type}`)
    tryResolve()
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const workViewTemplate = path.resolve(`src/components/work.tsx`)
  const showViewTemplate = path.resolve(`src/components/show.tsx`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query MyQuery {
        works: allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "work" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
        shows: allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "show" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.works.edges.forEach(e => {
      createPage({
        // Path for this page — required
        path: `/work${e.node.fields.slug}`,
        component: workViewTemplate,
        context: {
          id: e.node.id,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
    result.data.shows.edges.forEach(e => {
      createPage({
        // Path for this page — required
        path: `/show${e.node.fields.slug}`,
        component: showViewTemplate,
        context: {
          id: e.node.id,
          title: e.node,
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  })
}

exports.sourceNodes = ({ actions, getNodes, getNode, getNodesByType }) => {
  const { createNodeField } = actions

  // const shows = getNodesByType("MarkdownRemark").filter(
  //   s => s.fields.collection === "shows"
  // )
  // const works = getNodesByType("MarkdownRemark")
  // shows.forEach(s => {
  //   const worksForShow = works.filter(
  //     w => w.frontmatter.show === s.frontmatter.title
  //   )
  //   console.log(works)
  // })
  const files = getNodesByType("File")
  mdxCount = files.filter(fileNode => fileNode.ext === ".md").length
  console.log(`ENTER sourceNodes(); expect count = ${mdxCount}`)
  const finished = () => {
    const showNodes = getNodesByType("MarkdownRemark").filter(
      n => n.fields.collection === "shows"
    )
    const workNodes = getNodesByType("MarkdownRemark").filter(
      n => n.fields.collection === "works"
    )
    const workNodesForShow = {}
    showNodes.forEach(sn => {
      const works = workNodes.filter(
        wn => wn.frontmatter.show === sn.frontmatter.title
      )
      works.forEach(w => {
        if (!(sn.id in workNodesForShow)) workNodesForShow[sn.id] = []
        workNodesForShow[sn.id].push(w.id)
      })
    })
    Object.entries(workNodesForShow).forEach(([showNodeId, workIds]) => {
      createNodeField({
        node: getNode(showNodeId),
        name: `works`,
        value: workIds,
      })
    })
    console.log(showNodes[0])
  }
  return new Promise(resolve => {
    resolver = resolve
    tryResolve()
  }).then(() => {
    finished()
  })

  // const worksInShow = {}
  // // iterate thorugh all markdown nodes to link books to author
  // // and build author index
  // const markdownNodes = getNodes()
  //   .filter(node => node.internal.type === `MarkdownRemark`)
  //   .forEach(node => {
  //     if (node.frontmatter.show) {
  //       const showNode = getNodes().find(
  //         node2 =>
  //           node2.internal.type === `MarkdownRemark` &&
  //           node2.frontmatter.title === node.frontmatter.show
  //       )

  //       if (showNode) {
  //         createNodeField({
  //           node,
  //           name: `show`,
  //           value: showNode.id,
  //         })

  //         // if it's first time for this author init empty array for his books
  //         if (!(showNode.id in worksInShow)) {
  //           worksInShow[showNode.id] = []
  //         }
  //         // add book to this author
  //         worksInShow[showNode.id].push(node.id)
  //       }
  //     }
  //   })

  // Object.entries(worksInShow).forEach(([showNodeId, workIds]) => {
  //   createNodeField({
  //     node: getNode(showNodeId),
  //     name: `works`,
  //     value: workIds,
  //   })
  // })
}
