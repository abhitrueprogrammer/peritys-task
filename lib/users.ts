
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
};

export const users: User[] = [
  {
    id: "u1",
    name: "Jane Doe",
    email: "jane@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=1",
    role: "admin",
    status: "active"
  },
  {
    id: "u2",
    name: "John Smith",
    email: "john@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=2",
    role: "user",
    status: "active"
  },
  {
    id: "u3",
    name: "Sam Wilson",
    email: "sam@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=3",
    role: "editor",
    status: "inactive"
  },
  {
    id: "u4",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=4",
    role: "user",
    status: "pending"
  },
  {
    id: "u5",
    name: "Chris Lee",
    email: "chris@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=5",
    role: "admin",
    status: "active"
  },
  {
    id: "u6",
    name: "Patricia Brown",
    email: "patricia@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=6",
    role: "user",
    status: "inactive"
  },
  {
    id: "u7",
    name: "Michael Miller",
    email: "michael@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=7",
    role: "editor",
    status: "active"
  },
  {
    id: "u8",
    name: "Jessica Davis",
    email: "jessica@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=8",
    role: "user",
    status: "pending"
  },
  {
    id: "u9",
    name: "David Garcia",
    email: "david@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=9",
    role: "admin",
    status: "inactive"
  },
  {
    id: "u10",
    name: "Sarah Rodriguez",
    email: "sarah@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=10",
    role: "user",
    status: "active"
  },
  {
    id: "u11",
    name: "James Wilson",
    email: "james@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=11",
    role: "editor",
    status: "pending"
  },
  {
    id: "u12",
    name: "Linda Martinez",
    email: "linda@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=12",
    role: "user",
    status: "active"
  },
  {
    id: "u13",
    name: "Robert Anderson",
    email: "robert@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=13",
    role: "admin",
    status: "inactive"
  },
  {
    id: "u14",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=14",
    role: "user",
    status: "active"
  },
  {
    id: "u15",
    name: "William Thomas",
    email: "william@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=15",
    role: "editor",
    status: "pending"
  },
  {
    id: "u16",
    name: "Mary Hernandez",
    email: "mary@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=16",
    role: "user",
    status: "active"
  },
  {
    id: "u17",
    name: "Charles Moore",
    email: "charles@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=17",
    role: "admin",
    status: "inactive"
  },
  {
    id: "u18",
    name: "Susan Jackson",
    email: "susan@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=18",
    role: "user",
    status: "active"
  },
  {
    id: "u19",
    name: "Joseph White",
    email: "joseph@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=19",
    role: "editor",
    status: "pending"
  },
  {
    id: "u20",
    name: "Karen Harris",
    email: "karen@example.com",
    avatarUrl: "https://i.pravatar.cc/100?img=20",
    role: "user",
    status: "active"
  }
];
