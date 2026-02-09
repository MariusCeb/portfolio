import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Classroom {
    id: number;
    name: string;
    join_code: string;
    is_admin: boolean;
    description?: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
  id: number;
  classroom_id: number;
  user_id: number;
  title: string;
  content?: string | null; // nullable
  type: 'message' | 'file';
  price: string | null;
  file_path: string | null;
  created_at: string; // timestamp ISO string
  updated_at: string; // timestamp ISO string
}