const user = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
        description: 'The first name of the user',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
        description: 'The last name of the user',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        description: 'The email of the user',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        description: 'The phone number of the user',
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        description: 'The password of the user',
      },
      {
        name: 'image',
        title: 'Profile Picture',
        type: 'image',
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
        type: 'reference',
        to: [{type: 'topic'}],
        description: 'The subscriptions of the user',
      },
      {
        name: 'interests',
        title: 'Interests',
        type: 'reference',
        to: [{type: 'interest'}],
        description: 'The interests of the user',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        description: 'The role of the user',
      },
    ],
  };
  
  export default user;