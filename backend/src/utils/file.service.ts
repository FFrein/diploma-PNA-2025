import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

export default class FileService {
  supabaseClient;

  constructor() {
    this.initializeClient();
  }

  initializeClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are missing');
    }

    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(file) {
    try {
      const bucketName = 'images'; // имя бакета в Supabase
      const filePath = `${Date.now()}_${file.originalname}`; // Генерируем уникальный путь

      // Загружаем файл в Supabase
      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      // Получаем публичную ссылку на файл
      const data = this.supabaseClient.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (!data || !data.data.publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      return data.data.publicUrl; // Возвращаем публичную ссылку
    } catch (e) {
      console.error('Error uploading file:', e.message);
      return null;
    }
  }

  async deleteFile(filePath) {
    try {
      const bucketName = 'images';
      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        throw new Error(`Failed to delete file: ${error.message}`);
      }

      console.log(`File ${filePath} deleted successfully`);
    } catch (e) {
      console.error('Error deleting file:', e.message);
    }
  }
}
