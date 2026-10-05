# Living Loads
News, contacts and other information on the Living Loads project.

This repository contains the source code, content and assets from which the website is constructed.

## Making changes
The website is generated using the framework [Jekyll](https://jekyllrb.com) from Markdown files and HTML templates. The generation is performed by the GitHub Actions workflow `.github/workflows/deploy-pages.yml` after pushing new commits to the main branch, which then deploys the result to GitHub Pages. That means that changes, and this includes new content, are done by merging or pushing commits to the main branch. The workflow can also be triggered manually from the Actions tab.

Changes that only add content are not required to be tested locally and could be integrated with only a pull request. It is still recommended to set up a local development environment for the website, as the rendered results of the new content cannot be reliably guessed from the Markdown files alone. Any other changes must be evaluated in a local development environment to avoid "testing in production" and repeatedly pushing changes to the main branch to fix things. Pull requests targeting the main branch are built by the same workflow to check that they do not break the generation of the website, but they are not deployed.

The gems and the actions used by the workflow are kept up to date by Dependabot, configured in `.github/dependabot.yml`. Its pull requests are validated by the same build as any other pull request.

### Linking to internal pages and assets
Internal links and assets must use the Liquid filter `relative_url`, for example `{{'assets/favicon.png' | relative_url}}`, and never `absolute_url` or a hard-coded path. The workflow passes the base path of the deployment target to Jekyll via `--baseurl`, so the same sources work for the custom domain (empty base path), for the fallback project page at `https://quasi-software.github.io/living-loads-website/` and for local development. Links to external sites are of course given as full URLs.

### Local development
To set up a local development environment, follow these steps:

1. Install Ruby (3.4.7+) and Gems (3.6.9+). The latter is usually installed alongside Ruby.
1. Install gems Jekyll and Bundler: `gem install jekyll bundler`
1. Get a copy of the repository: `git clone git@github.com:QuaSi-Software/living-loads-website.git`
1. Switch into the directory: `cd living-loads-website`
1. Install the dependencies: `bundle install`
1. Generate the website and host it locally: `bundle exec jekyll serve`
1. View the generated website in the browser at [http://localhost:4000](http://localhost:4000)

To check how the site behaves when it is served from a sub path, as is the case for the fallback project page on `github.io`, build it with `bundle exec jekyll build --baseurl "/living-loads-website"` and inspect the generated files in `_site`.

Note that `Gemfile.lock` must list the platform `x86_64-linux` in its `PLATFORMS` section, as the workflow installs the dependencies in deployment mode, which does not allow the lock file to be modified during the build. Updating dependencies on a Windows machine can drop that entry, which makes the workflow fail with the message that the bundle only supports platform `x64-mingw-ucrt`. After changing dependencies, run `bundle lock --add-platform x86_64-linux` and commit the updated `Gemfile.lock`.

## Hosting
The website is hosted on GitHub Pages and published by the workflow `.github/workflows/deploy-pages.yml`. Before the workflow is run for the first time, the publishing source in the repository settings under *Pages* must be set to *GitHub Actions*, not to a branch, because the site uses Jekyll 4 while the built-in Pages build only supports Jekyll 3. As long as this has not been done, the workflow fails in the step *Configure GitHub Pages*.

### Custom domain
The site is served under the custom domain `livingloads.org`, with `www.livingloads.org` redirecting to it. The setup requires the following:

1. DNS records for the apex domain `livingloads.org`:
    * `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
    * `AAAA` records pointing to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`
1. A `CNAME` record for `www.livingloads.org` pointing to `quasi-software.github.io.`
1. If the DNS zone contains `CAA` records, they must allow `letsencrypt.org` to issue certificates. Without any `CAA` records nothing needs to be done.
1. The domain entered under *Settings → Pages → Custom domain*. GitHub then checks the DNS setup and automatically requests a free Let's Encrypt certificate covering both the apex and the `www` subdomain. Once the certificate has been issued, which can take up to 24 hours, the option *Enforce HTTPS* must be activated. Renewal of the certificate is handled automatically.

As the site is published by a workflow and not from a branch, a `CNAME` file in the repository is not required. The domain is taken from the Pages configuration of the repository.

**After the custom domain is added, changed or removed, the workflow must be run again.** The step *Configure GitHub Pages* reads the base path from the address the site is currently published under and hands it to Jekyll via `--baseurl`. A site built before the domain was added therefore still contains the path prefix `/living-loads-website` in all internal links and assets, which do not resolve under the custom domain. Re-running the workflow rebuilds the site with an empty base path and fixes this.

Note that no proxy or CDN, such as Cloudflare with proxying enabled, may be placed in front of GitHub Pages while the certificate is being issued, as this prevents the domain validation from succeeding. If the certificate is not issued long after the DNS records have propagated, removing the domain in the settings and immediately entering it again triggers a new attempt.

## License
The website is based on the theme [Landing Page of Start Bootstrap](https://github.com/StartBootstrap/startbootstrap-landing-page), which is released under MIT license. The Living Loads website in this repository is also released under MIT license, with specific exceptions. Please note that this does not automatically extend to all linked content by the website. Only content released as part of the repository is covered by the license. For more details, sources of some assets and the full license text, please see file `LICENSE.md`.
