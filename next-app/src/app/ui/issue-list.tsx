import { Octokit } from "@octokit/core";

export default async function IssuesList() {
    const octokit = new Octokit();

    const repos = await octokit.request('GET /search/repositories', { q: "good-first-issues:>0" })

    console.log(repos)

    return (
        <div>
            <h1>Issues</h1>
            <ul>
                {repos.data.items.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    )
}