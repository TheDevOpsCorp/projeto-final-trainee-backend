
export default
{ 
    extends: ['@commitlint/config-conventional'],
    //@ts-ignore
    ignores: [(commit) => commit.includes('[skip ci]')],
}
