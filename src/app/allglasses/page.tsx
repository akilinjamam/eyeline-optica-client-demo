import ProductGallery from "@/component/UI/ProductGallery";
import { getFrame } from "@/fetchData/fetchFrameData";
import { TData, TFrame } from "@/ts-definition/types";

export interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

  const Eyeglasses = async ({ searchParams }: PageProps) => {
  
  const resolvedParams = await searchParams;
  const plainParams: Record<string, string> = {};
  if (resolvedParams) {
    for (const [key, value] of Object.entries(resolvedParams)) {
      plainParams[key] = Array.isArray(value) ? value[0] : value;
    }
  }

  const mergedParams = {type: "eye glasses", ...plainParams}

  // fetch with default + extra filters
  const frame = (await getFrame(mergedParams)) as TData<TFrame>;
  const allFrames = Array.isArray(frame?.data?.data) ? frame.data.data : [];

  return <ProductGallery data={allFrames} />;
};

export default Eyeglasses;
