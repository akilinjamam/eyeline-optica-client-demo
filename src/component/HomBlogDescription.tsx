"use client"

import { useRouter } from "next/navigation";

const HomBlogDescription = ({description, id}: {description:string, id:string}) => {
    const router = useRouter();
    return (
        <p className="text-black mb-2.5 text-sm">
            {description?.length > 300 ? (
                <>
                {description?.slice(0, 300)}
                <span
                    onClick={() => router.push(`/blogDetail/${id}`)}
                    className="text-sm text-blue-800 cursor-pointer ml-1"
                >
                    ...see more
                </span>
                </>
            ) : (
                description
            )}
    </p>
    );
};

export default HomBlogDescription;