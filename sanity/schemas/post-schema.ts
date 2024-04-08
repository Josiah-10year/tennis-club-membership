const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
    {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The title of the post',
        },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' },
        description: 'The slug for the post URL',
        },
    {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The main text of the post',
        },
    {
        name: 'topic',
        title: 'Topic',
        type: 'reference',
        to: [{type: 'topic'}],
        options: {
          layout: 'tags',
        },
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The topic the post will be under',
        },
    {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
            {
                type: 'image',
                options: {
                    hotspot: true
                }
            }
        ],
        description: 'The topic the post will be under',
    },
    {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{type: 'user'}],
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The topic the post will be under',
        },
    ],
  };
  
  export default post;