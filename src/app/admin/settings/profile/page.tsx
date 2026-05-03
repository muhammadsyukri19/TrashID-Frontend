export default function AdminSettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#6f7b64]">Setelan &gt; Profil Saya</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#154212] font-display">
          Profil Saya
        </h1>
      </div>

      <section className="rounded-[28px] border border-[#edf0e9] bg-white p-6 shadow-[0_18px_40px_rgba(21,66,18,0.08)] lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#e6eadd] bg-[#fafcf8] shadow-[0_10px_20px_rgba(21,66,18,0.08)]">
              <span className="material-symbols-outlined text-[56px] text-[#2a5b2b]" style={{ fontVariationSettings: "'FILL' 0" }}>
                account_circle
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-extrabold text-[#1f241b] font-display">User Name</h2>
              <span className="rounded-full border border-[#7fb67a] bg-[#dff4d8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2a5b2b]">
                Admin
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-500">username@gmail.com</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#1f241b]">Nama Lengkap</p>
                <div className="rounded-xl border border-[#dfe7d8] bg-[#fafcf8] px-4 py-3 text-sm text-zinc-500">
                  Nama Lengkap
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-[#1f241b]">Nomor Telepon</p>
                <div className="rounded-xl border border-[#dfe7d8] bg-[#fafcf8] px-4 py-3 text-sm text-zinc-500">
                  0812++++++++
                </div>
              </div>

              <div className="space-y-3 md:col-span-2">
                <p className="text-sm font-bold text-[#1f241b]">Alamat</p>
                <div className="rounded-xl border border-[#dfe7d8] bg-[#fafcf8] px-4 py-3 text-sm text-zinc-500">
                  Jalan jalan, Desa desa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
