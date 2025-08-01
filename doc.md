# Turborepo
Before contributing please read docs for 
https://turborepo.com

# Installing a specific library
https://turborepo.com/docs/guides/tools/tailwind

## Example
For instance you want to install `react-markdown` only available for @repo/web-ui and `apps/web`

>> pnpm add react-markdown --filter=@repo/ui --filter=web

## Example 2
Installing dev dependancy `@repo/tailwind-config` for `apps/web`
> pnpm add @repo/tailwind-config --save-dev --filter=web

pnpm add @repo/tailwind-config --save-dev --filter=web