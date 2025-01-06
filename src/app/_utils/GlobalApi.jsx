import axios from "axios";


const axiosClient = axios.create({
    baseURL: "/api/proxy", 
});


const fetchData = async (endpoint) => {
    try {
        const response = await axiosClient.get(`?endpoint=${ encodeURIComponent(endpoint)}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}`, error);
        throw error;
    }
};

const sendData = async (endpoint,data) => {
    try {
        await axiosClient.post(`?endpoint=${ encodeURIComponent(endpoint)}`,data);
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}`, error);
        throw error;
    }
};


export const HeaderApi = () => fetchData("/header?populate=*");
export const HomeApi = () => fetchData("/home?populate=*");
export const AboutApi = () => fetchData("/about?populate[all_about][populate]=*");
// Projects
export const ProjectsApi = () => fetchData("/projects?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4");
export const AllProjectsApi = (pageIndex) => fetchData(`/projects?populate=*&sort=createdAt:desc&pagination[page]=${pageIndex}&pagination[pageSize]=6`);
// blogs
export const BlogApi  = () => fetchData("/blogs?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4");
export const AllBlogsApi = (pageIndex) => fetchData(`/blogs?populate=*&sort=createdAt:desc&pagination[page]=${pageIndex}&pagination[pageSize]=6`);
export const ResentAddBlogApi = () => fetchData("/blogs?populate=*&sort=createdAt:desc&pagination[pageSize]=5");
export const BlogPageApi = (slug) => fetchData(`/blogs/${slug}?populate=*`);
// 
export const SocialMediaApi = () => fetchData(`/social-medias?populate=*`);

export const contactApi = (data) => sendData(`/contacts`,data);



















export default {
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

};
