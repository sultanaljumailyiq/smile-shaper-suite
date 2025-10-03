import { useState } from 'react';
import { supabase } from '@/config/supabase';
import { useToast } from '@/hooks/use-toast';

interface UseAIDentalAssistantProps {
  clinicData?: any;
}

export const useAIDentalAssistant = ({ clinicData }: UseAIDentalAssistantProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string, imageData?: string, analysisType?: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-dental-assistant', {
        body: {
          message,
          clinicData,
          imageData,
          analysisType
        }
      });

      if (error) {
        console.error('AI Assistant Error:', error);
        toast({
          title: 'خطأ في المساعد الذكي',
          description: 'تأكد من إضافة مفاتيح API في إعدادات النظام',
          variant: 'destructive'
        });
        return null;
      }

      return data;
    } catch (error) {
      console.error('AI Assistant Exception:', error);
      toast({
        title: 'خطأ في الاتصال',
        description: 'فشل الاتصال بالمساعد الذكي',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (reportType: string = 'comprehensive') => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-clinic-report', {
        body: {
          clinicData,
          reportType
        }
      });

      if (error) {
        console.error('Report Generation Error:', error);
        toast({
          title: 'خطأ في إنشاء التقرير',
          description: 'تأكد من إضافة مفاتيح API في إعدادات النظام',
          variant: 'destructive'
        });
        return null;
      }

      toast({
        title: 'تم إنشاء التقرير',
        description: 'تم تحليل البيانات بنجاح',
      });

      return data;
    } catch (error) {
      console.error('Report Generation Exception:', error);
      toast({
        title: 'خطأ في الاتصال',
        description: 'فشل إنشاء التقرير',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    generateReport,
    isLoading
  };
};
