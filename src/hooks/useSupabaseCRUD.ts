import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface UseSupabaseCRUDOptions {
  table: string;
  enableRealtime?: boolean;
  retryCount?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useSupabaseCRUD<T>({ table, enableRealtime = false, retryCount = MAX_RETRIES }: UseSupabaseCRUDOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSupabaseError = (err: any) => {
    let message = err.message || 'An unexpected synchronization error occurred.';
    
    if (err.message?.includes('fetch') || err.code === 'PGRST301') {
       message = 'A synchronization error occurred with the database node. Please check your network connection.';
    }
    
    console.error(`[Database Error] ${table}:`, err);
    setError(message);
    toast.error(message);
    return message;
  };

  const fetchData = useCallback(async (retryAttempt = 0) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fetchError } = await supabase
        .from(table)
        .select('*');

      if (fetchError) {
        if (retryAttempt < retryCount && (fetchError.message?.includes('fetch') || fetchError.code === 'PGRST301')) {
          await delay(RETRY_DELAY * (retryAttempt + 1));
          return fetchData(retryAttempt + 1);
        }
        throw fetchError;
      }
      setData(result as T[]);
    } catch (err: any) {
      handleSupabaseError(err);
    } finally {
      setLoading(false);
    }
  }, [table, retryCount]);

  useEffect(() => {
    fetchData();

    if (enableRealtime) {
      const channel = supabase
        .channel(`public:${table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
          fetchData();
        })
        .subscribe((status) => {
           if (status === 'CHANNEL_ERROR') {
              console.warn(`[Realtime Sync] Data node synchronization interrupted for ${table}`);
           }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [table, enableRealtime, fetchData]);

  const create = async (payload: any) => {
    try {
      const { error: createError } = await supabase
        .from(table)
        .insert([payload]);

      if (createError) throw createError;
      toast.success('Identity node committed to database.');
      fetchData();
    } catch (err: any) {
      handleSupabaseError(err);
    }
  };

  const update = async (id: string | number, payload: any) => {
    try {
      const { error: updateError } = await supabase
        .from(table)
        .update(payload)
        .eq('id', id);

      if (updateError) throw updateError;
      toast.success('Data node synchronized successfully.');
      fetchData();
    } catch (err: any) {
      handleSupabaseError(err);
    }
  };

  const remove = async (id: string | number) => {
    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      toast.success('Identity node purged from database.');
      fetchData();
    } catch (err: any) {
      handleSupabaseError(err);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    create,
    update,
    remove
  };
}