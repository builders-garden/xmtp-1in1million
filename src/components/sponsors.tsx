import SponsorsDesktop from "@/components/sponsors-desktop";
import SponsorsMobile from "@/components/sponsors-mobile";

const Sponsors = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-5">
      <div className="hidden sm:block">
        <SponsorsDesktop />
      </div>
      <div className="block sm:hidden">
        <SponsorsMobile />
      </div>
    </div>
  );
};

export default Sponsors;
