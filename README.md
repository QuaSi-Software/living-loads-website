# Living Loads
News, contacts and other information on the Living Loads project.

This repository contains the source code, content and assets from which the website is constructed.

## Making changes
The website is generated using the framework [Jekyll](https://jekyllrb.com) from Markdown files and HTML templates. The generation is performed in a CI pipeline after pushing new commits to the main branch. That means that changes, and this includes new content, are done by merging or pushing commits to the main branch and then running the CI pipeline.

Changes that only add content are not required to be tested locally and could be integrated with only a pull request. It is still recommended to set up a local development environment for the website, as the rendered results of the new content cannot be reliably guessed from the Markdown files alone. Any other changes must be evaluated in a local development environment to avoid "testing in production" and repeatedly pushing changes to the main branch to fix things.

### Local development
To set up a local development environment, follow these steps:

1. Install Ruby (3.4.7+) and Gems (3.6.9+). The latter is usually installed alongside Ruby.
1. Install gems Jekyll and Bundler: `gem install jekyll bundler`
1. Get a copy of the repository: `git clone git@github.com:QuaSi-Software/living-loads-website.git`
1. Switch into the directory: `cd living-loads-website`
1. Install the dependencies: `bundle install`
1. Generate the website and host it locally: `bundle exec jekyll serve`
1. View the generated website in the browser at [http://localhost:4000](http://localhost:4000)

## License
The website is based on the theme [Landing Page of Start Bootstrap](https://github.com/StartBootstrap/startbootstrap-landing-page), which is released under MIT license. The Living Loads website in this repository is also released under MIT license, with specific exceptions. Please note that this does not automatically extend to all linked content by the website. Only content released as part of the repository is covered by the license. For more details, sources of some assets and the full license text, please see file `LICENSE.md`.
