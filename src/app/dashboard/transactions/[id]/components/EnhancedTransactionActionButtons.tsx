"use client";

import { Download, Share, FileText, Table, FileJson, Mail, Link, Check } from "lucide-react";
import { useState } from "react";
import { downloadAsJSON, downloadAsCSV, downloadAsPDF, shareViaEmail, shareViaLink, shareViaSocial } from "../../../utils/transactionUtils";

interface TransactionDetails {
  id: number;
  project: string;
  type: string;
  amount: number;
  status: string;
  date: string;
}

interface EnhancedTransactionActionButtonsProps {
  transaction: TransactionDetails;
}

export default function EnhancedTransactionActionButtons({
  transaction
}: EnhancedTransactionActionButtonsProps) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareResult, setShareResult] = useState<string | null>(null);

  const handleDownloadJSON = async () => {
    setDownloading(true);
    try {
      downloadAsJSON({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      });
      setDownloadedFormat('JSON');
      setTimeout(() => setDownloadedFormat(null), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setDownloadMenuOpen(false);
    }
  };

  const handleDownloadCSV = async () => {
    setDownloading(true);
    try {
      downloadAsCSV({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      });
      setDownloadedFormat('CSV');
      setTimeout(() => setDownloadedFormat(null), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setDownloadMenuOpen(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      downloadAsPDF({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      });
      setDownloadedFormat('PDF');
      setTimeout(() => setDownloadedFormat(null), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setDownloadMenuOpen(false);
    }
  };

  const handleEmailShare = () => {
    try {
      shareViaEmail({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      });
      setShareResult('Email opened');
      setTimeout(() => {
        setShareResult(null);
        setShareMenuOpen(false);
      }, 2000);
    } catch (error) {
        console.log(error)
      setShareResult('Failed to open email');
    }
  };

  const handleLinkShare = async () => {
    try {
      const usedNativeShare = await shareViaLink({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      });
      
      if (!usedNativeShare) {
        setCopied(true);
        setShareResult('Link copied to clipboard');
      } else {
        setShareResult('Shared successfully');
      }
      
      setTimeout(() => {
        setCopied(false);
        setShareResult(null);
        setShareMenuOpen(false);
      }, 2000);
    } catch (error) {
        console.log(error)
      setShareResult('Failed to share link');
    }
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    try {
      shareViaSocial({
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status as "completed" | "pending" | "failed",
        date: transaction.date,
      }, platform);
      
      setShareResult(`Opening ${platform}...`);
      setTimeout(() => {
        setShareResult(null);
        setShareMenuOpen(false);
      }, 2000);
    } catch (error) {
        console.log(error)
      setShareResult(`Failed to open ${platform}`);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <button
            onClick={() => setDownloadMenuOpen(true)}
            disabled={downloading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download Receipt'}
            {downloadedFormat && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                {downloadedFormat}
              </span>
            )}
          </button>
        </div>
        <button
          onClick={() => setShareMenuOpen(true)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share className="w-4 h-4" />
          Share Details
        </button>
      </div>

      {/* Download Menu */}
      {downloadMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setDownloadMenuOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-80 max-w-[calc(100vw-2rem)]">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Download Transaction #{transaction.id}
            </h4>
            
            <div className="space-y-2">
              <button
                onClick={handleDownloadJSON}
                disabled={downloading}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
              >
                <FileJson className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-medium">JSON File</div>
                  <div className="text-xs text-gray-500">Structured data format</div>
                </div>
              </button>
              
              <button
                onClick={handleDownloadCSV}
                disabled={downloading}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
              >
                <Table className="w-4 h-4 text-green-500" />
                <div>
                  <div className="font-medium">CSV File</div>
                  <div className="text-xs text-gray-500">Spreadsheet compatible</div>
                </div>
              </button>
              
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <div>
                  <div className="font-medium">PDF Receipt</div>
                  <div className="text-xs text-gray-500">Formatted receipt document</div>
                </div>
              </button>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => setDownloadMenuOpen(false)}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Menu */}
      {shareMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShareMenuOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-80 max-w-[calc(100vw-2rem)]">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Share Transaction #{transaction.id}
            </h4>
            
            <div className="space-y-2">
              <button
                onClick={handleEmailShare}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-xs text-gray-500">Send via email client</div>
                </div>
              </button>
              
              <button
                onClick={handleLinkShare}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Link className="w-4 h-4 text-green-500" />
                <div>
                  <div className="font-medium">Share Link</div>
                  <div className="text-xs text-gray-500">
                    {copied ? 'Link copied!' : 'Share or copy link'}
                  </div>
                </div>
                {copied && <Check className="w-4 h-4 text-green-500" />}
              </button>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Share on social media</div>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <div>
                    <div className="font-medium">Twitter</div>
                    <div className="text-xs text-gray-500">Share on Twitter</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div>
                    <div className="font-medium">Facebook</div>
                    <div className="text-xs text-gray-500">Share on Facebook</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-xs text-gray-500">Share on LinkedIn</div>
                  </div>
                </button>
              </div>
            </div>
            
            {shareResult && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-center text-green-600 font-medium">
                  {shareResult}
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShareMenuOpen(false)}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}