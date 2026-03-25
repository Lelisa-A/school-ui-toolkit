import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { EduButton } from '../ui/EduButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  options?: { label: string; value: string }[];
}

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  schema: z.ZodObject<any>;
  initialData?: any;
  onSubmit: (values: any) => Promise<void>;
  submitLabel: string;
  fields: Field[];
}

export const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  schema,
  initialData,
  onSubmit,
  submitLabel,
  fields,
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (open) {
      form.reset(initialData || {});
    }
  }, [open, initialData, form]);

  const handleSubmit = async (values: any) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
        <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter italic uppercase">{title}</DialogTitle>
            <DialogDescription className="text-indigo-100 font-medium">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-8 space-y-6">
            <div className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                        {field.label}
                      </FormLabel>
                      <FormControl>
                        {field.type === 'select' ? (
                          <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                            <SelectTrigger className="h-12 rounded-xl border-2 border-slate-100 focus:ring-0 focus:border-indigo-600 transition-all">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-2 border-slate-100 shadow-xl">
                              {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="font-bold text-slate-700">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === 'textarea' ? (
                          <Textarea
                            {...formField}
                            placeholder={field.placeholder}
                            className="min-h-[100px] rounded-xl border-2 border-slate-100 focus:ring-0 focus:border-indigo-600 transition-all resize-none font-medium"
                          />
                        ) : (
                          <Input
                            {...formField}
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            className="h-12 rounded-xl border-2 border-slate-100 focus:ring-0 focus:border-indigo-600 transition-all font-medium"
                          />
                        )}
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold text-rose-500 pl-1" />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <EduButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                CANCEL
              </EduButton>
              <EduButton
                type="submit"
                variant="primary"
                size="sm"
                className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100"
                loading={form.formState.isSubmitting}
              >
                {submitLabel}
              </EduButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};