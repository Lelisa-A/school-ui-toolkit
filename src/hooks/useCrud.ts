import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface UseCrudOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  retryCount?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useCrud<T>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSupabaseError = (err: any, customMessage?: string) => {
    let message = err.message || 'An unexpected error occurred with the database node.';
    
    // Handle specific Supabase/Postgres error codes
    if (err.code === 'PGRST301') message = 'The database node is currently unreachable. Retrying synchronization...';
    if (err.code === '42501') message = 'Security clearance insufficient for this data node (RLS Violation).';
    if (err.message?.includes('fetch')) message = 'A synchronization error occurred with the database node. Please check your network connection.';
    
    console.error(`[Database Error] ${tableName}:`, err);
    setError(message);
    toast.error(customMessage || message);
    return message;
  };

  const fetchData = useCallback(async (retryAttempt = 0) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fetchError } = await supabase
        .from(tableName)
        .select('*');

      if (fetchError) {
        if (retryAttempt < MAX_RETRIES && (fetchError.message?.includes('fetch') || fetchError.code === 'PGRST301')) {
          await delay(RETRY_DELAY * (retryAttempt + 1));
          return fetchData(retryAttempt + 1);
        }
        throw fetchError;
      }
      setData(result as T[]);
    } catch (err: any) {
      handleSupabaseError(err, `Failed to fetch ${tableName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const create = async (payload: any, options?: UseCrudOptions) => {
    setLoading(true);
    let retryAttempt = 0;
    const maxRetries = options?.retryCount ?? MAX_RETRIES;

    const performCreate = async (): Promise<void> => {
      try {
        const { error: createError } = await supabase
          .from(tableName)
          .insert([payload]);

        if (createError) {
          if (retryAttempt < maxRetries && (createError.message?.includes('fetch') || createError.code === 'PGRST301')) {
            retryAttempt++;
            await delay(RETRY_DELAY * retryAttempt);
            return performCreate();
          }
          throw createError;
        }
        
        toast.success(options?.successMessage || 'Record created successfully');
        fetchData();
        options?.onSuccess?.();
      } catch (err: any) {
        handleSupabaseError(err, options?.errorMessage);
        options?.onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    return performCreate();
  };

  const update = async (id: string | number, payload: any, options?: UseCrudOptions) => {
    setLoading(true);
    let retryAttempt = 0;
    const maxRetries = options?.retryCount ?? MAX_RETRIES;

    const performUpdate = async (): Promise<void> => {
      try {
        const { error: updateError } = await supabase
          .from(tableName)
          .update(payload)
          .eq('id', id);

        if (updateError) {
          if (retryAttempt < maxRetries && (updateError.message?.includes('fetch') || updateError.code === 'PGRST301')) {
            retryAttempt++;
            await delay(RETRY_DELAY * retryAttempt);
            return performUpdate();
          }
          throw updateError;
        }
        
        toast.success(options?.successMessage || 'Record updated successfully');
        fetchData();
        options?.onSuccess?.();
      } catch (err: any) {
        handleSupabaseError(err, options?.errorMessage);
        options?.onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    return performUpdate();
  };

  const remove = async (id: string | number, options?: UseCrudOptions) => {
    setLoading(true);
    let retryAttempt = 0;
    const maxRetries = options?.retryCount ?? MAX_RETRIES;

    const performRemove = async (): Promise<void> => {
      try {
        const { error: deleteError } = await supabase
          .from(tableName)
          .delete()
          .eq('id', id);

        if (deleteError) {
          if (retryAttempt < maxRetries && (deleteError.message?.includes('fetch') || deleteError.code === 'PGRST301')) {
            retryAttempt++;
            await delay(RETRY_DELAY * retryAttempt);
            return performRemove();
          }
          throw deleteError;
        }
        
        toast.success(options?.successMessage || 'Record deleted successfully');
        fetchData();
        options?.onSuccess?.();
      } catch (err: any) {
        handleSupabaseError(err, options?.errorMessage);
        options?.onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    return performRemove();
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