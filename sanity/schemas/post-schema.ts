const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
    {
        name: 'title',
        title: 'Title',
        type: 'string',
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
        description: 'The main text of the post',
        },
    {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'datetime',
        description: 'The date and time of the post',
        },
    {
        name: 'topic',
        title: 'Topic',
        type: 'reference',
        to: [{type: 'topic'}],
        description: 'The topic the post will be under',
        },
    {
        name: 'images',
        title: 'Images',
        type: 'image',
        description: 'The topic the post will be under',
        },
    {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{type: 'user'}],
        description: 'The topic the post will be under',
        },
    ],
  };
  
  export default post;