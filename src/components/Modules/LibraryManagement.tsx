import React, { useState } from 'react';
import { Search, Book, CheckCircle, Clock, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PermissionGate } from '../auth/PermissionGate';

const books = [
  { id: '1', title: 'Modern Physics', author: 'Stephen Hawking', category: 'Science', status: 'Available', shelf: 'S-42' },
  { id: '2', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', status: 'Borrowed', dueDate: 'Jun 15, 2024' },
  { id: '3', title: 'Introduction to Calculus', author: 'Michael Spivak', category: 'Mathematics', status: 'Available', shelf: 'M-12' },
  { id: '4', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'Reserved', shelf: 'S-45' },
  { id: '5', title: 'World History Vol 1', author: 'Dr. John Doe', category: 'History', status: 'Available', shelf: 'H-05' },
];

export const LibraryManagement = () => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
       <div className="relative h-48 rounded-3xl overflow-hidden mb-8 group">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/library-management-background-27a4ec08-1773569278698.webp" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          alt="Library"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex flex-col justify-center px-8">
          <h1 className="text-3xl font-bold text-white mb-2">School Library</h1>
          <p className="text-slate-200 max-w-md">Search across 50,000+ books, journals and digital resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <PermissionGate permission="library:manage">
          <button className="h-full bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Plus className="w-5 h-5" /> New Entry
          </button>
        </PermissionGate>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex gap-4">
              <div className="w-20 h-28 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shrink-0 overflow-hidden relative">
                <Book className="w-8 h-8 text-slate-300" />
                <div className="absolute top-2 right-2">
                   {book.status === 'Available' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="mb-auto">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{book.category}</span>
                  <h4 className="font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">{book.title}</h4>
                  <p className="text-xs text-slate-500">by {book.author}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-[10px]">
                    <p className="text-slate-400 uppercase font-semibold">Location</p>
                    <p className="text-slate-700 font-bold">{book.status === 'Available' ? book.shelf : book.dueDate}</p>
                  </div>
                  <PermissionGate permission="library:manage">
                    <button className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      book.status === 'Available' ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {book.status === 'Available' ? 'Borrow' : 'Return'}
                    </button>
                  </PermissionGate>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};