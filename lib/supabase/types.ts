export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          slug: string;
          bio: string | null;
          avatar_url: string | null;
          twitter_url: string | null;
          linkedin_url: string | null;
          website_url: string | null;
          role: "admin" | "author";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          slug: string;
          bio?: string | null;
          avatar_url?: string | null;
          twitter_url?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          role?: "admin" | "author";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          slug?: string;
          bio?: string | null;
          avatar_url?: string | null;
          twitter_url?: string | null;
          linkedin_url?: string | null;
          website_url?: string | null;
          role?: "admin" | "author";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          content: Json | null;
          content_html: string | null;
          category: string;
          author_id: string | null;
          image_url: string | null;
          status: "draft" | "published" | "archived";
          read_time: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          content?: Json | null;
          content_html?: string | null;
          category: string;
          author_id?: string | null;
          image_url?: string | null;
          status?: "draft" | "published" | "archived";
          read_time?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          content?: Json | null;
          content_html?: string | null;
          category?: string;
          author_id?: string | null;
          image_url?: string | null;
          status?: "draft" | "published" | "archived";
          read_time?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "authors";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Author = Database["public"]["Tables"]["authors"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
export type AuthorInsert = Database["public"]["Tables"]["authors"]["Insert"];
export type AuthorUpdate = Database["public"]["Tables"]["authors"]["Update"];

export type PostWithAuthor = Post & {
  authors: Pick<Author, "id" | "name" | "slug" | "avatar_url"> | null;
};
