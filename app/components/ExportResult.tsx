"use client";

import { toPng } from 'html-to-image';
import { Download, Share2 } from 'lucide-react';
import { BrutalButton } from './BrutalUI';
import { useState } from 'react';

interface ExportResultProps {
  elementId: string;
  filename: string;
}

export default function ExportResult({ elementId, filename }: ExportResultProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    setLoading(true);
    try {
      // Add a temporary watermark
      const watermark = document.createElement('div');
      watermark.innerHTML = "SURVIVE UNI - survive-uni.com";
      watermark.style.position = "absolute";
      watermark.style.bottom = "10px";
      watermark.style.right = "10px";
      watermark.style.fontSize = "12px";
      watermark.style.fontWeight = "900";
      watermark.style.opacity = "0.3";
      watermark.style.textTransform = "uppercase";
      watermark.id = "temp-watermark";
      element.appendChild(watermark);

      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: '#F4F4F0', // Match theme
        style: {
          padding: '20px',
        }
      });

      // Remove watermark
      const tempWatermark = document.getElementById('temp-watermark');
      if (tempWatermark) tempWatermark.remove();

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      <BrutalButton
        onClick={handleExport}
        className="bg-[#00FFC2] text-black w-full text-xs py-3 flex items-center justify-center gap-2"
        disabled={loading}
      >
        <Download className="w-4 h-4" />
        {loading ? "Capturing..." : "Save as Image"}
      </BrutalButton>
      
      <BrutalButton
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'My Result - Survive Uni',
              url: window.location.href,
            });
          }
        }}
        className="bg-[#FF90E8] text-black text-xs py-3 px-4 flex items-center justify-center"
      >
        <Share2 className="w-4 h-4" />
      </BrutalButton>
    </div>
  );
}
