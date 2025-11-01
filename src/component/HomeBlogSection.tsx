import { getBlog } from "@/fetchData/fetchFrameData";
import { TBlog, TData } from "@/ts-definition/types";
import Image from "next/image";
import HomBlogDescription from "./HomBlogDescription";


const HomeBlogSection = async () => {
    const blog = await getBlog({page:"1",limit:"2"}) as TData<TBlog>;
    const allBlog = Array.isArray(blog?.data?.data) ? blog?.data?.data : [];




    return (
        <div className="lg:hidden md:hidden block px-1 mt-5">
            {
                allBlog?.map((blog:TBlog) => {
                    return (
                        <div key={blog?._id} className="">
                            <div>
                                <Image src={blog?.images[0]} width={300} height={300} alt="home-blog" className="rounded-md w-full"/>
                            </div>
                            <br />
                            <p className="text-blue-500 mb-2.5">{blog?.title}</p>
                            <HomBlogDescription description={blog?.description} id={blog?._id as string}/>
                        </div>
                        
                    )
                })
            }
        </div>
    );
};

export default HomeBlogSection;