import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  email_verified_at?: string;
  permissions: string[];
  roles: string[];
  donations: Donation[];
}

export type PaginatedData<T = any> = {
  data: T[];
  links: Record<string, string>;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  donationTotal: number;
  donations: Donation[];
  created_at: string;
};

export type Donation = {
  id: number;
  event: Event;
  user: User;
  amount: number;
  date: string;
  created_at: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
