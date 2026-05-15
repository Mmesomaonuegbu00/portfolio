import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/project';

export function load({ params }) {
  const project = projects.find(
    (p) => p.id === Number(params.id)
  );

  if (!project) {
    console.log(params.id);
console.log(projects);
    throw error(404, 'Project not found');
  }

  return { project };
}
