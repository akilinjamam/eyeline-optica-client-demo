import { TBlog, TData } from "@/ts-definition/types";
import { PageProps } from "../allglasses/page";
import { getAllBlog, getBlog } from "@/fetchData/fetchFrameData";
import BlogPage from "@/component/BlogPage";


const page = async ({searchParams}: PageProps) => {

    const resolvedParams = await searchParams;
    const plainParams: Record<string, string> = {};
    if (resolvedParams) {
        for (const [key, value] of Object.entries(resolvedParams)) {
        plainParams[key] = Array.isArray(value) ? value[0] : value;
        }
    }

    const blog = await getBlog({page:"1",limit:"20",...plainParams}) as TData<TBlog>;
    const categories = await getAllBlog() as TData<TBlog>;
    const allBlog = Array.isArray(blog?.data?.data) ? blog?.data?.data : [];

    const allCategories = Array.isArray(categories?.data?.data) ? categories?.data?.data : [];
        
        const page = blog?.data?.meta?.page;
        const totalPage = blog?.data?.meta?.totalPage;

    return <BlogPage allBlog={allBlog} page={page as number} totalPage={totalPage as number} allCategories={allCategories}/>

};

export default page;