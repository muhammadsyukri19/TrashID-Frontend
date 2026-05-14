"use client";

import React, { useState, useEffect } from "react";

function StatIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
      {name}
    </span>
  );
}

function StatusBadge({ role, children }: { role: string; children: React.ReactNode }) {
  const className =
    role === "admin"
      ? "bg-[#fff2df] text-[#c06a00]"
      : "bg-[#eef3ff] text-[#2d6fb1]";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [stats, setStats] = useState([
    { label: "Total User Terdaftar", value: "0", icon: "group", tone: "blue" },
    { label: "Poin XP Rata-rata", value: "0", icon: "star", tone: "emerald" },
    { label: "XP Tertinggi", value: "0", icon: "social_leaderboard", tone: "amber" },
  ]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const json = await response.json();
      
      if (json.status === "success") {
        // Hanya ambil yang rolenya 'user' (bukan admin)
        const data = json.data.filter((u: any) => u.role !== "admin");
        setUsers(data);
        
        // Update stats
        const total = data.length;
        const totalXp = data.reduce((acc: number, curr: any) => acc + (curr.xp || 0), 0);
        const avgXp = total > 0 ? Math.round(totalXp / total) : 0;
        const maxXp = total > 0 ? Math.max(...data.map((u: any) => u.xp || 0)) : 0;

        setStats([
          { label: "Total User Terdaftar", value: total.toString(), icon: "group", tone: "blue" },
          { label: "Poin XP Rata-rata", value: avgXp.toString(), icon: "star", tone: "emerald" },
          { label: "XP Tertinggi", value: maxXp.toString(), icon: "social_leaderboard", tone: "amber" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const name = (user.fullName || "").toLowerCase();
    const username = (user.username || "").toLowerCase();
    return name.includes(query) || username.includes(query);
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setIsActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/users/${selectedUser._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== selectedUser._id));
        setIsDeleteModalOpen(false);
        // Refresh stats
        fetchUsers();
      } else {
        alert("Gagal menghapus user");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedUser) return;
    setIsActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/users/${selectedUser._id}/role`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u._id === selectedUser._id ? { ...u, role: newRole } : u));
        setIsRoleModalOpen(false);
      } else {
        alert("Gagal memperbarui role");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-body">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#154212]">
            Manajemen Pengguna
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Kelola data akun pengguna, pantau hak akses (role), dan lihat statistik kontribusi poin XP.
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#e4e4de] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.tone === "green" ? "bg-[#ecf7eb] text-[#2f6e2f]" : 
                  stat.tone === "amber" ? "bg-[#fff2df] text-[#c06a00]" : 
                  stat.tone === "emerald" ? "bg-[#eef8ea] text-[#2f6e2f]" :
                  "bg-[#eef3ff] text-[#2d6fb1]"
                }`}
              >
                <StatIcon name={stat.icon} />
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#154212]">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Table Section */}
      <section className="rounded-xl border border-[#e4e4de] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-5 border-b border-[#eee9df] p-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-headline text-lg font-bold text-[#154212]">Daftar Akun Terdaftar</h2>
            <p className="mt-1 text-sm text-zinc-500">Semua pengguna yang memiliki akses ke aplikasi TrashID.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Kembali ke halaman 1 saat pencarian berubah
                }}
                placeholder="Cari pengguna..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#154212] w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-5 pb-2">
          <table className="min-w-[1000px] w-full text-left">
            <thead className="bg-[#154212] text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              <tr>
                <th className="px-5 py-3 rounded-tl-lg">Profil Pengguna</th>
                <th className="px-5 py-3">Kontak / Email</th>
                <th className="px-5 py-3 text-center">Hak Akses (Role)</th>
                <th className="px-5 py-3 text-center">Total XP</th>
                <th className="px-5 py-3">Tanggal Bergabung</th>
                <th className="px-5 py-3 text-center rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7efe3]">
              {paginatedUsers.map((user, index) => (
                <tr key={user._id} className={`${index % 2 === 0 ? "bg-white" : "bg-[#f0f7ef]/50"} hover:bg-[#e8f3e8] transition-colors`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture.startsWith('http') ? user.profilePicture : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace("/api", "")}${user.profilePicture}`} 
                          alt={user.fullName} 
                          className="h-10 w-10 rounded-full object-cover border border-[#e7efe3]"
                        />
                      ) : (
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${user.role === 'admin' ? 'bg-[#fff2df] text-[#c06a00]' : 'bg-[#e7f5e9] text-[#2f6e2f]'}`}>
                          {user.fullName?.charAt(0) || user.username?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-[#1a1c1c]">{user.fullName || "Tanpa Nama"}</p>
                        <p className="text-xs text-zinc-500">@{user.username || "user"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-zinc-600 font-medium">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge role={user.role || 'user'}>
                      {(user.role || 'user').toUpperCase()}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-[#154212] bg-[#f0f7ef] px-3 py-1 rounded-full text-xs border border-[#d2e8cc]">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      {user.xp || 0} XP
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-zinc-500">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => { setSelectedUser(user); setIsRoleModalOpen(true); }}
                        className="p-1.5 text-zinc-400 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors tooltip-trigger" 
                        title="Ubah Role"
                      >
                        <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                      </button>
                      <button 
                        onClick={() => { setSelectedUser(user); setIsDeleteModalOpen(true); }}
                        className="p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors tooltip-trigger" 
                        title="Hapus Akun"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr><td colSpan={6} className="p-10 text-center text-zinc-400">Tidak ada data pengguna ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-bold text-center text-zinc-900 mb-2">Hapus Akun Pengguna?</h3>
            <p className="text-sm text-zinc-500 text-center mb-8">
              Tindakan ini tidak dapat dibatalkan. Akun <b>{selectedUser?.fullName || selectedUser?.username}</b> akan dihapus permanen dari sistem.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleDeleteUser}
                disabled={isActionLoading}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {isActionLoading ? "Menghapus..." : "Ya, Hapus Akun"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl">manage_accounts</span>
            </div>
            <h3 className="text-xl font-bold text-center text-zinc-900 mb-2">Ubah Hak Akses</h3>
            <p className="text-sm text-zinc-500 text-center mb-8">
              Pilih role baru untuk <b>{selectedUser?.fullName || selectedUser?.username}</b>.
            </p>
            
            <div className="space-y-3 mb-8">
              <button 
                onClick={() => handleUpdateRole("user")}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${selectedUser?.role === 'user' ? 'border-[#154212] bg-[#f0f7ef]' : 'border-zinc-100 hover:border-zinc-200'}`}
              >
                <div>
                  <p className="font-bold text-[#154212]">User Regular</p>
                  <p className="text-xs text-zinc-500">Akses standar untuk lapor dan scan sampah.</p>
                </div>
                {selectedUser?.role === 'user' && <span className="material-symbols-outlined text-[#154212]">check_circle</span>}
              </button>
              
              <button 
                onClick={() => handleUpdateRole("admin")}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${selectedUser?.role === 'admin' ? 'border-amber-500 bg-amber-50' : 'border-zinc-100 hover:border-zinc-200'}`}
              >
                <div>
                  <p className="font-bold text-amber-700">Administrator</p>
                  <p className="text-xs text-zinc-500">Akses penuh ke manajemen sistem dan data.</p>
                </div>
                {selectedUser?.role === 'admin' && <span className="material-symbols-outlined text-amber-500">check_circle</span>}
              </button>
            </div>

            <button 
              onClick={() => setIsRoleModalOpen(false)}
              className="w-full py-3 px-4 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
        
        <div className="flex flex-col gap-3 border-t border-[#eee9df] px-5 py-4 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between">
          <p>
            Menampilkan <span className="font-semibold text-[#1a1c1c]">{filteredUsers.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> dari <span className="font-semibold text-[#1a1c1c]">{filteredUsers.length}</span> pengguna
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-md border border-[#e4e4de] bg-white text-[#94a28e] hover:bg-[#f4f8f2] disabled:opacity-50 transition-colors"
              >
                ‹
              </button>
              <button className="h-8 w-8 rounded-md bg-[#154212] text-white font-bold">{currentPage}</button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-md border border-[#e4e4de] bg-white text-[#94a28e] hover:bg-[#f4f8f2] disabled:opacity-50 transition-colors"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



