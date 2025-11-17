"use client";

import { Mail, Link, Twitter, Facebook, Linkedin, Check } from "lucide-react";
import { shareViaEmail, shareViaLink, shareViaSocial } from "./dashboard/utils/transactionUtils";
import { useState } from "react";

interface ShareMenuProps {
  transaction: {
    id: number;
    project: string;
    type: string;
    amount: number;
    status: string;
    date: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareMenu({ transaction, isOpen, onClose }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);
  const [shareResult, setShareResult] = useState<string | null>(null);

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
        onClose();
      }, 2000);
    } catch (error) {
      console.log(error);
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
        onClose();
      }, 2000);
    } catch (error) {
      console.log(error);
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
        onClose();
      }, 2000);
    } catch (error) {
      console.log(error);
      setShareResult(`Failed to open ${platform}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Menu */}
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
              <Twitter className="w-4 h-4 text-blue-400" />
              <div>
                <div className="font-medium">Twitter</div>
                <div className="text-xs text-gray-500">Share on Twitter</div>
              </div>
            </button>
            
            <button
              onClick={() => handleSocialShare('facebook')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-medium">Facebook</div>
                <div className="text-xs text-gray-500">Share on Facebook</div>
              </div>
            </button>
            
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
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
            onClick={onClose}
            className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}