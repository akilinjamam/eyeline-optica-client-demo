import { getAccessory,  } from '@/fetchData/fetchFrameData';
import { TContactLens, TData, } from '@/ts-definition/types';
import { PageProps } from '../allglasses/page';
import AccessoryGallery from '@/component/UI/AccessoryGallery';


const AllAccessory = async ({searchParams}: PageProps) => {


    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const contactlens = await getAccessory({page:"1",limit:"20",...plainParams}) as TData<TContactLens>;
    const allContactLens = Array.isArray(contactlens?.data?.data) ? contactlens?.data?.data : [];

    const page = contactlens?.data?.meta?.page;
    const totalPage = contactlens?.data?.meta?.totalPage;

    return (
        <>
            <AccessoryGallery data={allContactLens} currentPage={page as number} totalPage={totalPage as number}/>
        </>
    );
};

export default AllAccessory;