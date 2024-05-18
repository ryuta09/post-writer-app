import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    // 公開・非公開
    published: {
      type: 'boolean',
      default: true,
    },
    // サムネイル画像
    image: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`
    }
  }
}))

export default makeSource({contentDirPath: './content', documentTypes: [Post]})