"use client";
interface RoyalLayoutProps {
  children: React.ReactNode;
}

const RoyalMainLayout = ({ children }: RoyalLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-[#fcf5f6] flex justify-center items-center font-serif">
      {children}
    </div>
  );
};

export default RoyalMainLayout;
