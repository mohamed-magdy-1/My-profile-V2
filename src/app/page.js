import Slider from '../app/slider/slider';
import { fetchHome } from './lib/fetchHome';
import { fetchAbout } from './lib/fetchAbout';
import { fetchProjects } from './lib/fetchProjects';
import { fetchBlog } from './lib/fetchBlog';




export default async function Page() {
  const home = await fetchHome();
  const about = await fetchAbout();
  const projects = await fetchProjects();
  const blog = await fetchBlog();

  return (
    <Slider
      home={home}
      about={about}
      projects={projects}
      blog={blog}
    />
  );
}
