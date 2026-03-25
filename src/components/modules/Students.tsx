import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Plus, 
  UserPlus, 
  GraduationCap,
  ShieldCheck,
  Activity,
  Calendar,
  Users
} from 'lucide-react';
import { DataTable } from '../ui/DataTable';
import { EduButton } from '../ui/EduButton';
import { EduBadge } from '../ui/EduBadge';
import { StatCard } from '../ui/StatCard';

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  attendance: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
  parent: string;
  avatar?: string;
}

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alice Johnson', grade: '10th', section: 'A', attendance: 98, status: 'ACTIVE', parent: 'John Johnson', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: '2', name: 'Bob Smith', grade: '9th', section: 'B', attendance: 92, status: 'ACTIVE', parent: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: '3', name: 'Charlie Brown', grade: '11th', section: 'C', attendance: 85, status: 'ON_LEAVE', parent: 'Lucy Brown', avatar: 'https://i.pravatar.cc/150?u=charlie' },
  { id: '4', name: 'Diana Prince', grade: '12th', section: 'A', attendance: 100, status: 'ACTIVE', parent: 'Hippolyta Prince', avatar: 'https://i.pravatar.cc/150?u=diana' },
  { id: '5', name: 'Ethan Hunt', grade: '10th', section: 'B', attendance: 78, status: 'INACTIVE', parent: 'IMF Parent', avatar: 'https://i.pravatar.cc/150?u=ethan' },
];

export const Students: React.FC = () => {
  const columns = useMemo<ColumnDef<Student>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Student',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.original.avatar} 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" 
            alt=""
          />
          <div>
            <p className="text-sm font-bold text-slate-900">{row.original.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: #STU-{row.original.id.padStart(3, '0')}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'grade',
      header: 'Academic Group',
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-bold text-slate-700">{row.original.grade} Grade</p>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Section {row.original.section}</p>
        </div>
      ),
    },
    {
      accessorKey: 'attendance',
      header: 'Attendance',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full rounded-full ${row.original.attendance > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${row.original.attendance}%` }} 
            />
          </div>
          <span className="text-xs font-black text-slate-600">{row.original.attendance}%</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <EduBadge 
          variant={row.original.status === 'ACTIVE' ? 'success' : row.original.status === 'ON_LEAVE' ? 'warning' : 'default'}
        >
          {row.original.status}
        </EduBadge>
      ),
    }
  ], []);

  return (
    <div className="space-y-10">
       <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Student Directory</h1>
          <p className="text-slate-500 font-medium">Oversee the academic records and personal data of all registered students.</p>
        </div>
        <div className="flex gap-3">
           <EduButton variant="gradient" className="rounded-2xl h-14 px-8">
              <UserPlus size={20} className="mr-2" /> Register Student
           </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Enrolled" value="1,284" icon={<GraduationCap size={24} />} color="indigo" trend={{ value: 12, isPositive: true }} description="Total current count" />
        <StatCard title="Present Today" value="1,156" icon={<ShieldCheck size={24} />} color="green" trend={{ value: 0.5, isPositive: true }} description="Daily attendance" />
        <StatCard title="On Leave" value="24" icon={<Calendar size={24} />} color="amber" description="Authorized absences" />
        <StatCard title="Flagged" value="8" icon={<Activity size={24} />} color="rose" description="Requiring attention" />
      </div>

      <DataTable columns={columns} data={MOCK_STUDENTS} searchKey="name" title="Active Enrollments" />
    </div>
  );
};