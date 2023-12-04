import { getAllPosts, getPostByPath, getPostSlugs } from "../../lib/getPost";
// import { dbConnection } from '../../lib/databaseConnection.ts.new';
import slugify from "slugify";
import { serialize } from "next-mdx-remote/serialize";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import remarkGfm from "remark-gfm";
import rehypeCode from "../../lib/rehypeCode";
import rehypeImgSize from "rehype-img-size";
import { unified } from "unified";
import rehypeFigmaImage from "../../lib/rehypeFigmaImage";
import rehypeToC from "../../lib/rehypeToC";
import rehypeComponentsList from "../../lib/rehypeComponentsList";
import remarkHeadings from "../../lib/remarkHeadings";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

export default async function getPostContent(params: any) {
  const posts = await getAllPosts([
    "category",
    "title",
    "date",
    "status",
    "slug",
    "intro",
    "subtitle",
    "excerpt",
    "author",
    "ogImage",
    "coverImage",
    "previewScale",
    "mainComponent",
    "components",
    "componentsNew",
    "defaultProps",
    "sampleCode",
  ]);

  const slugs: any = await getPostSlugs();
  const foundSlug = params.slug
    ? slugs.find(
        (f) =>
          f.slug
            .split("/")
            .map((e) => slugify(e, { lower: true }))
            .join("/") === params.slug.join("/")
      )
    : null;

  const post: any = foundSlug?.path
    ? getPostByPath(foundSlug.path, [
        "title",
        "date",
        "status",
        "slug",
        "intro",
        "subtitle",
        "author",
        "content",
        "ogImage",
        "coverImage",
        "mainComponent",
        "components",
        "componentsNew",
        "defaultProps",
        "sampleCode",
        "excerpt",
        "figma",
        "github",
        "npm",
        "storybook",
      ])
    : {};

  const content = post?.content || "";

  const mdxToC = await serialize(post.content, {
    //components,
    mdxOptions: {
      rehypePlugins: [rehypeToC],
    },
  });

  const mdxExcerptSource = await serialize(post.excerpt, {
    // components,
  });

  const propTypes: any = [];

  if (post.mainComponent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const file = require(`../../types/src/components/${post.mainComponent}/${post.mainComponent}.json`);
      propTypes.push(file[0]);
    } catch (e) {
      console.log("Can't load typescript definitions!");
    }
  }

  if (post.componentsNew) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(
      post.componentsNew as { [key: string]: { path?: string } }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).map(([key, component]) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const file = require(`../../types/src/components/${component.path}.json`);
        propTypes.push(file[0]);
      } catch (e) {
        console.log("Can't load typescript definitions!");
      }
    });
  }

  if (post.components) {
    post.components.forEach((component) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const file = require(`../../types/src/components/${component}/${component}.json`);
        propTypes.push(file[0]);
      } catch (e) {
        console.log("Can't load typescript definitions!");
      }
    });
  }

  if (post.slug === "Components/Overview") {
    posts.forEach((p) => {
      // console.log(posts);

      if (p.mainComponent) {
        console.log("p.title", p.title, p.mainComponent);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        try {
          const file = require(`../../types/src/components/${p.title}/${p.title}.json`);
          propTypes.push(file[0]);
        } catch (e) {
          console.log("Can't load typescript definitions!");
        }
      }
      if (p.componentsNew) {
        try {
          Object.entries(p.componentsNew).map(([i, cN]) => {
            console.log("cnPath", cN);
            const fileCn = require(`../../types/src/components/${cN.path}.json`);
            propTypes.push(fileCn[0]);
          });
        } catch (e) {
          console.log("Can't load typescript definitions!");
        }
      }
    });
  }

  const mdxSource = await serialize(post.content, {
    //components,
    mdxOptions: {
      remarkPlugins: [remarkMdxCodeMeta, remarkGfm],
      rehypePlugins: [
        rehypeCode,
        rehypeFigmaImage,
        [rehypeComponentsList, posts, propTypes],
        [
          rehypeImgSize,
          {
            dir: "_posts/",
          },
        ],
      ],
    },
  });

  //let data = {};
  //let query = {};

  //const filename = 'Naming/Naming';
  //let variables = { relativePath: `${filename}.mdx` };
  //try {
  // const res = await dbConnection.queries.post(variables);
  //query = res.query;
  // data = res.data;
  //  variables = res.variables;
  //} catch {
  // swallow errors related to document creation
  // }

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkStringify)
    .use(remarkHeadings);

  const vfile = await processor.process(post.content);

  return {
    props: {
      // variables: variables,
      // data: data,
      // query: query,
      propTypes: propTypes,
      posts,
      post: {
        ...post,
        headings: vfile.data.headings,
        content,
        mdxSource,
        mdxToC,
        mdxExcerptSource,
      },
    },
  };
}
