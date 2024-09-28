import { useCallback } from 'react';

export const useExcelDownload = () => {
  const handleDownloadExcel = useCallback(async () => {
    try {
      const response = await fetch('/api/generateExcel', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to generate Excel file');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'tickets.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  }, []);

  return { handleDownloadExcel };
};
