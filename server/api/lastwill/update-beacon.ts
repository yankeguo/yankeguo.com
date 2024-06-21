const LASTWILL_BEACON_URL = "https://api.github.com/repos/yankeguo/lastwill/contents/beacon.txt"
const LASTWILL_USER_AGENT = "cloudflare pages / yankeguo.com"
import { encodeBase64 } from '~/utils/encode'

export default defineEventHandler(async (event) => {
    const { lastwillGitHubToken, lastwillToken } = useRuntimeConfig();

    setResponseHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')

    const query = getQuery<{ token?: string }>(event);
    if (query.token != lastwillToken) {
        return 'bad token'
    };

    const existed = await fetch(LASTWILL_BEACON_URL, {
        headers: {
            'Authorization': `Bearer ${lastwillGitHubToken}`,
            'User-Agent': LASTWILL_USER_AGENT,
        }
    })

    let sha = null
    if (existed.status === 200) {
        const existedJson: Record<string, any> = await existed.json()
        sha = existedJson.sha
    } else if (existed.status === 404) {
    } else {
        return `failed checking existed: ${existed.status}: ` + await existed.text()
    }

    const content = encodeBase64(new TextEncoder().encode(new Date().toISOString()))

    const res = await fetch(LASTWILL_BEACON_URL, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${lastwillGitHubToken}`,
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': LASTWILL_USER_AGENT,
        },
        body: JSON.stringify({
            sha: sha,
            message: 'ci: update beacon',
            content,
        })
    })

    if (!existed.ok) {
        return `failed updating: ${res.status}: ` + await res.text()
    }

    return 'updated'
})