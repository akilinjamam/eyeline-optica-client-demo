import { getcontactLens } from '@/fetchData/fetchFrameData';
import { TContactLens, TData, } from '@/ts-definition/types';
import { PageProps } from '../allglasses/page';
import ContactLensGallery from '@/component/UI/ContactLensGallery';


const Contactlense = async ({searchParams}: PageProps) => {


    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const contactlens = await getcontactLens(plainParams) as TData<TContactLens>;
      const allContactLens = Array.isArray(contactlens?.data?.data) ? contactlens?.data?.data : [];
    return (
        <>
            <ContactLensGallery data={allContactLens}/>
        </>
    );
};

export default Contactlense;