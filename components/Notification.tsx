'use client'

import { useEffect, useState } from "react";

type Notification = {
  id: string | number;
  sender: {
    profilePicUrl: string;
    name: string;
    username: string;
  };
  message: string;
  createdAt: string;
  Post?: {
    media_files?: { url: string; type: string }[];
  };
};

type User = {
  id: string;
  name: string;
  username: string;
  profilePicUrl: string;
  notificationCount: number;
};

export function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      const headers = {
        Authorization: process.env.NEXT_PUBLIC_API_JWT,
        Platform: "ios",
        "Accept-Language": "en",
      };

      const res = await fetch("https://test.zexmeet.com/api/v1/notifications?type=new_post", { headers });
      const data = await res.json();
      setNotifications(data.notifications || []);

      const uniqueUsersMap = new Map<string, User>();
      data.notifications.forEach((n: Notification) => {
        const u = n.sender;
        if (!uniqueUsersMap.has(u.username)) {
          const count = data.notifications.filter((x: Notification) => x.sender.username === u.username).length;
          uniqueUsersMap.set(u.username, {
            id: u.username,
            name: u.name,
            username: u.username,
            profilePicUrl: u.profilePicUrl,
            notificationCount: count,
          });
        }
      });

      setUsers(Array.from(uniqueUsersMap.values()));
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }

  const toggleUser = (userId: string) => {
    setExpandedUserId(prev => (prev === userId ? null : userId));
  };

  const getUserNotifications = (userId: string) =>
    notifications.filter(n => n.sender.username === userId).slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-gray-600 mb-6">Click a user to view their notifications.</p>

        {users.map(user => (
          <div key={user.id} className="bg-white rounded-xl shadow mb-4">
            <div
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleUser(user.id)}
            >
              <img src={user.profilePicUrl} alt={user.name} className="w-14 h-14 rounded-full mr-4 border" />
              <div className="flex-1">
                <p className="font-semibold">{user.name} <span className="text-sm text-gray-500">@{user.username}</span></p>
                <p className="text-sm text-gray-600">{user.notificationCount} notification{user.notificationCount !== 1 && 's'}</p>
              </div>
              <ChevronIcon expanded={expandedUserId === user.id} />
            </div>

            {expandedUserId === user.id && (
              <div className="bg-gray-50 border-t px-4 py-3">
                {getUserNotifications(user.id).map(n => (
                  <div key={n.id} className="bg-white rounded-lg p-3 shadow-sm mb-2 border flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                    {n.Post?.media_files?.some(f => f.type === 'image') && (
                      <img
                        src={n.Post.media_files.find(f => f.type === 'image')?.url}
                        alt="Post"
                        className="w-12 h-12 rounded object-cover border"
                      />
                    )}
                  </div>
                ))}
                {user.notificationCount > 5 && (
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Showing 5 of {user.notificationCount} notifications
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {!users.length && (
          <p className="text-center text-gray-500 text-lg">No notifications found</p>
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-6 h-6 text-gray-400 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
