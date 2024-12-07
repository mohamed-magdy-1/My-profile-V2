const { default: axios } = require("axios");


const axiosClient = axios.create({
    baseURL:"https://strapimyprofilev2-production.up.railway.app/api"
})

const HeaderApi=() => axiosClient.get("/header?populate=*",
    {headers:{
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
    }).then(data=> data.data.data)

const HomeApi=() => axiosClient.get("/home?populate=*",
    {headers:{
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
    }).then(data=> data.data.data)

const AboutApi=() => axiosClient.get("/about?populate[all_about][populate]=*",
    {headers:{
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
    }).then(data=> data.data.data)

const ProjectsApi=() => axiosClient.get("/projects?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4",
    {headers:{
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
    }).then(data=> data.data.data)

const AllProjectsApi=(pageIndex) => axiosClient.get(`/projects?populate=*&sort=createdAt:desc&pagination[page]=${pageIndex}&pagination[pageSize]=6`,
    {headers:{
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
    }).then(data=> data.data)

    const BlogApi=() => axiosClient.get("/blogs?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4",
        {headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
        }).then(data=> data.data.data)
    
        const AllBlogsApi=(pageIndex) => axiosClient.get(`/blogs?populate=*&sort=createdAt:desc&pagination[page]=${pageIndex}&pagination[pageSize]=6`,
            {headers:{
                Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
            }).then(data=> data.data)

            const ResentAddBlogApi=() => axiosClient.get(`/blogs?populate=*&sort=createdAt:desc&pagination[pageSize]=5`,
                {headers:{
                    Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
                }).then(data=> data.data.data)

            const BlogPageApi=(slug) => axiosClient.get(`/blogs/${slug}?populate=*`,
                {headers:{
                    Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
                }).then(data=> data.data.data)
        

            const contactApi=(data) => axiosClient.post(`/contacts`,data,
                {headers:{
                    Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
                })
        
            const SocialMediaApi=() => axiosClient.get(`/social-medias?populate=*`,
                {headers:{
                    Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEXT_TOKEN}`}
                }).then(data=> data.data.data)
        


export default{
    HeaderApi,
    HomeApi,
    AboutApi,
    ProjectsApi,
    AllProjectsApi,
    BlogApi,
    AllBlogsApi,
    BlogPageApi,
    ResentAddBlogApi,
    contactApi,
    SocialMediaApi,
}