'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete message"
    >
      {isDeleting ? '⏳' : '🗑️'}
    </button>
  );
}
