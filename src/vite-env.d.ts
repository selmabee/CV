/// <reference types="vite/client" />

declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}

declare module 'tesseract.js' {
  export function recognize(image: File | string, lang: string): Promise<{
    data: { text: string };
  }>;
}
