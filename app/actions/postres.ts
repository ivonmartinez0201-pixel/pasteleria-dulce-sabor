'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getSupabase() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: any) {
          cookieStore.delete(name);
        },
      },
    }
  );
}

export async function crearPostre(formData: FormData) {
  const supabase = await getSupabase();
  
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const precio = parseFloat(formData.get('precio') as string);
  const imagen_url = formData.get('imagen_url') as string;
  const categoria_id = formData.get('categoria_id') as string;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No estás autenticado');
  }

  const { error } = await supabase
    .from('postres')
    .insert({
      nombre,
      descripcion,
      precio,
      imagen_url: imagen_url || null,
      user_id: user.id,
      categoria_id: categoria_id ? parseInt(categoria_id) : null,
    });

  if (error) {
    throw new Error('Error al crear el postre: ' + error.message);
  }

  revalidatePath('/postres');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function editarPostre(formData: FormData) {
  const supabase = await getSupabase();
  
  const id = parseInt(formData.get('id') as string);
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const precio = parseFloat(formData.get('precio') as string);
  const imagen_url = formData.get('imagen_url') as string;
  const categoria_id = formData.get('categoria_id') as string;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No estás autenticado');
  }

  const { error } = await supabase
    .from('postres')
    .update({
      nombre,
      descripcion,
      precio,
      imagen_url: imagen_url || null,
      categoria_id: categoria_id ? parseInt(categoria_id) : null,
    })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw new Error('Error al editar el postre: ' + error.message);
  }

  revalidatePath('/postres');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function eliminarPostre(formData: FormData) {
  const supabase = await getSupabase();
  
  const id = parseInt(formData.get('id') as string);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No estás autenticado');
  }

  const { error } = await supabase
    .from('postres')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw new Error('Error al eliminar el postre: ' + error.message);
  }

  revalidatePath('/postres');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}