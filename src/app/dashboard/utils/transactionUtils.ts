// Transaction download utilities
export interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
}

export const downloadAsJSON = (transaction: Transaction) => {
  const transactionData = {
    ...transaction,
    exportedAt: new Date().toISOString(),
    exportedBy: "User",
    version: "1.0"
  };
  
  const dataStr = JSON.stringify(transactionData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `transaction-${transaction.id}-${transaction.project.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadAsCSV = (transaction: Transaction) => {
  const headers = ['Transaction ID', 'Type', 'Amount (NGN)', 'Status', 'Date', 'Project', 'Description'];
  const row = [
    transaction.id,
    transaction.type,
    transaction.amount,
    transaction.status,
    new Date(transaction.date).toLocaleDateString(),
    transaction.project,
    `Transaction for ${transaction.project} - ${transaction.type}`
  ];
  
  const csvContent = [
    headers.join(','),
    row.map(field => `"${field}"`).join(',')
  ].join('\n');
  
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `transaction-${transaction.id}-${transaction.project.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadAsPDF = (transaction: Transaction) => {
  // Create a simple HTML content for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Transaction Receipt - ${transaction.id}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #0077B6; padding-bottom: 20px; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; color: #0077B6; }
        .receipt-title { font-size: 18px; color: #666; margin-top: 10px; }
        .transaction-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; }
        .detail-value { color: #555; }
        .amount { font-size: 24px; font-weight: bold; color: #0077B6; text-align: center; margin: 20px 0; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-failed { background: #f8d7da; color: #721c24; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Bomcel Digital Agency</div>
        <div class="receipt-title">Transaction Receipt</div>
      </div>
      
      <div class="transaction-details">
        <div class="detail-row">
          <span class="detail-label">Transaction ID:</span>
          <span class="detail-value">#${transaction.id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span class="detail-value">${new Date(transaction.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Project:</span>
          <span class="detail-value">${transaction.project}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service Type:</span>
          <span class="detail-value">${transaction.type}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value"><span class="status status-${transaction.status}">${transaction.status.toUpperCase()}</span></span>
        </div>
      </div>
      
      <div class="amount">
        ${new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 0
        }).format(transaction.amount)}
      </div>
      
      <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        <p>Thank you for choosing Bomcel Digital Agency</p>
      </div>
    </body>
    </html>
  `;
  
  // Create a new window and write the HTML content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }
};

// Share utilities
export const shareViaEmail = (transaction: Transaction) => {
  const subject = `Transaction Receipt - ${transaction.project}`;
  const body = `Transaction Details:
  
Transaction ID: #${transaction.id}
Project: ${transaction.project}
Type: ${transaction.type}
Amount: ${new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(transaction.amount)}
Status: ${transaction.status.toUpperCase()}
Date: ${new Date(transaction.date).toLocaleDateString()}

Thank you for choosing Bomcel Digital Agency.`;
  
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl);
};

export const shareViaLink = async (transaction: Transaction) => {
  const url = window.location.href;
  const title = `Transaction ${transaction.id} - ${transaction.project}`;
  const text = `View transaction details for ${transaction.project}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return true;
    } catch (error) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      return false;
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      return false;
    } catch (error) {
      console.error('Failed to copy link:', error);
      return false;
    }
  }
};

export const shareViaSocial = (transaction: Transaction, platform: 'twitter' | 'facebook' | 'linkedin') => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Transaction ${transaction.id}: ${transaction.project} - ${new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(transaction.amount)}`);
  
  let shareUrl = '';
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${text}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};