export type UserRole = 'ADMIN' | 'PRINCIPAL' | 'TEACHER' | 'STUDENT' | 'LIBRARIAN' | 'ASSET_MANAGER' | 'PARENT';

export type Permission = 
  | 'dashboard:view'
  | 'students:view' | 'students:manage'
  | 'teachers:view' | 'teachers:manage'
  | 'library:view' | 'library:manage'
  | 'assets:view' | 'assets:manage'
  | 'announcements:view' | 'announcements:manage'
  | 'attendance:view' | 'attendance:manage'
  | 'grades:view' | 'grades:manage'
  | 'assignments:view' | 'assignments:manage'
  | 'profile:view' | 'profile:manage'
  | 'settings:view' | 'settings:manage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions: Permission[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section?: string;
  attendance: number;
  performance?: number;
  lastUpdated?: string;
  email: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  status: 'AVAILABLE' | 'BORROWED' | 'RESERVED';
  dueDate?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  status: 'IN_USE' | 'MAINTENANCE' | 'AVAILABLE';
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  target: UserRole[] | 'ALL';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
}