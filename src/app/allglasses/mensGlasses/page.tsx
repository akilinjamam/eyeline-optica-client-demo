import ProductGallery from "@/component/UI/ProductGallery";
import { getFrame } from "@/fetchData/fetchFrameData";
import { TData, TFrame } from "@/ts-definition/types";

export const revalidate = 120; // ✅ enable ISR every 2 minutes

export interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

  const MensforGlasses = async ({ searchParams }: PageProps) => {
  
  const resolvedParams = await searchParams;
  const plainParams: Record<string, string> = {};
  if (resolvedParams) {
    for (const [key, value] of Object.entries(resolvedParams)) {
      plainParams[key] = Array.isArray(value) ? value[0] : value;
    }
  }

  const mergedParams = {biologyCategory: "men",page:"1",limit:"20",...plainParams}

  // fetch with default + extra filters
  const frame = (await getFrame(mergedParams)) as TData<TFrame>;
  const allFrames = Array.isArray(frame?.data?.data) ? frame.data.data : [];
  const page = frame?.data?.meta?.page;
  const totalPage = frame?.data?.meta?.totalPage;
  
  return <ProductGallery data={allFrames} currentPage={page as number} totalPage={totalPage as number} />;
};

export default MensforGlasses;
