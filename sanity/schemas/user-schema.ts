const user = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The first name of the user',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The last name of the user',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required().email(),
        description: 'The email of the user',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The phone number of the user',
      },
      {
        name: 'username',
        title: 'Username',
        type: 'slug',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The username of the user',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The password of the user',
      },
      {
        name: 'image',
        title: 'Profile Picture',
        type: 'image',
        options: {
          hotspot: true
        },
        description: 'The profile picture of the user',
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
        description: 'The bio of the user',
      },
      {
        name: 'subscriptions',
        title: 'Subscriptions',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: [{type: 'topic'}],
                options: {
                    hotspot: true
                }
            }
        ],
        description: 'The subscriptions of the user',
      },
      {
        name: 'interests',
        title: 'Interests',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: [{type: 'interest'}],
                options: {
                  layout: 'tags',
                  hotspot: true
                }
            }
        ],
        description: 'The interests of the user',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        readOnly: true,
        initialValue: 'user',
        validation: (Rule: { required: () => any }) => Rule.required(),
        description: 'The role of the user',
      },
    ],
  };
  
  export default user;