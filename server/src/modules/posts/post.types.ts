export type CreatePostInput = {
  title: string;
  summary: string;
  body: string;
  category: string;
  coverPhoto?: string | null;
  published: boolean;
};

export type UpdatePostInput = Partial<CreatePostInput>;
