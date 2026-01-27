import { getDb } from '@/lib/db';
import DeleteMessageButton from '@/components/admin/DeleteMessageButton';

export default async function InboxPage() {
  const db = await getDb();
  await db.read();
  
  const messages = db.data.messages || [];
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inbox</h1>
        <p className="text-gray-600">
          Manage contact form submissions from your website visitors
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Messages</div>
          <div className="text-3xl font-bold text-gray-900">{messages.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Unread</div>
          <div className="text-3xl font-bold text-sky-600">
            {messages.filter(m => m.status === 'unread').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Replied</div>
          <div className="text-3xl font-bold text-green-600">
            {messages.filter(m => m.status === 'replied').length}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {sortedMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No messages yet. Messages from the contact form will appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedMessages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  message.status === 'unread' ? 'bg-sky-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          message.status === 'unread'
                            ? 'bg-sky-100 text-sky-800'
                            : message.status === 'replied'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.status}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {message.role}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📧 {message.email}</div>
                      {message.phone && <div>📱 {message.phone}</div>}
                      <div className="text-xs text-gray-500">
                        🕒 {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <DeleteMessageButton messageId={message.id} />
                </div>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
