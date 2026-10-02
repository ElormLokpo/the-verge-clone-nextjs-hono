export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  email: string | undefined;
  code: string;
};

export type EmailType = {
  email: string;
};

export type AuthResponseType = {
  user: {
    id: string;
    name: string;
    email: string;
    isEmailVerified: boolean;
    role: string;
  };
  token: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  email: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;

  author: {
    name: string;
    image: string;
  };

  coverPhoto: string;

  date: string;
  readTime: string;
  category: string;

  body: string;

  comments: {
    id: string;
    author: string;
    image: string;
    body: string;
    date: string;
  }[];
};


export type CreatePostRequest = {
  title: string;
  summary: string;
  body: string;
  category: string;
  coverPhoto?: string | null;
  published: boolean;
};

export type UpdatePostRequest = Partial<CreatePostRequest>;