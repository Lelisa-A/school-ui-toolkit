import React, { useState } from 'react';
import { Plus, Mail, Edit3, Trash2, Users, GraduationCap, School } from 'lucide-react';
import * as z from 'zod';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { DataTable } from '../components/ui/DataTable';
import { EduButton } from '../components/ui/EduButton';
import { StatCard } from '../components/ui/StatCard';
import { FormDialog } from '../components/modules/FormDialog';
import { PermissionGate } from '../components/auth/PermissionGate';
import { ColumnDef } from '@tanstack/react-table';

const teacherSchema = z.object({
  name: z.string().min(2, "Faculty name must be at least 2 characters."),
  email: z.string().email("Invalid institutional email format."),
  subject: z.string().min(2, "Academic department required."),
  classes: z.string().min(1, "At least one class assignment required."),
  role: z.string().default('TEACHER'),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export const Teachers: React.FC = () => {
  const { data: teachers, loading, fetchData, create, update, remove } = useSupabaseCRUD<any>({ 
    table: 'teachers',
    enableRealtime: true
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  const handleOpenForm = (teacher?: any) => {
    if (teacher) {
      // Convert classes array to comma-separated string for the form
      const formattedTeacher = {
        ...teacher,
        classes: Array.isArray(teacher.classes) ? teacher.classes.join(', ') : teacher.classes
      };
      setEditingTeacher(formattedTeacher);
    } else {
      setEditingTeacher(null);
    }
    setIsDialogOpen(true);
  };

  const handleCreate = async (values: TeacherFormValues) => {
    const payload = {
      ...values,
      classes: values.classes.split(',').map(s => s.trim())
    };
    await create(payload);
    setIsDialogOpen(false);
  };

  const handleUpdate = async (values: TeacherFormValues) => {
    if (editingTeacher) {
      const payload = {
        ...values,
        classes: values.classes.split(',').map(s => s.trim())
      };
      await update(editingTeacher.id, payload);
      setEditingTeacher(null);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (teacher: any) => {
    if (window.confirm(`Are you sure you want to remove ${teacher.name} from the faculty registry?`)) {
      await remove(teacher.id);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Faculty Member',
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 flex items-center justify-center font-black text-sm border border-amber-100">
            {row.original.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p className="font-black text-slate-900 italic">{row.original.name}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{row.original.email}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'subject',
      header: 'Department / Subject',
      cell: ({ row }) => (
        <div className="space-y-0.5">
          <p className="text-sm font-black text-slate-700 uppercase">{row.original.subject}</p>
          <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Lead Instructor</p>
        </div>
      )
    },
    {
      accessorKey: 'classes',
      header: 'Assigned Classes',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {Array.isArray(row.original.classes) ? row.original.classes.map((c: string, idx: number) => (
            <span key={idx} className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 uppercase tracking-tighter">
              {c}
            </span>
          )) : <span className="text-[10px] font-black text-slate-400">No Assignments</span>}
        </div>
      )
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Operations</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <PermissionGate permission="teachers:manage">
            <EduButton 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => handleOpenForm(row.original)}
            >
              <Edit3 size={16} />
            </EduButton>
            <EduButton 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 size={16} />
            </EduButton>
          </PermissionGate>
        </div>
      )
    }
  ];

  if (loading && teachers.length === 0) return <LoadingSpinner label="Synchronizing Faculty Registry..." className="min-h-[400px]" />;

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-1000 p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Faculty Intelligence Node</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Department & Academic Management</p>
        </div>
        <div className="flex gap-4">
          <PermissionGate permission="teachers:manage">
            <EduButton 
              variant="primary" 
              className="rounded-2xl shadow-xl shadow-indigo-100 font-black h-14 px-8"
              onClick={() => handleOpenForm()}
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>ONBOARD FACULTY</span>
            </EduButton>
          </PermissionGate>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatCard title="Active Instructors" value={teachers.length.toString()} color="indigo" icon={<Users size={20}/>} />
         <StatCard title="Departments" value="8" color="amber" icon={<School size={20}/>} />
         <StatCard title="Faculty Rating" value="4.8" color="green" icon={<GraduationCap size={20}/>} />
      </div>

      <DataTable 
        columns={columns} 
        data={teachers} 
        searchKey="name"
        title="Institutional Faculty Registry"
        description="Comprehensive database of all active and emeritus faculty entities."
      />

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingTeacher ? "MODIFY FACULTY NODE" : "ONBOARD NEW FACULTY"}
        description={editingTeacher ? `Update the registry data for ${editingTeacher.name}.` : "Initialize a new faculty identity within the institutional system."}
        schema={teacherSchema}
        initialData={editingTeacher}
        onSubmit={editingTeacher ? handleUpdate : handleCreate}
        submitLabel={editingTeacher ? "SYNCHRONIZE UPDATES" : "INITIALIZE IDENTITY"}
        fields={[
          { name: 'name', label: 'Identity Name', placeholder: 'e.g. Dr. Jane Smith' },
          { name: 'email', label: 'Institutional Email', placeholder: 'e.g. smith.j@school.edu', type: 'email' },
          { name: 'subject', label: 'Academic Department', placeholder: 'e.g. Mathematics' },
          { name: 'classes', label: 'Assigned Classes (Comma separated)', placeholder: 'e.g. 10A, 11B, 12C' },
        ]}
      />
    </div>
  );
};