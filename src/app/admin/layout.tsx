import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1a1c1c] font-body flex selection:bg-[#91f78e]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap');
          .font-headline, .font-display { font-family: 'Manrope', sans-serif; }
          .font-body, body { font-family: 'Inter', sans-serif; }
        `,
        }}
      />

      <AdminSidebar />

      <div className="lg:ml-72 flex-1 min-h-screen transition-all duration-300">
        <div className="p-8 lg:p-12 w-full max-w-[1400px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}