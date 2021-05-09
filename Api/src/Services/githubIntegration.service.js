import instance from '../External/githubInstance';

const getOrgImageURL = async (orgName) => {
  const res = await instance.get(`/orgs/${orgName}`);
  return res.data.avatar_url;
};

const getOldestCsharpRepos = async (orgName, position) => {
  const res = await instance.get(`/orgs/${orgName}/repos`, { params: { sort: 'created', direction: 'asc' } });
  const repoImageUrl = await getOrgImageURL(orgName);
  const csharpRepos = res.data
    .filter((repo) => repo.language === 'C#') // get only C# repos
    .map(({
      id, name, description, created_at,
    }) => ({
      id, name, description, created_at, image_url: repoImageUrl,
    }));
  return csharpRepos[position];
};

export { getOldestCsharpRepos, getOrgImageURL };
