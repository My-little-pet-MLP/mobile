import { createClient } from "@supabase/supabase-js";

/**
 * Verifica se o valor capturado no catch é uma instância de Error.
 */

const supabase = createClient(
  'https://jfwzshiyyvxklcuuzueu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmd3pzaGl5eXZ4a2xjdXV6dWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODgxNDQsImV4cCI6MjA0MTA2NDE0NH0.j-6tIBTak0I75Tci53i1aGg8iySxIlsiTY8bEQ-MlCI'
);
function isError(error: unknown): error is Error {
  return error instanceof Error;
}
interface uploadResponse {
  publicUrl: string | null;
  error: Error | null;
}
/**
 * Realiza o upload de uma imagem para o Supabase.
 */
function sanitizeFileName(fileName: string): string {
  return fileName.toLowerCase().replace(/[^\w.]+/g, '_');
}
export async function uriToBlob(uri: string): Promise<Blob> {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Erro ao buscar imagem: ${response.statusText}`);
    }

    const originalBlob = await response.blob();

    if (!originalBlob || originalBlob.size === 0) {
      throw new Error("O Blob está vazio. Verifique a imagem selecionada.");
    }

    console.log("Verificando Blob:", originalBlob);
    console.log("Tamanho do Blob:", originalBlob.size);

    // Criar um novo Blob com o tipo especificado
    const blob = new Blob([originalBlob], { type: originalBlob.type || 'image/jpeg' });

    return blob;
  } catch (error) {
    console.error("Erro ao converter URI para Blob:", error);
    throw error;
  }
}
export async function uploadPetImage(uri: string, folder: string): Promise<uploadResponse> {
  try {
    const blob = await uriToBlob(uri);
    const fileName = `${Date.now()}_${sanitizeFileName('pet_image.jpg')}`;
    return await uploadToSupabase(blob, folder, fileName);
  } catch (error: unknown) {
    console.error("Erro ao preparar o upload:", error);
    return { publicUrl: null, error: isError(error) ? error : new Error('Erro desconhecido') };
  }
}

/**
 * Realiza o upload de um Blob para o Supabase e retorna a URL pública.
 */
export async function uploadToSupabase(
  blob: Blob, 
  folder: string, 
  fileName: string
): Promise<uploadResponse> {
  console.log("Iniciando upload para o Supabase...");

  try {
    // Converte o Blob para um ArrayBuffer (alternativa ao Blob direto)
    const arrayBuffer = await blob.arrayBuffer();

    // Realiza o upload para o Supabase
    const { data, error } = await supabase.storage
      .from(folder)
      .upload(fileName, new Uint8Array(arrayBuffer), {
        contentType: blob.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      });

    console.log("Resposta do Supabase:", { data, error });

    if (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return { publicUrl: null, error: new Error(error.message) };
    }

    const { data: publicData } = supabase.storage
      .from(folder)
      .getPublicUrl(fileName);

    console.log("URL pública gerada:", publicData?.publicUrl);

    return { publicUrl: publicData?.publicUrl || null, error: null };
  } catch (error: unknown) {
    console.error("Erro durante o upload:", error);
    return { publicUrl: null, error: isError(error) ? error : new Error('Erro desconhecido') };
  }
}