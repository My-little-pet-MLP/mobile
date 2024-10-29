import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  'https://jfwzshiyyvxklcuuzueu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmd3pzaGl5eXZ4a2xjdXV6dWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODgxNDQsImV4cCI6MjA0MTA2NDE0NH0.j-6tIBTak0I75Tci53i1aGg8iySxIlsiTY8bEQ-MlCI'
);

interface uploadResponse {
  publicUrl: string | null;
  error: Error | null;
}

const validImageExtensions = ['.png', '.jpg', '.jpeg', '.svg'];

function isImageFile(fileName: string): boolean {
  const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return validImageExtensions.includes(extension);
}

function sanitizeFileName(fileName: string): string {
  return fileName.toLowerCase().replace(/[^\w.]+/g, '_');
}

async function uriToBlob(uri: string): Promise<Blob> {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Erro ao buscar a imagem: ${response.statusText}`);
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error("O Blob está vazio.");
    }

    console.log("Blob criado com sucesso:", blob);
    return blob;
  } catch (error) {
    console.error("Erro ao converter URI para Blob:", error);
    throw error;
  }
}

export async function uploadPetImage(uri: string, folder: string): Promise<uploadResponse> {
  const blob = await uriToBlob(uri);
  const fileName = `${Date.now()}_${sanitizeFileName('pet_image.jpg')}`;
  return uploadToSupabase(blob, folder, fileName);
}

export async function uploadToSupabase(blob: Blob, folder: string, fileName: string): Promise<uploadResponse> {
    console.log("Iniciando upload para o Supabase...");
  
    const { data, error } = await supabase.storage
      .from(folder)
      .upload(`${folder}/${fileName}`, blob, {
        contentType: blob.type, // Garantir que o tipo seja definido corretamente.
        cacheControl: '3600',
        upsert: false,
      });
  
    console.log("Resposta do Supabase:", { data, error });
  
    if (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return { publicUrl: null, error: new Error("Erro ao fazer upload da imagem.") };
    }
  
    const { data: publicData } = supabase.storage
      .from(folder)
      .getPublicUrl(`${folder}/${fileName}`);
  
    console.log("URL pública gerada:", publicData?.publicUrl);
  
    return { publicUrl: publicData?.publicUrl || null, error: null };
  }
  
