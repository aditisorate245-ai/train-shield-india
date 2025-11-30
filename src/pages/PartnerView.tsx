
import { lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const PartnerDashboardLayout = lazy(() => import("@/components/partner/dashboard/PartnerDashboardLayout"));
const PartnerMobileDashboard = lazy(() => import("@/components/partner/dashboard/PartnerMobileDashboard"));

const PartnerView = () => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isMobile ? <PartnerMobileDashboard /> : <PartnerDashboardLayout />}
    </Suspense>
  );
};

export default PartnerView;
